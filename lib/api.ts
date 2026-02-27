import type { ApiError } from "@/lib/types";

export class HttpError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const getApiBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(baseUrl, "BASE URLL");

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not set");
  }

  return baseUrl.replace(/\/$/, "");
};

const buildApiUrl = (baseUrl: string, path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (baseUrl.endsWith("/api") && normalizedPath.startsWith("/api/")) {
    return `${baseUrl}${normalizedPath.slice(4)}`;
  }

  return `${baseUrl}${normalizedPath}`;
};

export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> => {
  const headers = new Headers(options.headers || {});

  const isFormDataBody = typeof FormData !== "undefined" && options.body instanceof FormData;

  if (!headers.has("Content-Type") && options.body && !isFormDataBody) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildApiUrl(getApiBaseUrl(), path), {
    ...options,
    headers,
    cache: "no-store"
  });

  const text = await response.text();
  let payload: unknown;

  if (text) {
    try {
      payload = JSON.parse(text) as unknown;
    } catch {
      payload = undefined;
    }
  }

  if (!response.ok) {
    const errorPayload = (payload || {}) as ApiError;
    const message = errorPayload.error?.message || `Request failed (${response.status})`;
    const code = errorPayload.error?.code;
    throw new HttpError(response.status, message, code);
  }

  return payload as T;
};
