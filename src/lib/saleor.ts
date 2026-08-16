import { GraphQLClient, gql } from 'graphql-request';

function getApiUrl() {
  let url = process.env.NEXT_PUBLIC_SALEOR_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/graphql/';
  if (typeof window === 'undefined') {
    url = process.env.INTERNAL_SALEOR_API_URL || 'http://api-proxy:8000/graphql/';
  }
  if (!url.endsWith('/graphql/')) {
    url = url.replace(/\/+$/, '') + '/graphql/';
  }
  return url;
}

export function getSaleorClient() {
  return new GraphQLClient(getApiUrl(), {
    headers: {
      'Content-Type': 'application/json',
    },
    fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
  });
}

export const saleorClient = getSaleorClient();

// ─── Fragments ───────────────────────────────────────────

const PRODUCT_CARD_FRAGMENT = gql`
  fragment ProductCard on Product {
    id
    name
    slug
    thumbnail {
      url
      alt
    }
    media {
      url
      alt
      type
    }
    pricing {
      priceRange {
        start {
          gross {
            amount
            currency
          }
        }
      }
    }
  }
`;

// ─── Queries ─────────────────────────────────────────────

export const GET_PRODUCTS = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $channel: String, $categories: [ID!]) {
    products(first: $first, after: $after, channel: $channel, filter: { categories: $categories }) {
      edges {
        node {
          ...ProductCard
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($slug: String!, $channel: String) {
    product(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      media {
        url
        alt
        type
      }
      variants {
        id
        name
        sku
        quantityAvailable
        attributes {
          attribute { name }
          values { name }
        }
        pricing {
          price {
            gross { amount currency }
          }
        }
      }
      category {
        name
        slug
      }
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(first: 20) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections($channel: String) {
    collections(first: 10, channel: $channel) {
      edges {
        node {
          id
          name
          slug
          description
          backgroundImage {
            url
            alt
          }
        }
      }
    }
  }
`;

export const GET_NAV_MENU = gql`
  query GetNavigation($name: String!) {
    menu(name: $name) {
      items {
        id
        name
        url
        children {
          id
          name
          url
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query SearchProducts($query: String!, $first: Int!, $channel: String) {
    products(first: $first, filter: { search: $query }, channel: $channel) {
      edges {
        node {
          ...ProductCard
        }
      }
    }
  }
`;

// ─── Helpers ─────────────────────────────────────────────

const CHANNEL = 'default-channel';

export async function fetchCategoryId(slug: string): Promise<string | null> {
  try {
    const data = await getSaleorClient().request<{ category: { id: string } | null }>(
      gql`query GetCategoryId($slug: String!) { category(slug: $slug) { id } }`,
      { slug }
    );
    return data.category?.id || null;
  } catch {
    return null;
  }
}

export async function fetchProducts(first = 20, after?: string, categorySlug?: string) {
  let categories: string[] | undefined = undefined;
  if (categorySlug) {
    const catId = await fetchCategoryId(categorySlug);
    if (catId) categories = [catId];
  }
  const data = await getSaleorClient().request<{
    products: {
      edges: Array<{ node: any }>;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(GET_PRODUCTS, { first, after, channel: CHANNEL, categories });
  return data.products;
}

export async function fetchProductDetail(slug: string) {
  const data = await getSaleorClient().request<{ product: any }>(GET_PRODUCT_DETAIL, { slug, channel: CHANNEL });
  return data.product;
}

export async function fetchCategories() {
  const data = await getSaleorClient().request<{
    categories: { edges: Array<{ node: any }> };
  }>(GET_CATEGORIES);
  return data.categories.edges.map((e) => e.node);
}

export async function fetchCollections() {
  const data = await getSaleorClient().request<{
    collections: { edges: Array<{ node: any }> };
  }>(GET_COLLECTIONS, { channel: CHANNEL });
  return data.collections.edges.map((e) => e.node);
}

export async function searchProducts(query: string, first = 20) {
  const data = await getSaleorClient().request<{
    products: { edges: Array<{ node: any }> };
  }>(SEARCH_PRODUCTS, { query, first, channel: CHANNEL });
  return data.products.edges.map((e) => e.node);
}
