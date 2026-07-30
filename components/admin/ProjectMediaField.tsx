"use client";

import { useState } from "react";
import type { Project } from "@prisma/client";

export default function ProjectMediaField({ defaultValues }: { defaultValues?: Project }) {
  const [mediaType, setMediaType] = useState(defaultValues?.mediaType ?? "none");
  const [url, setUrl] = useState(defaultValues?.mediaUrl ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>, kind: "image" | "video") {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("type", kind);
    const res = await fetch("/api/admin/upload-project-media", { method: "POST", body });
    const data = await res.json();
    setUrl(data.url);
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <select
        name="mediaType"
        value={mediaType}
        onChange={(e) => {
          setMediaType(e.target.value);
          setUrl("");
        }}
        className="rounded-md border border-neutral-200 px-2 py-1 text-sm"
      >
        <option value="none">No media</option>
        <option value="image">Image</option>
        <option value="video">Video (autoplay)</option>
        <option value="youtube">YouTube (unlisted link)</option>
      </select>

      <input type="hidden" name="mediaUrl" value={url} />

      {mediaType === "image" && (
        <input type="file" accept="image/*" onChange={(e) => handleFile(e, "image")} className="text-xs" />
      )}
      {mediaType === "video" && (
        <input type="file" accept="video/*" onChange={(e) => handleFile(e, "video")} className="text-xs" />
      )}
      {mediaType === "youtube" && (
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL (unlisted is fine)"
          className="w-full rounded-md border border-neutral-200 px-2 py-1 text-sm"
        />
      )}
      {uploading && <span className="text-xs text-neutral-400">Uploading…</span>}
      {url && mediaType !== "youtube" && <p className="text-xs text-neutral-400">Uploaded ✓</p>}
    </div>
  );
}
