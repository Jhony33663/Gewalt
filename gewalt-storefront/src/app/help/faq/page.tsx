import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description: 'FAQ — GEWALT streetwear.',
};

export default function FAQPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-12">FAQ</h1>
      <div className="max-w-2xl space-y-8">
        <div>
          <h2 className="font-display text-lg uppercase tracking-wider mb-2">¿Cómo compro?</h2>
          <p className="text-gewalt-text-muted">Selecciona tu producto y talla, y escríbenos por WhatsApp. Te atendemos al instante.</p>
        </div>
        <div>
          <h2 className="font-display text-lg uppercase tracking-wider mb-2">¿Aceptan tarjeta?</h2>
          <p className="text-gewalt-text-muted">Por ahora manejamos pago contra entrega y transferencia bancaria.</p>
        </div>
        <div>
          <h2 className="font-display text-lg uppercase tracking-wider mb-2">¿Hacen envíos?</h2>
          <p className="text-gewalt-text-muted">Sí, enviamos a todo Ecuador.</p>
        </div>
      </div>
    </div>
  );
}
