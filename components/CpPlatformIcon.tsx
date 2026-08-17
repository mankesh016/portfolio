"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CpPlatformIcon({ slug, className }: { slug: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const url = `https://cdn.simpleicons.org/${slug}`;

  return (
    <>
      {/* Hidden — used only to detect a 404 from the CDN via onError; the visible icon below is
          a CSS mask so its color follows `currentColor` (and can transition like text/borders do). */}
      <img src={url} alt="" className="hidden" onError={() => setFailed(true)} />
      <span
        aria-hidden
        className={cn("inline-block bg-current", className)}
        style={{
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </>
  );
}
