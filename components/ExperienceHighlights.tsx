import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { formatRange } from "@/lib/duration";
import { Avatar } from "@/components/ui/avatar";
import HighlightsPanel from "@/components/HighlightsPanel";
import type { Experience } from "@prisma/client";

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-wide text-stone-400 uppercase">{label}</p>
      <p className="text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

function ExperienceHighlightCard({ exp }: { exp: Experience }) {
  return (
    <div className="rounded-xl border border-stone-300 bg-[#fdfbf6] p-5 transition-colors hover:border-amber-600">
      <div className="flex items-center gap-4">
        <Avatar src={exp.logoUrl} shape="square" size="md" fallback={exp.companyName[0]} />
        <div>
          <p className={cn(serif.className, "text-2xl text-stone-900")}>{exp.companyName}</p>
          <p className="text-sm text-stone-500">{exp.title}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-stone-600">{exp.summaryShort}</p>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-stone-200 pt-4">
        <StatCell label="Period" value={formatRange(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.isCurrent)} />
        {exp.location && <StatCell label="Location" value={exp.location} />}
      </div>
    </div>
  );
}

export default function ExperienceHighlights({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null;

  return (
    <HighlightsPanel title="Experience" linkHref="/experience" linkLabel="All experience →">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {experiences.map((exp) => (
          <ExperienceHighlightCard key={exp.id} exp={exp} />
        ))}
      </div>
    </HighlightsPanel>
  );
}
