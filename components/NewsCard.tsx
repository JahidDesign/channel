"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ===============================
   TYPES
=============================== */
type News = {
  id: number;
  title: string;
  body: string;
};

/* ===============================
   CARD COMPONENT (LOCAL)
=============================== */
function NewsCard({ id, title, body }: News) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white hover:shadow-lg transition">
      <img
        src={`https://picsum.photos/seed/ent-${id}/600/400`}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <Link
          href={`/entertainment/${id}`}
          className="block text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600"
        >
          {title}
        </Link>

        <p className="text-sm text-gray-600 line-clamp-3">
          {body}
        </p>
      </div>
    </article>
  );
}

/* ===============================
   MAIN PAGE (ONLY DEFAULT EXPORT)
=============================== */
export default function NewsCards() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;

  /* ===============================
     API CALL
  =============================== */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
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
     PAGINATION
  =============================== */
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-500">
        Loading…
      </p>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* ================= GRID ================= */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentNews.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            body={item.body}
          />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 border rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
