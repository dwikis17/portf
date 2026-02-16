"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { handleUnauthorized } from "@/components/admin/admin-helpers";
import { BlogsForm } from "@/components/admin/blogs-form";
import { BlogsTable } from "@/components/admin/blogs-table";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { HttpError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { queries, type BlogInput } from "@/lib/queries";
import type { Blog, Category } from "@/lib/types";

export default function AdminBlogsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [confirmingBlog, setConfirmingBlog] = useState<Blog | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const blogsQuery = useQuery({
    queryKey: queryKeys.blogs.list({ page: 1, limit: 100 }),
    queryFn: () => queries.listBlogs()
  });

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: queries.listCategories
  });

  useEffect(() => {
    if (blogsQuery.error instanceof HttpError && blogsQuery.error.status === 401) {
      handleUnauthorized(router);
    }
    if (categoriesQuery.error instanceof HttpError && categoriesQuery.error.status === 401) {
      handleUnauthorized(router);
    }
  }, [blogsQuery.error, categoriesQuery.error, router]);

  const saveMutation = useMutation({
    mutationFn: async (payload: { values: BlogInput; id?: string }) =>
      payload.id ? queries.updateBlog(payload.id, payload.values) : queries.createBlog(payload.values),
    onSuccess: async (_blog, payload) => {
      setEditingBlog(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.list({ page: 1, limit: 100 }) });
      if (payload.id) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.detail(payload.id) });
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => queries.deleteBlog(id),
    onSuccess: async (_, id) => {
      setConfirmingBlog(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.list({ page: 1, limit: 100 }) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.detail(id) });
    }
  });

  const onSubmit = async (values: BlogInput) => {
    setErrorMessage(null);

    if (!values.categoryId) {
      setErrorMessage("Category is required.");
      return;
    }

    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        images: values.images,
        categoryId: values.categoryId
      };
      await saveMutation.mutateAsync({ values: payload, id: editingBlog?.id });
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to save blog.");
    }
  };

  const performDelete = async () => {
    if (!confirmingBlog) {
      return;
    }

    setDeletingId(confirmingBlog.id);
    setErrorMessage(null);

    try {
      await deleteMutation.mutateAsync(confirmingBlog.id);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to delete blog.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <BlogsForm
          categories={categoriesQuery.data || []}
          initialBlog={editingBlog}
          isSaving={saveMutation.isPending}
          errorMessage={errorMessage}
          onAuthError={() => handleUnauthorized(router)}
          onCancelEdit={() => setEditingBlog(null)}
          onSubmit={onSubmit}
        />

        {blogsQuery.isLoading || categoriesQuery.isLoading ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-700 shadow-[0_4px_0_0_#09090b]">
            Loading blogs...
          </div>
        ) : (
          <BlogsTable
            blogs={blogsQuery.data || []}
            deletingId={deletingId}
            onEdit={(blog) => {
              setEditingBlog(blog);
              setErrorMessage(null);
            }}
            onDelete={(blog) => setConfirmingBlog(blog)}
          />
        )}
      </section>

      <DeleteConfirmDialog
        open={Boolean(confirmingBlog)}
        itemType="blog"
        itemLabel={confirmingBlog?.title || "this blog"}
        isDeleting={Boolean(confirmingBlog && deletingId === confirmingBlog.id)}
        onCancel={() => setConfirmingBlog(null)}
        onConfirm={performDelete}
      />
    </>
  );
}
