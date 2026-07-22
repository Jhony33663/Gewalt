/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Saleor Cloud
      { protocol: 'https', hostname: '**.saleor.cloud' },
      // Local Docker / dev
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
      // Common Saleor local patterns
      { protocol: 'http', hostname: '0.0.0.0' },
      // Media storage (S3, R2, etc.)
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
      // WooCommerce migration (gewaltoficial.shop)
      { protocol: 'https', hostname: 'gewaltoficial.shop' },
      { protocol: 'http', hostname: 'gewaltoficial.shop' },
    ],
  },
};

module.exports = nextConfig;
