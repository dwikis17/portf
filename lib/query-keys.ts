export const queryKeys = {
  projects: {
    list: (params?: Record<string, unknown>) => ["projects", "list", params || {}] as const,
    detail: (id: string) => ["projects", "detail", id] as const
  },
  experiences: {
    list: (params?: Record<string, unknown>) => ["experiences", "list", params || {}] as const,
    detail: (id: string) => ["experiences", "detail", id] as const
  },
  blogs: {
    list: (params?: Record<string, unknown>) => ["blogs", "list", params || {}] as const,
    detail: (id: string) => ["blogs", "detail", id] as const
  },
  categories: {
    list: () => ["categories", "list"] as const,
    detail: (id: string) => ["categories", "detail", id] as const
  }
};

