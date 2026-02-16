import type { Experience, PaginatedResponse, Project } from "@/lib/types";

export const getBackendBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  return baseUrl.replace(/\/$/, "").replace(/\/api$/, "");
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/projects?page=1&limit=100`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as PaginatedResponse<Project>;
    return payload.data || [];
  } catch {
    return [];
  }
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/projects/${id}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Project;
  } catch {
    return null;
  }
};

export const fetchExperiences = async (): Promise<Experience[]> => {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/experiences`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as Experience[];
  } catch {
    return [];
  }
};
