"use client";

import { useEffect, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type ProjectSectionsNavProps = {
  items: NavItem[];
};

export function ProjectSectionsNav({ items }: ProjectSectionsNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.2, 0.5, 0.8] }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="grid gap-2">
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-all ${
              active
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-300 bg-zinc-50 text-zinc-700 hover:-translate-y-0.5 hover:border-zinc-950"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}
