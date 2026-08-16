import { prisma } from "@/lib/prisma";
import EducationForm from "@/components/admin/EducationForm";
import { updateEducation } from "@/app/actions/education";
import { redirect } from "next/navigation";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const edu = await prisma.education.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateEducation(id, formData);
    redirect("/admin/education");
  }

  return <EducationForm action={action} defaultValues={edu} />;
}
