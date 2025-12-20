'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type SidebarItem = {
  id: string;
  title: string;
  subtitle: string;
  img: string;
};

const POSTS_PER_PAGE = 4;

export default function LeftSidebar() {
  const [items, setItems] = useState<SidebarItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const visibleItems = items.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE);
  };

  return (
    <aside className="hidden lg:block">
      <div className="space-y-4">

        {/* POSTS */}
        {visibleItems.map(post => (
          <Link
            key={post.id}
            href={`/article/${post.id}`}
            className="group flex gap-3 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
            />

            <div className="flex-1">
              <h4 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-red-600 transition">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {post.subtitle}
              </p>
            </div>
          </Link>
        ))}

        {/* LOADING */}
        {loading && (
          <p className="text-sm text-gray-500 text-center">
            Loading posts...
          </p>
        )}

        {/* LOAD MORE (DOWN ARROW) */}
        {visibleCount < items.length && (
          <button
            onClick={loadMore}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition"
          >
            Load More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

      </div>
    </aside>
  );
}
