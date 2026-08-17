import Link from "next/link";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { Avatar } from "@/components/ui/avatar";
import HighlightsPanel from "@/components/HighlightsPanel";
import type { Project } from "@prisma/client";

function ProjectHighlightCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-stone-300 bg-[#fdfbf6] p-6 transition-colors hover:border-amber-700"
    >
      <div className="flex items-center gap-4">
        <Avatar src={project.logoUrl} shape="square" size="md" fallback={project.name[0]} className="" />
        <p className={cn(serif.className, "text-2xl text-stone-900 transition-colors group-hover:text-amber-700")}>
          {project.name}
        </p>
      </div>
      <p className="font-mono text-sm leading-relaxed text-stone-600">{project.shortDescription}</p>
    </Link>
  );
}

export default function ProjectsHighlights({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <HighlightsPanel title="Projects" linkHref="/projects" linkLabel="All projects →">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectHighlightCard key={project.id} project={project} />
        ))}
      </div>
    </HighlightsPanel>
  );
}
