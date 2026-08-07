'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';
import { buildWhatsAppContact } from '@/lib/whatsapp';
import SearchOverlay from './SearchOverlay';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { label: 'New In', href: '/shop' },
  { label: 'Hoodies', href: '/shop/hoodies' },
  { label: 'T-Shirts', href: '/shop/t-shirts' },
  { label: 'Long Sleeves', href: '/shop/long-sleeves' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gewalt-primary text-white text-center py-2 px-4 font-display text-[0.6rem] tracking-[0.2em] uppercase overflow-hidden">
        <div className="inline-flex gap-12 animate-[marquee_25s_linear_infinite]">
          {['Envios a nivel global', 'Pago seguro por adelantado', '30 dias de cambio', 'Calidad premium', 'Envios a nivel global', 'Pago seguro por adelantado', '30 dias de cambio', 'Calidad premium'].map((t, i) => (
            <span key={i} className="shrink-0">{t}&nbsp;&nbsp;·</span>
          ))}
        </div>
      </div>

      <header className={"sticky top-0 z-50 transition-all duration-300 border-b " + (scrolled ? "bg-white/98 backdrop-blur-md border-gewalt-border shadow-sm" : "bg-gewalt-surface border-gewalt-border")}>
        <div className="max-w-site mx-auto px-4 lg:px-16 h-14 flex items-center justify-between">

          {/* Mobile toggle */}
          <button className="lg:hidden p-1.5 -ml-1.5 text-gewalt-text" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <img src="/gewalt-logo.png" alt="GEWALT" className="h-7 w-auto" width={110} height={28} />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="font-display text-[0.7rem] uppercase tracking-[0.15em] text-gewalt-text hover:text-gewalt-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-gewalt-text hover:text-gewalt-primary transition-colors">
              <Search size={18} />
            </button>
            <a href={buildWhatsAppContact()} target="_blank" rel="noopener noreferrer"
              className="p-2 text-gewalt-text hover:text-[#25D366] transition-colors">
              <MessageCircle size={18} />
            </a>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gewalt-text hover:text-gewalt-primary transition-colors">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gewalt-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-display">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gewalt-border bg-white">
            <nav className="flex flex-col px-6 py-6 gap-0">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className="py-4 font-display text-[0.75rem] uppercase tracking-[0.18em] text-gewalt-text border-b border-gewalt-border last:border-0 hover:text-gewalt-primary transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <a href={buildWhatsAppContact()} target="_blank" rel="noopener noreferrer"
                className="pt-6 font-display text-[0.75rem] uppercase tracking-[0.18em] text-[#25D366]">
                WhatsApp →
              </a>
            </nav>
          </div>
        )}
      </header>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
