/**
 * Mock product data for development without Saleor.
 * Replace with real Saleor data once the endpoint is connected.
 */

export const MOCK_PRODUCTS = [
  {
    id: 'mock-1',
    name: 'Gewalt Tee Black',
    slug: 'gewalt-tee-black',
    thumbnail: null,
    pricing: { priceRange: { start: { gross: { amount: 28.00, currency: 'USD' } } } },
    category: { name: 'T-Shirts', slug: 't-shirts' },
  },
  {
    id: 'mock-2',
    name: 'Gewalt Hoodie Dark',
    slug: 'gewalt-hoodie-dark',
    thumbnail: null,
    pricing: { priceRange: { start: { gross: { amount: 58.00, currency: 'USD' } } } },
    category: { name: 'Hoodies', slug: 'hoodies' },
  },
  {
    id: 'mock-3',
    name: 'Gewalt Tee Olive',
    slug: 'gewalt-tee-olive',
    thumbnail: null,
    pricing: { priceRange: { start: { gross: { amount: 28.00, currency: 'USD' } } } },
    category: { name: 'T-Shirts', slug: 't-shirts' },
  },
  {
    id: 'mock-4',
    name: 'Gewalt Long Sleeve Grey',
    slug: 'gewalt-long-sleeve-grey',
    thumbnail: null,
    pricing: { priceRange: { start: { gross: { amount: 38.00, currency: 'USD' } } } },
    category: { name: 'Long Sleeves', slug: 'long-sleeves' },
  },
];

export const MOCK_PRODUCT_DETAIL = {
  id: 'mock-1',
  name: 'Gewalt Tee Black',
  slug: 'gewalt-tee-black',
  description: '<p>Camiseta oversized de algodón 100%. Estampado GEWALT en pecho. Fit relajado, ideal para el día a día.</p><p>Material: Algodón peinado 220gsm</p>',
  media: [],
  category: { name: 'T-Shirts', slug: 't-shirts' },
  variants: [
    {
      id: 'var-s',
      name: 'S',
      sku: 'GWT-BLK-S',
      stockQuantity: 10,
      attributes: [{ attribute: { name: 'Talla' }, values: [{ name: 'S' }] }],
      pricing: { price: { gross: { amount: 28.00, currency: 'USD' } } },
    },
    {
      id: 'var-m',
      name: 'M',
      sku: 'GWT-BLK-M',
      stockQuantity: 15,
      attributes: [{ attribute: { name: 'Talla' }, values: [{ name: 'M' }] }],
      pricing: { price: { gross: { amount: 28.00, currency: 'USD' } } },
    },
    {
      id: 'var-l',
      name: 'L',
      sku: 'GWT-BLK-L',
      stockQuantity: 12,
      attributes: [{ attribute: { name: 'Talla' }, values: [{ name: 'L' }] }],
      pricing: { price: { gross: { amount: 28.00, currency: 'USD' } } },
    },
    {
      id: 'var-xl',
      name: 'XL',
      sku: 'GWT-BLK-XL',
      stockQuantity: 8,
      attributes: [{ attribute: { name: 'Talla' }, values: [{ name: 'XL' }] }],
      pricing: { price: { gross: { amount: 28.00, currency: 'USD' } } },
    },
  ],
  pricing: { priceRange: { start: { gross: { amount: 28.00, currency: 'USD' } } } },
};

export const MOCK_CATEGORIES = [
  { id: 'cat-1', name: 'T-Shirts', slug: 't-shirts', products: { totalCount: 4 } },
  { id: 'cat-2', name: 'Hoodies', slug: 'hoodies', products: { totalCount: 3 } },
  { id: 'cat-3', name: 'Long Sleeves', slug: 'long-sleeves', products: { totalCount: 2 } },
  { id: 'cat-4', name: 'Accesorios', slug: 'accesorios', products: { totalCount: 1 } },
];
