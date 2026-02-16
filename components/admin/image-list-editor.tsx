"use client";

type ImageListEditorProps = {
  images: string[];
  onRemove: (index: number) => void;
};

export function ImageListEditor({ images, onRemove }: ImageListEditorProps) {
  if (images.length === 0) {
    return <p className="text-sm text-zinc-600">No uploaded images yet.</p>;
  }

  return (
    <div className="grid gap-3">
      {images.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="flex items-center gap-3 rounded-xl border-2 border-zinc-900 bg-zinc-50 p-2"
        >
          <img
            src={image}
            alt={`Uploaded ${index + 1}`}
            className="h-16 w-16 rounded-lg border-2 border-zinc-900 object-cover"
          />

          <a
            href={image}
            target="_blank"
            rel="noreferrer"
            className="flex-1 truncate text-xs font-medium text-blue-700 underline"
            title={image}
          >
            {image}
          </a>

          <button
            type="button"
            onClick={() => onRemove(index)}
            className="rounded-lg border-2 border-red-700 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
