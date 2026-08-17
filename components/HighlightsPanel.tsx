import type { ReactNode } from "react";
import Link from "next/link";

export default function HighlightsPanel({
  title,
  linkHref,
  linkLabel,
  children,
}: {
  title: string;
  linkHref?: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="h-px bg-neutral-200 mt-12" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mt-6">
        <h2 className="text-2xl font-semibold text-stone-900">{title}</h2>
        {linkHref && linkLabel && (
          <Link href={linkHref} className="ml-auto font-mono text-sm tracking-wide text-stone-500 hover:text-stone-700">
            {linkLabel}
          </Link>
        )}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
