const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593985316484';

interface WhatsAppMessageParams {
  productName: string;
  productSlug: string;
  size?: string;
  color?: string;
  price?: number;
  currency?: string;
  siteUrl?: string;
}

export function buildWhatsAppLink({
  productName,
  productSlug,
  size,
  color,
  price,
  currency = '$',
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}: WhatsAppMessageParams): string {
  const opts = [size && `Talla: ${size}`, color && `Color: ${color}`].filter(Boolean).join(' · ');
  const priceText = price ? ` — ${currency}${price.toFixed(2)}` : '';
  const productUrl = `${siteUrl}/product/${productSlug}`;

  const message = [
    `Hola GEWALT 👋`,
    `Quiero comprar:`,
    `• ${productName}${opts ? ` — ${opts}` : ''}${priceText}`,
    ``,
    `Producto: ${productUrl}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppContact(message = 'Hola GEWALT, tengo una consulta.'): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
