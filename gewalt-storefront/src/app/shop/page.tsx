import type { Metadata } from 'next';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts, fetchCategories } from '@/lib/saleor';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Explora la colección GEWALT — Hoodies, T-Shirts, Long Sleeves y más.',
};

export default async function ShopPage() {
  let products: any[] = MOCK_PRODUCTS;
  let categories: any[] = MOCK_CATEGORIES;
  let isUsingMockData = true;

  try {
    const result = await fetchProducts(24);
    const fetched = result.edges.map((e) => e.node);
    if (fetched.length > 0) {
      products = fetched;
      isUsingMockData = false;
    }
  } catch {
    // use mock data
  }

  try {
    const fetched = await fetchCategories();
    if (fetched.length > 0) categories = fetched;
  } catch {
    // use mock data
  }

  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider mb-4">Shop</h1>

        {/* Category filter chips */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Link
              href="/shop"
              className="px-4 py-2 text-xs font-display uppercase tracking-wider border border-gewalt-border hover:border-gewalt-primary hover:text-gewalt-primary transition-colors"
            >
              Todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className="px-4 py-2 text-xs font-display uppercase tracking-wider border border-gewalt-border hover:border-gewalt-primary hover:text-gewalt-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {isUsingMockData && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 text-sm">
          ⚠️ Modo demo — Conecta Saleor para ver productos reales
        </div>
      )}

      <ProductGrid products={products} />
    </div>
  );
}
