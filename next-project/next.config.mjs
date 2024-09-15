/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['d6v2h19htldqs.cloudfront.net'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
