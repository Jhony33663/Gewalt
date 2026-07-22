import { GraphQLClient, gql } from 'graphql-request';

const API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL || 'http://127.0.0.1:8001/graphql/';

export const saleorClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
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
    pricing {
      priceRange {
        gross {
          amount
          currency
        }
      }
    }
  }
`;

// ─── Queries ─────────────────────────────────────────────

export const GET_PRODUCTS = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $category: String) {
    products(first: $first, after: $after, filter: { categories: [$category] }) {
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
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
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
        stockQuantity
        attributes {
          attribute {
            name
          }
          values {
            name
          }
        }
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
      }
      category {
        name
        slug
      }
      pricing {
        priceRange {
          gross {
            amount
            currency
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
          products {
            totalCount
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections {
    collections(first: 10) {
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
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, filter: { search: $query }) {
      edges {
        node {
          ...ProductCard
        }
      }
    }
  }
`;

// ─── Helpers ─────────────────────────────────────────────

export async function fetchProducts(first = 20, after?: string, category?: string) {
  const data = await saleorClient.request<{
    products: {
      edges: Array<{ node: any }>;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(GET_PRODUCTS, { first, after, category });
  return data.products;
}

export async function fetchProductDetail(slug: string) {
  const data = await saleorClient.request<{ product: any }>(GET_PRODUCT_DETAIL, { slug });
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
  }>(GET_COLLECTIONS);
  return data.collections.edges.map((e) => e.node);
}
