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
    <div className="max-w-site mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider mb-12">
        {displayName}
      </h1>
      <ProductGrid products={products} />
    </div>
  );
}
