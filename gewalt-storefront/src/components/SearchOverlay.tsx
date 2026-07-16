'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SEARCH_PRODUCTS } from '@/lib/saleor';
import { saleorClient } from '@/lib/saleor';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  thumbnail?: { url: string; alt?: string } | null;
  pricing?: {
    priceRange: {
      gross: { amount: number; currency: string };
    };
  };
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Search with debounce
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await saleorClient.request<{ products: { edges: Array<{ node: SearchResult }> } }>(
        SEARCH_PRODUCTS,
        { query: searchQuery, first: 8 }
      );
      setResults(data.products.edges.map((e) => e.node));
    } catch {
      // Fallback to mock data search
      const filtered = MOCK_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered.map((p) => ({
        ...p,
        thumbnail: null,
      })));
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      search(query);
    }, 300);
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gewalt-surface">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gewalt-surface border-b border-gewalt-border">
        <div className="max-w-site mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
          <Search size={20} className="text-gewalt-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 text-lg font-body outline-none bg-transparent placeholder:text-gewalt-text-muted"
          />
          <button
            onClick={onClose}
            className="p-2 text-gewalt-text-muted hover:text-gewalt-text transition-colors"
            aria-label="Cerrar búsqueda"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-site mx-auto px-4 lg:px-8 py-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-gewalt-text-muted" />
          </div>
        )}

        {!loading && query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gewalt-text-muted">No se encontraron resultados para &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="group"
              >
                <div className="aspect-[3/4] bg-gewalt-surface-alt overflow-hidden mb-3">
                  {product.thumbnail?.url ? (
                    <Image
                      src={product.thumbnail.url}
                      alt={product.thumbnail.alt || product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gewalt-text-muted text-sm">
                      Sin imagen
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-display uppercase tracking-wider text-gewalt-text group-hover:text-gewalt-primary transition-colors">
                  {product.name}
                </h3>
                {product.pricing?.priceRange?.gross && (
                  <p className="text-sm text-gewalt-text-muted">
                    ${product.pricing.priceRange.gross.amount.toFixed(2)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {!loading && !query.trim() && (
          <div className="text-center py-12">
            <p className="text-gewalt-text-muted">Escribe para buscar productos</p>
          </div>
        )}
      </div>
    </div>
  );
}
