import type { CSSProperties } from "react";

import { fetchExperiences } from "@/lib/projects-api";

const formatMonth = (value: string | null): string => {
  if (!value) {
    return "Present";
  }

  const [year, month] = value.split("-");
  const monthIndex = Number(month) - 1;
  const date = new Date(Number(year), monthIndex, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export default async function ExperiencePage() {
  const experiences = await fetchExperiences();

  return (
    <main className="min-h-[calc(100vh-108px)] px-6 py-14 md:py-20 animate-fade-in">
      <section className="mx-auto w-full max-w-6xl">
        <header className="stagger-item mb-8 rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b]">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">Experience</h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-zinc-700">
            A timeline of roles, outcomes, and technologies I used to ship products and scale systems.
          </p>
        </header>

        {experiences.length === 0 ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-600 shadow-[0_4px_0_0_#09090b]">
            No experiences published yet.
          </div>
        ) : (
          <div className="relative grid gap-6">
            <div className="pointer-events-none absolute bottom-0 left-6 top-0 hidden w-1 rounded-full bg-zinc-300 md:block" />

            {experiences.map((experience, index) => (
              <article
                key={experience.id}
                className="stagger-item relative rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b]"
                style={{ "--stagger-delay": `${120 + index * 80}ms` } as CSSProperties}
              >
                <div className="absolute left-[17px] top-8 hidden h-4 w-4 rounded-full border-2 border-zinc-950 bg-white md:block" />
                <div className="grid gap-4 md:pl-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-extrabold text-zinc-950">
                        {experience.role} <span className="text-zinc-600">@ {experience.company}</span>
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-zinc-600">
                        {formatMonth(experience.startMonth)} -{" "}
                        {experience.isCurrent ? "Present" : formatMonth(experience.endMonth)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-700">
                      {experience.employmentType ? (
                        <span className="rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1">
                          {experience.employmentType}
                        </span>
                      ) : null}
                      {experience.location ? (
                        <span className="rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1">
                          {experience.location}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div
                    className="prose prose-zinc max-w-none"
                    dangerouslySetInnerHTML={{ __html: experience.summaryHtml || "<p>No summary available.</p>" }}
                  />

                  {experience.highlights.length > 0 ? (
                    <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
                      {experience.highlights.map((item, itemIndex) => (
                        <li key={`${experience.id}-highlight-${itemIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {experience.techTags.map((tag) => (
                      <span
                        key={`${experience.id}-${tag}`}
                        className="rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {experience.links.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {experience.links.map((link) => (
                        <a
                          key={`${experience.id}-${link.url}`}
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
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
