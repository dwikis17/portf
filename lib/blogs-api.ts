import { queries } from "@/lib/queries";
import type { Blog, Category } from "@/lib/types";

export const fetchCategories = (): Promise<Category[]> => queries.listCategories();

export const fetchBlogs = (): Promise<Blog[]> => queries.listBlogs();

export const fetchBlogById = async (id: string): Promise<Blog | null> => {
  try {
    return await queries.getBlog(id);
  } catch {
    return null;
  }
};
