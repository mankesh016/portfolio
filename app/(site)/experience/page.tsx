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
      <div className="divide-y divide-neutral-100">
        {items.map((exp) => (
          <div key={exp.id} className="py-6 first:pt-0">
            <ExperienceCard exp={exp} />
          </div>
        ))}
      </div>
    </div>
  );
}
