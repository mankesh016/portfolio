import { prisma } from "@/lib/prisma";
import JourneyTimeline from "@/components/JourneyTimeline";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const events = await prisma.journeyEvent.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <PageHeader
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
        heading="Journey"
        subtitle="Milestones, side quests, and things I've shared publicly."
      />

      <div className="mt-8">
        <JourneyTimeline events={events} />
      </div>
    </div>
  );
}
