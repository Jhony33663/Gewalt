import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envíos',
  description: 'Información de envíos — GEWALT streetwear.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-12">Envíos</h1>
      <div className="max-w-2xl space-y-6 text-gewalt-text-muted leading-relaxed">
        <p>Hacemos envíos a todo Ecuador. El tiempo de entrega depende de tu ubicación.</p>
        <p><strong className="text-gewalt-text">Guayaquil:</strong> 1-2 días hábiles</p>
        <p><strong className="text-gewalt-text">Resto del país:</strong> 3-5 días hábiles</p>
        <p>Pago contra entrega disponible. Consulta por transferencia bancaria para envíos fuera de la costa.</p>
      </div>
    </div>
  );
}
