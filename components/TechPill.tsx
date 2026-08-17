"use client";

import { useState, useEffect } from "react";
import { guessIconSlug } from "@/lib/iconSlug";
import { cn } from "@/lib/utils";

export default function TechPill({
  name,
  iconSlug,
  className,
}: {
  name: string;
  iconSlug?: string | null;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => setMounted(true), []);

  const slug = iconSlug || guessIconSlug(name);
  const showIcon = mounted && !hasError;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-2 py-1 text-sm text-neutral-700",
        className,
      )}
    >
      {showIcon && (
        <img src={`https://cdn.simpleicons.org/${slug}`} alt="" className="h-4 w-4" onError={() => setHasError(true)} />
      )}
      {name}
    </span>
  );
}
