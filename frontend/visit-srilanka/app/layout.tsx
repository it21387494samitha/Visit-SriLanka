import type { Metadata, Viewport } from 'next';
import { Big_Shoulders, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';

/* Condensed industrial signage — headlines and the wordmark. */
const display = Big_Shoulders({
  variable: '--font-big-shoulders',
  subsets: ['latin'],
  display: 'swap',
});

/* Text serif with real italics — running copy. */
const body = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

/* Coordinates, ISO codes, catalogue numbers, stencilled labels. */
const mono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://visitsrilanka.example'),
  title: {
    default: 'Visit Sri Lanka — a field catalogue of the island',
    template: '%s — Visit Sri Lanka',
  },
  description:
    'A catalogue of Sri Lanka by district: ancient capitals, hill country, reef and surf coast, rainforest and the parks. Coordinates, seasons and how to reach each one.',
  keywords: [
    'Sri Lanka',
    'Ceylon',
    'travel',
    'destinations',
    'districts',
    'UNESCO',
    'hill country',
    'wildlife',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    siteName: 'Visit Sri Lanka',
    title: 'Visit Sri Lanka — a field catalogue of the island',
    description:
      'Twenty-five districts, indexed. Ancient capitals, hill country, reef and surf coast, rainforest and the parks.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#efe9dc' },
    { media: '(prefers-color-scheme: dark)', color: '#14170f' },
  ],
};

/* Applies the saved theme before first paint so the page never flashes the
   wrong ground. Deliberately tiny and dependency-free. */
const THEME_INIT = `
try {
  var t = localStorage.getItem('vsl-theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The font variables must land on :root — globals.css composes --font-body
       and friends there, and a var() that resolves nowhere makes the whole
       declaration invalid, silently dropping the page to a system font. */
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
