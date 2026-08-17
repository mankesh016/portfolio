import type { ReactNode } from "react";
import DotPattern from "./DotPattern";

export default function PageContactCard({
  heading,
  subtitle,
  children,
}: {
  heading: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-300 bg-[#fdfbf6] p-8">
      <DotPattern />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold text-neutral-900">{heading}</h2>
          <p className="mt-3 max-w-md text-neutral-500">{subtitle}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">{children}</div>
      </div>
    </div>
  );
}
