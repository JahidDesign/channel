// app/layout.jsx
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

/* ---------------------------------------------
 * GLOBAL FONT (FAST + SEO FRIENDLY)
 * --------------------------------------------- */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* ---------------------------------------------
 * SEO METADATA (PRODUCTION READY)
 * --------------------------------------------- */
export const metadata = {
  title: {
    default: "ChannelBD | Latest News, Live TV & Updates",
    template: "%s | ChannelBD",
  },
  description:
    "ChannelBD brings you the latest national, international, sports, business, and entertainment news with live TV and breaking updates.",
  keywords: [
    "Bangladesh News",
    "Live TV",
    "Breaking News",
    "Politics",
    "Sports",
    "Business",
    "Entertainment",
  ],
  authors: [{ name: "ChannelBD News Team" }],
  creator: "ChannelBD",
  publisher: "ChannelBD",
  metadataBase: new URL("https://channelbd.example"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://channelbd.example",
    siteName: "ChannelBD",
    title: "ChannelBD | Trusted News Source",
    description:
      "Stay updated with trusted and real-time news from Bangladesh and around the world.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@channelbd",
    creator: "@channelbd",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ---------------------------------------------
 * ROOT LAYOUT
 * --------------------------------------------- */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable}`}
    >
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col">

        {/* ================= HEADER ================= */}
        <header role="banner" className="relative z-50">
          <Header />
        </header>

        {/* ================= MAIN CONTENT ================= */}
        <main
          id="main-content"
          role="main"
          className="flex-1 w-full"
        >
          {children}
        </main>

        {/* ================= FOOTER ================= */}
        <footer role="contentinfo" className="mt-auto">
          <Footer />
        </footer>

        {/* ================= ACCESSIBILITY ================= */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-[9999]"
        >
          Skip to content
        </a>

      </body>
    </html>
  );
}
