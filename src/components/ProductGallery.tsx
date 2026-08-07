'use client';
import { useState } from 'react';
import Image from 'next/image';
import { resolveProductImage } from '@/lib/product-images';

interface ProductGalleryProps {
  images: Array<{ url: string; alt?: string }>;
  productName: string;
  productSlug?: string;
}

export default function ProductGallery({ images, productName, productSlug = '' }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    const fallbackUrl = resolveProductImage(null, productSlug);
    return (
      <div className="relative aspect-[3/4] bg-[#F5F5F3]">
        <Image
          src={fallbackUrl}
          alt={productName}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
          unoptimized={fallbackUrl.startsWith('http')}
        />
      </div>
    );
  }

  const activeImage = images[activeIndex];
  const activeUrl = resolveProductImage(activeImage?.url, productSlug);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] bg-[#F5F5F3]">
        <Image
          src={activeUrl}
          alt={activeImage?.alt || productName}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
          unoptimized={activeUrl.startsWith('http')}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => {
            const thumbUrl = resolveProductImage(img.url, productSlug);
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={"relative w-20 h-20 flex-shrink-0 bg-[#F5F5F3] border-2 transition-all " + (activeIndex === i ? 'border-gewalt-primary' : 'border-transparent hover:border-gewalt-border')}
              >
                <Image
                  src={thumbUrl}
                  alt={img.alt || productName + " " + (i + 1)}
                  fill
                  sizes="80px"
                  className="object-cover"
                  unoptimized={thumbUrl.startsWith('http')}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
