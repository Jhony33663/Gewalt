import type { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';
import { fetchCollections } from '@/lib/saleor';

export const metadata: Metadata = {
  title: 'Drops',
  description: 'Colecciones limitadas y drops exclusivos — GEWALT.',
};

export default async function DropsPage() {
  let collections: any[] = [];
  try {
    collections = await fetchCollections();
  } catch {
    // fallback
  }

  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-wider mb-4">Drops</h1>
        <p className="text-gewalt-text-muted max-w-lg">
          Colecciones limitadas. Cuando se van, se van.
        </p>
      </div>

      {collections.length > 0 ? (
        <div className="space-y-20">
          {collections.map((col) => (
            <CollectionDrop key={col.id} collection={col} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-gewalt-border border-dashed">
          <p className="text-gewalt-text-muted font-display text-lg">Próximamente</p>
        </div>
      )}
    </div>
  );
}

async function CollectionDrop({ collection }: { collection: any }) {
  // Fetch products for this collection
  return (
    <section>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-2xl uppercase tracking-wider">{collection.name}</h2>
        {collection.description && (
          <p className="text-gewalt-text-muted text-sm max-w-md">{collection.description}</p>
        )}
      </div>
      <div className="border border-gewalt-border p-8 text-center bg-gewalt-surface-alt">
        <p className="text-gewalt-text-muted font-display text-lg">
          Colección "{collection.name}"
        </p>
        <p className="text-gewalt-text-muted text-sm mt-2">
          Próximamente los productos de este drop.
        </p>
      </div>
    </section>
  );
}
