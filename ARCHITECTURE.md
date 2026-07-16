GEWALT — Storefront Next.js
==============================

## Architecture Overview

A Next.js 14 storefront powered by Saleor GraphQL backend, built for GEWALT streetwear brand in Ecuador.

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Components)
- **Styling**: Tailwind CSS 3 + custom design tokens
- **E-commerce Backend**: Saleor (GraphQL API at :8001)
- **Animations**: Framer Motion
- **Deployment**: Docker (dev), Vercel-ready (prod)

## Folder Structure

```
gewalt-storefront/
├── public/                    # Static assets (images, video)
│   ├── hero.mp4              # Hero background video
│   └── product-max-*.jpg     # Official GEWALT product photos
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage (hero, collections, products)
│   │   ├── shop/             # Product catalog
│   │   ├── product/[slug]/   # Product detail with size/color selector
│   │   ├── about/            # Brand manifesto
│   │   ├── drops/            # Collections from Saleor
│   │   ├── contact/          # Contact page
│   │   ├── help/             # FAQ, Shipping, Size Guide
│   │   ├── privacy/          # Privacy policy
│   │   ├── terms/            # Terms & conditions
│   │   ├── globals.css       # Design tokens + Tailwind
│   │   └── layout.tsx        # Root layout (Header, Footer)
│   ├── components/           # Reusable UI
│   │   ├── Header.tsx        # Nav + announcement bar
│   │   ├── Footer.tsx        # Newsletter + links
│   │   ├── ProductCard.tsx   # Product grid item
│   │   ├── ProductGrid.tsx   # Animated product grid
│   │   ├── SizeSelector.tsx  # Color + size picker
│   │   └── SearchOverlay.tsx # Instant search
│   └── lib/                  # Utilities
│       ├── saleor.ts         # GraphQL client + queries
│       ├── product-images.ts # Image mapping
│       └── whatsapp.ts       # wa.me link builder
├── .env.local                # Saleor API + WhatsApp config
└── next.config.js            # Image domains
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--gewalt-primary` | `#1A3A2A` | Buttons, accents, announcement bar |
| `--gewalt-secondary` | `#1A1A1A` | Hero bg, dark surfaces |
| `--gewalt-surface` | `#FAFAF8` | Page background (warm white) |
| `--gewalt-text` | `#1A1A1A` | Primary text |
| `--gewalt-text-muted` | `#5A574F` | Secondary text |
| `--gewalt-border` | `#E5E3DE` | Card borders |
| `--font-serif` | Instrument Serif | Editorial headlines |
| `--font-display` | Space Grotesk | UI labels, buttons |
| `--font-body` | DM Sans | Body copy |

## Key Flows

### Homepage
- Hero section with **autoplay muted video** (`/hero.mp4`)
- Category grid (Hoodies, Tees, Abrigos) with editorial product imagery
- Featured products fetched from Saleor GraphQL
- "Lo más buscado" section with 8 products
- Editorial split about the brand
- WhatsApp CTA band

### Product Detail
- Image gallery (Saleor media)
- **Color selector**: Negro, Blanco, Gris, Verde
- **Size selector**: S, M, L, XL, XXL
- WhatsApp CTA with pre-filled message:
  ```
  Hola GEWALT 👋
  Quiero comprar:
  • Product Name — Talla: M · Color: Negro — $28.00

  Producto: https://...
  ```

### Saleor Integration
- Products, categories, collections queries
- Channel: `default-channel` (multi-channel support)
- Pricing: `priceRange.start.gross.amount`
- Images: mapped from local catalog (CDN-ready for production)

## Environment Variables

```env
NEXT_PUBLIC_SALEOR_API_URL=http://127.0.0.1:8001/graphql/
NEXT_PUBLIC_WHATSAPP_NUMBER=593985316484
NEXT_PUBLIC_SITE_NAME=GEWALT
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production Checklist

- [ ] Replace placeholder images with Saleor media CDN
- [ ] Configure production Saleor endpoint
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (GA4 / PostHog)
- [ ] Enable ISR for product pages
- [ ] Configure CDN for static assets
