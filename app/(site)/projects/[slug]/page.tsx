import { prisma } from "@/lib/prisma";
import ProjectMedia from "@/components/ProjectMedia";
import ProjectButtonsRow from "@/components/ProjectButtonsRow";
import TechPill from "@/components/TechPill";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUniqueOrThrow({ where: { slug } });
  const techStack = project.techStack as { name: string; iconSlug?: string }[];
  const buttons = project.buttons as any[];

  return (
    <div className="space-y-5">
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.name }]}
      />
      <Link
        href="/projects"
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Link>

      <div className="flex items-center gap-3">
        {project.logoUrl && (
          <img src={project.logoUrl} alt="" className="h-14 w-14 rounded-md border border-neutral-100 object-contain" />
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-neutral-900">{project.name}</h1>
          <p className="text-neutral-500 text-sm">{project.shortDescription}</p>
        </div>
      </div>
      <p className="text-neutral-600">{project.longDescription}</p>

      <ProjectMedia mediaType={project.mediaType} mediaUrl={project.mediaUrl} />
      <ProjectButtonsRow buttons={buttons} />

      <div>
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <TechPill key={t.name} name={t.name} iconSlug={t.iconSlug ?? null} />
          ))}
        </div>
      </div>
    </div>
  );
}
