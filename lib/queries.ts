import { apiFetch } from "@/lib/api";
import { getTokenFromCookie } from "@/lib/auth";
import type {
  Blog,
  Category,
  Experience,
  ExternalLink,
  PaginatedResponse,
  Project,
  UploadResponse
} from "@/lib/types";

export type ProjectInput = {
  title: string;
  description: string;
  year: number;
  tags: string[];
  links: ExternalLink[];
  client: string | null;
  duration: string | null;
  overviewHtml: string;
  challengeHtml: string;
  solutionHtml: string;
  images: string[];
};

export type BlogInput = {
  title: string;
  description: string;
  images: string[];
  categoryId: string;
};

export type CategoryInput = {
  name: string;
  description?: string;
};

export type ExperienceInput = {
  company: string;
  role: string;
  employmentType: string | null;
  location: string | null;
  startMonth: string;
  endMonth: string | null;
  isCurrent: boolean;
  summaryHtml: string;
  highlights: string[];
  techTags: string[];
  links: ExternalLink[];
  sortOrder: number;
};

export const queries = {
  async listProjects(): Promise<Project[]> {
    const response = await apiFetch<PaginatedResponse<Project>>("/api/projects?page=1&limit=100");
    return response.data;
  },
  async getProject(id: string): Promise<Project> {
    return apiFetch<Project>(`/api/projects/${id}`);
  },
  async createProject(payload: ProjectInput): Promise<Project> {
    const token = getTokenFromCookie();
    return apiFetch<Project>("/api/projects", { method: "POST", body: JSON.stringify(payload) }, token);
  },
  async updateProject(id: string, payload: ProjectInput): Promise<Project> {
    const token = getTokenFromCookie();
    return apiFetch<Project>(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify(payload) }, token);
  },
  async deleteProject(id: string): Promise<void> {
    const token = getTokenFromCookie();
    return apiFetch<void>(`/api/projects/${id}`, { method: "DELETE" }, token);
  },

  async listBlogs(): Promise<Blog[]> {
    const response = await apiFetch<PaginatedResponse<Blog>>("/api/blogs?page=1&limit=100");
    return response.data;
  },
  async getBlog(id: string): Promise<Blog> {
    return apiFetch<Blog>(`/api/blogs/${id}`);
  },
  async createBlog(payload: BlogInput): Promise<Blog> {
    const token = getTokenFromCookie();
    return apiFetch<Blog>("/api/blogs", { method: "POST", body: JSON.stringify(payload) }, token);
  },
  async updateBlog(id: string, payload: BlogInput): Promise<Blog> {
    const token = getTokenFromCookie();
    return apiFetch<Blog>(`/api/blogs/${id}`, { method: "PATCH", body: JSON.stringify(payload) }, token);
  },
  async deleteBlog(id: string): Promise<void> {
    const token = getTokenFromCookie();
    return apiFetch<void>(`/api/blogs/${id}`, { method: "DELETE" }, token);
  },

  async listCategories(): Promise<Category[]> {
    return apiFetch<Category[]>("/api/categories");
  },
  async getCategory(id: string): Promise<Category> {
    return apiFetch<Category>(`/api/categories/${id}`);
  },
  async createCategory(payload: CategoryInput): Promise<Category> {
    const token = getTokenFromCookie();
    return apiFetch<Category>("/api/categories", { method: "POST", body: JSON.stringify(payload) }, token);
  },
  async updateCategory(id: string, payload: CategoryInput): Promise<Category> {
    const token = getTokenFromCookie();
    return apiFetch<Category>(`/api/categories/${id}`, { method: "PATCH", body: JSON.stringify(payload) }, token);
  },
  async deleteCategory(id: string): Promise<void> {
    const token = getTokenFromCookie();
    return apiFetch<void>(`/api/categories/${id}`, { method: "DELETE" }, token);
  },

  async listExperiences(): Promise<Experience[]> {
    return apiFetch<Experience[]>("/api/experiences");
  },
  async getExperience(id: string): Promise<Experience> {
    return apiFetch<Experience>(`/api/experiences/${id}`);
  },
  async createExperience(payload: ExperienceInput): Promise<Experience> {
    const token = getTokenFromCookie();
    return apiFetch<Experience>("/api/experiences", { method: "POST", body: JSON.stringify(payload) }, token);
  },
  async updateExperience(id: string, payload: ExperienceInput): Promise<Experience> {
    const token = getTokenFromCookie();
    return apiFetch<Experience>(`/api/experiences/${id}`, { method: "PATCH", body: JSON.stringify(payload) }, token);
  },
  async deleteExperience(id: string): Promise<void> {
    const token = getTokenFromCookie();
    return apiFetch<void>(`/api/experiences/${id}`, { method: "DELETE" }, token);
  },

  async uploadImages(folder: "projects" | "blogs", files: File[]): Promise<UploadResponse> {
    const token = getTokenFromCookie();
    const formData = new FormData();
    formData.append("folder", folder);
    files.forEach((file) => formData.append("files", file));

    return apiFetch<UploadResponse>("/api/uploads", { method: "POST", body: formData }, token);
  }
};

