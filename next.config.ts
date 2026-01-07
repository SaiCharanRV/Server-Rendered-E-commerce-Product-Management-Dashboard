import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Allow images from Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  // 2. Increase upload limit to 5MB (Fixes the "Body exceeded 1MB" error)
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;