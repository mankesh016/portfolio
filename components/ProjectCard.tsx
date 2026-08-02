import Link from "next/link";
import type { Project } from "@prisma/client";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-4 hover:bg-neutral-50"
    >
      {project.logoUrl ? (
        <img src={project.logoUrl} alt="" className="h-12 w-12 rounded-md border border-neutral-100 object-contain" />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-neutral-100 text-lg font-semibold text-neutral-400">
          {project.name[0]}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-neutral-900">{project.name}</h3>
        <p className="text-sm text-neutral-500">{project.shortDescription}</p>
      </div>
    </Link>
  );
}
