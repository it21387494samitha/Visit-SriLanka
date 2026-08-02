import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sample plates are vendored under /public/plates, so the only remote
      // source is the Laravel backend's own uploads.
      // Uploads served from the Laravel backend in development.
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: '127.0.0.1' },
    ],
  },
};

export default nextConfig;
