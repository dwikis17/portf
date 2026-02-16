"use client";

import type { CSSProperties } from "react";

import { ProjectSectionsNav } from "@/components/projects/project-sections-nav";

type ProjectInfoPanelProps = {
  client: string | null;
  duration: string | null;
  tags: string[];
};

const sectionItems = [
  { id: "overview", label: "Project Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "Our Solution" }
];

export function ProjectInfoPanel({ client, duration, tags }: ProjectInfoPanelProps) {
  return (
    <aside className="grid gap-4 lg:sticky lg:top-8 lg:self-start">
      <div className="stagger-item card-hover rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]" style={{ "--stagger-delay": "120ms" } as CSSProperties}>
        <h2 className="text-2xl font-extrabold text-zinc-950">Project Info</h2>

        <dl className="mt-4 grid gap-3 text-sm text-zinc-700">
          <div className="grid gap-1">
            <dt className="font-bold text-zinc-950">Client</dt>
            <dd>{client || "-"}</dd>
          </div>
          <div className="grid gap-1 border-b border-zinc-200 pb-3">
            <dt className="font-bold text-zinc-950">Duration</dt>
            <dd>{duration || "-"}</dd>
          </div>
        </dl>

        <h3 className="mt-4 text-lg font-extrabold text-zinc-950">Technologies</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <span className="text-sm text-zinc-500">No tags provided.</span>
          ) : (
            tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800"
              >
                {tag}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="stagger-item card-hover rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]" style={{ "--stagger-delay": "190ms" } as CSSProperties}>
        <h2 className="text-2xl font-extrabold text-zinc-950">Table of Contents</h2>
        <div className="mt-4">
          <ProjectSectionsNav items={sectionItems} />
        </div>
      </div>
    </aside>
  );
}
