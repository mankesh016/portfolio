import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MiniWindow from "@/components/layout/MiniWindow";
import TechPill from "@/components/TechPill";
import InfoLineIcon from "@/components/icons/InfoLineIcon";
import GithubContributions from "@/components/GithubContributions";
import ExperienceTeaserCard from "@/components/ExperienceTeaserCard";

export default async function HomePage() {
  const [profile, infoLines, featuredSkills, featuredExperiences] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.infoLine.findMany({ where: { featured: true }, orderBy: { order: "asc" } }),
    prisma.skill.findMany({ where: { featured: true }, orderBy: { order: "asc" } }),
    prisma.experience.findMany({
      where: { isFeatured: true },
      orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
    }),
  ]);

  if (!profile) {
    return <p className="text-sm text-neutral-400">Profile not set up yet — visit /admin/profile.</p>;
  }

  return (
    <div className="space-y-8">
      {/* Hero — custom, not inherited */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {profile.photoMediumUrl && (
          <img
            src={profile.photoMediumUrl}
            alt={profile.name}
            className="h-28 w-28 shrink-0 rounded-full border border-neutral-200 object-cover"
          />
        )}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-normal text-neutral-700">Hi, I'm</h1>
          <h1 className="text-3xl font-bold text-neutral-900">{profile.name}</h1>
          <p className="mt-1 font-mono text-md text-neutral-500">{profile.tagline}</p>
        </div>
      </div>

      <p className="text-neutral-600">{profile.about}</p>

      <div className="space-y-2">
        {infoLines.map((line) =>
          line.href ? (
            <a
              key={line.id}
              href={line.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-neutral-600 hover:underline"
            >
              <InfoLineIcon iconType={line.iconType} iconValue={line.iconValue} />
              {line.text}
            </a>
          ) : (
            <div key={line.id} className="flex items-center gap-3 text-sm text-neutral-600">
              <InfoLineIcon iconType={line.iconType} iconValue={line.iconValue} />
              {line.text}
            </div>
          ),
        )}
      </div>

      {profile.githubUsername && <GithubContributions username={profile.githubUsername} />}

      {/* Inherited teasers */}
      {featuredSkills.length > 0 && (
        <MiniWindow title="Skills">
          <div className="flex flex-wrap gap-2.5">
            {featuredSkills.map((skill) => (
              <TechPill key={skill.id} name={skill.name} iconSlug={skill.iconSlug} />
            ))}
          </div>
        </MiniWindow>
      )}

      {featuredExperiences.length > 0 && (
        <MiniWindow title="Experience">
          <div className="space-y-4">
            {featuredExperiences.map((exp) => (
              <ExperienceTeaserCard key={exp.id} exp={exp} />
            ))}

            <Link href="/experience" className="text-xs text-orange-600 hover:underline">
              See more →
            </Link>
          </div>
        </MiniWindow>
      )}
    </div>
  );
}
