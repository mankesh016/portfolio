import { prisma } from "@/lib/prisma";
import ExperienceCard from "@/components/ExperienceCard";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "Experience" };

export default async function ExperiencePage() {
  const items = await prisma.experience.findMany({
    orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
  });
  return (
    <div className="space-y-4">
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Experience" }]}
        heading="Experience"
        subtitle="Where I've worked and what I've built there."
      />
      {items.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} />
      ))}
    </div>
  );
}
