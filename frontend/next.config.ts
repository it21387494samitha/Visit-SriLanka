import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ── Output ──────────────────────────────────────────────────────────────
  // Use 'standalone' for self-hosted / Docker; switch to 'export' for
  // fully-static Cloudflare Pages deployment.
  output: 'standalone',

  // ── Image optimisation (Cloudflare CDN) ─────────────────────────────────
  images: {
    // Remote patterns accepted as image sources (Laravel storage + CDN)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.visitsrilanka.lk',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net', // Cloudflare Images
      },
    ],
    // Point loader at Cloudflare Image Resizing
    // Set to 'cloudflare' when using Cloudflare Images; keep 'default' locally.
    loader: 'default',
    formats: ['image/avif', 'image/webp'],
  },

  // ── Headers ─────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Cache static assets aggressively via Cloudflare CDN
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Allow API calls from admin (Filament) panel
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_API_URL ?? '*' },
        ],
      },
    ]
  },

  // ── Rewrites (proxy API during development) ──────────────────────────────
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBase}/api/v1/:path*`,
      },
    ]
  },

  // ── Env variables exposed to the browser ────────────────────────────────
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://visitsrilanka.lk',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  },
}

export default nextConfig
