import { prisma } from "@/lib/prisma";
import HeroEntryForm from "@/components/admin/HeroEntryForm";
import { updateHeroEntry } from "@/app/actions/hero";
import { redirect } from "next/navigation";

export default async function EditHeroEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await prisma.heroEntry.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateHeroEntry(id, formData);
    redirect("/admin/hero");
  }

  return <HeroEntryForm action={action} defaultValues={entry} />;
}
