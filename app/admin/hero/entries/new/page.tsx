import HeroEntryForm from "@/components/admin/HeroEntryForm";
import { createHeroEntry } from "@/app/actions/hero";
import { redirect } from "next/navigation";

export default function NewHeroEntryPage() {
  async function action(formData: FormData) {
    "use server";
    await createHeroEntry(formData);
    redirect("/admin/hero");
  }
  return <HeroEntryForm action={action} />;
}
