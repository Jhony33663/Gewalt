import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/lib/saleor';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface CategoryPageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const name = params.category.replace(/-/g, ' ');
  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: `Explora nuestra colección de ${name} — GEWALT streetwear.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  let products: any[] = MOCK_PRODUCTS.filter(
    (p) => p.category?.slug === params.category
  );

  try {
    const result = await fetchProducts(24, undefined, params.category);
    const fetched = result.edges.map((e) => e.node);
    if (fetched.length > 0) products = fetched;
  } catch {
    // use mock data
  }

  const displayName = params.category.replace(/-/g, ' ');

  return (
    <div className="min-h-screen">
      <div className="border-b border-gewalt-border">
        <div className="max-w-site mx-auto px-6 lg:px-16 py-12">
          <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-gewalt-text-muted mb-2">GEWALT Studios</p>
          <h1 className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] text-gewalt-text leading-none capitalize">{displayName}</h1>
        </div>
      </div>
      <div className="max-w-site mx-auto px-6 lg:px-16 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
