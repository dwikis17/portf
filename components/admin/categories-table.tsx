"use client";

import type { Category } from "@/lib/types";

type CategoriesTableProps = {
  categories: Category[];
  deletingId: string | null;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoriesTable({ categories, deletingId, onEdit, onDelete }: CategoriesTableProps) {
  return (
    <div className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]">
      <h2 className="text-xl font-extrabold text-zinc-950">Categories</h2>

      {categories.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-600">No categories yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-900">
                <th className="px-2 py-2 font-bold">Name</th>
                <th className="px-2 py-2 font-bold">Description</th>
                <th className="px-2 py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-zinc-200 align-top">
                  <td className="px-2 py-3 font-semibold">{category.name}</td>
                  <td className="px-2 py-3 text-zinc-700">{category.description || "-"}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(category)}
                        className="rounded-lg border-2 border-zinc-950 bg-white px-3 py-1 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === category.id}
                        onClick={() => onDelete(category)}
                        className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-1 font-semibold text-red-700 disabled:opacity-60"
                      >
                        {deletingId === category.id ? "Deleting..." : "Delete"}
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
