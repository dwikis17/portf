"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { clearTokenCookie } from "@/lib/auth";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onLogout = () => {
    setIsPending(true);
    clearTokenCookie();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={isPending}
      className="rounded-xl border-2 border-zinc-950 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
}
