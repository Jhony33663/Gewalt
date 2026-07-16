'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, MessageCircle } from 'lucide-react';
import { buildWhatsAppContact } from '@/lib/whatsapp';
import SearchOverlay from './SearchOverlay';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Drops', href: '/drops' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Promo bar */}
      <div className="announcement-bar overflow-hidden">
        <div className="promo-marquee">
          <span className="promo-marquee__inner">
            Envíos a todo Ecuador · Pago contra entrega · 30 días de cambio
            &nbsp;&nbsp;·&nbsp;&nbsp;
            Envíos a todo Ecuador · Pago contra entrega · 30 días de cambio
            &nbsp;&nbsp;·&nbsp;&nbsp;
            Envíos a todo Ecuador · Pago contra entrega · 30 días de cambio
            &nbsp;&nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-gewalt-surface/92 backdrop-blur-md border-b border-gewalt-border">
        <div className="max-w-site mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gewalt-logo.png"
              alt="GEWALT"
              className="h-8 w-auto"
              width={120}
              height={32}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-display uppercase tracking-wider text-gewalt-text hover:text-gewalt-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gewalt-text hover:text-gewalt-primary transition-colors"
              aria-label="Buscar"
            >
              <Search size={22} />
            </button>
            <a
              href={buildWhatsAppContact()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gewalt-text hover:text-[#25D366] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={22} />
            </a>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gewalt-border bg-gewalt-surface">
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-sm font-display uppercase tracking-wider text-gewalt-text hover:text-gewalt-primary border-b border-gewalt-border"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppContact()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-sm font-display uppercase tracking-wider text-[#25D366]"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        )}
      </header>
      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
