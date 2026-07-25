import MiniWindow from "@/components/MiniWindow";
import TechPill from "@/components/TechPill";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const featuredSkills = await prisma.skill.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
  });

  return (
    <MiniWindow>
      <h2 className="mb-3 text-sm font-semibold text-neutral-500">Skills</h2>
      <div className="flex flex-wrap gap-2.5">
        {featuredSkills.map((skill) => (
          <TechPill key={skill.id} name={skill.name} iconSlug={skill.iconSlug} />
        ))}
      </div>
    </MiniWindow>
  );
}
