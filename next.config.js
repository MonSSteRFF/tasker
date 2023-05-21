/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/src/app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
