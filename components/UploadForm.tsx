"use client";

import { useState } from "react";

export default function UploadForm() {
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (file: File) => {
    const videoEl = document.createElement("video");
    videoEl.preload = "metadata";

    videoEl.onloadedmetadata = () => {
      URL.revokeObjectURL(videoEl.src);
      if (videoEl.duration > 180) {
        alert("Video must be 3 minutes or less");
        setVideo(null);
      } else {
        setVideo(file);
      }
    };

    videoEl.src = URL.createObjectURL(file);
  };

  const submit = async () => {
    if (!text && photos.length === 0 && !video) {
      alert("Please upload text, photo, or video");
      return;
    }

    const formData = new FormData();
    if (text) formData.append("text", text);
    photos.forEach((file) => formData.append("photos", file));
    if (video) formData.append("video", video);

    setLoading(true);

    try {
      await fetch("https://api.dxntv.com/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      alert("Uploaded!");
      setText("");
      setPhotos([]);
      setVideo(null);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl rounded-2xl bg-white p-4 shadow-sm border">
      {/* Text */}
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full resize-none border-none text-base focus:ring-0 focus:outline-none min-h-[100px]"
      />

      {/* Actions */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-3">
          {/* Photos */}
          <label className="cursor-pointer rounded-full p-2 hover:bg-slate-100 transition">
            <PhotoIcon />
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) =>
                setPhotos(e.target.files ? Array.from(e.target.files) : [])
              }
            />
          </label>

          {/* Video */}
          <label className="cursor-pointer rounded-full p-2 hover:bg-slate-100 transition">
            <VideoIcon />
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleVideoChange(file);
              }}
            />
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Post"}
        </button>
      </div>

      {/* Meta info */}
      {(photos.length > 0 || video) && (
        <div className="mt-2 text-xs text-slate-500 flex gap-4">
          {photos.length > 0 && <span>{photos.length} photo(s)</span>}
          {video && <span>1 video (≤ 3 min)</span>}
        </div>
      )}
    </div>
  );
}

/* ---------- SVG ICONS ---------- */

function PhotoIcon() {
  return (
    <svg
      className="h-5 w-5 text-slate-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M3 5h4l2-2h6l2 2h4v14H3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg
      className="h-5 w-5 text-slate-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="5" width="15" height="14" rx="2" />
      <path d="M18 9l4-2v10l-4-2z" />
    </svg>
  );
}
