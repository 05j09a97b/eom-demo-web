"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    if (email === "doctor@doctor.com" && password === "password1234") {
      document.cookie = "auth=true; path=/";
      router.push("/predict");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-xl font-semibold mb-4">
        Demo Login
      </h1>

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
