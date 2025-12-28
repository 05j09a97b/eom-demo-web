"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // ลบ cookie auth
    document.cookie = "auth=; Max-Age=0; path=/";

    // กลับหน้า Home
    router.push("/");
  }, [router]);

  return (
    <div className="text-center mt-24 text-gray-500">
      Logging out...
    </div>
  );
}
