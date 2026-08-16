'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { resolveProductImage } from '@/lib/product-images';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  name: string; slug: string; thumbnail?: string; thumbnailAlt?: string;
  hoverThumbnail?: string; price?: number; currency?: string; tag?: string;
}

export default function ProductCard({ name, slug, thumbnail, thumbnailAlt, hoverThumbnail, price, currency = '$', tag }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [quickAdd, setQuickAdd] = useState(false);
  const { addItem } = useCart();
  const img = resolveProductImage(thumbnail, slug);
  const hoverImg = hoverThumbnail ? resolveProductImage(hoverThumbnail, slug) : null;
  const isExternal = img.startsWith('http');
  const isHoverExternal = hoverImg ? hoverImg.startsWith('http') : false;
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: slug,
      name,
      slug,
      size,
      price: price || 0,
      currency,
      quantity: 1,
      imageUrl: img,
    });
    setQuickAdd(false);
  };

  return (
    <div className="group relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setQuickAdd(false); }}>
      <Link href={"/product/" + slug} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
          {thumbnail ? (
            <>
              <Image src={img} alt={thumbnailAlt || name} fill sizes="(max-width: 640px) 50vw, 33vw" className={"object-cover transition-opacity duration-500 " + (hovered && hoverImg ? 'opacity-0' : 'opacity-100')} unoptimized={isExternal} />
              {hoverImg && <Image src={hoverImg} alt={name} fill sizes="(max-width: 640px) 50vw, 33vw" className={"object-cover absolute inset-0 transition-opacity duration-500 " + (hovered ? 'opacity-100' : 'opacity-0')} unoptimized={isHoverExternal} />}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#9E9B93] text-xs tracking-widest uppercase">Sin imagen</div>
          )}
          {tag && <span className="absolute top-2 left-2 px-2 py-0.5 bg-gewalt-primary text-white text-[0.6rem] font-semibold tracking-[0.15em] uppercase z-10">{tag}</span>}
          <div className={"absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-300 overflow-hidden " + (hovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0')}>
            {!quickAdd ? (
              <button onClick={(e) => { e.preventDefault(); setQuickAdd(true); }} className="w-full py-3 text-[0.65rem] font-display font-semibold tracking-[0.18em] uppercase text-gewalt-text hover:text-gewalt-primary transition-colors">Agregar rapido</button>
            ) : (
              <div className="flex items-center justify-center gap-1.5 py-3 px-3 flex-wrap">
                {sizes.map((s) => (
                  <button 
                    key={s} 
                    onClick={(e) => handleQuickAdd(e, s)} 
                    className="px-2 py-1 text-[0.6rem] font-display tracking-wider uppercase border border-gewalt-border hover:bg-gewalt-primary hover:text-white hover:border-gewalt-primary transition-all duration-150 min-w-[2rem]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-2.5 px-0.5 flex items-start justify-between gap-2">
        <Link href={"/product/" + slug}><h3 className="text-[0.8125rem] font-display font-medium tracking-wide text-gewalt-text leading-snug hover:text-gewalt-primary transition-colors">{name}</h3></Link>
        {price !== undefined && <p className="text-[0.8125rem] text-gewalt-text font-light shrink-0">{currency + price.toFixed(2)}</p>}
      </div>
    </div>
  );
}
