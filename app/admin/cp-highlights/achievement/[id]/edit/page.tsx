import { prisma } from "@/lib/prisma";
import CpAchievementCardForm from "@/components/admin/CpAchievementCardForm";
import { updateCpAchievementCard } from "@/app/actions/cpHighlights";
import { redirect } from "next/navigation";

export default async function EditCpAchievementCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await prisma.cpAchievementCard.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateCpAchievementCard(id, formData);
    redirect("/admin/cp-highlights");
  }

  return <CpAchievementCardForm action={action} defaultValues={card} />;
}
