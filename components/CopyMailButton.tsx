"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyMailButton({ mail }: { mail: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(mail);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-stone-300 py-1 pl-4 pr-1 text-sm font-medium text-neutral-700">
      {/* Each control owns its own hover feedback, scoped to just that control, so it's
          obvious which one you're about to activate instead of the whole pill lighting up. */}
      <a href={`mailto:${mail}`} className="rounded-sm transition-colors hover:text-neutral-900 hover:underline">
        {mail}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email address"
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
          copied ? "bg-green-100 text-green-600" : "text-neutral-500 hover:bg-stone-300 hover:text-neutral-900",
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
