import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/lib/saleor';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { buildWhatsAppContact } from '@/lib/whatsapp';

export default async function HomePage() {
  let products: any[] = MOCK_PRODUCTS;

  try {
    const result = await fetchProducts(8);
    const fetched = result.edges.map((e) => e.node);
    if (fetched.length > 0) products = fetched;
  } catch {
    // use mock data
  }

  return (
    <>
      {/* Hero — DARK editorial (Direction 2) */}
      <section className="relative w-full h-[92vh] min-h-[580px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gewalt-surface-alt" />
        <div className="relative z-10 p-8 lg:p-16 max-w-[750px]">
          <span className="inline-block px-4 py-1.5 bg-gewalt-primary text-white text-[0.6875rem] font-semibold tracking-[0.15em] uppercase mb-6">
            Nueva Colección — 2026
          </span>
          <h1 className="font-serif italic text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-white mb-6">
            Para los días<br />más fríos
          </h1>
          <p className="font-body text-[1.0625rem] font-light text-[#8A8780] max-w-[420px] leading-relaxed mb-8">
            Diseños que no piden permiso. Ropa para quienes viven la calle con estilo propio.
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-gewalt-primary text-white px-10 py-4 font-display text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-white hover:text-gewalt-primary hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            Explorar Colección →
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <div className="flex items-center gap-10 py-6 px-8 border-y border-gewalt-border overflow-hidden whitespace-nowrap">
        {['Envíos a todo Ecuador', 'Pago contra entrega', '30 días de cambio', 'Calidad premium'].map((text, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-[0.6875rem] font-medium tracking-[0.2em] uppercase text-gewalt-text-muted">{text}</span>
            <span className="w-1 h-1 rounded-full bg-green-600 shrink-0" />
          </span>
        ))}
        {['Envíos a todo Ecuador', 'Pago contra entrega', '30 días de cambio', 'Calidad premium'].map((text, i) => (
          <span key={`dup-${i}`} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-[0.6875rem] font-medium tracking-[0.2em] uppercase text-gewalt-text-muted">{text}</span>
            <span className="w-1 h-1 rounded-full bg-green-600 shrink-0" />
          </span>
        ))}
      </div>

      {/* Collection strip (from Direction 2) */}
      <div className="flex items-baseline justify-between px-6 lg:px-16 pt-24 pb-6">
        <h2 className="font-serif italic text-[clamp(1.75rem,3.5vw,2.75rem)] text-gewalt-text">
          Colecciones
        </h2>
        <Link href="/shop" className="font-body text-sm text-green-700 uppercase tracking-wider font-medium border-b border-green-200 pb-0.5 hover:text-green-800 hover:border-green-800 transition-all">
          Ver todas
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 px-6 lg:px-16 mb-24">
        {[
          { name: 'Hoodies', slug: 'hoodies', sub: 'Para los días más fríos' },
          { name: 'Tees', slug: 't-shirts', sub: 'Lo que llevas todos los días' },
          { name: 'Abrigos', slug: 'long-sleeves', sub: 'Para el frío de verdad' },
        ].map((col) => (
          <Link
            key={col.slug}
            href={`/shop/${col.slug}`}
            className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gewalt-surface-alt transition-all duration-500 group-hover:brightness-[0.45] group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-all duration-500" />
            <div className="absolute bottom-6 left-6 z-10">
              <h3 className="font-condensed text-3xl tracking-[0.1em] uppercase text-white mb-1">
                {col.name}
              </h3>
              <span className="font-body text-xs font-light text-[#8A8780] tracking-wide">
                {col.sub}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured products */}
      <div className="flex items-baseline justify-between px-6 lg:px-16 pb-6">
        <h2 className="font-serif italic text-[clamp(1.75rem,3.5vw,2.75rem)] text-gewalt-text">
          Lo más buscado
        </h2>
        <Link href="/shop" className="font-body text-sm text-green-700 uppercase tracking-wider font-medium border-b border-green-200 pb-0.5 hover:text-green-800 hover:border-green-800 transition-all">
          Ver todo
        </Link>
      </div>
      <div className="px-6 lg:px-16 pb-24">
        <ProductGrid products={products} />
      </div>

      {/* Editorial split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="bg-gewalt-surface-alt flex items-center justify-center text-gewalt-text-muted text-sm">
          Foto editorial
        </div>
        <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24 bg-green-50">
          <p className="font-body text-[0.6875rem] font-semibold tracking-[0.2em] uppercase text-green-600 mb-6">
            La marca
          </p>
          <h2 className="font-serif italic text-[clamp(2rem,4vw,3.5rem)] leading-none text-green-900 mb-6">
            Ropa para quienes viven la calle
          </h2>
          <p className="font-body text-base font-light text-gewalt-text-muted leading-relaxed max-w-[400px] mb-8">
            GEWALT nace de la cultura urbana. Diseños que no piden permiso, tejidos que resisten, y precios que no te complican.
          </p>
          <Link href="/about" className="btn-outline">
            Conocer más →
          </Link>
        </div>
      </section>

      {/* WhatsApp CTA band */}
      <section className="whatsapp-band">
        <div>
          <h3 className="font-serif italic text-[clamp(1.5rem,3vw,2.5rem)] text-white mb-2">
            Comprar directo por WhatsApp
          </h3>
          <p className="font-body text-sm font-light text-green-200">
            Elige tu prenda, elige tu talla, y escríbenos. Te atendemos al instante.
          </p>
        </div>
        <a
          href={buildWhatsAppContact('Hola, quiero comprar en GEWALT')}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-gewalt-primary px-10 py-4 font-display text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-green-100 hover:translate-y-[-2px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] whitespace-nowrap shrink-0 inline-flex items-center"
        >
          Escribinos →
        </a>
      </section>
    </>
  );
}
