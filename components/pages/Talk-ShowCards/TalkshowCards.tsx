"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* ===============================
   TYPES
=============================== */
type VideoItem = {
  id: number;
  title: string;
};

/* ===============================
   LAZY LOAD AD COMPONENT
=============================== */
function LazyAd({ id }: { id: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return (
    <div
      id={id}
      className="border rounded-lg p-4 text-center min-h-[600px]"
    >
      <p className="font-semibold mb-2 text-sm">
        Sponsored
      </p>

      {visible ? (
        <img
          src="https://via.placeholder.com/160x600?text=Ad"
          alt="Sponsor Ad"
          className="mx-auto"
          loading="lazy"
        />
      ) : (
        <div className="h-[600px] flex items-center justify-center text-gray-400">
          Loading Ad…
        </div>
      )}
    </div>
  );
}

/* ===============================
   MAIN PAGE
=============================== */
export default function TalkShowVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  /* ===============================
     API CALL
  =============================== */
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await res.json();
      setVideos(data);
      setLoading(false);
    };

    fetchVideos();
  }, []);

  /* ===============================
     PAGINATION LOGIC
  =============================== */
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = videos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
      {/* ================= LEFT AD ================= */}
      <aside className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24">
          <LazyAd id="talk-left-ad" />
        </div>
      </aside>

      {/* ================= CONTENT ================= */}
      <section className="col-span-12 lg:col-span-8">
        <h1 className="text-2xl font-bold mb-6">
          Talk Show Videos
        </h1>

        {/* VIDEOS */}
        <div className="grid gap-8 sm:grid-cols-2">
          {currentVideos.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-4 hover:shadow-lg transition"
            >
              {/* VIDEO */}
              <div className="aspect-video w-full mb-3">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* TITLE */}
              <Link
                href={`/talk-show/${item.id}`}
                className="block text-lg font-semibold hover:text-blue-600"
              >
                {item.title}
              </Link>
            </div>
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

            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((page) => (
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
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* ================= RIGHT AD ================= */}
      <aside className="hidden lg:block lg:col-span-2">
        <div className="sticky top-24">
          <LazyAd id="talk-right-ad" />
        </div>
      </aside>
    </main>
  );
}
