"use client";

import { useEffect, useState } from "react";

import { ImageListEditor } from "@/components/admin/image-list-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { Blog, Category } from "@/lib/types";

type BlogFormValues = {
  title: string;
  description: string;
  images: string[];
  categoryId: string;
};

type BlogsFormProps = {
  categories: Category[];
  initialBlog?: Blog | null;
  isSaving: boolean;
  errorMessage?: string | null;
  onCancelEdit?: () => void;
  onAuthError: () => void;
  onSubmit: (values: BlogFormValues) => void;
};

export function BlogsForm({
  categories,
  initialBlog,
  isSaving,
  errorMessage,
  onCancelEdit,
  onAuthError,
  onSubmit
}: BlogsFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (initialBlog) {
      setTitle(initialBlog.title);
      setDescription(initialBlog.description);
      setImages(initialBlog.images);
      setCategoryId(initialBlog.categoryId);
      return;
    }

    setTitle("");
    setDescription("");
    setImages([]);
    setCategoryId(categories[0]?.id || "");
  }, [initialBlog, categories]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ title, description, images, categoryId });
      }}
      className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]"
    >
      <h2 className="text-xl font-extrabold text-zinc-950">
        {initialBlog ? "Edit Blog" : "Create Blog"}
      </h2>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-2 text-sm font-semibold">
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <RichTextEditor
          label="Description"
          value={description}
          onChange={setDescription}
          minHeight={180}
        />

        <label className="grid gap-2 text-sm font-semibold">
          Category
          <select
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <ImageUploader
          folder="blogs"
          onUnauthorized={onAuthError}
          onUploaded={(links) => setImages((previous) => [...previous, ...links])}
        />

        <ImageListEditor
          images={images}
          onRemove={(index) => {
            setImages((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
          }}
        />
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-lg border-2 border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={isSaving || categories.length === 0}
          className="rounded-xl border-2 border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSaving ? "Saving..." : initialBlog ? "Update Blog" : "Create Blog"}
        </button>

        {initialBlog ? (
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
