import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'GEWALT — Streetwear', template: '%s | GEWALT' },
  description: 'GEWALT — Streetwear con actitud. Disenado en Ecuador.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/gewalt-logo.png',
    shortcut: '/gewalt-logo.png',
    apple: '/gewalt-logo.png',
  },
  openGraph: {
    title: 'GEWALT — Streetwear',
    description: 'Streetwear con actitud. Disenado en Ecuador.',
    type: 'website',
  },
};

import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
