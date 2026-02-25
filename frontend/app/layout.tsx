import type { Metadata } from 'next'
import '../styles/globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://visitsrilanka.lk'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Visit Sri Lanka – Official Tourism Guide',
    template: '%s | Visit Sri Lanka',
  },
  description:
    'Discover the beauty of Sri Lanka. Explore destinations, hotels, tours, and travel tips for your perfect holiday.',
  keywords: [
    'Sri Lanka tourism',
    'Visit Sri Lanka',
    'Sri Lanka travel',
    'Sri Lanka destinations',
    'Sri Lanka hotels',
    'Sri Lanka tours',
  ],
  authors: [{ name: 'Visit Sri Lanka', url: siteUrl }],
  creator: 'Visit Sri Lanka',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Visit Sri Lanka',
    title: 'Visit Sri Lanka – Official Tourism Guide',
    description:
      'Discover the beauty of Sri Lanka. Explore destinations, hotels, tours, and travel tips.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Visit Sri Lanka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visit Sri Lanka',
    description: 'Discover the beauty of Sri Lanka.',
    images: ['/og-default.jpg'],
    creator: '@VisitSriLanka',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add Google Search Console and Bing verification tokens here
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
