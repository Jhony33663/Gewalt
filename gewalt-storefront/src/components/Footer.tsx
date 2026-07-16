import Link from 'next/link';
import { buildWhatsAppContact } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

const SHOP_LINKS = [
  { label: 'Todos', href: '/shop' },
  { label: 'Hoodies', href: '/shop/hoodies' },
  { label: 'T-Shirts', href: '/shop/t-shirts' },
  { label: 'Long Sleeves', href: '/shop/long-sleeves' },
];

const HELP_LINKS = [
  { label: 'Preguntas Frecuentes', href: '/help/faq' },
  { label: 'Envíos', href: '/help/shipping' },
  { label: 'Guía de Tallas', href: '/help/size-guide' },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gewalt-border bg-gewalt-surface">
      <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {/* Newsletter / CTA */}
        <div className="mb-16 pb-12 border-b border-gewalt-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif italic text-[clamp(1.5rem,2.5vw,2rem)] text-gewalt-text mb-2">
                Sumate a la familia
              </h3>
              <p className="text-gewalt-text-muted text-sm">
                Enterate de nuevos drops, descuentos y contenido exclusivo.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gewalt-surface-alt border border-gewalt-border rounded-sm text-sm outline-none focus:border-gewalt-primary transition-colors"
              />
              <button className="px-6 py-3 bg-gewalt-primary text-white font-display text-sm uppercase tracking-wider hover:bg-gewalt-primary/90 transition-colors rounded-sm">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Shop */}
          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text mb-4">
              Ayuda
            </h4>
            <ul className="space-y-2 text-sm">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marca */}
          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text mb-4">
              Marca
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Manifiesto</Link></li>
              <li><Link href="/contact" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Contacto</Link></li>
              <li><Link href="/drops" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Drops</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@gewalt.com" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">
                  info@gewalt.com
                </a>
              </li>
              <li>
                <a href="tel:+593985316484" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">
                  +593 98 531 6484
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={buildWhatsAppContact()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 transition-colors font-light"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-12 pt-8 border-t border-gewalt-border flex flex-wrap gap-6 justify-center text-xs text-gewalt-text-muted">
          <span className="flex items-center gap-2"> Envíos a todo Ecuador</span>
          <span className="flex items-center gap-2"> Pago contra entrega</span>
          <span className="flex items-center gap-2"> 30 días de cambio</span>
          <span className="flex items-center gap-2"> Compra 100% segura</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gewalt-text-muted font-light">
          <p>© {new Date().getFullYear()} GEWALT. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-green-700 transition-colors">Política de privacidad</Link>
            <Link href="/terms" className="hover:text-green-700 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
