import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProductDetail } from '@/lib/saleor';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCT_DETAIL } from '@/lib/mock-data';
import SizeSelector from '@/components/SizeSelector';

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

  const images = product.media?.filter((m: any) => m.type === 'IMAGE') || [];
  const firstImage = images[0];

  const sizeAttribute = product.variants?.[0]?.attributes?.find(
    (a: any) => a.attribute?.name?.toLowerCase() === 'size' || a.attribute?.name?.toLowerCase() === 'talla'
  );
  const sizes = sizeAttribute?.values?.map((v: any) => v.name) || [];

  const basePrice = product.pricing?.priceRange?.start?.gross?.amount;
  const currency = product.pricing?.priceRange?.start?.gross?.currency || 'USD';
  const currencySymbol = currency === 'USD' ? '$' : currency;

  return (
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
        <div className="space-y-4">
          {firstImage ? (
            <div className="relative aspect-[3/4] bg-gewalt-surface-alt">
              <Image
                src={firstImage.url}
                alt={firstImage.alt || product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-[3/4] bg-gewalt-surface-alt flex items-center justify-center text-gewalt-text-muted">
              Imagen no disponible
            </div>
          )}

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img: any, i: number) => (
                <div key={i} className="relative w-20 h-20 flex-shrink-0 bg-gewalt-surface-alt">
                  <Image
                    src={img.url}
                    alt={img.alt || `${product.name} ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
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
            />
          </div>

          <div className="mt-8 space-y-3 text-xs text-gewalt-text-muted font-display uppercase tracking-wider">
            <p>✓ Envíos a todo Ecuador</p>
            <p>✓ Pago contra entrega</p>
            <p>✓ Garantía de calidad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
