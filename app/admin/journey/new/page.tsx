import JourneyEventForm from "@/components/admin/JourneyEventForm";
import { createJourneyEvent } from "@/app/actions/journey";
import { redirect } from "next/navigation";

export default function NewJourneyEventPage() {
  async function action(formData: FormData) {
    "use server";
    await createJourneyEvent(formData);
    redirect("/admin/journey");
  }
  return <JourneyEventForm action={action} />;
}
