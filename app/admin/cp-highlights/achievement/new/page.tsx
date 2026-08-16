import CpAchievementCardForm from "@/components/admin/CpAchievementCardForm";
import { createCpAchievementCard } from "@/app/actions/cpHighlights";
import { redirect } from "next/navigation";

export default function NewCpAchievementCardPage() {
  async function action(formData: FormData) {
    "use server";
    await createCpAchievementCard(formData);
    redirect("/admin/cp-highlights");
  }
  return <CpAchievementCardForm action={action} />;
}
