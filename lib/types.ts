export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

export type ApiError = {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export type ExternalLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
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
  createdAt: string;
  updatedAt: string;
};

export type Experience = {
  id: string;
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
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Blog = {
  id: string;
  title: string;
  description: string;
  images: string[];
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export type UploadResponse = {
  links: string[];
};
