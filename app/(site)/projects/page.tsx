import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import PageContactCard from "@/components/PageContactCard";
import CopyMailButton from "@/components/CopyMailButton";
import DarkPillLink from "@/components/ui/DarkPillLink";
import { GithubIcon } from "@/components/icons/icons";
import { CONTACT_EMAIL, PROJECTS_CONTACT_CARD, SOCIAL_LINKS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        heading="Projects"
        subtitle="Backend systems, SaaS products, and AI-powered tooling — things I built and shipped."
      />
      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <div className="mt-8">
        <PageContactCard heading={PROJECTS_CONTACT_CARD.heading} subtitle={PROJECTS_CONTACT_CARD.subtitle}>
          <DarkPillLink href={SOCIAL_LINKS.github}>
            <GithubIcon className="h-4 w-4" />
            Browse GitHub
          </DarkPillLink>
          <CopyMailButton mail={CONTACT_EMAIL} />
        </PageContactCard>
      </div>
    </div>
  );
}
