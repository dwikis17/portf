"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experiences", label: "Experiences" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/categories", label: "Categories" }
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-3">
      {items.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-xl border-2 border-zinc-950 px-4 py-2 text-sm font-semibold transition-colors",
              active
                ? "bg-zinc-950 text-white"
                : "bg-white text-zinc-900 hover:bg-zinc-100"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
