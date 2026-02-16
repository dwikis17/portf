"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

type ProjectCarouselProps = {
  images: string[];
  title: string;
};

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (safeImages.length === 0) {
    return (
      <div className="rounded-2xl border-4 border-zinc-950 bg-zinc-100 p-6 text-sm font-semibold text-zinc-600 shadow-[0_4px_0_0_#09090b]">
        No images available for this project yet.
      </div>
    );
  }

  const total = safeImages.length;
  const goTo = (index: number) => setActiveIndex((index + total) % total);
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <section className="grid gap-4 stagger-item" style={{ "--stagger-delay": "250ms" } as CSSProperties} aria-label="Project gallery">
      <div
        className="relative overflow-hidden rounded-2xl border-4 border-zinc-950 bg-zinc-100 shadow-[0_4px_0_0_#09090b] card-hover"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") goPrev();
          if (event.key === "ArrowRight") goNext();
        }}
        onTouchStart={(event) => setTouchStartX(event.changedTouches[0]?.clientX || null)}
        onTouchEnd={(event) => {
          if (touchStartX === null) return;
          const delta = (event.changedTouches[0]?.clientX || 0) - touchStartX;
          if (Math.abs(delta) > 40) {
            if (delta < 0) goNext();
            if (delta > 0) goPrev();
          }
          setTouchStartX(null);
        }}
      >
        <div key={safeImages[activeIndex]} className="relative aspect-[16/9] w-full animate-fade-in">
          <Image src={safeImages[activeIndex]} alt={`${title} image ${activeIndex + 1}`} fill className="object-cover soft-slide" />
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl border-2 border-zinc-950 bg-white/90 px-3 py-2 text-lg font-bold text-zinc-900 transition-transform duration-200 hover:scale-105"
        >
          {"<"}
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border-2 border-zinc-950 bg-white/90 px-3 py-2 text-lg font-bold text-zinc-900 transition-transform duration-200 hover:scale-105"
        >
          {">"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {safeImages.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to image ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-3 w-3 rounded-full border-2 border-zinc-950 transition-transform duration-200 hover:scale-110 ${index === activeIndex ? "bg-zinc-950" : "bg-white"}`}
          />
        ))}
      </div>

      <p className="text-sm text-zinc-600" aria-live="polite">
        Image {activeIndex + 1} of {total}
      </p>
    </section>
  );
}
