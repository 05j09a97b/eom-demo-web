"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between">
        <span className="font-semibold">
          EOM Risk Prediction
        </span>

        <div className="space-x-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/logout">Logout</Link>
        </div>
      </div>
    </nav>
  );
}
