import { clearTokenCookie } from "@/lib/auth";

export const handleUnauthorized = (router: { push: (path: string) => void; refresh: () => void }) => {
  clearTokenCookie();
  router.push("/admin/login");
  router.refresh();
};
