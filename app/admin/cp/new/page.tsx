import PlatformCardForm from "@/components/admin/PlatformCardForm";
import { createCard } from "@/app/actions/platformCards";
import { redirect } from "next/navigation";

export default function NewCardPage() {
  async function action(formData: FormData) {
    "use server";
    await createCard(formData);
    redirect("/admin/cp");
  }
  return <PlatformCardForm action={action} />;
}
