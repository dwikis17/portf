"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type RichTextEditorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  minHeight?: number;
};

const normalizeHtml = (input: string): string => {
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : "<p></p>";
};

export function RichTextEditor({
  label,
  value,
  onChange,
  minHeight = 140
}: RichTextEditorProps) {
  const normalizedValue = normalizeHtml(value);

  const editor = useEditor({
    extensions: [StarterKit],
    content: normalizedValue,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    }
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (editor.getHTML() !== normalizedValue) {
      editor.commands.setContent(normalizedValue, false);
    }
  }, [editor, normalizedValue]);

  const toolbarButtonClass =
    "rounded-md border-2 px-2 py-1 text-xs font-semibold disabled:opacity-50";

  const getButtonStateClass = (active: boolean): string =>
    active
      ? "border-zinc-950 bg-zinc-950 text-white"
      : "border-zinc-900 bg-white text-zinc-900";

  return (
    <div className="grid gap-2">
      <label className="text-sm font-semibold text-zinc-900">{label}</label>

      <div className="flex flex-wrap gap-2 rounded-xl border-2 border-zinc-950 bg-zinc-100 p-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor}
          className={`${toolbarButtonClass} ${getButtonStateClass(Boolean(editor?.isActive("bold")))}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor}
          className={`${toolbarButtonClass} italic ${getButtonStateClass(Boolean(editor?.isActive("italic")))}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          disabled={!editor}
          className={`${toolbarButtonClass} ${getButtonStateClass(
            Boolean(editor?.isActive("heading", { level: 2 }))
          )}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          disabled={!editor}
          className={`${toolbarButtonClass} ${getButtonStateClass(Boolean(editor?.isActive("bulletList")))}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          disabled={!editor}
          className={`${toolbarButtonClass} ${getButtonStateClass(Boolean(editor?.isActive("orderedList")))}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          disabled={!editor}
          className={`${toolbarButtonClass} ${getButtonStateClass(Boolean(editor?.isActive("blockquote")))}`}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          disabled={!editor}
          className={`${toolbarButtonClass} ${getButtonStateClass(Boolean(editor?.isActive("codeBlock")))}`}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          className={`${toolbarButtonClass} border-zinc-900 bg-white text-zinc-900`}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          className={`${toolbarButtonClass} border-zinc-900 bg-white text-zinc-900`}
        >
          Redo
        </button>
      </div>

      {editor ? (
        <EditorContent
          editor={editor}
          className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm leading-relaxed focus-within:outline-none [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror]:outline-none [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-extrabold [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-zinc-400 [&_.ProseMirror_blockquote]:pl-3 [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:rounded-md [&_.ProseMirror_pre]:bg-zinc-900 [&_.ProseMirror_pre]:p-3 [&_.ProseMirror_pre]:text-zinc-100"
          style={{ minHeight }}
        />
      ) : (
        <div
          className="rounded-xl border-2 border-zinc-950 bg-zinc-50 px-3 py-2 text-sm text-zinc-500"
          style={{ minHeight }}
        >
          Loading editor...
        </div>
      )}
    </div>
  );
}
