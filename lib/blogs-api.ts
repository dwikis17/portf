import type { Blog, Category, PaginatedResponse } from "@/lib/types";

const getBackendBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  return baseUrl.replace(/\/$/, "").replace(/\/api$/, "");
};

const buildBlogsUrl = (categoryId?: string): string => {
  const params = new URLSearchParams({ page: "1", limit: "100" });

  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  return `${getBackendBaseUrl()}/api/blogs?${params.toString()}`;
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/categories`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return [];
    }

    return (await response.json()) as Category[];
  } catch {
    return [];
  }
};

export const fetchBlogs = async (categoryId?: string): Promise<Blog[]> => {
  try {
    const response = await fetch(buildBlogsUrl(categoryId), {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as PaginatedResponse<Blog>;
    return payload.data || [];
  } catch {
    return [];
  }
};

export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/blogs/${id}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as Blog;
  } catch {
    return null;
  }
};
