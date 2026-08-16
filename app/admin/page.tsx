import Link from "next/link";

const SECTIONS = [
  { label: "Profile", href: "/admin/profile", desc: "Name, tagline, about, photo, GitHub username" },
  { label: "Info Lines", href: "/admin/info-lines", desc: "Location, email, education, CP ranks" },
  { label: "Skills", href: "/admin/skills", desc: "Categories and skill pills" },
  { label: "Experience", href: "/admin/experience", desc: "Work history and roles" },
  { label: "Education", href: "/admin/education", desc: "Institutions, degrees, and years" },
  { label: "Projects", href: "/admin/projects", desc: "Project logos, media, buttons, tech stack" },
  { label: "Competitive Programming", href: "/admin/cp", desc: "Platform cards, images, best ranks" },
  {
    label: "CP Highlights",
    href: "/admin/cp-highlights",
    desc: "Home page rating/achievement cards (separate from the CP page above)",
  },
  { label: "Journey", href: "/admin/journey", desc: "About page timeline of milestones" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
      <div className="mt-4 space-y-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50"
          >
            <p className="text-sm font-medium text-neutral-800">{s.label}</p>
            <p className="text-xs text-neutral-400">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
