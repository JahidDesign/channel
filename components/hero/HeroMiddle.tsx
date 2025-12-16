"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "../lib/types";
import FallbackImage from "./FallbackImage";

type Props = {
  main?: Partial<Article>;
  imageErrors: Record<string, boolean>;
  onError: (id: string) => void;
};

export default function HeroMiddle({ main = {}, imageErrors, onError }: Props) {
  const [videoPaused, setVideoPaused] = useState(false);

  const article: Article = {
    id: main.id || "main-article",
    title: main.title || "Breaking News Story",
    subtitle:
      main.subtitle || "Read the latest updates on this developing story",
    img: main.img || "https://via.placeholder.com/1200x675",
    youtubeId: main.youtubeId,
    category: main.category,
    author: main.author,
    date: main.date,
  };

  return (
    <div className="order-1 lg:order-2 bg-white rounded-md overflow-hidden shadow-2xl">
      <Link
        href={`/article/${article.id}`}
        className="group block focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <div className="relative w-full aspect-video bg-black">
          {article.youtubeId ? (
            <div className="relative w-full h-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${article.youtubeId}?autoplay=${
                  videoPaused ? 0 : 1
                }&mute=1&controls=1&playsinline=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div
                className="absolute inset-0 z-10"
                onClick={() => setVideoPaused(true)}
              />
            </div>
          ) : !imageErrors[article.id] ? (
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => onError(article.id)}
            />
          ) : (
            <FallbackImage />
          )}

          {article.category && (
            <span className="absolute top-3 left-3 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full">
              {article.category}
            </span>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-lg lg:text-xl font-bold group-hover:text-red-700">
            {article.title}
          </h2>

          {article.subtitle && (
            <p className="text-xs lg:text-sm text-gray-600 mt-2">
              {article.subtitle}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
