"use client";

import { useEffect, useState } from "react";

import type { Category } from "@/lib/types";

type CategoryFormValues = {
  name: string;
  description: string;
};

type CategoriesFormProps = {
  initialCategory?: Category | null;
  isSaving: boolean;
  errorMessage?: string | null;
  onCancelEdit?: () => void;
  onSubmit: (values: CategoryFormValues) => void;
};

export function CategoriesForm({
  initialCategory,
  isSaving,
  errorMessage,
  onCancelEdit,
  onSubmit
}: CategoriesFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name);
      setDescription(initialCategory.description || "");
      return;
    }

    setName("");
    setDescription("");
  }, [initialCategory]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ name, description });
      }}
      className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]"
    >
      <h2 className="text-xl font-extrabold text-zinc-950">
        {initialCategory ? "Edit Category" : "Create Category"}
      </h2>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Description (optional)
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-lg border-2 border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl border-2 border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSaving ? "Saving..." : initialCategory ? "Update Category" : "Create Category"}
        </button>

        {initialCategory ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border-2 border-zinc-950 bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
