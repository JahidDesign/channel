"use client";

import { useEffect, useState } from "react";
import NewsCard from "../../../components/NewsCard";

/* ===============================
   TYPES
=============================== */
type News = {
  id: number;
  title: string;
  body: string;
};

export default function CategoryPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading…
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Category News
        </h1>

        {/* ================= GRID ================= */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
