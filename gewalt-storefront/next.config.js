/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.saleor.cloud' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'http', hostname: '0.0.0.0' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'gewaltoficial.shop' },
      { protocol: 'http', hostname: 'gewaltoficial.shop' },
    ],
  },
};

module.exports = nextConfig;
