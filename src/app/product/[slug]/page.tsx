import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProductDetail } from '@/lib/saleor';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCT_DETAIL } from '@/lib/mock-data';
import SizeSelector from '@/components/SizeSelector';
import ProductGallery from '@/components/ProductGallery';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/lib/saleor';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await fetchProductDetail(params.slug);
    if (!product) return { title: 'Producto no encontrado' };
    return {
      title: product.name,
      description: product.description?.replace(/<[^>]*>/g, '').slice(0, 160),
      openGraph: {
        title: product.name,
        images: product.media?.[0]?.url ? [{ url: product.media[0].url }] : [],
      },
    };
  } catch {
    return { title: 'Producto' };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: any;

  try {
    product = await fetchProductDetail(params.slug);
  } catch {
    if (params.slug === MOCK_PRODUCT_DETAIL.slug) {
      product = MOCK_PRODUCT_DETAIL;
    } else {
      notFound();
    }
  }

  if (!product) {
    if (params.slug === MOCK_PRODUCT_DETAIL.slug) {
      product = MOCK_PRODUCT_DETAIL;
    } else {
      notFound();
    }
  }

  // Fetch otros productos
  let relatedProducts: any[] = [];
  try {
    const result = await fetchProducts(4);
    relatedProducts = result.edges.map((e) => e.node).filter((p: any) => p.slug !== product.slug);
    if (relatedProducts.length > 4) relatedProducts = relatedProducts.slice(0, 4);
  } catch {}

  const images = product.media?.filter((m: any) => m.type === 'IMAGE') || [];
  const firstImage = images[0];

  let sizes = product.variants?.map((v: any) => {
    const sizeAttr = v.attributes?.find(
      (a: any) => a.attribute?.name?.toLowerCase() === 'size' || a.attribute?.name?.toLowerCase() === 'talla'
    );
    if (!sizeAttr) return null;
    
    const qty = v.quantityAvailable ?? v.stockQuantity ?? 0;
    return {
      name: sizeAttr.values?.[0]?.name,
      available: qty > 0,
    };
  }).filter((s: any) => s && s.name) || [];

  // Fallback if no sizes are defined in Saleor (to demonstrate the UI)
  if (sizes.length === 0) {
    sizes = [
      { name: 'S', available: true },
      { name: 'M', available: false },
      { name: 'L', available: true },
      { name: 'XL', available: true },
    ];
  }

  const basePrice = product.pricing?.priceRange?.start?.gross?.amount;
  const currency = product.pricing?.priceRange?.start?.gross?.currency || 'USD';
  const currencySymbol = currency === 'USD' ? '$' : currency;

  return (
    <>
    <div className="max-w-site mx-auto px-4 lg:px-8 py-8 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 text-xs font-display uppercase tracking-wider text-gewalt-text-muted">
        <Link href="/" className="hover:text-gewalt-primary transition-colors">Inicio</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-gewalt-primary transition-colors">Shop</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop/${product.category.slug}`} className="hover:text-gewalt-primary transition-colors">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gewalt-text">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Product images */}
        <div>
          <ProductGallery images={images} productName={product.name} productSlug={product.slug} />
        </div>

        {/* Product info */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider mb-2">
            {product.name}
          </h1>

          {basePrice && (
            <p className="text-2xl font-display text-gewalt-text-muted mb-6">
              {currencySymbol}{basePrice.toFixed(2)}
            </p>
          )}

          {product.description && (
            <div
              className="text-gewalt-text-muted text-sm leading-relaxed mb-8 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}

          {/* Interactive Size Selector + WhatsApp CTA */}
          <div className="mb-8">
            <SizeSelector
              sizes={sizes}
              productName={product.name}
              productSlug={product.slug}
              price={basePrice}
              currency={currencySymbol}
              imageUrl={firstImage?.url}
            />
          </div>

          <div className="mt-8 space-y-3 text-xs text-gewalt-text-muted font-display uppercase tracking-wider">
            <p>✓ Envíos a nivel global</p>
            <p>✓ Pago seguro por adelantado</p>
            <p>✓ Garantía de calidad</p>
          </div>
        </div>
      </div>
    </div>

      {relatedProducts.length > 0 && (
        <div className="max-w-site mx-auto px-6 lg:px-16 py-16 border-t border-gewalt-border mt-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-display text-[0.65rem] tracking-[0.25em] uppercase text-gewalt-text-muted mb-2">Tambien te puede gustar</p>
              <h2 className="font-serif italic text-[clamp(1.5rem,3vw,2.5rem)] text-gewalt-text leading-none">Mas productos</h2>
            </div>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </>
  );
}
