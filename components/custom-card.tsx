"use client";

"use client";

import Image from "next/image";
import Link from "next/link";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CardLink = {
  label: string;
  url: string;
};

export type CustomCardProps = {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  links?: CardLink[];
  className?: string;
  mediaClassName?: string;
  analyticsEventName?: string;
  analyticsEventParams?: Record<string, unknown>;
};

function DefaultCardIllustration() {
  return (
    <svg
      viewBox="0 0 720 460"
      className="h-auto w-full"
      role="img"
      aria-label="Stylized browser card illustration"
    >
      <rect x="130" y="70" width="510" height="330" rx="36" fill="#09090B" />
      <rect x="100" y="46" width="510" height="330" rx="36" fill="#E4E4E7" stroke="#09090B" strokeWidth="6" />
      <line x1="100" y1="105" x2="610" y2="105" stroke="#09090B" strokeWidth="6" />

      <circle cx="138" cy="76" r="10" fill="#F43F5E" />
      <circle cx="172" cy="76" r="10" fill="#FBBF24" />
      <circle cx="206" cy="76" r="10" fill="#84CC16" />

      <line x1="145" y1="175" x2="240" y2="175" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />
      <line x1="145" y1="205" x2="315" y2="205" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />
      <line x1="145" y1="235" x2="280" y2="235" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />
      <rect x="145" y="270" width="95" height="36" rx="10" fill="#09090B" />

      <rect x="410" y="167" width="160" height="135" rx="20" fill="#228BE6" />
      <rect x="390" y="147" width="160" height="135" rx="20" fill="none" stroke="#09090B" strokeWidth="6" />

      <circle cx="185" cy="365" r="20" fill="none" stroke="#09090B" strokeWidth="7" />
      <circle cx="355" cy="374" r="20" fill="#228BE6" />
      <circle cx="345" cy="365" r="20" fill="none" stroke="#09090B" strokeWidth="7" />
      <circle cx="510" cy="365" r="20" fill="none" stroke="#09090B" strokeWidth="7" />

      <line x1="145" y1="420" x2="255" y2="420" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />
      <line x1="158" y1="442" x2="240" y2="442" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />

      <line x1="285" y1="420" x2="415" y2="420" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />
      <line x1="302" y1="442" x2="398" y2="442" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />

      <line x1="445" y1="420" x2="570" y2="420" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />
      <line x1="462" y1="442" x2="553" y2="442" stroke="#09090B" strokeWidth="8" strokeLinecap="round" />

      <polygon points="606,332 698,356 648,385 624,444 590,340" fill="#09090B" />
      <polygon points="596,324 688,348 638,377 614,436 580,332" fill="#FACC15" stroke="#09090B" strokeWidth="5" />
    </svg>
  );
}

export function CustomCard({
  title,
  description,
  imageSrc,
  imageAlt = "Card illustration",
  href,
  links = [],
  className,
  mediaClassName,
  analyticsEventName,
  analyticsEventParams,
}: CustomCardProps) {
  const shellClassName = cn("group block w-full max-w-[360px] card-hover", className);
  const cardBody = (
    <div className="relative animate-pop-in">
      <div className="absolute inset-0 translate-x-[8px] translate-y-[8px] rounded-[28px] bg-zinc-950" aria-hidden="true" />
      <div
        className={cn(
          "relative overflow-hidden rounded-[28px] border-4 border-zinc-950 bg-zinc-100",
          "transition-transform duration-300 ease-out",
          "-translate-x-[1px] -translate-y-[1px]",
          "group-hover:-translate-x-[8px] group-hover:-translate-y-[8px]",
          "group-focus-visible:-translate-x-[8px] group-focus-visible:-translate-y-[8px]",
          "motion-reduce:transform-none motion-reduce:transition-none",
        )}
      >
        <div className={cn("border-b-4 border-zinc-950 bg-zinc-200 p-3 sm:p-4", mediaClassName)}>
          {imageSrc ? (
            <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[18px] border-4 border-zinc-950 bg-white">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[320px]">
              <DefaultCardIllustration />
            </div>
          )}
        </div>

        <div className="px-5 py-6 sm:px-6 sm:py-7">
          <h3 className="text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">{title}</h3>
          <p className="mt-4 max-w-[28ch] text-lg leading-relaxed text-zinc-700 sm:text-xl">
            {description}
          </p>

          {links.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {links.slice(0, 3).map((link) => (
                <span
                  key={`${link.label}-${link.url}`}
                  className="rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-800"
                >
                  {link.label}
                </span>
              ))}
              {links.length > 3 ? (
                <span className="rounded-full border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                  +{links.length - 3} more
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={() => {
          if (!analyticsEventName) {
            return;
          }
          trackEvent(analyticsEventName, analyticsEventParams);
        }}
        className={cn(
          shellClassName,
          "focus-visible:rounded-[30px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-950/40",
        )}
      >
        {cardBody}
      </Link>
    );
  }

  return <article className={shellClassName}>{cardBody}</article>;
}
