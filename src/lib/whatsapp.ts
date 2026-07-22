/**
 * WhatsApp integration — generates wa.me deep links with pre-filled messages.
 */

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593985316484';

interface WhatsAppMessageParams {
  productName: string;
  productSlug: string;
  size?: string;
  price?: number;
  currency?: string;
  siteUrl?: string;
}

/**
 * Build a wa.me link with a pre-filled product inquiry message.
 * Works on both mobile (opens app) and desktop (opens web.whatsapp.com).
 */
export function buildWhatsAppLink({
  productName,
  productSlug,
  size,
  price,
  currency = '$',
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}: WhatsAppMessageParams): string {
  const sizeText = size ? ` — Talla: ${size}` : '';
  const priceText = price ? ` — Precio: ${currency}${price.toFixed(2)}` : '';
  const productUrl = `${siteUrl}/product/${productSlug}`;

  const message = [
    `Hola GEWALT 👋`,
    `Quiero comprar:`,
    `• ${productName}${sizeText}${priceText}`,
    ``,
    `Producto: ${productUrl}`,
  ].join('\n');

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Simple contact WhatsApp link (no product info).
 */
export function buildWhatsAppContact(message = 'Hola GEWALT, tengo una consulta.'): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
