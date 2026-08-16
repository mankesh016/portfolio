import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MiniWindow from "@/components/layout/MiniWindow";
import TechPill from "@/components/TechPill";
import InfoLineIcon from "@/components/icons/InfoLineIcon";
import GithubContributions from "@/components/GithubContributions";
import ExperienceTeaserCard from "@/components/ExperienceTeaserCard";
import EducationCard from "@/components/EducationCard";
import ContactCard from "@/components/ContactCard";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const [profile, infoLines, featuredSkills, featuredExperiences, educations, featuredProjects] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "singleton" } }),
    prisma.infoLine.findMany({ where: { featured: true }, orderBy: { order: "asc" } }),
    prisma.skill.findMany({ where: { featured: true }, orderBy: { order: "asc" } }),
    prisma.experience.findMany({
      where: { isFeatured: true },
      orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
    }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { isFeatured: true }, orderBy: { order: "asc" } }),
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

      {/* horizontical line seprator */}
      <div className="h-px bg-neutral-200" />

      {/* Inherited teasers */}
      {featuredSkills.length > 0 && (
        <div className="space-y-4">
          <h2 className="mb-6 text-xl font-semibold text-neutral-700">Skills</h2>
          <div className="flex flex-wrap gap-2.5">
            {featuredSkills.map((skill) => (
              <TechPill key={skill.id} name={skill.name} iconSlug={skill.iconSlug} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              href="/skills"
              className="rounded-full px-4 py-2 text-sm text-neutral-500 transition-all hover:text-neutral-700"
            >
              See More Skills →
            </Link>
          </div>
        </div>
      )}

      {/* horizontical line seprator */}
      <div className="h-px bg-neutral-200" />

      {featuredExperiences.length > 0 && (
        <div className="space-y-4">
          <h2 className="mb-6 text-xl font-semibold text-neutral-700">Experiences</h2>

          {featuredExperiences.map((exp) => (
            <ExperienceTeaserCard key={exp.id} exp={exp} />
          ))}
          <div className="mt-4 flex justify-center">
            <Link
              href="/experience"
              className="rounded-full px-4 py-2 text-sm text-neutral-500 transition-all hover:text-neutral-700"
            >
              See More Experiences →
            </Link>
          </div>
        </div>
      )}

      {/* horizontical line seprator */}
      <div className="h-px bg-neutral-200" />

      {educations.length > 0 && (
        <div className="space-y-4">
          <h2 className="mb-6 text-xl font-semibold text-neutral-700">Education</h2>

          <div className="space-y-4">
            {educations.map((edu) => (
              <EducationCard key={edu.id} education={edu} />
            ))}
          </div>
        </div>
      )}

      {/* horizontical line seprator */}
      <div className="h-px bg-neutral-200" />

      {featuredProjects.length > 0 && (
        <div className="space-y-4">
          <h2 className="mb-6 text-xl font-semibold text-neutral-700">Projects</h2>

          {featuredProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}

          <div className="mt-4 flex justify-center">
            <Link
              href="/projects"
              className="rounded-full px-4 py-2 text-sm text-neutral-500 transition-all hover:text-neutral-700"
            >
              See More Projects →
            </Link>
          </div>
        </div>
      )}

      <ContactCard />
    </div>
  );
}
