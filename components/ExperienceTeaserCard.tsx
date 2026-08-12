import { formatRange } from "@/lib/duration";
import type { Experience } from "@prisma/client";
import { Avatar } from "@/components/ui/avatar";

export default function ExperienceTeaserCard({ exp }: { exp: Experience }) {
  return (
    <div className="flex items-start gap-3">
      <Avatar src={exp.logoUrl} size="xs" />
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
