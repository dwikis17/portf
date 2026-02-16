"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { pageview } from "@/lib/analytics";

export function GaPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) {
      return;
    }

    const query = searchParams.toString();
    const currentPath = query ? `${pathname}?${query}` : pathname;

    pageview(window.location.origin + currentPath);
  }, [pathname, searchParams]);

  return null;
}
