import type { CSSProperties } from "react";
import { notFound } from "next/navigation";

import { ProjectInfoPanel } from "@/components/projects/project-info-panel";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { fetchProjectById } from "@/lib/projects-api";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const stripHtml = (value: string): string => {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await fetchProjectById(id);

  if (!project) {
    notFound();
  }

  const summaryText = stripHtml(project.description);
  const projectLinks = Array.isArray(project.links) ? project.links : [];

  return (
    <main className="min-h-[calc(100vh-108px)] px-6 py-14 md:py-20 animate-fade-in">
      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[320px_1fr]">
        <ProjectInfoPanel client={project.client} duration={project.duration} tags={project.tags} />

        <div className="grid gap-8">
          <header className="stagger-item rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b] card-hover" style={{ "--stagger-delay": "160ms" } as CSSProperties}>
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">{project.year}</p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-zinc-700">{summaryText}</p>
            {projectLinks.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {projectLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-zinc-950 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-900 transition-all hover:-translate-y-0.5 hover:bg-zinc-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          <ProjectCarousel images={project.images} title={project.title} />

          <article className="stagger-item grid gap-6 rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b]" style={{ "--stagger-delay": "320ms" } as CSSProperties}>
            <section id="overview" className="scroll-mt-24 border-b border-zinc-200 pb-5 animate-fade-up">
              <h2 className="text-2xl font-extrabold text-zinc-950">Project Overview</h2>
              <div
                className="prose prose-zinc mt-3 max-w-none"
                dangerouslySetInnerHTML={{ __html: project.overviewHtml || "<p>No overview yet.</p>" }}
              />
            </section>

            <section id="challenge" className="scroll-mt-24 border-b border-zinc-200 pb-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
              <h2 className="text-2xl font-extrabold text-zinc-950">The Challenge</h2>
              <div
                className="prose prose-zinc mt-3 max-w-none"
                dangerouslySetInnerHTML={{ __html: project.challengeHtml || "<p>No challenge details yet.</p>" }}
              />
            </section>

            <section id="solution" className="scroll-mt-24 animate-fade-up" style={{ animationDelay: "180ms" }}>
              <h2 className="text-2xl font-extrabold text-zinc-950">Our Solution</h2>
              <div
                className="prose prose-zinc mt-3 max-w-none"
                dangerouslySetInnerHTML={{ __html: project.solutionHtml || "<p>No solution details yet.</p>" }}
              />
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
