"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AdminNav } from "@/components/admin/admin-nav";
import { LogoutButton } from "@/components/admin/logout-button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-2xl border-4 border-zinc-950 bg-zinc-100 p-5 shadow-[0_4px_0_0_#09090b]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">CMS</p>
              <h1 className="text-2xl font-extrabold text-zinc-950 md:text-3xl">HeyDwiki Admin</h1>
            </div>
            <LogoutButton />
          </div>
          <div className="mt-4">
            <AdminNav />
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
