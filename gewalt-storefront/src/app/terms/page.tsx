import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — GEWALT',
};

export default function TermsPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16">
      <h1 className="font-display text-3xl uppercase tracking-wider mb-8">Términos y Condiciones</h1>
      <div className="prose prose-sm max-w-none text-gewalt-text-muted space-y-6">
        <p>
          Al realizar una compra en GEWALT, aceptas los siguientes términos y condiciones.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Pedidos</h2>
        <p>
          Los pedidos se realizan a través de WhatsApp. El pago se realiza contra entrega en 
          la dirección de envío.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Envíos</h2>
        <p>
          Realizamos envíos a todo Ecuador. Los tiempos de entrega varían según la ubicación. 
          El costo de envío se confirma al momento del pedido.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Devoluciones</h2>
        <p>
          Aceptamos devoluciones dentro de los primeros 7 días posteriores a la entrega, 
          siempre que el producto esté en perfectas condiciones.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Contacto</h2>
        <p>
          Para preguntas sobre estos términos, contáctanos al +593 98 531 6484 o 
          info@gewalt.com.
        </p>
      </div>
    </div>
  );
}
