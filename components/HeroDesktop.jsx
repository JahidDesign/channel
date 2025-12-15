"use client";

import { useState } from "react";
import Link from "next/link";

export default function HeroDesktop({
  main = {},
  leftList = [],
  rightList = [],
}) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Safe defaults
  const mainArticle = {
    id: main.id || "main-1",
    img: main.img || "https://via.placeholder.com/1200x675",
    title: main.title || "Breaking News Story",
    subtitle:
      main.subtitle || "Read the latest updates on this developing story",
    category: main.category,
    author: main.author,
    date: main.date,
  };

  return (
    <section className="bg-red-700 text-white rounded-md overflow-hidden shadow-xl">
      <div className="container-desktop px-4 py-6 lg:py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* LEFT LIST */}
          <div className="space-y-3 order-2 lg:order-1">
            {leftList.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}`}
                className="group bg-white text-black rounded-md p-2 flex gap-3 items-center
                           hover:shadow-lg hover:scale-[1.02] transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(item.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-red-700">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* MAIN HERO (FIRST ON MOBILE) */}
          <div className="order-1 lg:order-2 bg-white rounded-md overflow-hidden shadow-2xl">
            <Link
              href={`/article/${mainArticle.id}`}
              className="group block focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-md"
            >
              <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
                {!imageErrors[mainArticle.id] ? (
                  <img
                    src={mainArticle.img}
                    alt={mainArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleImageError(mainArticle.id)}
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}

                {mainArticle.category && (
                  <span className="absolute top-3 left-3 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {mainArticle.category}
                  </span>
                )}
              </div>

              <div className="p-4 text-black">
                <h2 className="text-lg lg:text-xl font-bold group-hover:text-red-700 line-clamp-3">
                  {mainArticle.title}
                </h2>

                {mainArticle.subtitle && (
                  <p className="text-xs lg:text-sm text-gray-600 mt-2 line-clamp-2">
                    {mainArticle.subtitle}
                  </p>
                )}

                {(mainArticle.author || mainArticle.date) && (
                  <div className="mt-3 text-xs text-gray-500 flex gap-3">
                    {mainArticle.author && <span>{mainArticle.author}</span>}
                    {mainArticle.date && <span>{mainArticle.date}</span>}
                  </div>
                )}

                <div className="mt-3 text-red-700 text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More →
                </div>
              </div>
            </Link>
          </div>

          {/* RIGHT LIST */}
          <div className="space-y-3 order-3">
            {rightList.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}`}
                className="group bg-white text-black rounded-md p-2 flex gap-3 items-center
                           hover:shadow-lg hover:scale-[1.02] transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(item.id)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold line-clamp-2 group-hover:text-red-700">
                    {item.title}
                  </h3>
                  {item.category && (
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                      {item.category}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
