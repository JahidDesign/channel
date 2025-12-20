"use client";

import Link from "next/link";

type News = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  news: News[];
  basePath: string;
};

export default function NewsGrid({ news, basePath }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {news.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border bg-white hover:shadow-lg transition"
        >
          <img
            src={`https://picsum.photos/seed/${basePath}-${item.id}/600/400`}
            alt={item.title}
            className="h-48 w-full object-cover"
          />

          <div className="p-4">
            <Link
              href={`/${basePath}/${item.id}`}
              className="block text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600"
            >
              {item.title}
            </Link>

            <p className="text-sm text-gray-600 line-clamp-3">
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
