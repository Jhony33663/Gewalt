import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans, Instrument_Serif, Bebas_Neue } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-condensed',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'GEWALT — Streetwear',
    template: '%s | GEWALT',
  },
  description: 'GEWALT — Streetwear con actitud. Diseñado en Ecuador.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'GEWALT — Streetwear',
    description: 'Streetwear con actitud. Diseñado en Ecuador.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${dmSans.variable} ${instrumentSerif.variable} ${bebasNeue.variable}`}>
      <body>
        <Header />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
