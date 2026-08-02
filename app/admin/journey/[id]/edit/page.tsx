import { prisma } from "@/lib/prisma";
import JourneyEventForm from "@/components/admin/JourneyEventForm";
import { updateJourneyEvent } from "@/app/actions/journey";
import { redirect } from "next/navigation";

export default async function EditJourneyEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.journeyEvent.findUniqueOrThrow({ where: { id } });

  async function action(formData: FormData) {
    "use server";
    await updateJourneyEvent(id, formData);
    redirect("/admin/journey");
  }

  return <JourneyEventForm action={action} defaultValues={event} />;
}
