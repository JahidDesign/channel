// app/layout.tsx

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

/* =========================================
 * GLOBAL FONT
 * ========================================= */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* =========================================
 * SEO METADATA — DXN TV
 * ========================================= */
export const metadata: Metadata = {
  title: {
    default: "DXN TV | Latest News, Live TV & Updates",
    template: "%s | DXN TV",
  },
  description:
    "DXN TV brings you the latest breaking news, live TV broadcasts, politics, sports, business, and entertainment updates.",
  keywords: [
    "DXN TV",
    "Bangladesh News",
    "Live TV",
    "Breaking News",
    "Politics",
    "Sports",
    "Business",
    "Entertainment",
  ],
  authors: [{ name: "DXN TV News Team" }],
  creator: "DXN TV",
  publisher: "DXN TV",
  metadataBase: new URL("https://dxntv.example"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dxntv.example",
    siteName: "DXN TV",
    title: "DXN TV | Trusted News & Live Television",
    description:
      "Watch DXN TV for trusted journalism, live news coverage, and real-time updates.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dxntv",
    creator: "@dxntv",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================
 * ROOT LAYOUT
 * ========================================= */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col">

        {/* Skip to content (Accessibility) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-[9999]"
        >
          Skip to content
        </a>

        {/* Header */}
        <header role="banner" className="relative z-50">
          <Header />
        </header>

        {/* Main */}
        <main id="main-content" role="main" className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer role="contentinfo" className="mt-auto">
          <Footer />
        </footer>

      </body>
    </html>
  );
}
