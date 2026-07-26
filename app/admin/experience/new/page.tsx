import ExperienceForm from "@/components/admin/ExperienceForm";
import { createExperience } from "@/app/actions/experience";
import { redirect } from "next/navigation";

export default function NewExperiencePage() {
  async function action(formData: FormData) {
    "use server";
    await createExperience(formData);
    redirect("/admin/experience");
  }
  return <ExperienceForm action={action} />;
}
