import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad — GEWALT',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16">
      <h1 className="font-display text-3xl uppercase tracking-wider mb-8">Política de Privacidad</h1>
      <div className="prose prose-sm max-w-none text-gewalt-text-muted space-y-6">
        <p>
          En GEWALT valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos, 
          usamos y protegemos tu información personal cuando visitas nuestro sitio web y realizas 
          compras.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Información que Recopilamos</h2>
        <p>
          Cuando realizas una compra a través de WhatsApp, podemos recopilar: nombre, número de 
          teléfono, dirección de envío, y correo electrónico.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Uso de la Información</h2>
        <p>
          Utilizamos tu información para procesar pedidos, enviarte actualizaciones sobre tu compra, 
          y mejorar nuestro servicio.
        </p>
        <h2 className="font-display text-xl uppercase tracking-wider text-gewalt-text">Contacto</h2>
        <p>
          Para preguntas sobre esta política, contáctanos al +593 98 531 6484 o 
          info@gewalt.com.
        </p>
      </div>
    </div>
  );
}
