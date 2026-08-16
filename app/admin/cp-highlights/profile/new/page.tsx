import CpProfileCardForm from "@/components/admin/CpProfileCardForm";
import { createCpProfileCard } from "@/app/actions/cpHighlights";
import { redirect } from "next/navigation";

export default function NewCpProfileCardPage() {
  async function action(formData: FormData) {
    "use server";
    await createCpProfileCard(formData);
    redirect("/admin/cp-highlights");
  }
  return <CpProfileCardForm action={action} />;
}
