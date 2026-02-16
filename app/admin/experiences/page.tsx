"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { handleUnauthorized } from "@/components/admin/admin-helpers";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { ExperiencesForm } from "@/components/admin/experiences-form";
import { ExperiencesTable } from "@/components/admin/experiences-table";
import { HttpError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { queries, type ExperienceInput } from "@/lib/queries";
import type { Experience } from "@/lib/types";

type ExperienceSubmitPayload = Omit<ExperienceInput, "employmentType" | "location"> & {
  employmentType: string;
  location: string;
};

export default function AdminExperiencesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [confirmingExperience, setConfirmingExperience] = useState<Experience | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const experiencesQuery = useQuery({
    queryKey: queryKeys.experiences.list(),
    queryFn: queries.listExperiences
  });

  useEffect(() => {
    if (experiencesQuery.error instanceof HttpError && experiencesQuery.error.status === 401) {
      handleUnauthorized(router);
    }
  }, [experiencesQuery.error, router]);

  const saveMutation = useMutation({
    mutationFn: async (payload: { values: ExperienceInput; id?: string }) =>
      payload.id
        ? queries.updateExperience(payload.id, payload.values)
        : queries.createExperience(payload.values),
    onSuccess: async (_experience, payload) => {
      setEditingExperience(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.experiences.list() });
      if (payload.id) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.experiences.detail(payload.id) });
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => queries.deleteExperience(id),
    onSuccess: async (_, id) => {
      setConfirmingExperience(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.experiences.list() });
      await queryClient.invalidateQueries({ queryKey: queryKeys.experiences.detail(id) });
    }
  });

  const onSubmit = async (values: ExperienceSubmitPayload) => {
    setErrorMessage(null);

    try {
      const payload = {
        company: values.company.trim(),
        role: values.role.trim(),
        employmentType: values.employmentType.trim() ? values.employmentType.trim() : null,
        location: values.location.trim() ? values.location.trim() : null,
        startMonth: values.startMonth,
        endMonth: values.endMonth,
        isCurrent: values.isCurrent,
        summaryHtml: values.summaryHtml,
        highlights: values.highlights,
        techTags: values.techTags,
        links: values.links,
        sortOrder: values.sortOrder
      };
      await saveMutation.mutateAsync({ values: payload, id: editingExperience?.id });
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }

      setErrorMessage(error instanceof HttpError ? error.message : "Failed to save experience.");
    }
  };

  const performDelete = async () => {
    if (!confirmingExperience) {
      return;
    }

    setDeletingId(confirmingExperience.id);
    setErrorMessage(null);

    try {
      await deleteMutation.mutateAsync(confirmingExperience.id);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to delete experience.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1fr_1.45fr]">
        <ExperiencesForm
          initialExperience={editingExperience}
          isSaving={saveMutation.isPending}
          errorMessage={errorMessage}
          onCancelEdit={() => setEditingExperience(null)}
          onSubmit={onSubmit}
        />

        {experiencesQuery.isLoading ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-700 shadow-[0_4px_0_0_#09090b]">
            Loading experiences...
          </div>
        ) : (
          <ExperiencesTable
            experiences={experiencesQuery.data || []}
            deletingId={deletingId}
            onEdit={(experience) => {
              setEditingExperience(experience);
              setErrorMessage(null);
            }}
            onDelete={(experience) => setConfirmingExperience(experience)}
          />
        )}
      </section>

      <DeleteConfirmDialog
        open={Boolean(confirmingExperience)}
        itemType="experience"
        itemLabel={confirmingExperience?.company || "this experience"}
        isDeleting={Boolean(confirmingExperience && deletingId === confirmingExperience.id)}
        onCancel={() => setConfirmingExperience(null)}
        onConfirm={performDelete}
      />
    </>
  );
}
