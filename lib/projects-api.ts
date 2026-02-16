import { queries } from "@/lib/queries";
import type { Experience, Project } from "@/lib/types";

export const fetchProjects = (): Promise<Project[]> => queries.listProjects();

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  try {
    return await queries.getProject(id);
  } catch {
    return null;
  }
};

export const fetchExperiences = (): Promise<Experience[]> => queries.listExperiences();
