"use client";

import { useState } from "react";

export default function PhotoUploadField({
  defaultSmall,
  defaultMedium,
}: {
  defaultSmall?: string;
  defaultMedium?: string;
}) {
  const [small, setSmall] = useState(defaultSmall ?? "");
  const [medium, setMedium] = useState(defaultMedium ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload-photo", { method: "POST", body });
    const data = await res.json();
    setSmall(data.small);
    setMedium(data.medium);
    setUploading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {medium && <img src={medium} alt="" className="h-16 w-16 rounded-full border border-neutral-200 object-cover" />}
      <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
      <input type="hidden" name="photoSmallUrl" value={small} />
      <input type="hidden" name="photoMediumUrl" value={medium} />
      {uploading && <span className="text-xs text-neutral-400">Uploading…</span>}
    </div>
  );
}
