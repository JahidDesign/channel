// app/layout.tsx

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileBottomNav from "../components/MobileBottomNav";

import Script from "next/script";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dxntv.example"),

  title: {
    default: "DXN TV | Latest News, Live TV & Updates",
    template: "%s | DXN TV",
  },

  description:
    "DXN TV brings you breaking news, live TV, politics, sports, business, technology, and entertainment updates from Bangladesh and worldwide.",

  authors: [{ name: "DXN TV News Team" }],
  creator: "DXN TV",
  publisher: "DXN TV",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/DXNTvHead.svg",
    shortcut: "/DXNTvHead.svg",
    apple: "/DXNTvHead.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dxntv.example",
    siteName: "DXN TV",
    title: "DXN TV | Trusted News & Live Television",
    description:
      "Watch DXN TV for trusted journalism, live news coverage, and real-time updates.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DXN TV News",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@dxntv",
    creator: "@dxntv",
    title: "DXN TV | Latest News & Live TV",
    description:
      "Breaking news, politics, sports, business & entertainment on DXN TV.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

        
        <Script
          id="news-organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "NewsOrganization",
              "name": "DXN TV",
              "url": "https://dxntv.example",
              "logo": "https://dxntv.example/DXNTvHead.svg",
              "sameAs": [
                "https://facebook.com/dxntv",
                "https://twitter.com/dxntv",
                "https://youtube.com/@dxntv"
              ]
            }
          `}
        </Script>

        {/* Header */}
        <header role="banner" className="relative z-50">
          <Header />
        </header>

        {/* Main Content */}
        <main id="main-content" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <MobileBottomNav />
        </div>

        {/* Footer */}
        <footer role="contentinfo" className="mt-auto">
          <Footer />
        </footer>

      </body>
    </html>
  );
}
