import Link from 'next/link';
import { buildWhatsAppContact } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gewalt-border">
      <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-serif italic text-xl text-green-800">Gewalt</span>
            <p className="text-gewalt-text-muted text-sm leading-relaxed mt-4 max-w-[280px]">
              Ropa urbana para quienes viven la calle. Calidad premium, precios justos, envíos a todo Ecuador.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text-muted mb-4">
              Navegación
            </h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/shop" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Shop</Link></li>
              <li><Link href="/drops" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Drops</Link></li>
              <li><Link href="/about" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Manifiesto</Link></li>
              <li><Link href="/help/faq" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">FAQ</Link></li>
              <li><Link href="/help/shipping" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Envíos</Link></li>
              <li><Link href="/help/size-guide" className="text-gewalt-text-muted hover:text-green-700 transition-colors font-light">Guía de Tallas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text-muted mb-4">
              Contacto
            </h4>
            <ul className="space-y-1 text-sm">
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
              <li className="pt-1">
                <a
                  href={buildWhatsAppContact()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:text-green-800 transition-colors font-light"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-[0.6875rem] font-semibold tracking-[0.15em] uppercase text-gewalt-text-muted mb-4">
              Síguenos
            </h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/gewalt.oficial?igsh=NzF4ajMwdzZtOGo5" target="_blank" rel="noopener noreferrer" className="text-gewalt-text-muted hover:text-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@gewalt.oficial?_r=1&_t=ZS-98dheoktQ9M" target="_blank" rel="noopener noreferrer" className="text-gewalt-text-muted hover:text-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tiktok"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gewalt-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gewalt-text-muted font-light">
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
