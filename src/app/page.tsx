
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
  } catch {}

  return (
    <>
      {/* HERO — editorial full height */}
      <section className="relative w-full h-[95vh] min-h-[600px] flex items-end overflow-hidden bg-[#111]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
        <video className="absolute inset-0 z-0 w-full h-full object-cover opacity-80" autoPlay muted loop playsInline preload="metadata">
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 w-full px-6 lg:px-16 pb-16 lg:pb-24">
          <div className="max-w-2xl">
            <p className="text-white/60 text-[0.65rem] font-display tracking-[0.3em] uppercase mb-4">GEWALT Studios — Quito, Ecuador</p>
            <h1 className="font-serif italic text-[clamp(3.5rem,8vw,7rem)] leading-[0.88] text-white mb-8">
              Nueva<br />Coleccion
            </h1>
            <div className="flex items-center gap-6">
              <Link href="/shop" className="inline-flex items-center gap-3 bg-white text-[#111] px-8 py-3.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-gewalt-primary hover:text-white transition-all duration-300">
                Ver Coleccion
              </Link>
              <Link href="/about" className="text-white/70 font-display text-[0.7rem] uppercase tracking-[0.2em] hover:text-white transition-colors border-b border-white/30 pb-0.5">
                Nuestra Historia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <div className="border-b border-gewalt-border">
        <div className="max-w-site mx-auto px-6 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-4">
          {['Envios a nivel global', 'Pago seguro por adelantado', '30 dias de cambio', 'Calidad premium'].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-gewalt-primary" />
              <span className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-gewalt-text-muted">{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCTOS DESTACADOS */}
      <section className="max-w-site mx-auto px-6 lg:px-16 pt-20 pb-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-display text-[0.65rem] tracking-[0.25em] uppercase text-gewalt-text-muted mb-2">Coleccion 2026</p>
            <h2 className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-gewalt-text leading-none">Lo mas buscado</h2>
          </div>
          <Link href="/shop" className="font-display text-[0.7rem] uppercase tracking-[0.18em] text-gewalt-primary border-b border-gewalt-primary pb-0.5 hover:text-gewalt-primary/70 transition-colors hidden md:block">
            Ver todo
          </Link>
        </div>
        <ProductGrid products={products} />
        <div className="mt-10 text-center md:hidden">
          <Link href="/shop" className="font-display text-[0.7rem] uppercase tracking-[0.18em] text-gewalt-primary border-b border-gewalt-primary pb-0.5">Ver todo</Link>
        </div>
      </section>

      {/* CATEGORIAS — grid editorial */}
      <section className="max-w-site mx-auto px-6 lg:px-16 py-20">
        <p className="font-display text-[0.65rem] tracking-[0.25em] uppercase text-gewalt-text-muted mb-8">Explora por categoria</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: 'Hoodies', slug: 'hoodies', img: '/models-black-nazi.webp', desc: 'Oversized. Warm. Essential.' },
            { name: 'T-Shirts', slug: 't-shirts', img: '/models-shirts.webp', desc: 'Born in Quito. 2024.' },
            { name: 'Long Sleeves', slug: 'long-sleeves', img: '/models-LongSleeve.webp', desc: 'Always Back to Claimed.' },
          ].map((col) => (
            <Link key={col.slug} href={"/shop/" + col.slug} className="relative aspect-[3/4] overflow-hidden group block bg-[#F5F5F3]">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage:"url('" + col.img + "')"}} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-[0.6rem] tracking-[0.25em] uppercase text-white/60 mb-1">{col.desc}</p>
                <h3 className="font-display text-xl font-bold tracking-[0.08em] uppercase text-white">{col.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh] border-t border-gewalt-border">
        <div className="relative min-h-[50vw] lg:min-h-0 bg-cover bg-center bg-[#111]" style={{backgroundImage:"url('/All-models.webp')"}} />
        <div className="flex flex-col justify-center px-8 lg:px-20 py-20 bg-gewalt-surface-alt">
          <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-gewalt-text-muted mb-6">Quito, Ecuador — 2024</p>
          <h2 className="font-serif italic text-[clamp(2.2rem,4vw,3.5rem)] leading-[0.95] text-gewalt-text mb-6">
            Ropa para<br />quienes viven<br />la calle
          </h2>
          <p className="font-body text-sm font-light text-gewalt-text-muted leading-relaxed max-w-xs mb-10">
            GEWALT nace de la cultura urbana de Quito. Disenos que no piden permiso, tejidos que resisten.
          </p>
          <Link href="/about" className="inline-flex items-center gap-3 w-fit border border-gewalt-primary text-gewalt-primary px-8 py-3.5 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-gewalt-primary hover:text-white transition-all duration-300">
            Conocer mas
          </Link>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="bg-gewalt-primary py-10 px-8">
        <div className="max-w-site mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-display text-[0.65rem] tracking-[0.3em] uppercase text-green-300 mb-3">Atencion directa</p>
            <h3 className="font-serif italic text-[clamp(1.8rem,3.5vw,3rem)] text-white leading-tight">
              Compra directo<br />por WhatsApp
            </h3>
          </div>
          <a href={buildWhatsAppContact('Hola, quiero comprar en GEWALT')} target="_blank" rel="noopener noreferrer"
            className="bg-white text-gewalt-primary px-10 py-4 font-display text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-green-50 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2">
            Escribinos ahora →
          </a>
        </div>
      </section>
    </>
  );
}
