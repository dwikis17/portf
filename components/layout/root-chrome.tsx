"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";

export function RootChrome() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return null;
  }

  return <Navbar className="hidden pt-4 pb-8 lg:block" />;
}
