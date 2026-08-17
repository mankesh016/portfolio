"use client";

import { useState } from "react";
import { addCardImage } from "@/app/actions/platformCards";
import { useImageUpload } from "@/lib/hooks/useImageUpload";

export default function CardImageUploadForm({ cardId }: { cardId: string }) {
  const [url, setUrl] = useState("");
  const { upload, uploading } = useImageUpload<{ url: string }>("/api/admin/upload-card-image");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await upload(file);
    setUrl(data.url);
  }

  return (
    <form
      action={async (formData) => {
        await addCardImage(cardId, formData);
        setUrl("");
      }}
      className="flex flex-wrap items-center gap-2 rounded-md border border-neutral-100 p-3"
    >
      <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
      <input type="hidden" name="url" value={url} />
      <input
        name="caption"
        placeholder="Caption (optional)"
        className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
      />
      <button
        type="submit"
        disabled={!url || uploading}
        className="rounded-md bg-neutral-900 px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Add Image"}
      </button>
    </form>
  );
}
