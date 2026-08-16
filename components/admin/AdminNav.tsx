"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_SECTIONS = [
  { label: "Profile", href: "/admin/profile" },
  { label: "Info Lines", href: "/admin/info-lines" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Education", href: "/admin/education" },
  { label: "Projects", href: "/admin/projects" },
  { label: "CP", href: "/admin/cp" },
  { label: "CP Highlights", href: "/admin/cp-highlights" },
  { label: "Journey", href: "/admin/journey" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
      <Link
        href="/admin"
        data-label="Admin"
        className={`nav-link text-sm ${pathname === "/admin" ? "font-semibold text-neutral-900" : "text-neutral-500 hover:text-neutral-800"}`}
      >
        <span>Admin</span>
      </Link>
      <nav className="flex gap-3 text-sm">
        {ADMIN_SECTIONS.map((s) => {
          const active = pathname.startsWith(s.href);
          return (
            <Link key={s.href} href={s.href} data-label={s.label} className="nav-link">
              <span
                className={
                  active ? "font-semibold text-neutral-900" : "font-normal text-neutral-500 hover:text-neutral-800"
                }
              >
                {s.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
