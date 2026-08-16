/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async rewrites() {
    return [
      {
        source: '/media/:path*',
        destination: `${process.env.INTERNAL_SALEOR_API_URL || 'http://api-proxy:8000'}/media/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.saleor.cloud' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
      { protocol: 'http', hostname: '142.93.12.243' },
      { protocol: 'http', hostname: '0.0.0.0' },
      { protocol: 'https', hostname: 'gewaltoficial.shop' },
      { protocol: 'https', hostname: '**.gewaltoficial.shop' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      { protocol: 'https', hostname: '**.s3.amazonaws.com' },
    ],
  },
};
module.exports = nextConfig;
