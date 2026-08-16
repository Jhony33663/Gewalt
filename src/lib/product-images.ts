// ponytail: uses official GEWALT product images, rotating by slug hash
// swap for Saleor Product.media mapping when real assets arrive
const GEWALT_IMAGES = [
  '/product-max-1.jpg',
  '/product-max-2.jpg',
  '/product-max-3.jpg',
  '/product-max-4.jpg',
  '/product-max-5.jpg',
];

function pickBySlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return GEWALT_IMAGES[hash % GEWALT_IMAGES.length];
}

export function resolveProductImage(url: string | null | undefined, slug: string): string {
  if (url && typeof url === 'string' && url.trim() !== '') {
    if (url.includes('/media/')) {
      const mediaPath = '/media/' + url.split('/media/')[1];
      const mediaHost = process.env.NEXT_PUBLIC_MEDIA_URL || '';
      return `${mediaHost}${mediaPath}`;
    }
    return url;
  }
  return pickBySlug(slug);
}
