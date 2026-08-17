import { prisma } from "@/lib/prisma";
import JourneyTimeline from "@/components/JourneyTimeline";
import PageHeader from "@/components/PageHeader";
import TechPill from "@/components/TechPill";
import StillReadingCard from "@/components/StillReadingCard";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { numberToWords } from "@/lib/numberToWords";

export const metadata = { title: "About" };

const JOURNEY_START_YEAR = 2022;

export default async function AboutPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  const events = await prisma.journeyEvent.findMany({ orderBy: { order: "asc" } });

  const yearsCount = new Date().getFullYear() - JOURNEY_START_YEAR;
  const momentsCount = events.length;

  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
        heading="About"
        subtitle="Everything that doesn't fit neatly into experience, projects, or CP."
      />

      <section id="skills" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold text-stone-900">Skills</h2>
        <p className="mt-1 text-neutral-500">Languages, frameworks, and tools I work with.</p>

        <div className="mt-6 divide-y divide-stone-200 rounded-2xl border border-stone-300 bg-[#fdfbf6]">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:gap-6">
              <p className="w-full shrink-0 font-mono text-xs tracking-wide text-stone-400 uppercase sm:w-32">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <TechPill
                    key={skill.id}
                    name={skill.name}
                    iconSlug={skill.iconSlug}
                    className="rounded-full border-stone-300 bg-white px-2 py-1 text-xs font-normal text-neutral-800"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="journey" className="mt-16 scroll-mt-24">
        <h2 className={cn(serif.className, "text-4xl font-semibold text-neutral-900")}>How it went</h2>
        <p className="mt-2 text-neutral-500">
          From a first C++ program to writing code that runs in prod — {numberToWords(yearsCount)} years,{" "}
          {numberToWords(momentsCount)} moments.
        </p>

        <div className="mt-8 rounded-2xl border border-stone-300 bg-[#fdfbf6] p-6 sm:p-8">
          <JourneyTimeline events={events} />
        </div>
      </section>

      <div className="mt-8">
        <StillReadingCard />
      </div>
    </div>
  );
}
