"use client";

import { guessIconSlug } from "@/lib/iconSlug";

export default function TechPill({ name, iconSlug }: { name: string; iconSlug?: string | null }) {
  const slug = iconSlug || guessIconSlug(name);
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700">
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        className="h-4 w-4"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      {name}
    </span>
  );
}
