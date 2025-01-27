import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/uxpilot-auth.appspot.com/**',
        search: '',
      }
    ]
  }
};

export default nextConfig;
