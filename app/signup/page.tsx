"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    photo: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm({ ...form, photo: file });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill all required fields",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("password", form.password);
      body.append("address", form.address);
      if (form.photo) body.append("photo", form.photo);

      const res = await fetch("https://api.dxntv.com/auth/signup", {
        method: "POST",
        body,
      });

      if (!res.ok) throw new Error("Signup failed");

      Swal.fire({
        icon: "success",
        title: "Account created 🎉",
        text: "Welcome to DXN TV",
        confirmButtonColor: "#dc2626",
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: "Please try again later",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-black text-center text-gray-900">
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Join DXN TV News Network
        </p>

        {/* PHOTO UPLOAD */}
        <div className="mt-6 flex justify-center">
          <label className="cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden hover:border-red-500 transition">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400 text-center px-2">
                  Upload Photo
                </span>
              )}
            </div>
            <input type="file" accept="image/*" hidden onChange={handlePhoto} />
          </label>
        </div>

        {/* FORM */}
        <div className="mt-6 space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address (optional)"
            className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-pink-600 to-red-600 text-white font-bold hover:shadow-xl hover:shadow-red-500/40 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE SIGNUP (INLINE SVG) */}
        <button
          className="w-full py-3 rounded-xl border-2 border-gray-300 font-bold flex items-center justify-center gap-3 hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] transition-all"
          onClick={() =>
            Swal.fire({
              icon: "info",
              title: "Google Signup",
              text: "Google authentication will be connected soon",
              confirmButtonColor: "#dc2626",
            })
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.67 1.22 9.15 3.6l6.85-6.85C35.82 2.62 30.28 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.64-.15-3.22-.43-4.75H24v9.02h12.95c-.56 3.02-2.24 5.58-4.76 7.3l7.3 5.68C43.93 37.36 46.98 31.53 46.98 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.41c-.48-1.45-.76-2.99-.76-4.41s.27-2.96.76-4.41l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.6l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.3-5.68c-2.02 1.36-4.6 2.16-8.6 2.16-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>

          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-sm mt-6 text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 font-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
