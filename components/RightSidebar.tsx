'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type SidebarItem = {
  id: string;
  title: string;
  subtitle: string;
  img: string;
};

const ITEMS_PER_PAGE = 6;

export default function RightSidebar() {
  const [items, setItems] = useState<SidebarItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ================= FETCH TRENDING ================= */
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();

        const mapped: SidebarItem[] = data.map((item: any) => ({
          id: String(item.id),
          title: item.title,
          subtitle: `Post #${item.id}`,
          img: `https://picsum.photos/seed/${item.id}/400/300`,
        }));

        setItems(mapped);
      } catch (error) {
        console.error('Failed to fetch articles', error);
      }
    };

    fetchArticles();
  }, []);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = items.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const prevPage = () =>
    setCurrentPage((p) => Math.max(1, p - 1));

  const nextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  /* ================= NEWSLETTER ================= */
  const handleSubscribe = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setSuccess(false);

      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'newsletter',
          createdAt: new Date().toISOString(),
        }),
      });

      setSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter submit failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="hidden lg:block space-y-4">

      {/* ================= TOP STORIES ================= */}
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Top Stories</h3>

          {/* ARROW PAGINATION */}
          {totalPages > 1 && (
            <div className="flex gap-1">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-1 border rounded disabled:opacity-40"
              >
                ←
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-1 border rounded disabled:opacity-40"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {visibleItems.map((item) => (
            <Link
              key={item.id}
              href={`/article/${item.id}`}
              className="group flex gap-3"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-red-600 transition">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  {item.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= ADVERTISEMENT ================= */}
      <div className="bg-white p-3 rounded-xl shadow-sm text-center">
        <div className="text-xs font-bold">Advertisement</div>
        <img
          src="https://picsum.photos/seed/ad_desktop/300/200"
          className="w-full mt-2 rounded-lg"
          alt="Advertisement"
        />
      </div>

      {/* ================= NEWSLETTER ================= */}
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <h4 className="text-sm font-bold mb-2">Newsletter</h4>
        <p className="text-xs text-gray-500 mb-2">
          Subscribe for the latest updates
        </p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="mt-2 w-full bg-red-600 text-white rounded px-2 py-1 text-sm font-semibold disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Subscribe'}
        </button>

        {success && (
          <p className="text-green-600 text-xs mt-2">
            Subscribed successfully ✔
          </p>
        )}
      </div>
    </aside>
  );
}
