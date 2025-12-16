"use client";

import { useRef, useEffect, useState } from "react";
import { Reel } from "../types/reel";

export default function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          entry.isIntersecting && !paused
            ? videoRef.current.play()
            : videoRef.current.pause();
        }
      },
      { threshold: 0.6 }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [paused]);

  return (
    <div className="relative h-[85vh] snap-start bg-black rounded-2xl overflow-hidden">
      {reel.videoUrl && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onClick={() => {
            paused
              ? videoRef.current?.play()
              : videoRef.current?.pause();
            setPaused(!paused);
          }}
        />
      )}

      {reel.imageUrl && !reel.videoUrl && (
        <img
          src={reel.imageUrl}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute bottom-4 left-4 text-white">
        <p className="font-bold">@{reel.user.name}</p>
        <p className="text-sm">{reel.text}</p>
      </div>
    </div>
  );
}
