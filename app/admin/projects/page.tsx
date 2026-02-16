"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { handleUnauthorized } from "@/components/admin/admin-helpers";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { ProjectsForm } from "@/components/admin/projects-form";
import { ProjectsTable } from "@/components/admin/projects-table";
import { HttpError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { queries, type ProjectInput } from "@/lib/queries";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmingProject, setConfirmingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const projectsQuery = useQuery({
    queryKey: queryKeys.projects.list({ page: 1, limit: 100 }),
    queryFn: queries.listProjects
  });

  useEffect(() => {
    if (projectsQuery.error instanceof HttpError && projectsQuery.error.status === 401) {
      handleUnauthorized(router);
    }
  }, [projectsQuery.error, router]);

  const saveMutation = useMutation({
    mutationFn: async (payload: { values: ProjectInput; id?: string }) =>
      payload.id ? queries.updateProject(payload.id, payload.values) : queries.createProject(payload.values),
    onSuccess: async (_project, payload) => {
      setEditingProject(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.projects.list({ page: 1, limit: 100 }) });
      if (payload.id) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(payload.id) });
      }
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => queries.deleteProject(id),
    onSuccess: async (_, id) => {
      setConfirmingProject(null);
      await queryClient.invalidateQueries({ queryKey: queryKeys.projects.list({ page: 1, limit: 100 }) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(id) });
    }
  });

  const onSubmit = async (values: ProjectInput) => {
    setErrorMessage(null);

    try {
      const payload = {
        title: values.title.trim(),
        description: values.description,
        year: values.year,
        tags: values.tags,
        links: values.links,
        client: values.client.trim() ? values.client.trim() : null,
        duration: values.duration.trim() ? values.duration.trim() : null,
        overviewHtml: values.overviewHtml,
        challengeHtml: values.challengeHtml,
        solutionHtml: values.solutionHtml,
        images: values.images
      };
      await saveMutation.mutateAsync({ values: payload, id: editingProject?.id });
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to save project.");
    }
  };

  const performDelete = async () => {
    if (!confirmingProject) {
      return;
    }

    setDeletingId(confirmingProject.id);
    setErrorMessage(null);

    try {
      await deleteMutation.mutateAsync(confirmingProject.id);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        handleUnauthorized(router);
        return;
      }
      setErrorMessage(error instanceof HttpError ? error.message : "Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <ProjectsForm
          initialProject={editingProject}
          isSaving={saveMutation.isPending}
          errorMessage={errorMessage}
          onAuthError={() => handleUnauthorized(router)}
          onCancelEdit={() => setEditingProject(null)}
          onSubmit={onSubmit}
        />

        {projectsQuery.isLoading ? (
          <div className="rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-700 shadow-[0_4px_0_0_#09090b]">
            Loading projects...
          </div>
        ) : (
          <ProjectsTable
            projects={projectsQuery.data || []}
            deletingId={deletingId}
            onEdit={(project) => {
              setEditingProject(project);
              setErrorMessage(null);
            }}
            onDelete={(project) => setConfirmingProject(project)}
          />
        )}
      </section>

      <DeleteConfirmDialog
        open={Boolean(confirmingProject)}
        itemType="project"
        itemLabel={confirmingProject?.title || "this project"}
        isDeleting={Boolean(confirmingProject && deletingId === confirmingProject.id)}
        onCancel={() => setConfirmingProject(null)}
        onConfirm={performDelete}
      />
    </>
  );
}
