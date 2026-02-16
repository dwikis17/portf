"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { handleUnauthorized } from "@/components/admin/admin-helpers";
import { CategoriesForm } from "@/components/admin/categories-form";
import { CategoriesTable } from "@/components/admin/categories-table";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { HttpError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { queries } from "@/lib/queries";
import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [confirmingCategory, setConfirmingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: queries.listCategories
  });

  useEffect(() => {
    if (categoriesQuery.error instanceof HttpError && categoriesQuery.error.status === 401) {
      handleUnauthorized(router);
    }
  }, [categoriesQuery.error, router]);

  const saveMutation = useMutation({
    mutationFn: async (payload: { values: { name: string; description?: string }; id?: string }) =>
      payload.id ? queries.updateCategory(payload.id, payload.values) : queries.createCategory(payload.values),
    onSuccess: async (_category, payload) => {
      setEditingCategory(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      if (payload.id) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(payload.id) });
      }
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.list({ page: 1, limit: 100 }) });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => queries.deleteCategory(id),
    onSuccess: async (_, id) => {
      setConfirmingCategory(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories.list() });
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(id) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.blogs.list({ page: 1, limit: 100 }) });
    }
  });

  const onSubmit = async (values: { name: string; description: string }) => {
    setErrorMessage(null);

    try {
      const payload = {
        name: values.name.trim(),
        ...(values.description.trim() ? { description: values.description.trim() } : {})
      };

      await saveMutation.mutateAsync({ values: payload, id: editingCategory?.id });
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to save category.");
    }
  };

  const performDelete = async () => {
    if (!confirmingCategory) {
      return;
    }

    setDeletingId(confirmingCategory.id);
    setErrorMessage(null);

    try {
      await deleteMutation.mutateAsync(confirmingCategory.id);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to delete category.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <CategoriesForm
          initialCategory={editingCategory}
          isSaving={saveMutation.isPending}
          errorMessage={errorMessage}
          onCancelEdit={() => setEditingCategory(null)}
          onSubmit={onSubmit}
        />

        {categoriesQuery.isLoading ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-700 shadow-[0_4px_0_0_#09090b]">
            Loading categories...
          </div>
        ) : (
          <CategoriesTable
            categories={categoriesQuery.data || []}
            deletingId={deletingId}
            onEdit={(category) => {
              setEditingCategory(category);
              setErrorMessage(null);
            }}
            onDelete={(category) => setConfirmingCategory(category)}
          />
        )}
      </section>

      <DeleteConfirmDialog
        open={Boolean(confirmingCategory)}
        itemType="category"
        itemLabel={confirmingCategory?.name || "this category"}
        isDeleting={Boolean(confirmingCategory && deletingId === confirmingCategory.id)}
        onCancel={() => setConfirmingCategory(null)}
        onConfirm={performDelete}
      />
    </>
  );
}
