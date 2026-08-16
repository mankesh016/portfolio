import EducationForm from "@/components/admin/EducationForm";
import { createEducation } from "@/app/actions/education";
import { redirect } from "next/navigation";

export default function NewEducationPage() {
  async function action(formData: FormData) {
    "use server";
    await createEducation(formData);
    redirect("/admin/education");
  }
  return <EducationForm action={action} />;
}
