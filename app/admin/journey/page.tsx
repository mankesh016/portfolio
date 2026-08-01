import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteJourneyEvent, moveJourneyEvent } from "@/app/actions/journey";
import { formatJourneyDate } from "@/lib/journeyDate";
import { ArrowUp, ArrowDown } from "lucide-react";

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
          <div
            key={e.id}
            className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-sm"
          >
            <div>
              <span className="text-neutral-400">{formatJourneyDate(e.year, e.month, e.dateLabel)}</span>{" "}
              <span className="font-medium text-neutral-800">{e.heading}</span>
            </div>
            <div className="flex items-center gap-3">
              <form action={moveJourneyEvent.bind(null, e.id, "up")}>
                <button>
                  <ArrowUp className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
                </button>
              </form>
              <form action={moveJourneyEvent.bind(null, e.id, "down")}>
                <button>
                  <ArrowDown className="h-4 w-4 text-neutral-400 hover:text-neutral-700" />
                </button>
              </form>
              <Link href={`/admin/journey/${e.id}/edit`} className="text-blue-600">
                Edit
              </Link>
              <form action={deleteJourneyEvent.bind(null, e.id)}>
                <button className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
