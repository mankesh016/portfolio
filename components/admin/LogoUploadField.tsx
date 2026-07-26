"use client";

import { useState } from "react";

export default function LogoUploadField({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload-logo", { method: "POST", body });
    const data = await res.json();
    setUrl(data.url);
    setUploading(false);
  }

  return (
    <div className="flex items-center gap-3">
      {url && <img src={url} alt="" className="h-10 w-10 rounded-md border border-neutral-200 object-contain" />}
      <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
      <input type="hidden" name={name} value={url} />
      {uploading && <span className="text-xs text-neutral-400">Uploading…</span>}
    </div>
  );
}
