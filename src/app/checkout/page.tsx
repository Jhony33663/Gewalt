'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { resolveProductImage } from '@/lib/product-images';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    direccion: '',
    referencia: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    // Formatear mensaje para WhatsApp
    const orderDetails = items.map(
      (item) => `• ${item.quantity}x ${item.name} (Talla: ${item.size}) - ${item.currency}${item.price.toFixed(2)}`
    ).join('\n');

    const totalStr = `*Total:* $${totalPrice.toFixed(2)}`;
    const userData = `*Datos del Cliente:*\nNombre: ${formData.nombre}\nCédula/RUC: ${formData.cedula}\nDirección: ${formData.direccion}\nReferencia: ${formData.referencia}`;

    const message = `Hola GEWALT 👋\n\nQuiero confirmar mi pedido:\n\n${orderDetails}\n\n${totalStr}\n\n${userData}`;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/593998115916?text=${encoded}`;

    // Limpiar carrito y redirigir
    clearCart();
    window.open(whatsappUrl, '_blank');
    router.push('/');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-site mx-auto px-4 lg:px-16 py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="font-serif italic text-4xl mb-4">Tu carrito está vacío</h1>
        <p className="text-gewalt-text-muted mb-8 font-display uppercase tracking-widest text-sm">Vuelve a la tienda para añadir productos.</p>
        <button onClick={() => router.push('/shop')} className="bg-gewalt-primary text-white px-8 py-3 font-display uppercase tracking-widest text-sm hover:bg-black transition-colors">
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-site mx-auto px-4 lg:px-16 py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <h1 className="font-serif italic text-3xl mb-8">Datos de Envío y Facturación</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-gewalt-text-muted mb-2">Nombre Completo</label>
            <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border border-gewalt-border p-3 focus:border-gewalt-primary outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-gewalt-text-muted mb-2">Cédula o RUC</label>
            <input required type="text" name="cedula" value={formData.cedula} onChange={handleChange} className="w-full border border-gewalt-border p-3 focus:border-gewalt-primary outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-gewalt-text-muted mb-2">Dirección de Entrega</label>
            <input required type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full border border-gewalt-border p-3 focus:border-gewalt-primary outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-gewalt-text-muted mb-2">Referencia de la ubicación (Opcional)</label>
            <textarea name="referencia" value={formData.referencia} onChange={handleChange} className="w-full border border-gewalt-border p-3 focus:border-gewalt-primary outline-none transition-colors min-h-[100px]" />
          </div>

          <button type="submit" className="w-full bg-[#25D366] text-white py-4 font-display font-bold uppercase tracking-widest hover:bg-[#1ea952] transition-colors mt-8">
            Completar por WhatsApp
          </button>
        </form>
      </div>

      <div>
        <div className="bg-gray-50 p-8 border border-gewalt-border">
          <h2 className="font-display uppercase tracking-widest text-lg mb-6">Resumen del Pedido</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                  {item.imageUrl && (
                    <img src={resolveProductImage(item.imageUrl, item.slug)} alt={item.name} className="w-12 h-16 object-cover" />
                  )}
                  <div>
                    <p className="font-display uppercase tracking-wider">{item.name}</p>
                    <p className="text-xs text-gewalt-text-muted mt-1">Talla: {item.size} | Cant: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-display">{item.currency}{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gewalt-border pt-6 flex justify-between items-center">
            <span className="font-display tracking-widest uppercase text-sm">Total a pagar</span>
            <span className="font-serif italic text-2xl">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
