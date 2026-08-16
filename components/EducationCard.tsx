import type { Education } from "@prisma/client";
import { Avatar } from "@/components/ui/avatar";
import { formatYearRange } from "@/lib/duration";

export default function EducationCard({ education }: { education: Education }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={education.logoUrl} shape="square" size="sm" padded fallback={education.institutionName[0]} />
      <div>
        <p className="text-md font-semibold text-neutral-800">{education.institutionName}</p>
        <p className="mt-1 text-sm text-neutral-600">
          {education.degree}{" "}
          <span className="text-neutral-400">
            {formatYearRange(education.startYear, education.endYear, education.isCurrent)}
          </span>
        </p>
      </div>
    </div>
  );
}
