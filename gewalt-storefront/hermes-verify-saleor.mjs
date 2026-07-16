import { GraphQLClient, gql } from 'graphql-request';

const API_URL = 'http://127.0.0.1:8001/graphql/';
const CHANNEL = 'default-channel';

const client = new GraphQLClient(API_URL, {
  headers: { 'Content-Type': 'application/json' },
});

const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $channel: String) {
    products(first: $first, channel: $channel) {
      edges { node { id name slug thumbnail { url alt } pricing { priceRange { start { gross { amount currency } } } } } }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($slug: String!, $channel: String) {
    product(slug: $slug, channel: $channel) {
      id name slug description
      media { url alt type }
      variants { id name sku attributes { attribute { name } values { name } } pricing { price { gross { amount currency } } } }
      category { name slug }
      pricing { priceRange { start { gross { amount currency } } } }
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories { categories(first: 5) { edges { node { id name slug } } } }
`;

const GET_COLLECTIONS = gql`
  query GetCollections($channel: String) { collections(first: 5, channel: $channel) { edges { node { id name slug } } } }
`;

const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!, $first: Int!, $channel: String) {
    products(first: $first, filter: { search: $query }, channel: $channel) {
      edges { node { id name slug thumbnail { url alt } pricing { priceRange { start { gross { amount currency } } } } } }
    }
  }
`;

const tests = [
  { name: 'Products', query: GET_PRODUCTS, vars: { first: 3, channel: CHANNEL } },
  { name: 'Categories', query: GET_CATEGORIES, vars: {} },
  { name: 'Collections', query: GET_COLLECTIONS, vars: { channel: CHANNEL } },
  { name: 'Search', query: SEARCH_PRODUCTS, vars: { query: 'tee', first: 5, channel: CHANNEL } },
  { name: 'Product Detail', query: GET_PRODUCT_DETAIL, vars: { slug: 'ascii-tee', channel: CHANNEL } },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    const data = await client.request(test.query, test.vars);
    const key = Object.keys(data)[0];
    const count = data[key]?.edges?.length ?? (data[key] ? 1 : 0);
    console.log(`PASS ${test.name}: ${count} results`);
    passed++;
  } catch (e) {
    console.error(`FAIL ${test.name}: ${e.message?.split('\n')[0]}`);
    failed++;
  }
}

console.log(`\n${passed}/${passed + failed} tests passed`);
process.exit(failed > 0 ? 1 : 0);
