import { GraphQLClient, gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/graphql/';

export const saleorClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
  fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
});

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
  query GetProducts($first: Int!, $after: String, $channel: String) {
    products(first: $first, after: $after, channel: $channel) {
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

export async function fetchProducts(first = 20, after?: string, category?: string) {
  const data = await saleorClient.request<{
    products: {
      edges: Array<{ node: any }>;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(GET_PRODUCTS, { first, after, channel: CHANNEL });
  return data.products;
}

export async function fetchProductDetail(slug: string) {
  const data = await saleorClient.request<{ product: any }>(GET_PRODUCT_DETAIL, { slug, channel: CHANNEL });
  return data.product;
}

export async function fetchCategories() {
  const data = await saleorClient.request<{
    categories: { edges: Array<{ node: any }> };
  }>(GET_CATEGORIES);
  return data.categories.edges.map((e) => e.node);
}

export async function fetchCollections() {
  const data = await saleorClient.request<{
    collections: { edges: Array<{ node: any }> };
  }>(GET_COLLECTIONS, { channel: CHANNEL });
  return data.collections.edges.map((e) => e.node);
}

export async function searchProducts(query: string, first = 20) {
  const data = await saleorClient.request<{
    products: { edges: Array<{ node: any }> };
  }>(SEARCH_PRODUCTS, { query, first, channel: CHANNEL });
  return data.products.edges.map((e) => e.node);
}
