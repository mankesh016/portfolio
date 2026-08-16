"use client";

import { useState } from "react";

export default function CpPlatformIcon({ slug, className }: { slug: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/78716c`}
      alt=""
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
