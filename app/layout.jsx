// app/layout.jsx
import "./globals.css";
import Header from "../components/Header";
import MobileBottomNav from "../components/MobileBottomNav";
import Footer from "../components/Footer";

export const metadata = {
  title: "ChannelBD Clone",
  description: "News site clone built with Next.js + Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        
        
        <div className="">
          <Header />
        </div>

       
        <main className="flex-1">{children}</main>

        
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
          <MobileBottomNav />
        </div>

        
        <Footer />
      </body>
    </html>
  );
}
