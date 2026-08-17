import { prisma } from "@/lib/prisma";
import CpProfileCardForm from "@/components/admin/CpProfileCardForm";
import { updateCpProfileCard } from "@/app/actions/cpHighlights";
import { redirect } from "next/navigation";

export default async function EditCpProfileCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await prisma.cpProfileCard.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateCpProfileCard(id, formData);
    redirect("/admin/cp-highlights");
  }

  return <CpProfileCardForm action={action} defaultValues={card} />;
}
