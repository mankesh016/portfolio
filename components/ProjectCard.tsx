import Link from "next/link";
import type { Project } from "@prisma/client";
import { Avatar } from "@/components/ui/avatar";
import { cardVariants } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(cardVariants(), "flex items-start gap-4 hover:bg-neutral-50")}
    >
      <Avatar src={project.logoUrl} size="md" fallback={project.name[0]} />
      <div>
        <h3 className="font-semibold text-neutral-900">{project.name}</h3>
        <p className="text-sm text-neutral-500">{project.shortDescription}</p>
      </div>
    </Link>
  );
}
