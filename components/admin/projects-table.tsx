"use client";

import type { Project } from "@/lib/types";

type ProjectsTableProps = {
  projects: Project[];
  deletingId: string | null;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export function ProjectsTable({ projects, deletingId, onEdit, onDelete }: ProjectsTableProps) {
  const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  return (
    <div className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]">
      <h2 className="text-xl font-extrabold text-zinc-950">Projects</h2>

      {projects.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-600">No projects yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-900">
                <th className="px-2 py-2 font-bold">Title</th>
                <th className="px-2 py-2 font-bold">Year</th>
                <th className="px-2 py-2 font-bold">Client</th>
                <th className="px-2 py-2 font-bold">Tags</th>
                <th className="px-2 py-2 font-bold">Links</th>
                <th className="px-2 py-2 font-bold">Description</th>
                <th className="px-2 py-2 font-bold">Images</th>
                <th className="px-2 py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-zinc-200 align-top">
                  <td className="px-2 py-3 font-semibold">{project.title}</td>
                  <td className="px-2 py-3 text-zinc-700">{project.year}</td>
                  <td className="px-2 py-3 text-zinc-700">{project.client || "-"}</td>
                  <td className="px-2 py-3 text-zinc-700">{project.tags.length}</td>
                  <td className="px-2 py-3 text-zinc-700">{project.links.length}</td>
                  <td className="px-2 py-3 text-zinc-700">{stripHtml(project.description)}</td>
                  <td className="px-2 py-3 text-zinc-700">{project.images.length}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(project)}
                        className="rounded-lg border-2 border-zinc-950 bg-white px-3 py-1 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === project.id}
                        onClick={() => onDelete(project)}
                        className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-1 font-semibold text-red-700 disabled:opacity-60"
                      >
                        {deletingId === project.id ? "Deleting..." : "Delete"}
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
