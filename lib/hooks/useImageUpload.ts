"use client";

import { useState } from "react";

export function useImageUpload<T>(endpoint: string) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File): Promise<T> {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch(endpoint, { method: "POST", body });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error ?? `Upload failed (${res.status})`);
      }
      return data as T;
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading };
}
