"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ReelUploader() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // VIDEO LIMIT: 5 MINUTES
    if (f.type.startsWith("video")) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = URL.createObjectURL(f);
      video.onloadedmetadata = () => {
        if (video.duration > 300) {
          Swal.fire("Error", "Video max length is 5 minutes", "error");
          return;
        }
        setFile(f);
        setPreview(URL.createObjectURL(f));
      };
    } else {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const submit = async () => {
    if (!file && !text) {
      Swal.fire("Error", "Add text, image or video", "warning");
      return;
    }

    const body = new FormData();
    body.append("text", text);
    if (file) body.append("file", file);

    // API placeholder
    await fetch("/api/reels", { method: "POST", body });

    Swal.fire("Uploaded", "Reel posted successfully", "success");
    setText("");
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md space-y-4">
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 border rounded-xl resize-none"
      />

      {preview && (
        <div className="rounded-xl overflow-hidden">
          {file?.type.startsWith("video") ? (
            <video src={preview} controls className="w-full max-h-80" />
          ) : (
            <img src={preview} className="w-full max-h-80 object-cover" />
          )}
        </div>
      )}

      <div className="flex justify-between items-center">
        <input
          type="file"
          accept="image/*,video/*"
          hidden
          id="file"
          onChange={handleFile}
        />
        <label
          htmlFor="file"
          className="cursor-pointer text-sm font-bold text-red-600"
        >
          Add Photo / Video
        </label>

        <button
          onClick={submit}
          className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold"
        >
          Post
        </button>
      </div>
    </div>
  );
}
