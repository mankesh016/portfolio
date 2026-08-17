import Link from "next/link";
import type { Project } from "@prisma/client";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-stone-300 bg-[#fdfbf6] p-4 transition-colors hover:border-amber-700 sm:gap-4 sm:p-6"
    >
      <Avatar
        src={project.logoUrl}
        shape="square"
        size="md"
        fallback={project.name[0]}
        className="h-9 w-9 sm:h-12 sm:w-12"
      />
      <div>
        <p className={cn(serif.className, "text-2xl text-stone-900 transition-colors group-hover:text-amber-700")}>
          {project.name}
        </p>
        <p className="mt-1 text-sm text-stone-500">{project.shortDescription}</p>
      </div>
    </Link>
  );
}
