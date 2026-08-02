import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-3">
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        heading="Projects"
        subtitle="Backend systems, SaaS products, and AI-powered tooling — things I built and shipped."
      />
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
