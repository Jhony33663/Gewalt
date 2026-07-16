'use client';

import { useState } from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

interface SizeSelectorProps {
  sizes: string[];
  productName: string;
  productSlug: string;
  price?: number;
  currency?: string;
}

export default function SizeSelector({
  sizes,
  productName,
  productSlug,
  price,
  currency = '$',
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const whatsappUrl = buildWhatsAppLink({
    productName,
    productSlug,
    size: selectedSize || undefined,
    price,
    currency,
  });

  const handleClick = () => {
    if (!selectedSize) {
      setTriedSubmit(true);
    }
  };

  if (sizes.length === 0) {
    return (
      <a
        href={buildWhatsAppLink({ productName, productSlug, price, currency })}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        <MessageCircle size={20} />
        Comprar por WhatsApp
      </a>
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
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setTriedSubmit(false);
              }}
              data-selected={selectedSize === size}
              className="px-4 py-2 border border-gewalt-border text-sm font-display uppercase tracking-wider
                         hover:border-gewalt-primary hover:text-gewalt-primary transition-colors
                         data-[selected=true]:bg-gewalt-secondary data-[selected=true]:text-white data-[selected=true]:border-gewalt-secondary"
            >
              {size}
            </button>
          ))}
        </div>
        {!selectedSize && triedSubmit && (
          <p className="text-xs text-red-500 mt-2">Debes seleccionar una talla</p>
        )}
      </div>

      {selectedSize ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <MessageCircle size={20} />
          Comprar por WhatsApp — {selectedSize}
        </a>
      ) : (
        <button
          onClick={handleClick}
          className="whatsapp-btn opacity-50 cursor-not-allowed"
        >
          <MessageCircle size={20} />
          Selecciona una talla
        </button>
      )}
    </div>
  );
}
