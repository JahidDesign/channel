import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import HeroDesktop from "./HeroDesktop";
import ArticleCard from "./ArticleCard";

/* ================= TYPES ================= */

export type Article = {
  id: number;
  title: string;
  subtitle?: string;
  img?: string;
};

/* ================= PAGE ================= */

export default function Home() {
  /* ===== MOCK DATA (replace with API later) ===== */
  const items: Article[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Sample headline ${i + 1}`,
    subtitle: `${10 + i} minutes ago`,
    img: `https://picsum.photos/seed/home_${i}/600/400`,
  }));

  const main: Article = {
    id: 100,
    title: "Schedule Announced — Live Video",
    subtitle: "LIVE · On air now",
    img: "https://picsum.photos/seed/hero_live/1200/675",
  };

  return (
    <main className="bg-gray-50 pb-12">

      {/* ================= HERO ================= */}
      <HeroDesktop
        main={main}
        leftList={items.slice(0, 3)}
        rightList={items.slice(3, 6)}
      />

      {/* ================= MAIN CONTENT ================= */}
      <div className="container-desktop px-4 mt-2">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">

          {/* ===== LEFT SIDEBAR (DESKTOP) ===== */}
          <aside className="hidden lg:block lg:col-span-3">
            <LeftSidebar items={items.slice(0, 6)} />
          </aside>

          {/* ===== MAIN ARTICLES ===== */}
          <section className="col-span-12 lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>

            {/* ===== AD BANNER ===== */}
            <div className="mt-6 bg-white p-4 rounded-md text-center shadow-sm">
              <img
                src="https://picsum.photos/seed/ad_banner/1024/120"
                alt="Advertisement"
                className="w-full rounded"
                loading="lazy"
              />
            </div>
          </section>

          {/* ===== RIGHT SIDEBAR (DESKTOP) ===== */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightSidebar trending={items.slice(6, 10)} />
          </aside>

        </div>
      </div>

      {/* ================= MOBILE BOTTOM SPACE ================= */}
      <div className="h-24" />

    </main>
  );
}
