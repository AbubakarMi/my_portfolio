import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestudio.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
