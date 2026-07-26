import { prisma } from "@/lib/prisma";
import ExperienceForm from "@/components/admin/ExperienceForm";
import { updateExperience } from "@/app/actions/experience";
import { redirect } from "next/navigation";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = await prisma.experience.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateExperience(id, formData);
    redirect("/admin/experience");
  }

  return <ExperienceForm action={action} defaultValues={exp} />;
}
