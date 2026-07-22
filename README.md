# GEWALT Storefront

E-commerce storefront para GEWALT streetwear.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Saleor GraphQL API · WhatsApp Checkout

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Saleor endpoint

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SALEOR_API_URL` | Saleor GraphQL endpoint | `http://localhost:8000/graphql/` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (no + or spaces) | `593985316484` |
| `NEXT_PUBLIC_SITE_NAME` | Site name | `GEWALT` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `http://localhost:3000` |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Design tokens + global styles
│   ├── shop/
│   │   ├── page.tsx        # All products
│   │   └── [category]/     # Category filter
│   ├── product/[slug]/     # Product detail + WhatsApp CTA
│   ├── drops/              # Limited collections
│   ├── about/              # Brand manifesto
│   ├── contact/            # Contact info + WhatsApp
│   └── help/               # FAQ, shipping, size guide
├── components/
│   ├── Header.tsx          # Nav + promo bar + mobile drawer
│   ├── Footer.tsx          # Links + contact + copyright
│   ├── ProductCard.tsx     # Product card with hover
│   └── ProductGrid.tsx     # Responsive product grid
└── lib/
    ├── saleor.ts           # GraphQL client + queries
    └── whatsapp.ts         # WhatsApp deep link builder
```

## Customization

### Design Tokens

Edit `src/app/globals.css` to change colors, fonts, and spacing.
When Iris finalizes the visual direction, swap the `:root` CSS variables.

### WhatsApp

Change `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` to update the checkout number.

### Saleor

The GraphQL queries are in `src/lib/saleor.ts`. Add/remove fields as needed.
