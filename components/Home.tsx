import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import HeroDesktop from "./HeroDesktop";
import ArticleCard from "./ArticleCard";
import NewsCards from "./NewsCard";
/* ================= PAGE ================= */

export default function Home() {
  return (
    <main className="bg-gray-50 pb-12">

      {/* ================= HERO ================= */}
      <HeroDesktop />

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className="grid grid-cols-12 gap-6">

          {/* ===== LEFT SIDEBAR (25%) ===== */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20">
            <LeftSidebar />
          </aside>

          {/* ===== MAIN ARTICLES (50%) ===== */}
          <section className="col-span-12 lg:col-span-6">
            <ArticleCard />
          </section>

          {/* ===== RIGHT SIDEBAR (25%) ===== */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20">
            <RightSidebar />
          </aside>

        </div>
      </div>
       <section className="max-w-7xl mx-auto px-4 mt-8">
       <NewsCards/>
      </section>
      {/* ================= MOBILE BOTTOM SPACE ================= */}
      <div className="h-24" />
    </main>
  );
}
