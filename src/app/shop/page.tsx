import type { Metadata } from 'next';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts, fetchCategories } from '@/lib/saleor';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Shop — GEWALT',
  description: 'Explora la coleccion GEWALT — Hoodies, T-Shirts, Long Sleeves y mas.',
};

export default async function ShopPage() {
  let products: any[] = MOCK_PRODUCTS;
  let categories: any[] = MOCK_CATEGORIES;

  try {
    const result = await fetchProducts(24);
    const fetched = result.edges.map((e) => e.node);
    if (fetched.length > 0) products = fetched;
  } catch {}

  try {
    const fetched = await fetchCategories();
    if (fetched.length > 0) categories = fetched;
  } catch {}

  return (
    <div className="min-h-screen">
      {/* Shop header */}
      <div className="border-b border-gewalt-border">
        <div className="max-w-site mx-auto px-6 lg:px-16 py-12">
          <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-gewalt-text-muted mb-2">GEWALT Studios</p>
          <h1 className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] text-gewalt-text leading-none mb-8">Coleccion</h1>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <Link href="/shop"
              className="px-5 py-2 text-[0.65rem] font-display uppercase tracking-[0.18em] bg-gewalt-primary text-white transition-colors">
              Todos
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} href={"/shop/" + cat.slug}
                className="px-5 py-2 text-[0.65rem] font-display uppercase tracking-[0.18em] border border-gewalt-border text-gewalt-text-muted hover:border-gewalt-primary hover:text-gewalt-primary transition-colors">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product count + sort */}
      <div className="max-w-site mx-auto px-6 lg:px-16 py-5 flex items-center justify-between border-b border-gewalt-border">
        <p className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-gewalt-text-muted">
          {products.length} productos
        </p>
        <p className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-gewalt-text-muted">
          Coleccion 2026
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-site mx-auto px-6 lg:px-16 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
