import { prisma } from "@/lib/prisma";
import ExperienceCard from "@/components/ExperienceCard";

export const metadata = { title: "Experience" };

export default async function ExperiencePage() {
  const items = await prisma.experience.findMany({
    orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
  });
  return (
    <div className="space-y-4">
      {items.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} />
      ))}
    </div>
  );
}
