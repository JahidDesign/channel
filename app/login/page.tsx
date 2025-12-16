"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import GoogleIcon from "../../components/icons/GoogleIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (!email || !password) {
      Swal.fire("Missing fields", "Enter email & password", "warning");
      return;
    }

    try {
      const res = await fetch("https://api.dxntv.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      localStorage.setItem("token", data.token);

      Swal.fire("Success", "Login successful", "success").then(() => {
        window.location.href = "/profile";
      });
    } catch {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 space-y-4">

        <h1 className="text-2xl font-black text-center">Login</h1>

        <input
          className="w-full px-4 py-3 border-2 rounded-xl"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-3 border-2 rounded-xl"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full py-3 rounded-xl bg-red-600 text-white font-bold"
        >
          Login
        </button>

        {/* GOOGLE LOGIN */}
        <button
          className="w-full py-3 rounded-xl border-2 font-bold flex items-center justify-center gap-3 hover:bg-gray-50"
          onClick={() =>
            Swal.fire("Google Login", "Coming soon", "info")
          }
        >
          <GoogleIcon size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
