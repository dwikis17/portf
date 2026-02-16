"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { HttpError } from "@/lib/api";
import { queries } from "@/lib/queries";

type UploadFolder = "projects" | "blogs";

type ImageUploaderProps = {
  folder: UploadFolder;
  onUploaded: (links: string[]) => void;
  onUnauthorized: () => void;
};

const MAX_FILES = 10;
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export function ImageUploader({ folder, onUploaded, onUnauthorized }: ImageUploaderProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => queries.uploadImages(folder, files)
  });

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const files = input.files ? Array.from(input.files) : [];
    input.value = "";

    if (files.length === 0) {
      return;
    }

    if (files.length > MAX_FILES) {
      setErrorMessage(`You can upload up to ${MAX_FILES} images at once.`);
      return;
    }

    const invalidType = files.find((file) => !ALLOWED_MIME_TYPES.has(file.type));
    if (invalidType) {
      setErrorMessage("Only JPG, PNG, WEBP, and GIF files are allowed.");
      return;
    }

    const oversize = files.find((file) => file.size > MAX_SIZE_BYTES);
    if (oversize) {
      setErrorMessage("Each image must be 5MB or smaller.");
      return;
    }

    setErrorMessage(null);

    try {
      const response = await uploadMutation.mutateAsync(files);

      onUploaded(response.links);
    } catch (error) {
      if (error instanceof HttpError && error.status === 401) {
        onUnauthorized();
        return;
      }

      setErrorMessage(error instanceof HttpError ? error.message : "Image upload failed.");
    }
  };

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-zinc-900">Upload Images</label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={onChange}
        disabled={uploadMutation.isPending}
        className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm"
      />

      <p className="text-xs text-zinc-600">Up to 10 files, 5MB each.</p>

      {uploadMutation.isPending ? <p className="text-sm font-medium text-zinc-800">Uploading images...</p> : null}

      {errorMessage ? (
        <p className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
