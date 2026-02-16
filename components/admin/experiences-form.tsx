"use client";

import { useEffect, useState } from "react";

import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { Experience, ExternalLink } from "@/lib/types";

type ExperienceFormValues = {
  company: string;
  role: string;
  employmentType: string;
  location: string;
  startMonth: string;
  endMonth: string | null;
  isCurrent: boolean;
  summaryHtml: string;
  highlights: string[];
  techTags: string[];
  links: ExternalLink[];
  sortOrder: number;
};

type ExperiencesFormProps = {
  initialExperience?: Experience | null;
  isSaving: boolean;
  errorMessage?: string | null;
  onCancelEdit?: () => void;
  onSubmit: (values: ExperienceFormValues) => void;
};

export function ExperiencesForm({
  initialExperience,
  isSaving,
  errorMessage,
  onCancelEdit,
  onSubmit
}: ExperiencesFormProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [location, setLocation] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [summaryHtml, setSummaryHtml] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [techTags, setTechTags] = useState<string[]>([]);
  const [techTagInput, setTechTagInput] = useState("");
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  useEffect(() => {
    if (initialExperience) {
      setCompany(initialExperience.company);
      setRole(initialExperience.role);
      setEmploymentType(initialExperience.employmentType || "");
      setLocation(initialExperience.location || "");
      setStartMonth(initialExperience.startMonth);
      setEndMonth(initialExperience.endMonth || "");
      setIsCurrent(initialExperience.isCurrent);
      setSummaryHtml(initialExperience.summaryHtml || "");
      setHighlights(initialExperience.highlights);
      setHighlightInput("");
      setTechTags(initialExperience.techTags);
      setTechTagInput("");
      setLinks(initialExperience.links);
      setLinkLabel("");
      setLinkUrl("");
      setSortOrder(initialExperience.sortOrder);
      return;
    }

    setCompany("");
    setRole("");
    setEmploymentType("");
    setLocation("");
    setStartMonth("");
    setEndMonth("");
    setIsCurrent(false);
    setSummaryHtml("");
    setHighlights([]);
    setHighlightInput("");
    setTechTags([]);
    setTechTagInput("");
    setLinks([]);
    setLinkLabel("");
    setLinkUrl("");
    setSortOrder(0);
  }, [initialExperience]);

  const addHighlight = () => {
    const normalized = highlightInput.trim();
    if (!normalized || normalized.length > 200) {
      return;
    }

    if (highlights.some((entry) => entry.toLowerCase() === normalized.toLowerCase())) {
      setHighlightInput("");
      return;
    }

    setHighlights((previous) => [...previous, normalized]);
    setHighlightInput("");
  };

  const addTechTag = () => {
    const normalized = techTagInput.trim();
    if (!normalized || normalized.length > 40) {
      return;
    }

    if (techTags.some((entry) => entry.toLowerCase() === normalized.toLowerCase())) {
      setTechTagInput("");
      return;
    }

    setTechTags((previous) => [...previous, normalized]);
    setTechTagInput("");
  };

  const addLink = () => {
    const label = linkLabel.trim();
    const url = linkUrl.trim();
    if (!label || !url || label.length > 40) {
      return;
    }

    try {
      const parsed = new URL(url);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return;
      }
    } catch {
      return;
    }

    if (links.some((entry) => entry.url.toLowerCase() === url.toLowerCase())) {
      setLinkUrl("");
      return;
    }

    setLinks((previous) => [...previous, { label, url }]);
    setLinkLabel("");
    setLinkUrl("");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          company,
          role,
          employmentType,
          location,
          startMonth,
          endMonth: isCurrent ? null : endMonth || null,
          isCurrent,
          summaryHtml,
          highlights,
          techTags,
          links,
          sortOrder
        });
      }}
      className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]"
    >
      <h2 className="text-xl font-extrabold text-zinc-950">
        {initialExperience ? "Edit Experience" : "Create Experience"}
      </h2>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-2 text-sm font-semibold">
          Company
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Role
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Employment Type
          <input
            value={employmentType}
            onChange={(event) => setEmploymentType(event.target.value)}
            placeholder="Optional"
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Location
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Optional"
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Start Month
            <input
              type="month"
              value={startMonth}
              onChange={(event) => setStartMonth(event.target.value)}
              required
              className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            End Month
            <input
              type="month"
              value={endMonth}
              onChange={(event) => setEndMonth(event.target.value)}
              disabled={isCurrent}
              className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm disabled:opacity-60"
            />
          </label>
        </div>

        <label className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
          <input
            type="checkbox"
            checked={isCurrent}
            onChange={(event) => {
              const checked = event.target.checked;
              setIsCurrent(checked);
              if (checked) {
                setEndMonth("");
              }
            }}
            className="h-4 w-4 accent-zinc-900"
          />
          I currently work here
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Sort Order
          <input
            type="number"
            min={0}
            value={sortOrder}
            onChange={(event) => setSortOrder(Number(event.target.value))}
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <RichTextEditor
          label="Summary"
          value={summaryHtml}
          onChange={setSummaryHtml}
          minHeight={160}
        />

        <div className="grid gap-2 text-sm font-semibold">
          <label htmlFor="experience-highlight-input">Highlights</label>
          <div className="flex gap-2">
            <input
              id="experience-highlight-input"
              value={highlightInput}
              onChange={(event) => setHighlightInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addHighlight();
                }
              }}
              placeholder="Type a highlight and press Enter"
              className="w-full rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addHighlight}
              className="rounded-xl border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <span
                key={`${highlight}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs"
              >
                {highlight}
                <button
                  type="button"
                  onClick={() =>
                    setHighlights((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
                  }
                  className="rounded-full border border-zinc-700 px-1 leading-none"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-2 text-sm font-semibold">
          <label htmlFor="experience-techtag-input">Tech Tags</label>
          <div className="flex gap-2">
            <input
              id="experience-techtag-input"
              value={techTagInput}
              onChange={(event) => setTechTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTechTag();
                }
              }}
              placeholder="Type a tech tag and press Enter"
              className="w-full rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addTechTag}
              className="rounded-xl border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setTechTags((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
                  }
                  className="rounded-full border border-zinc-700 px-1 leading-none"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-2 text-sm font-semibold">
          <label htmlFor="experience-link-label">External Links</label>
          <div className="grid gap-2 sm:grid-cols-[1fr_1.6fr_auto]">
            <input
              id="experience-link-label"
              value={linkLabel}
              onChange={(event) => setLinkLabel(event.target.value)}
              placeholder="Label"
              className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
            />
            <input
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addLink();
                }
              }}
              placeholder="https://..."
              className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addLink}
              className="rounded-xl border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-semibold"
            >
              Add
            </button>
          </div>
          <div className="grid gap-2">
            {links.map((link, index) => (
              <div
                key={`${link.url}-${index}`}
                className="flex items-center justify-between gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-xs"
              >
                <span className="font-semibold text-zinc-900">{link.label}</span>
                <span className="truncate text-zinc-600">{link.url}</span>
                <button
                  type="button"
                  onClick={() =>
                    setLinks((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
                  }
                  className="rounded border border-zinc-700 px-2 py-0.5 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 rounded-lg border-2 border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl border-2 border-zinc-950 bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isSaving ? "Saving..." : initialExperience ? "Update Experience" : "Create Experience"}
        </button>
        {initialExperience ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border-2 border-zinc-950 bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

