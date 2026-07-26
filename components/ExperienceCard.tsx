import TechPill from "@/components/TechPill";
import { formatRange, formatDuration } from "@/lib/duration";
import type { Experience } from "@prisma/client";

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const skills = exp.skillsUsed as { name: string; iconSlug?: string }[];
  const bullets = exp.bulletsLong as string[];

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="flex items-start gap-3">
        {exp.logoUrl && (
          <img src={exp.logoUrl} alt="" className="h-10 w-10 rounded-md border border-neutral-100 object-contain" />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <a
              href={exp.companyUrl ?? undefined}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-neutral-900 hover:underline"
            >
              {exp.companyName}
            </a>
            <span className="text-xs text-neutral-400">
              {formatRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
            </span>
          </div>
          <p className="text-sm text-neutral-500">
            {exp.title}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="text-xs text-neutral-400">
            {formatDuration(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
          </p>
        </div>
      </div>

      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <TechPill key={s.name} name={s.name} iconSlug={s.iconSlug} />
        ))}
      </div>
    </div>
  );
}
