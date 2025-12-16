"use client"
import { useEffect, useRef, useState } from "react"

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [userPaused])

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold mb-3">Video</h1>

      {/* Main Video */}
      <div className="bg-black rounded-md aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src="/sample-news-video.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          controls
          onPause={() => setUserPaused(true)}
          onPlay={() => setUserPaused(false)}
        />
      </div>

      {/* Related videos */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {[1, 2, 3, 4].map((v) => (
          <div
            key={v}
            className="bg-white rounded-md shadow-sm overflow-hidden"
          >
            <img
              src={`https://picsum.photos/seed/video_${v}/600/400`}
              className="w-full h-32 object-cover"
              alt=""
            />
            <div className="text-xs p-2">Sample video {v}</div>
          </div>
        ))}
      </div>

      <div className="h-20" />
    </main>
  )
}
