"use client";

import type { Blog } from "@/lib/types";

type BlogsTableProps = {
  blogs: Blog[];
  deletingId: string | null;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
};

export function BlogsTable({ blogs, deletingId, onEdit, onDelete }: BlogsTableProps) {
  return (
    <div className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]">
      <h2 className="text-xl font-extrabold text-zinc-950">Blogs</h2>

      {blogs.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-600">No blogs yet.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-900">
                <th className="px-2 py-2 font-bold">Title</th>
                <th className="px-2 py-2 font-bold">Category</th>
                <th className="px-2 py-2 font-bold">Images</th>
                <th className="px-2 py-2 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-zinc-200 align-top">
                  <td className="px-2 py-3 font-semibold">{blog.title}</td>
                  <td className="px-2 py-3 text-zinc-700">{blog.category?.name || blog.categoryId}</td>
                  <td className="px-2 py-3 text-zinc-700">{blog.images.length}</td>
                  <td className="px-2 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(blog)}
                        className="rounded-lg border-2 border-zinc-950 bg-white px-3 py-1 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === blog.id}
                        onClick={() => onDelete(blog)}
                        className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-1 font-semibold text-red-700 disabled:opacity-60"
                      >
                        {deletingId === blog.id ? "Deleting..." : "Delete"}
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
