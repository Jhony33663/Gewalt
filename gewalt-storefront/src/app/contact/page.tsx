import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppContact } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctanos — GEWALT streetwear.',
};

export default function ContactPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-12">
        Contacto
      </h1>

      <div className="max-w-lg space-y-10">
        <div>
          <h2 className="font-display text-sm uppercase tracking-wider text-gewalt-text-muted mb-3">
            Email
          </h2>
          <a href="mailto:info@gewalt.com" className="text-lg hover:text-gewalt-primary transition-colors">
            info@gewalt.com
          </a>
        </div>

        <div>
          <h2 className="font-display text-sm uppercase tracking-wider text-gewalt-text-muted mb-3">
            Teléfono
          </h2>
          <a href="tel:+593985316484" className="text-lg hover:text-gewalt-primary transition-colors">
            +593 98 531 6484
          </a>
        </div>

        <div>
          <h2 className="font-display text-sm uppercase tracking-wider text-gewalt-text-muted mb-3">
            WhatsApp
          </h2>
          <a
            href={buildWhatsAppContact()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20BD5B] text-lg transition-colors"
          >
            <MessageCircle size={20} />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
