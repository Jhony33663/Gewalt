'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gewalt-border">
          <h2 className="font-display text-lg tracking-widest uppercase">Tu Carrito</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:text-gewalt-primary">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-gewalt-text-muted mt-10 flex flex-col items-center justify-center">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-display tracking-widest uppercase text-sm mb-6">Tu carrito está vacío</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 border border-gewalt-primary text-gewalt-primary font-display uppercase tracking-widest text-xs font-semibold hover:bg-gewalt-primary hover:text-white transition-colors"
              >
                Seguir Comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gewalt-border pb-6">
                {item.imageUrl ? (
                  <div className="w-20 h-24 bg-gray-100 flex-shrink-0 relative overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-20 h-24 bg-gray-100 flex-shrink-0" />
                )}
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm tracking-wider uppercase">{item.name}</h3>
                    <p className="text-xs text-gewalt-text-muted mt-1">Talla: {item.size}</p>
                    <p className="text-sm font-display mt-2">{item.currency}{item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gewalt-border">
                      <button 
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>
                      <span className="px-3 py-1 text-sm">{item.quantity}</span>
                      <button 
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gewalt-border bg-gray-50 space-y-3">
            <div className="flex justify-between items-center mb-4">
              <span className="font-display tracking-wider uppercase text-sm">Total</span>
              <span className="font-display text-xl">${totalPrice.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-4 text-center bg-gewalt-primary text-white font-display uppercase tracking-widest text-sm hover:bg-black transition-colors"
            >
              Completar Pedido
            </Link>

            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3.5 text-center border border-gewalt-primary text-gewalt-primary font-display uppercase tracking-widest text-xs font-semibold hover:bg-gewalt-primary hover:text-white transition-colors"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
