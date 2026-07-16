export default function Loading() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-8 lg:py-16">
      <div className="animate-pulse">
        <div className="mb-8 h-4 bg-gewalt-surface-alt rounded w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="aspect-[3/4] bg-gewalt-surface-alt rounded" />
          <div className="space-y-4">
            <div className="h-8 bg-gewalt-surface-alt rounded w-3/4" />
            <div className="h-6 bg-gewalt-surface-alt rounded w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gewalt-surface-alt rounded w-full" />
              <div className="h-4 bg-gewalt-surface-alt rounded w-5/6" />
            </div>
            <div className="h-12 bg-gewalt-surface-alt rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
