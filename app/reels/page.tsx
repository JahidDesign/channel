"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Plus, X, Upload, Sparkles } from "lucide-react";

/* ---------------- UPLOAD MODAL ---------------- */
function UploadModal({ open, onClose, onUpload }) {
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!open && !isClosing) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white border border-gray-200 p-6 rounded-3xl w-full max-w-md shadow-2xl transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black">Create Reel</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block font-medium">Video URL</label>
            <input
              placeholder="https://example.com/video.mp4"
              className="w-full bg-gray-50 border border-gray-200 text-black p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block font-medium">Caption</label>
            <textarea
              placeholder="Write a caption..."
              className="w-full bg-gray-50 border border-gray-200 text-black p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none h-24"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-black p-3 rounded-xl font-medium transition-all"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/30"
            onClick={() => {
              if (url && caption) {
                onUpload({ url, caption });
                setUrl("");
                setCaption("");
                handleClose();
              }
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- REEL ---------------- */
function Reel({ video, onLike, onView }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [showHeart, setShowHeart] = useState(false);
  const lastTap = useRef(0);

  useEffect(() => {
    onView(video.id);
  }, []);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300 && !liked) {
      setLiked(true);
      setLikes(v => v + 1);
      onLike(video.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
    lastTap.current = now;
  };

  const handleLikeButton = (e) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikes(v => v - 1);
    } else {
      setLiked(true);
      setLikes(v => v + 1);
      onLike(video.id);
    }
  };

  return (
    <div
      onClick={handleTap}
      className="relative h-screen w-full bg-white flex justify-center snap-start overflow-hidden"
    >
      <div className="relative h-full w-full max-w-[430px]">
        <video
          src={video.url}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />

        {/* GRADIENT OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/10 pointer-events-none" />

        {/* DOUBLE TAP HEART */}
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart 
              className="w-32 h-32 text-red-500 animate-ping" 
              fill="red"
              style={{ animationDuration: '0.6s', animationIterationCount: '1' }}
            />
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="absolute right-3 bottom-32 flex flex-col gap-5">
          <button
            onClick={handleLikeButton}
            className="group relative"
          >
            <div className={`p-3 rounded-full backdrop-blur-md bg-white/90 border border-gray-200 shadow-lg transition-all duration-300 ${
              liked ? 'scale-110' : 'hover:scale-110 hover:bg-white'
            }`}>
              <Heart 
                className={`w-7 h-7 transition-all duration-300 ${
                  liked ? 'fill-red-500 text-red-500' : 'text-gray-800'
                }`}
              />
            </div>
            <p className="text-xs text-center text-black font-semibold mt-1 drop-shadow-md">
              {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
            </p>
          </button>

          <button className="group relative">
            <div className="p-3 rounded-full backdrop-blur-md bg-white/90 border border-gray-200 shadow-lg hover:scale-110 hover:bg-white transition-all duration-300">
              <MessageCircle className="w-7 h-7 text-gray-800" />
            </div>
            <p className="text-xs text-center text-black font-semibold mt-1 drop-shadow-md">
              {video.comments >= 1000 ? `${(video.comments / 1000).toFixed(1)}k` : video.comments}
            </p>
          </button>

          <button className="group relative">
            <div className="p-3 rounded-full backdrop-blur-md bg-white/90 border border-gray-200 shadow-lg hover:scale-110 hover:bg-white transition-all duration-300">
              <Share2 className="w-7 h-7 text-gray-800" />
            </div>
            <p className="text-xs text-center text-black font-semibold mt-1 drop-shadow-md">
              {video.shares >= 1000 ? `${(video.shares / 1000).toFixed(1)}k` : video.shares}
            </p>
          </button>

          <button className="group relative">
            <div className="p-3 rounded-full backdrop-blur-md bg-white/90 border border-gray-200 shadow-lg hover:scale-110 hover:bg-white transition-all duration-300">
              <Bookmark className="w-7 h-7 text-gray-800" />
            </div>
          </button>
        </div>

        {/* USER INFO & CAPTION */}
        <div className="absolute bottom-20 left-4 right-20">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm text-white">
                {video.user[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-bold text-base text-black">@{video.user}</p>
              </div>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed mb-2">{video.caption}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Sparkles className="w-3 h-3" />
              <span>{video.views >= 1000 ? `${(video.views / 1000).toFixed(1)}k` : video.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function ReelsPage() {
  const [reels, setReels] = useState([
    {
      id: 1,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      user: "alex",
      caption: "Amazing sunset vibes 🌅 #nature #beautiful",
      likes: 1234,
      comments: 89,
      shares: 45,
      views: 5678
    },
    {
      id: 2,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      user: "jordan",
      caption: "Living my best life ✨ #travel #adventure",
      likes: 2341,
      comments: 156,
      shares: 78,
      views: 8901
    },
    {
      id: 3,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      user: "sam",
      caption: "Can't stop watching this! 🔥 #viral #trending",
      likes: 5678,
      comments: 234,
      shares: 123,
      views: 12345
    }
  ]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const indexRef = useRef(0);
  let touchStartY = 0;

  const uploadReel = ({ url, caption }) => {
    const newReel = {
      id: Date.now(),
      url,
      caption,
      user: "alex",
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    };
    setReels(prev => [newReel, ...prev]);
  };

  const likeReel = (id) => {
    console.log("Liked reel:", id);
  };

  const viewReel = (id) => {
    console.log("Viewed reel:", id);
  };

  const scrollToIndex = (i) => {
    containerRef.current?.scrollTo({
      top: i * window.innerHeight,
      behavior: "smooth"
    });
  };

  const next = () => {
    if (indexRef.current < reels.length - 1) {
      indexRef.current++;
      scrollToIndex(indexRef.current);
    }
  };

  const prev = () => {
    if (indexRef.current > 0) {
      indexRef.current--;
      scrollToIndex(indexRef.current);
    }
  };

  useEffect(() => {
    const onWheel = e => {
      e.preventDefault();
      if (e.deltaY > 0) next();
      else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [reels]);

  return (
    <div
      ref={containerRef}
      className="h-screen bg-white overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onTouchStart={e => (touchStartY = e.touches[0].clientY)}
      onTouchEnd={e => {
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (diff > 50) next();
        if (diff < -50) prev();
      }}
    >
      {reels.map(r => (
        <Reel
          key={r.id}
          video={r}
          onLike={likeReel}
          onView={viewReel}
        />
      ))}

      {/* UPLOAD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </div>
      </button>

      <UploadModal
        open={open}
        onClose={() => setOpen(false)}
        onUpload={uploadReel}
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}