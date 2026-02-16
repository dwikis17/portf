"use client";

import { useEffect, useState } from "react";

import { ImageListEditor } from "@/components/admin/image-list-editor";
import { ImageUploader } from "@/components/admin/image-uploader";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { ExternalLink, Project } from "@/lib/types";

type ProjectFormValues = {
  title: string;
  description: string;
  year: number;
  tags: string[];
  links: ExternalLink[];
  client: string;
  duration: string;
  overviewHtml: string;
  challengeHtml: string;
  solutionHtml: string;
  images: string[];
};

type ProjectsFormProps = {
  initialProject?: Project | null;
  isSaving: boolean;
  errorMessage?: string | null;
  onCancelEdit?: () => void;
  onAuthError: () => void;
  onSubmit: (values: ProjectFormValues) => void;
};

export function ProjectsForm({
  initialProject,
  isSaving,
  errorMessage,
  onCancelEdit,
  onAuthError,
  onSubmit
}: ProjectsFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [client, setClient] = useState("");
  const [duration, setDuration] = useState("");
  const [overviewHtml, setOverviewHtml] = useState("");
  const [challengeHtml, setChallengeHtml] = useState("");
  const [solutionHtml, setSolutionHtml] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title);
      setDescription(initialProject.description);
      setYear(initialProject.year);
      setTags(initialProject.tags);
      setTagInput("");
      setLinks(initialProject.links || []);
      setLinkLabel("");
      setLinkUrl("");
      setClient(initialProject.client || "");
      setDuration(initialProject.duration || "");
      setOverviewHtml(initialProject.overviewHtml || "");
      setChallengeHtml(initialProject.challengeHtml || "");
      setSolutionHtml(initialProject.solutionHtml || "");
      setImages(initialProject.images);
      return;
    }

    setTitle("");
    setDescription("");
    setYear(new Date().getFullYear());
    setTags([]);
    setTagInput("");
    setLinks([]);
    setLinkLabel("");
    setLinkUrl("");
    setClient("");
    setDuration("");
    setOverviewHtml("");
    setChallengeHtml("");
    setSolutionHtml("");
    setImages([]);
  }, [initialProject]);

  const addTag = () => {
    const normalized = tagInput.trim();

    if (!normalized) {
      return;
    }

    if (normalized.length > 40) {
      return;
    }

    if (tags.some((entry) => entry.toLowerCase() === normalized.toLowerCase())) {
      setTagInput("");
      return;
    }

    setTags((previous) => [...previous, normalized]);
    setTagInput("");
  };

  const addLink = () => {
    const label = linkLabel.trim();
    const url = linkUrl.trim();

    if (!label || !url) {
      return;
    }

    if (label.length > 40) {
      return;
    }

    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
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
          title,
          description,
          year,
          tags,
          links,
          client,
          duration,
          overviewHtml,
          challengeHtml,
          solutionHtml,
          images
        });
      }}
      className="rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_4px_0_0_#09090b]"
    >
      <h2 className="text-xl font-extrabold text-zinc-950">
        {initialProject ? "Edit Project" : "Create Project"}
      </h2>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-2 text-sm font-semibold">
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <RichTextEditor
          label="Summary Description"
          value={description}
          onChange={setDescription}
          minHeight={120}
        />

        <label className="grid gap-2 text-sm font-semibold">
          Year
          <input
            type="number"
            min={1900}
            max={2100}
            value={year}
            onChange={(event) => setYear(Number(event.target.value))}
            required
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Client
          <input
            value={client}
            onChange={(event) => setClient(event.target.value)}
            placeholder="Optional"
            maxLength={120}
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Duration
          <input
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            placeholder="Optional, e.g. 3 months"
            maxLength={120}
            className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
          />
        </label>

        <div className="grid gap-2 text-sm font-semibold">
          <label htmlFor="project-tags-input">Technologies (Tags)</label>
          <div className="flex gap-2">
            <input
              id="project-tags-input"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTag();
                }
              }}
              placeholder="Type a tag and press Enter"
              maxLength={40}
              className="w-full rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={addTag}
              className="rounded-xl border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-semibold"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.length === 0 ? (
              <p className="text-xs text-zinc-500">No tags yet.</p>
            ) : (
              tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 bg-zinc-100 px-3 py-1 text-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setTags((previous) => previous.filter((_, itemIndex) => itemIndex !== index))
                    }
                    className="rounded-full border border-zinc-700 px-1 leading-none"
                    aria-label={`Remove ${tag}`}
                  >
                    x
                  </button>
                </span>
              ))
            )}
          </div>
        </div>

        <div className="grid gap-2 text-sm font-semibold">
          <label htmlFor="project-link-label">External Links</label>
          <div className="grid gap-2 sm:grid-cols-[1fr_1.6fr_auto]">
            <input
              id="project-link-label"
              value={linkLabel}
              onChange={(event) => setLinkLabel(event.target.value)}
              placeholder="Label (e.g. GitHub)"
              maxLength={40}
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
            {links.length === 0 ? (
              <p className="text-xs text-zinc-500">No links yet.</p>
            ) : (
              links.map((link, index) => (
                <div
                  key={`${link.url}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3 py-2 text-xs"
                >
                  <span className="truncate font-semibold text-zinc-900">{link.label}</span>
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
              ))
            )}
          </div>
        </div>

        <RichTextEditor
          label="Project Overview"
          value={overviewHtml}
          onChange={setOverviewHtml}
          minHeight={180}
        />

        <RichTextEditor
          label="The Challenge"
          value={challengeHtml}
          onChange={setChallengeHtml}
          minHeight={160}
        />

        <RichTextEditor
          label="Our Solution"
          value={solutionHtml}
          onChange={setSolutionHtml}
          minHeight={160}
        />

        <ImageUploader
          folder="projects"
          onUnauthorized={onAuthError}
          onUploaded={(links) => setImages((previous) => [...previous, ...links])}
        />

        <ImageListEditor
          images={images}
          onRemove={(index) => {
            setImages((previous) => previous.filter((_, itemIndex) => itemIndex !== index));
          }}
        />
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
          {isSaving ? "Saving..." : initialProject ? "Update Project" : "Create Project"}
        </button>

        {initialProject ? (
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
