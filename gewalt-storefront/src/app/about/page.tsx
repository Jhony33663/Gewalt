import type { Metadata } from 'next';
import { buildWhatsAppContact } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Manifiesto',
  description: 'La historia de GEWALT — streetwear con actitud.',
};

export default function AboutPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <div className="max-w-3xl">
        <span className="inline-block px-4 py-1.5 bg-gewalt-primary text-white text-[0.6875rem] font-semibold tracking-[0.15em] uppercase mb-6">
          La Marca
        </span>
        <h1 className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] text-gewalt-text mb-8">
          Ropa para quienes viven la calle
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mt-12">
        <div className="space-y-8 text-gewalt-text-muted text-lg leading-relaxed">
          <p>
            GEWALT nace de la cultura urbana ecuatoriana. No pedimos permiso, no esperamos turno.
            Diseñamos prendas que hablan por ti — sin explicaciones.
          </p>
          <p>
            Cada colección es una declaración. Cada drop es un capítulo.
            No seguimos tendencias, las creamos.
          </p>
          <p>
            Trabajamos con algodón premium, fits oversized y producción limitada.
            Cuando una pieza se va, se va.
          </p>
          <p className="font-display text-gewalt-primary uppercase tracking-wider text-base pt-4">
            Sin miedo. Sin límites. GEWALT.
          </p>
        </div>

        <div className="bg-gewalt-surface-alt aspect-[4/5] rounded-sm flex items-center justify-center">
          <div className="text-center p-8">
            <span className="font-display text-6xl text-gewalt-text-muted/30">Estilo</span>
            <p className="text-gewalt-text-muted text-sm mt-4">Imagen editorial</p>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-gewalt-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-gewalt-text mb-2">Calidad</h3>
            <p className="text-gewalt-text-muted text-sm">Algodón peinado 220gsm. Costuras reforzadas.</p>
          </div>
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-gewalt-text mb-2">Fit</h3>
            <p className="text-gewalt-text-muted text-sm">Diseños oversized con actitud urbana.</p>
          </div>
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-gewalt-text mb-2">Envíos</h3>
            <p className="text-gewalt-text-muted text-sm">Todo Ecuador. Pago contra entrega.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <a
          href={buildWhatsAppContact('Hola, quiero más info sobre GEWALT')}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          Contactar →
        </a>
        <a href="/shop" className="btn-outline">Ver colección →</a>
      </div>
    </div>
  );
}
