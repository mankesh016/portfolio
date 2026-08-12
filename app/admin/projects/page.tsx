import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProject, moveProject, toggleProjectFeatured } from "@/app/actions/projects";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

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
          <AdminEntityRow
            key={p.id}
            title={<span className="font-medium text-neutral-800">{p.name}</span>}
            editHref={`/admin/projects/${p.id}/edit`}
            onDelete={deleteProject.bind(null, p.id)}
            onMoveUp={moveProject.bind(null, p.id, "up")}
            onMoveDown={moveProject.bind(null, p.id, "down")}
            featured={p.isFeatured}
            onToggleFeatured={toggleProjectFeatured.bind(null, p.id, !p.isFeatured)}
          />
        ))}
      </div>
    </div>
  );
}
