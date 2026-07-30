import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "@/app/actions/projects";
import { redirect } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateProject(id, formData);
    redirect("/admin/projects");
  }

  return <ProjectForm action={action} defaultValues={project} />;
}
