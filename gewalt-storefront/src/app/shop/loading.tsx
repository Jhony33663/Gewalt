export default function Loading() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-12 lg:py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gewalt-surface-alt rounded w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] bg-gewalt-surface-alt rounded" />
              <div className="h-4 bg-gewalt-surface-alt rounded w-3/4" />
              <div className="h-3 bg-gewalt-surface-alt rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
