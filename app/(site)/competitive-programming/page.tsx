import PageHeader from "@/components/PageHeader";
import PlatformCard from "@/components/PlatformCard";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Competitive Programming" };

export default async function CompetitiveProgrammingPage() {
  const cards = await prisma.platformCard.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "Competitive Programming" }]}
        heading="Competitive Programming"
        subtitle="Ratings, ranks, and results across platforms."
      />

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
  );
}
