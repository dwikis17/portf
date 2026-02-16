import { Suspense } from "react";

import { BlogList } from "@/components/pages/blog-list";

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[calc(100vh-108px)] px-6 py-14 md:py-20">
          <section className="mx-auto w-full max-w-6xl rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-700 shadow-[0_4px_0_0_#09090b]">
            Loading blog posts...
          </section>
        </main>
      }
    >
      <BlogList />
    </Suspense>
  );
}
