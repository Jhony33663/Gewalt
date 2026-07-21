'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { resolveProductImage } from '@/lib/product-images';

interface ProductCardProps {
  name: string;
  slug: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  hoverThumbnail?: string;
  price?: number;
  currency?: string;
  tag?: string;
}

export default function ProductCard({
  name,
  slug,
  thumbnail,
  thumbnailAlt,
  hoverThumbnail,
  price,
  currency = '$',
  tag,
}: ProductCardProps) {
  const img = resolveProductImage(thumbnail, slug);
  const hoverImg = hoverThumbnail ? resolveProductImage(hoverThumbnail, slug) : null;
  const isExternal = img.startsWith('http');
  const isHoverExternal = hoverImg ? hoverImg.startsWith('http') : false;

  return (
    <Link href={`/product/${slug}`} className="group block">
      <motion.div
        className="product-card__image relative aspect-[3/4] overflow-hidden bg-gewalt-surface-alt"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {thumbnail ? (
          <>
            <Image
              src={img}
              alt={thumbnailAlt || name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                hoverImg ? 'group-hover:opacity-0' : ''
              }`}
              unoptimized={!isExternal}
            />
            {hoverImg && (
              <Image
                src={hoverImg}
                alt={thumbnailAlt || `${name} hover`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                unoptimized={!isHoverExternal}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gewalt-text-muted text-sm aspect-[3/4]">
            Sin imagen
          </div>
        )}
        {tag && (
          <span className="absolute top-2 left-2 px-3 py-1 bg-gewalt-primary text-white text-[0.625rem] font-semibold tracking-[0.15em] uppercase z-10">
            {tag}
          </span>
        )}
      </motion.div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-display font-semibold tracking-wide text-gewalt-text group-hover:text-gewalt-primary transition-colors duration-200">
          {name}
        </h3>
        {price !== undefined && (
          <p className="text-sm text-gewalt-text-muted font-light">
            {currency}{price.toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
}
