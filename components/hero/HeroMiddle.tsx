"use client";

import { useState } from "react";

type Props = {
  videoId?: string;
  category?: string;
};

export default function HeroMiddle({
  videoId = "1LWDqve_Atc",
  category = "Breaking News",
}: Props) {
  const [videoPaused, setVideoPaused] = useState(false);

  return (
    <div className="order-1 lg:order-2 bg-white rounded-md overflow-hidden shadow-2xl">
      {/* ================= VIDEO ================= */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${
            videoPaused ? 0 : 1
          }&mute=1&controls=1&playsinline=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {/* CLICK OVERLAY → STOP AUTOPLAY */}
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={() => setVideoPaused(true)}
        />

        {/* CATEGORY BADGE (OPTIONAL) */}
        {category && (
          <span className="absolute top-3 left-3 bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
