import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-20 lg:py-32 text-center">
      <h1 className="font-display text-6xl md:text-8xl uppercase tracking-wider mb-4">404</h1>
      <p className="text-gewalt-text-muted text-lg mb-8">Esta página no existe.</p>
      <Link
        href="/"
        className="inline-block border border-gewalt-text text-gewalt-text px-8 py-3 text-sm font-display uppercase tracking-wider hover:bg-gewalt-text hover:text-gewalt-surface transition-all duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
