import { prisma } from "@/lib/prisma";
import ProjectMedia from "@/components/ProjectMedia";
import ProjectButtonsRow from "@/components/ProjectButtonsRow";
import TechPill from "@/components/TechPill";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUniqueOrThrow({ where: { slug } });
  const techStack = project.techStack as { name: string; iconSlug?: string }[];
  const buttons = project.buttons as any[];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        {project.logoUrl && (
          <img src={project.logoUrl} alt="" className="h-12 w-12 rounded-md border border-neutral-100 object-contain" />
        )}
        <h1 className="text-2xl font-bold text-neutral-900">{project.name}</h1>
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
