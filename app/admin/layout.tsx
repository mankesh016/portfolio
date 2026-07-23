import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const ADMIN_SECTIONS = [
  { label: "Skills", href: "/admin/skills" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Projects", href: "/admin/projects" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.isAdmin) redirect("/");

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-4 border-b border-neutral-200 pb-4">
        <span className="text-sm font-semibold text-neutral-900">Admin</span>
        <nav className="flex gap-3 text-sm text-neutral-500">
          {ADMIN_SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="hover:text-neutral-900">
              {s.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
