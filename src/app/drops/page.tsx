import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drops',
  description: 'Colecciones limitadas y drops exclusivos — GEWALT.',
};

export default function DropsPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider mb-6">Drops</h1>
      <p className="text-gewalt-text-muted max-w-lg mb-12">
        Colecciones limitadas. Cuando se van, se van.
      </p>
      <div className="text-center py-20 border border-gewalt-border border-dashed">
        <p className="text-gewalt-text-muted font-display text-lg">Próximamente</p>
      </div>
    </div>
  );
}
