import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { formatYearRange } from "@/lib/duration";
import { getInitials } from "@/lib/initials";
import { Avatar } from "@/components/ui/avatar";
import HighlightsPanel from "@/components/HighlightsPanel";
import type { Education } from "@prisma/client";

function EducationHighlightCard({ education }: { education: Education }) {
  const yearRange = formatYearRange(education.startYear, education.endYear, education.isCurrent);
  const degreeLine = [education.degree, education.location].filter(Boolean).join(" · ");
  const hasCgpa = education.cgpaAttained != null && education.cgpaTotal != null;
  const courses = education.relevantCoursework
    ? education.relevantCoursework
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="rounded-xl border border-stone-300 bg-[#fdfbf6] p-5 transition-colors hover:border-amber-600">
<<<<<<< HEAD
      <div className="grid grid-cols-[1fr_20%] items-start gap-4">
=======
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_20%] sm:items-start sm:gap-4">
>>>>>>> 2b661ef (fix: improve mobile responsiveness across layout and components)
        <div className="flex min-w-0 items-start gap-4">
          <Avatar src={education.logoUrl} shape="square" size="md" fallback={getInitials(education.institutionName)} />
          <div className="min-w-0">
            <p className={cn(serif.className, "text-xl text-stone-900")}>{education.institutionName}</p>
            <p className="mt-1 text-sm text-stone-600">{degreeLine}</p>
          </div>
        </div>
<<<<<<< HEAD
        <div className="mt-2 text-right">
          <p className="font-mono text-xs tracking-wide text-stone-400 uppercase">Year</p>
          <p className="mt-1 text-sm text-stone-400">{yearRange}</p>
=======
        <div className="flex items-baseline gap-2 sm:mt-2 sm:flex-col sm:text-right">
          <p className="font-mono text-xs tracking-wide text-stone-400 uppercase">Year</p>
          <p className="text-sm text-stone-400 sm:mt-1">{yearRange}</p>
>>>>>>> 2b661ef (fix: improve mobile responsiveness across layout and components)
        </div>
      </div>

      {(hasCgpa || courses.length > 0) && (
        <div className="mt-5 grid grid-cols-[20%_1fr] items-start gap-4 border-t border-stone-200 pt-4 sm:grid-cols-[10%_1fr] sm:gap-8">
          {hasCgpa && (
            <div>
              <p className="font-mono text-xs tracking-wide text-stone-400 uppercase">CGPA</p>
              <p className="mt-1 text-xl font-bold text-stone-700">
                {education.cgpaAttained}
                <span className="text-base font-normal text-stone-400">/{education.cgpaTotal}</span>
              </p>
            </div>
          )}

          {courses.length > 0 && (
            <div className={cn("min-w-0", !hasCgpa && "col-span-2")}>
              <p className="font-mono text-xs tracking-wide text-stone-400 uppercase">Relevant coursework</p>
<<<<<<< HEAD
              <div className="mt-2 flex flex-wrap gap-2">
                {courses.map((course) => (
                  <span key={course} className="rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700">
=======
              <div className="mt-2 flex flex-wrap gap-1.5">
                {courses.map((course) => (
                  <span key={course} className="rounded-full border border-stone-300 px-2 py-0.5 text-xs text-stone-700">
>>>>>>> 2b661ef (fix: improve mobile responsiveness across layout and components)
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function EducationHighlights({ educations }: { educations: Education[] }) {
  if (educations.length === 0) return null;

  return (
    <HighlightsPanel title="Education">
      <div className="space-y-3">
        {educations.map((education) => (
          <EducationHighlightCard key={education.id} education={education} />
        ))}
      </div>
    </HighlightsPanel>
  );
}
