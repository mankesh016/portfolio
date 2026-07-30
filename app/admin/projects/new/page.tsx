import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/app/actions/projects";
import { redirect } from "next/navigation";

export default function NewProjectPage() {
  async function action(formData: FormData) {
    "use server";
    await createProject(formData);
    redirect("/admin/projects");
  }
  return <ProjectForm action={action} />;
}
