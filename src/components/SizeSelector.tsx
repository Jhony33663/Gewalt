'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { resolveProductImage } from '@/lib/product-images';
import { ShoppingBag } from 'lucide-react';

interface SizeSelectorProps {
  sizes: { name: string; available: boolean }[];
  productName: string;
  productSlug: string;
  price?: number;
  currency?: string;
  imageUrl?: string;
}

export default function SizeSelector({
  sizes,
  productName,
  productSlug,
  price = 0,
  currency = '$',
  imageUrl,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [triedSubmit, setTriedSubmit] = useState(false);
  const { addItem } = useCart();
  const resolvedImage = resolveProductImage(imageUrl, productSlug);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setTriedSubmit(true);
      return;
    }
    addItem({
      productId: productSlug,
      name: productName,
      slug: productSlug,
      size: selectedSize,
      price,
      currency,
      quantity: 1,
      imageUrl: resolvedImage,
    });
    setTriedSubmit(false);
  };

  if (sizes.length === 0) {
    return (
      <button
        onClick={() => {
          addItem({
            productId: productSlug,
            name: productName,
            slug: productSlug,
            size: 'Única',
            price,
            currency,
            quantity: 1,
            imageUrl: resolvedImage,
          });
        }}
        className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gewalt-primary hover:bg-black text-white font-display font-bold text-sm uppercase tracking-wider transition-colors duration-200 rounded-none"
      >
        <ShoppingBag size={20} />
        Añadir al Carrito
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-display uppercase tracking-wider mb-3 text-gewalt-text-muted">
          Talla
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.name}
              disabled={!size.available}
              onClick={() => {
                setSelectedSize(size.name);
                setTriedSubmit(false);
              }}
              data-selected={selectedSize === size.name}
              className={`px-4 py-2 border text-sm font-display uppercase tracking-wider transition-colors
                ${!size.available 
                  ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed' 
                  : 'border-gewalt-border hover:border-gewalt-primary hover:text-gewalt-primary data-[selected=true]:bg-gewalt-secondary data-[selected=true]:text-white data-[selected=true]:border-gewalt-secondary'
                }`}
            >
              {size.name}
            </button>
          ))}
        </div>
        {!selectedSize && triedSubmit && (
          <p className="text-xs text-red-500 mt-2">Debes seleccionar una talla</p>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className={`flex items-center justify-center gap-3 w-full py-4 px-6 font-display font-bold text-sm uppercase tracking-wider transition-colors duration-200 rounded-none
          ${selectedSize ? 'bg-gewalt-primary hover:bg-black text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
      >
        <ShoppingBag size={20} />
        {selectedSize ? 'Añadir al Carrito' : 'Selecciona una talla'}
      </button>
    </div>
  );
}
