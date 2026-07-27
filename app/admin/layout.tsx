import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  return (
    <div className="mx-auto max-w-3xl">
      <AdminNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
