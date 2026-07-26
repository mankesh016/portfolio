import { formatRange } from "@/lib/duration";
import type { Experience } from "@prisma/client";

export default function ExperienceTeaserCard({ exp }: { exp: Experience }) {
  return (
    <div className="flex items-start gap-3">
      {exp.logoUrl && (
        <img src={exp.logoUrl} alt="" className="h-9 w-9 rounded-md border border-neutral-100 object-contain" />
      )}
      <div>
        <p className="text-sm font-medium text-neutral-800">
          {exp.title} <span className="text-neutral-400">· {exp.companyName}</span>
        </p>
        <p className="text-xs text-neutral-400">
          {formatRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
        </p>
        <p className="mt-1 text-sm text-neutral-600">{exp.summaryShort}</p>
      </div>
    </div>
  );
}
