'use client';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { resolveProductImage } from '@/lib/product-images';

interface Product {
  id: string; name: string; slug: string;
  thumbnail?: { url: string; alt: string } | null;
  media?: Array<{ url: string; alt?: string }> | null;
  pricing?: { priceRange?: { start?: { gross?: { amount: number; currency: string } } } };
}

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="font-display text-[0.7rem] tracking-[0.25em] uppercase text-gewalt-text-muted">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-10 lg:gap-x-5 lg:gap-y-14"
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
      {products.map((product, i) => {
        const primaryImage = product.media && product.media.length > 0 ? product.media[0].url : product.thumbnail?.url;
        const hoverImage = product.media && product.media.length > 1 ? product.media[1].url : undefined;
        const resolvedImage = resolveProductImage(primaryImage, product.slug);
        const resolvedHoverImage = hoverImage ? resolveProductImage(hoverImage, product.slug) : undefined;
        const tag = i === 0 ? 'New In' : undefined;
        return (
          <motion.div key={product.id}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}>
            <ProductCard
              name={product.name} slug={product.slug} tag={tag}
              thumbnail={resolvedImage}
              thumbnailAlt={product.thumbnail?.alt || product.name}
              hoverThumbnail={resolvedHoverImage}
              price={product.pricing?.priceRange?.start?.gross?.amount}
              currency={product.pricing?.priceRange?.start?.gross?.currency === 'USD' ? '$' : undefined}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
