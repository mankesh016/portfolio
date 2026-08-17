import { Calendar } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PlatformCard from "@/components/PlatformCard";
import PageContactCard from "@/components/PageContactCard";
import CopyMailButton from "@/components/CopyMailButton";
import DarkPillLink from "@/components/ui/DarkPillLink";
import { CONTACT_CARD, CONTACT_EMAIL, CP_CONTACT_CARD } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Competitive Programming" };

export default async function CompetitiveProgrammingPage() {
  const cards = await prisma.platformCard.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });

  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Competitive Programming" }]}
        heading="Competitive Programming"
        subtitle="Ratings, ranks, and results across platforms."
      />

      <div className="space-y-4">
        {cards.map((card) => (
          <PlatformCard
            key={card.id}
            heading={card.heading}
            subtitle={card.subtitle}
            logoUrl={card.logoUrl}
            infoLines={card.infoLines as { icon: string; text: string }[]}
            images={card.images}
          />
        ))}
      </div>

      <div className="mt-8">
        <PageContactCard heading={CP_CONTACT_CARD.heading} subtitle={CP_CONTACT_CARD.subtitle}>
          <DarkPillLink href={CONTACT_CARD.calUrl}>
            <Calendar className="h-4 w-4" />
            Book a call
          </DarkPillLink>
          <CopyMailButton mail={CONTACT_EMAIL} />
        </PageContactCard>
      </div>
    </div>
  );
}
