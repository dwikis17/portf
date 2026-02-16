"use client";

import Image from "next/image";
import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import type { Blog } from "@/lib/types";

type ABlogProps = {
  blog: Blog;
};

const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

const stripHtml = (value: string): string => {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const truncate = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}...`;
};

export function ABlog({ blog }: ABlogProps) {
  const coverImage = blog.images[0];
  const description = truncate(stripHtml(blog.description), 140);

  return (
    <article className="card-hover h-full overflow-hidden rounded-2xl border-4 border-zinc-950 bg-white shadow-[0_4px_0_0_#09090b]">
      <Link
        href={`/blog/${blog.id}`}
        className="block h-full"
        onClick={() =>
          trackEvent("blog_card_click", {
            blog_id: blog.id,
            blog_title: blog.title,
            category_id: blog.categoryId,
            category_name: blog.category?.name || "uncategorized"
          })
        }
      >
        <div className="relative aspect-[16/10] border-b-4 border-zinc-950 bg-zinc-100">
          {coverImage ? (
            <Image src={coverImage} alt={blog.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm font-semibold text-zinc-500">
              No image
            </div>
          )}
        </div>

        <div className="grid gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
            <span className="rounded-full border-2 border-zinc-950 bg-zinc-100 px-2 py-1 text-zinc-700">
              {blog.category?.name || "Uncategorized"}
            </span>
            <span className="text-zinc-500">{formatDate(blog.createdAt)}</span>
          </div>

          <h2 className="line-clamp-2 text-2xl font-extrabold tracking-tight text-zinc-950">{blog.title}</h2>
          <p className="line-clamp-3 text-base leading-relaxed text-zinc-700">{description}</p>
        </div>
      </Link>
    </article>
  );
}
