"use client";

import type { Experience } from "@/lib/types";

type ExperiencesTableProps = {
  experiences: Experience[];
  deletingId: string | null;
  onEdit: (experience: Experience) => void;
  onDelete: (experience: Experience) => void;
};

const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export function ExperiencesTable({
  experiences,
  deletingId,
  onEdit,
  onDelete
}: ExperiencesTableProps) {
  return (
    <div className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]">
      <h2 className="text-xl font-extrabold text-zinc-950">Experiences</h2>

      {experiences.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-600">No experiences yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-900">
                <th className="px-2 py-2 font-bold">Company</th>
                <th className="px-2 py-2 font-bold">Role</th>
                <th className="px-2 py-2 font-bold">Period</th>
                <th className="px-2 py-2 font-bold">Current</th>
                <th className="px-2 py-2 font-bold">Highlights</th>
                <th className="px-2 py-2 font-bold">Tags</th>
                <th className="px-2 py-2 font-bold">Links</th>
                <th className="px-2 py-2 font-bold">Summary</th>
                <th className="px-2 py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr key={experience.id} className="border-b border-zinc-200 align-top">
                  <td className="px-2 py-3 font-semibold">{experience.company}</td>
                  <td className="px-2 py-3 text-zinc-700">{experience.role}</td>
                  <td className="px-2 py-3 text-zinc-700">
                    {experience.startMonth} - {experience.isCurrent ? "Present" : experience.endMonth || "-"}
                  </td>
                  <td className="px-2 py-3 text-zinc-700">{experience.isCurrent ? "Yes" : "No"}</td>
                  <td className="px-2 py-3 text-zinc-700">{experience.highlights.length}</td>
                  <td className="px-2 py-3 text-zinc-700">{experience.techTags.length}</td>
                  <td className="px-2 py-3 text-zinc-700">{experience.links.length}</td>
                  <td className="px-2 py-3 text-zinc-700">{stripHtml(experience.summaryHtml)}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(experience)}
                        className="rounded-lg border-2 border-zinc-950 bg-white px-3 py-1 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === experience.id}
                        onClick={() => onDelete(experience)}
                        className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-1 font-semibold text-red-700 disabled:opacity-60"
                      >
                        {deletingId === experience.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

