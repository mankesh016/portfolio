"use client";

import { Suspense } from "react";
import { DynamicIcon } from "lucide-react/dynamic";

export default function CPInfoLineIcon({ icon }: { icon: string }) {
  return (
    <Suspense fallback={<span className="h-4 w-4" />}>
      <DynamicIcon name={icon as any} className="h-4 w-4 text-stone-400" />
    </Suspense>
  );
}
