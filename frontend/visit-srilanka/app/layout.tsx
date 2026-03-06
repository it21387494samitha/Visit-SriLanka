import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Sri Lanka — Discover Paradise Island",
  description:
    "Explore the wonders of Sri Lanka. From ancient ruins and pristine beaches to misty mountains and wild safaris — your extraordinary journey begins here.",
  keywords: [
    "Sri Lanka",
    "tourism",
    "travel",
    "destinations",
    "beaches",
    "temples",
    "wildlife",
    "hill country",
  ],
  openGraph: {
    title: "Visit Sri Lanka — Discover Paradise Island",
    description:
      "Explore the wonders of Sri Lanka. Ancient ruins, pristine beaches, misty mountains and wild safaris.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <SmoothScrollProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
