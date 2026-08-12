import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteJourneyEvent, moveJourneyEvent } from "@/app/actions/journey";
import { formatJourneyDate } from "@/lib/journeyDate";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

export default async function AdminJourneyPage() {
  const events = await prisma.journeyEvent.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Journey Timeline</h1>
        <Link href="/admin/journey/new" className="text-sm text-orange-600">
          + Add Event
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        {events.map((e) => (
          <AdminEntityRow
            key={e.id}
            leading={<span className="text-neutral-400">{formatJourneyDate(e.year, e.month, e.dateLabel)}</span>}
            title={<span className="font-medium text-neutral-800">{e.heading}</span>}
            editHref={`/admin/journey/${e.id}/edit`}
            onDelete={deleteJourneyEvent.bind(null, e.id)}
            onMoveUp={moveJourneyEvent.bind(null, e.id, "up")}
            onMoveDown={moveJourneyEvent.bind(null, e.id, "down")}
          />
        ))}
      </div>
    </div>
  );
}
