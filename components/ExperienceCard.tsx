import TechPill from "@/components/TechPill";
import { formatRange, formatDuration } from "@/lib/duration";
import type { Experience } from "@prisma/client";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";

export default function ExperienceCard({ exp }: { exp: Experience }) {
  const skills = exp.skillsUsed as { name: string; iconSlug?: string }[];
  const bullets = exp.bulletsLong as string[];

  return (
    <div className="rounded-xl border border-stone-300 bg-[#fdfbf6] p-6 transition-colors hover:border-amber-600">
      <div className="flex items-start gap-4">
        <Avatar src={exp.logoUrl} shape="square" size="md" fallback={exp.companyName[0]} />
        <div className="flex-1">
<<<<<<< HEAD
          <div className="flex items-center justify-between gap-2">
=======
<<<<<<< Updated upstream
          <div className="flex items-center justify-between">
=======
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
>>>>>>> Stashed changes
>>>>>>> 2b661ef (fix: improve mobile responsiveness across layout and components)
            <a
              href={exp.companyUrl ?? undefined}
              target="_blank"
              rel="noreferrer"
              className={cn(serif.className, "text-2xl text-stone-900 transition-colors hover:text-amber-700")}
            >
              {exp.companyName}
            </a>
            <span className="shrink-0 font-mono text-xs tracking-wide text-stone-400 uppercase">
              {formatRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
            </span>
          </div>
          <p className="text-sm text-stone-500">
            {exp.title}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="font-mono text-xs text-stone-400">
            {formatDuration(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)}
          </p>
        </div>
      </div>

      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-600">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <TechPill
            key={s.name}
            name={s.name}
            iconSlug={s.iconSlug}
            className="rounded-full border-stone-300 bg-white text-xs text-stone-700"
          />
        ))}
      </div>
    </div>
  );
}
