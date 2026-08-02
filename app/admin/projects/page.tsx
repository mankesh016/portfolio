import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject, moveProject } from "@/app/actions/projects";
import { ArrowUp, ArrowDown } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Projects</h1>
        <Link href="/admin/projects/new" className="text-sm text-orange-600">
          + Add Project
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-sm"
          >
            <span className="font-medium text-neutral-800">{p.name}</span>
            <div className="flex items-center gap-3">
              <form action={moveProject.bind(null, p.id, "up")}>
                <button type="submit">
                  <ArrowUp className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
                </button>
              </form>
              <form action={moveProject.bind(null, p.id, "down")}>
                <button type="submit">
                  <ArrowDown className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
                </button>
              </form>
              <Link href={`/admin/projects/${p.id}/edit`} className="text-blue-600">
                Edit
              </Link>
              <form action={deleteProject.bind(null, p.id)}>
                <button className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
