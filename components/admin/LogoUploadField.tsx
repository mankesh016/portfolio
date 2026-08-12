"use client";

import { useState } from "react";
import { useImageUpload } from "@/lib/hooks/useImageUpload";
import { Avatar } from "@/components/ui/avatar";

export default function LogoUploadField({ name, defaultValue }: { name: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const { upload, uploading } = useImageUpload<{ url: string }>("/api/admin/upload-logo");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await upload(file);
    setUrl(data.url);
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar src={url} size="sm" />
      <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
      <input type="hidden" name={name} value={url} />
      {uploading && <span className="text-xs text-neutral-400">Uploading…</span>}
    </div>
  );
}
