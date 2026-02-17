"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "About" },
  { href: "/projects", label: "Portfolio" },
  { href: "/blog", label: "Pages" },
];

export function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!canUseDOM) {
      return;
    }

    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, canUseDOM]);

  return (
    <nav className={cn("animate-fade-in relative z-40 pb-8 pt-4", className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="card-hover rounded-[28px] border-4 border-zinc-950 bg-zinc-100 px-5 py-4 shadow-[0_3px_0_0_#09090b]">
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            <Link
              href="/"
              className="animate-pulse-ring flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-zinc-950 bg-white"
              aria-label="Home"
            >
              <span className="h-5 w-5 rounded-full bg-zinc-950" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden flex-1 items-center justify-center gap-x-6 gap-y-2 text-[28px] font-semibold leading-none tracking-tight text-zinc-900 sm:flex sm:text-[30px] md:text-[32px]">
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

            <div className="flex items-center gap-2">
              <Link
                href="mailto:dev.dwiki@gmail.com"
                onClick={() =>
                  trackEvent("contact_email_click", {
                    location: "navbar",
                    destination: "mailto:dev.dwiki@gmail.com"
                  })
                }
                className="hidden h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white transition-colors hover:bg-zinc-800 sm:inline-flex"
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

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white transition-colors hover:bg-zinc-800 sm:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {canUseDOM && isOpen
        ? createPortal(
            <div className="animate-fade-in fixed inset-0 z-[9999] flex min-h-dvh flex-col bg-zinc-100 p-6 sm:hidden">
            {/* Close Button in Overlay */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white transition-colors hover:bg-zinc-800"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-center rounded-2xl border-2 border-zinc-950 bg-zinc-100 py-6 text-2xl font-bold transition-all hover:bg-zinc-200 active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                href="mailto:dev.dwiki@gmail.com"
                className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-zinc-950 py-6 text-xl font-bold text-white transition-all hover:bg-zinc-800 active:scale-95"
                onClick={() => {
                  setIsOpen(false);
                  trackEvent("contact_email_click", {
                    location: "mobile_navbar",
                    destination: "mailto:dev.dwiki@gmail.com"
                  });
                }}
              >
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                Contact Me
              </Link>
            </div>
            </div>,
            document.body
          )
        : null}
    </nav>
  );
}
