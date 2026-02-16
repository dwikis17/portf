"use client";

import type { CSSProperties } from "react";
import { useQuery } from "@tanstack/react-query";

import { CustomCard } from "@/components/custom-card";
import Hero from "@/components/hero";
import { queryKeys } from "@/lib/query-keys";
import { queries } from "@/lib/queries";
import type { Project } from "@/lib/types";

const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const truncate = (value: string, limit: number): string =>
  value.length <= limit ? value : `${value.slice(0, limit - 1).trimEnd()}...`;

type ProjectYearGroup = { year: number; projects: Project[] };

const groupProjectsByYear = (projects: Project[]): ProjectYearGroup[] => {
  const groups = new Map<number, Project[]>();
  for (const project of projects) {
    const current = groups.get(project.year) || [];
    current.push(project);
    groups.set(project.year, current);
  }
  return Array.from(groups.entries())
    .map(([year, items]) => ({ year, projects: items }))
    .sort((a, b) => b.year - a.year);
};

export function HomeProjects() {
  const projectsQuery = useQuery({
    queryKey: queryKeys.projects.list({ page: 1, limit: 100 }),
    queryFn: queries.listProjects
  });

  const projectGroups = groupProjectsByYear(projectsQuery.data || []);

  return (
    <main className="min-h-[calc(100vh-108px)] px-6 py-14 md:py-20 animate-fade-in">
      <Hero />

      <section className="mx-auto mt-20 w-full max-w-6xl animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950 md:text-4xl">Projects</h2>
          <p className="text-sm font-semibold text-zinc-600">Highlights by year</p>
        </div>

        {projectsQuery.isLoading ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-600 shadow-[0_4px_0_0_#09090b]">
            Loading projects...
          </div>
        ) : projectGroups.length === 0 ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-600 shadow-[0_4px_0_0_#09090b]">
            No projects published yet.
          </div>
        ) : (
          <div className="grid gap-10">
            {projectGroups.map((group, groupIndex) => (
              <section
                key={group.year}
                className="grid gap-5 stagger-item"
                style={{ "--stagger-delay": `${260 + groupIndex * 80}ms` } as CSSProperties}
              >
                <div className="flex items-center justify-between gap-4 border-b-4 border-zinc-950 pb-2">
                  <h3 className="text-2xl font-extrabold text-zinc-950">{group.year}</h3>
                  <span className="rounded-full border-2 border-zinc-950 bg-zinc-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-700">
                    {group.projects.length} Highlight{group.projects.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {group.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="stagger-item"
                      style={{ "--stagger-delay": `${320 + index * 70}ms` } as CSSProperties}
                    >
                      <CustomCard
                        title={project.title}
                        description={truncate(stripHtml(project.description), 120)}
                        imageSrc={project.images[0]}
                        imageAlt={project.title}
                        links={project.links}
                        href={`/projects/${project.id}`}
                        className="max-w-[340px]"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

