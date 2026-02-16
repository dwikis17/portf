"use client";

import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "About" },
  { href: "/projects", label: "Portfolio" },
  { href: "/blog", label: "Pages" },
];

export function Navbar({ className }: { className?: string }) {
  return (
    <nav className={cn("animate-fade-in pb-8 pt-4", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="card-hover rounded-[28px] border-4 border-zinc-950 bg-zinc-100 px-5 py-4 shadow-[0_3px_0_0_#09090b]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <Link
              href="/"
              className="animate-pulse-ring flex h-12 w-12 items-center justify-center rounded-full border-4 border-zinc-950 bg-white"
              aria-label="Home"
            >
              <span className="h-5 w-5 rounded-full bg-zinc-950" />
            </Link>

            <nav className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[28px] font-semibold leading-none tracking-tight text-zinc-900 sm:text-[30px] md:text-[32px]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base transition-colors hover:text-zinc-600 sm:text-2xl"
                >
                  {item.label}
                  {item.label === "Pages" ? <span className="ml-2 text-sm align-middle">v</span> : null}
                </Link>
              ))}
            </nav>

            <Link
              href="mailto:dev.dwiki@gmail.com"
              onClick={() =>
                trackEvent("contact_email_click", {
                  location: "navbar",
                  destination: "mailto:dev.dwiki@gmail.com"
                })
              }
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white transition-colors hover:bg-zinc-800"
              aria-label="Email"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
