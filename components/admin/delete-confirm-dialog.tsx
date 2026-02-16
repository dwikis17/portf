"use client";

type DeleteConfirmDialogProps = {
  open: boolean;
  itemLabel: string;
  itemType: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmDialog({
  open,
  itemLabel,
  itemType,
  isDeleting,
  onCancel,
  onConfirm
}: DeleteConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border-4 border-zinc-950 bg-white p-5 shadow-[0_6px_0_0_#09090b]">
        <h3 className="text-lg font-extrabold text-zinc-950">Delete {itemType}?</h3>
        <p className="mt-2 text-sm text-zinc-700">
          This will permanently delete <span className="font-semibold">{itemLabel}</span>.
        </p>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-xl border-2 border-zinc-950 bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl border-2 border-red-700 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
