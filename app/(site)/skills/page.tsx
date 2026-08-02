import PageHeader from "@/components/PageHeader";
import TechPill from "@/components/TechPill";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Skills" };
export default async function SkillsPage() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Skills" }]}
        heading="Skills"
        subtitle="Languages, frameworks, and tools I work with."
      />
      {categories.map((category) => (
        <div key={category.id}>
          <h2 className="mb-3 text-sm font-semibold text-neutral-700">{category.name}</h2>
          <div className="flex flex-wrap gap-2.5">
            {category.skills.map((skill) => (
              <TechPill key={skill.id} name={skill.name} iconSlug={skill.iconSlug} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
