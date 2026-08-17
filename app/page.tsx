import { prisma } from "@/lib/prisma";
import MiniWindow from "@/components/layout/MiniWindow";
import GithubContributions from "@/components/GithubContributions";
import SkillsHighlights from "@/components/SkillsHighlights";
import ExperienceHighlights from "@/components/ExperienceHighlights";
import EducationHighlights from "@/components/EducationHighlights";
import CpHighlights from "@/components/CpHighlights";
import ProjectsHighlights from "@/components/ProjectsHighlights";
import ContactCard from "@/components/ContactCard";
import CopyMailButton from "@/components/CopyMailButton";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { renderBoldText } from "@/lib/boldText";

export default async function HomePage() {
  const [
    profile,
    heroProfile,
    heroEntries,
    skillCategories,
    featuredExperiences,
    educations,
    featuredProjects,
    cpProfileCards,
    cpAchievementCards,
  ] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.heroProfile.findUnique({ where: { id: "singleton" } }),
    prisma.heroEntry.findMany({ orderBy: { order: "asc" } }),
    prisma.skillCategory.findMany({
      orderBy: { order: "asc" },
      include: { skills: { where: { featured: true }, orderBy: { order: "asc" } } },
    }),
    prisma.experience.findMany({
      where: { isFeatured: true },
      orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
    }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }),
    prisma.cpProfileCard.findMany({ orderBy: { order: "asc" } }),
    prisma.cpAchievementCard.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) {
    return <p className="text-sm text-neutral-400">Profile not set up yet — visit /admin/profile.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Hero — custom, not inherited */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex-1">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {profile.photoMediumUrl && (
              <img
                src={profile.photoMediumUrl}
                alt={profile.name}
                className="h-30 w-30 shrink-0 rounded-full border border-neutral-200 object-cover sm:h-36 sm:w-36"
              />
            )}
            <div className="flex flex-col justify-center">
              {heroProfile?.isOpenToWork && heroProfile.openToWorkText ? (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-stone-300 bg-[#fdfbf6] px-4 py-2 font-mono text-xs tracking-wide text-neutral-600 uppercase">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute -inset-0.5 animate-[dot-blink-a_3s_ease-in-out_infinite] rounded-full bg-green-500 blur-xs" />
                    <span className="relative h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  {heroProfile.openToWorkText}
                </span>
              ) : (
                <h1 className="text-2xl font-normal text-neutral-700">Hi, I'm</h1>
              )}
              <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">{profile.name}</h1>
              <p className={cn(serif.className, "mt-2 text-md text-neutral-500 italic")}>{profile.tagline}</p>
            </div>
          </div>

          <p className="mt-6 text-neutral-600">{profile.about}</p>

          {(heroProfile?.resumeUrl || heroProfile?.mail) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {heroProfile.resumeUrl && (
                <a
                  href={heroProfile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Resume
                </a>
              )}
              {heroProfile.mail && <CopyMailButton mail={heroProfile.mail} />}
            </div>
          )}
        </div>

        {heroEntries.length > 0 && (
          <div className="w-full shrink-0 rounded-2xl border border-stone-300 bg-[#fdfbf6] p-6 lg:w-60">
            <p className="font-mono text-xs tracking-wide text-neutral-400 uppercase">Currently</p>
            <div className="mt-4 space-y-3">
              {heroEntries.map((entry) => {
                const content = (
                  <>
                    {entry.logoUrl && <img src={entry.logoUrl} alt="" className="h-5 w-5 shrink-0 object-contain" />}
                    <span className="text-sm text-neutral-700">{renderBoldText(entry.text)}</span>
                  </>
                );
                return entry.link ? (
                  <a
                    key={entry.id}
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:underline"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={entry.id} className="flex items-center gap-3">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {profile.githubUsername && <GithubContributions username={profile.githubUsername} />}

      <ExperienceHighlights experiences={featuredExperiences} />

      <EducationHighlights educations={educations} />

      <ProjectsHighlights projects={featuredProjects} />

      <SkillsHighlights categories={skillCategories} />

      <CpHighlights profileCards={cpProfileCards} achievementCards={cpAchievementCards} />

      <ContactCard />
    </div>
  );
}
