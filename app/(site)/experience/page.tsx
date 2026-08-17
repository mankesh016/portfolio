import { Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ExperienceCard from "@/components/ExperienceCard";
import PageHeader from "@/components/PageHeader";
import PageContactCard from "@/components/PageContactCard";
import CopyMailButton from "@/components/CopyMailButton";
import DarkPillLink from "@/components/ui/DarkPillLink";
import { CONTACT_EMAIL, EXPERIENCE_CONTACT_CARD } from "@/lib/constants";

export const metadata = { title: "Experience" };

export default async function ExperiencePage() {
  const [items, heroProfile] = await Promise.all([
    prisma.experience.findMany({
      orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
    }),
    prisma.heroProfile.findUnique({ where: { id: "singleton" } }),
  ]);

  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Experience" }]}
        heading="Experience"
        subtitle="Where I've worked and what I've built there."
      />
      <div className="space-y-4">
        {items.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>

      <div className="mt-8">
        <PageContactCard heading={EXPERIENCE_CONTACT_CARD.heading} subtitle={EXPERIENCE_CONTACT_CARD.subtitle}>
          {heroProfile?.resumeUrl && (
            <DarkPillLink href={heroProfile.resumeUrl}>
              <Download className="h-4 w-4" />
              Resume
            </DarkPillLink>
          )}
          <CopyMailButton mail={CONTACT_EMAIL} />
        </PageContactCard>
      </div>
    </div>
  );
}
