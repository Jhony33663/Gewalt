import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manifiesto',
  description: 'La historia de GEWALT — streetwear con actitud.',
};

export default function AboutPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-12">
        Manifiesto
      </h1>
      <div className="max-w-2xl space-y-8 text-gewalt-text-muted text-lg leading-relaxed">
        <p>
          GEWALT nace de la calle. No pedimos permiso, no esperamos turno.
          Diseñamos prendas que hablan por ti — sin explicaciones.
        </p>
        <p>
          Cada pieza es una declaración. Cada drop es un capítulo.
          No seguimos tendencias, las creamos.
        </p>
        <p className="font-display text-gewalt-text uppercase tracking-wider">
          Sin miedo. Sin límites. GEWALT.
        </p>
      </div>
    </div>
  );
}
