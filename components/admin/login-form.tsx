"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { apiFetch, HttpError } from "@/lib/api";
import { setTokenCookie } from "@/lib/auth";
import type { LoginResponse } from "@/lib/types";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("dwikis17@gmail.com");
  const [password, setPassword] = useState("Password1!");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await apiFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        })
      });

      setTokenCookie(response.token);
      router.push("/admin");
      router.refresh();
    } catch (error) {
      if (error instanceof HttpError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unable to login. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b]"
    >
      <h1 className="text-3xl font-extrabold text-zinc-950">Admin Login</h1>
      <p className="mt-2 text-sm text-zinc-700">Sign in to manage your projects and blog content.</p>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-zinc-900">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm outline-none focus:bg-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-zinc-900">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm outline-none focus:bg-white"
          />
        </label>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-lg border-2 border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl border-2 border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
