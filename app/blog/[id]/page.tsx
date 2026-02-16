import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchBlogById } from "@/lib/blogs-api";

type BlogDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const blog = await fetchBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-108px)] animate-fade-in px-6 py-14 md:py-20">
      <section className="mx-auto grid w-full max-w-5xl gap-8">
        <header
          className="stagger-item rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b]"
          style={{ "--stagger-delay": "120ms" } as CSSProperties}
        >
          <Link href="/blog" className="text-sm font-semibold text-zinc-600 underline underline-offset-4">
            Back to Blog
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide">
            <span className="rounded-full border-2 border-zinc-950 bg-zinc-100 px-3 py-1 text-zinc-700">
              {blog.category?.name || "Uncategorized"}
            </span>
            <span className="text-zinc-500">{formatDate(blog.createdAt)}</span>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">{blog.title}</h1>
        </header>

        {blog.images.length > 0 ? (
          <section
            className="stagger-item grid gap-4 sm:grid-cols-2"
            style={{ "--stagger-delay": "190ms" } as CSSProperties}
          >
            {blog.images.map((image, index) => (
              <div
                key={`${blog.id}-${index}`}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border-4 border-zinc-950 bg-zinc-100 shadow-[0_4px_0_0_#09090b]"
              >
                <Image
                  src={image}
                  alt={`${blog.title} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </section>
        ) : null}

        <article
          className="stagger-item rounded-2xl border-4 border-zinc-950 bg-white p-6 shadow-[0_4px_0_0_#09090b]"
          style={{ "--stagger-delay": "240ms" } as CSSProperties}
        >
          <div className="prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: blog.description || "<p>No content yet.</p>" }} />
        </article>
      </section>
    </main>
  );
}
