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

const COLORS = [
  { id: 'negro', name: 'Negro', hex: '#000000' },
  { id: 'blanco', name: 'Blanco', hex: '#FFFFFF' },
  { id: 'gris', name: 'Gris', hex: '#6B7280' },
  { id: 'verde', name: 'Verde', hex: '#1A3A2A' },
];

export default function SizeSelector({
  sizes,
  productName,
  productSlug,
  price,
  currency = '$',
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const size = selectedSize || undefined;
  const color = selectedColor || undefined;

  const whatsappUrl = buildWhatsAppLink({
    productName,
    productSlug,
    size,
    color,
    price,
    currency,
  });

  const handleClick = () => {
    if (!selectedSize || !selectedColor) {
      setTriedSubmit(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Color selector */}
      <div>
        <h3 className="text-xs font-display uppercase tracking-wider mb-3 text-gewalt-text-muted">
          Color
        </h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedColor(c.id);
                setTriedSubmit(false);
              }}
              data-selected={selectedColor === c.id}
              title={c.name}
              className="w-10 h-10 rounded-full border-2 transition-all
                         hover:scale-110
                         data-[selected=true]:ring-2 data-[selected=true]:ring-gewalt-primary data-[selected=true]:ring-offset-2"
              style={{
                backgroundColor: c.hex,
                borderColor: c.id === 'blanco' ? '#E5E3DE' : c.hex,
              }}
            />
          ))}
        </div>
        {selectedColor && (
          <p className="text-xs text-gewalt-text-muted mt-2">
            Color: <span className="capitalize">{COLORS.find(c => c.id === selectedColor)?.name}</span>
          </p>
        )}
      </div>

      {/* Size selector */}
      {sizes.length > 0 && (
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
        </div>
      )}

      {triedSubmit && (!selectedSize || !selectedColor) && (
        <p className="text-xs text-red-500">Debes seleccionar talla y color</p>
      )}

      {selectedSize && selectedColor ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <MessageCircle size={20} />
          Comprar por WhatsApp
        </a>
      ) : (
        <button
          onClick={handleClick}
          className="whatsapp-btn opacity-50 cursor-not-allowed"
        >
          <MessageCircle size={20} />
          Selecciona talla y color
        </button>
      )}
    </div>
  );
}
