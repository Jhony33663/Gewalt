'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { resolveProductImage } from '@/lib/product-images';

interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail?: { url: string; alt: string } | null;
  pricing?: {
    priceRange?: {
      start?: {
        gross?: { amount: number; currency: string };
      };
    };
  };
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gewalt-text-muted font-display text-lg">No hay productos disponibles todavía.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
          }}
        >
          <ProductCard
            name={product.name}
            slug={product.slug}
            thumbnail={resolveProductImage(product.thumbnail?.url, product.slug)}
            thumbnailAlt={product.thumbnail?.alt}
            price={product.pricing?.priceRange?.start?.gross?.amount}
            currency={product.pricing?.priceRange?.start?.gross?.currency === 'USD' ? '$' : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
