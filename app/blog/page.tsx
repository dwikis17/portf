import type { CSSProperties } from "react";
import Link from "next/link";

import { ABlog } from "@/components/blog/ablog";
import { fetchBlogs, fetchCategories } from "@/lib/blogs-api";

type BlogPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const categories = await fetchCategories();
  const activeCategoryId = categories.some((item) => item.id === category) ? category : undefined;
  const blogs = await fetchBlogs(activeCategoryId);

  return (
    <main className="min-h-[calc(100vh-108px)] animate-fade-in px-6 py-14 md:py-20">
      <section className="mx-auto grid w-full max-w-6xl gap-8">
        <header className="stagger-item flex flex-wrap items-end justify-between gap-4" style={{ "--stagger-delay": "90ms" } as CSSProperties}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">Journal</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">Thoughts</h1>
          </div>
          <p className="text-sm font-semibold text-zinc-600">Filtered by category</p>
        </header>

        <nav className="stagger-item flex flex-wrap gap-3" style={{ "--stagger-delay": "140ms" } as CSSProperties} aria-label="Blog categories">
          <Link
            href="/blog"
            className={`rounded-full border-2 border-zinc-950 px-4 py-2 text-sm font-bold transition-colors ${
              !activeCategoryId ? "bg-zinc-950 text-white" : "bg-white text-zinc-800 hover:bg-zinc-100"
            }`}
          >
            All
          </Link>

          {categories.map((item) => {
            const isActive = activeCategoryId === item.id;

            return (
              <Link
                key={item.id}
                href={`/blog?category=${item.id}`}
                className={`rounded-full border-2 border-zinc-950 px-4 py-2 text-sm font-bold transition-colors ${
                  isActive ? "bg-zinc-950 text-white" : "bg-white text-zinc-800 hover:bg-zinc-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {blogs.length === 0 ? (
          <div className="stagger-item rounded-2xl border-4 border-zinc-950 bg-white p-6 text-sm font-semibold text-zinc-600 shadow-[0_4px_0_0_#09090b]" style={{ "--stagger-delay": "190ms" } as CSSProperties}>
            No blog posts found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog, index) => (
              <div key={blog.id} className="stagger-item" style={{ "--stagger-delay": `${210 + index * 55}ms` } as CSSProperties}>
                <ABlog blog={blog} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
