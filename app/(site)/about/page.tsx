import { prisma } from "@/lib/prisma";
import JourneyTimeline from "@/components/JourneyTimeline";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const events = await prisma.journeyEvent.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900">Journey</h1>
      <p className="mt-2 text-neutral-500">Milestones, side quests, and things I've shared publicly.</p>

      <div className="mt-8">
        <JourneyTimeline events={events} />
      </div>
    </div>
  );
}
