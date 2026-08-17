"use client";

import { useState } from "react";
import { useImageUpload } from "@/lib/hooks/useImageUpload";
import { Avatar } from "@/components/ui/avatar";

export default function PhotoUploadField({
  defaultSmall,
  defaultMedium,
}: {
  defaultSmall?: string;
  defaultMedium?: string;
}) {
  const [small, setSmall] = useState(defaultSmall ?? "");
  const [medium, setMedium] = useState(defaultMedium ?? "");
  const { upload, uploading } = useImageUpload<{ small: string; medium: string }>("/api/admin/upload-photo");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await upload(file);
    setSmall(data.small);
    setMedium(data.medium);
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar src={medium} shape="circle" size="lg" fit="cover" />
      <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
      <input type="hidden" name="photoSmallUrl" value={small} />
      <input type="hidden" name="photoMediumUrl" value={medium} />
      {uploading && <span className="text-xs text-neutral-400">Uploading…</span>}
    </div>
  );
}
