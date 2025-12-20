"use client";

import { useEffect, useState } from "react";

/* ===============================
   TYPES
=============================== */
type News = {
  id: number;
  title: string;
  body: string;
};

export default function ArticleCard() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  /* ===============================
     API CALL
  =============================== */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /* ===============================
     PAGINATION LOGIC
  =============================== */
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // compact pagination numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading news…
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* HEADER */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Featured News
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Page {currentPage} of {totalPages}
          </p>
        </header>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {currentNews.map((item) => (
            <article
              key={item.id}
              className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img
                src={`https://picsum.photos/seed/news-${item.id}/600/400`}
                alt={item.title}
                className="w-full h-44 object-cover"
                loading="lazy"
              />

              <div className="p-4 flex flex-col h-full">
                <a
                  href={`/entertainment/${item.id}`}
                  className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:underline"
                >
                  {item.title}
                </a>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {item.body}
                </p>

                <span className="mt-auto text-sm text-blue-600 font-medium">
                  Read more →
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <nav
            className="flex justify-center items-center gap-1 mt-10"
            aria-label="Pagination"
          >
            {/* PREV */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs border rounded bg-white disabled:opacity-40"
            >
              Prev
            </button>

            {/* PAGES */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, i) =>
                page === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="px-2 text-xs text-gray-400"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page as number)}
                    className={`w-8 h-8 text-xs border rounded ${
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            {/* NEXT */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs border rounded bg-white disabled:opacity-40"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
