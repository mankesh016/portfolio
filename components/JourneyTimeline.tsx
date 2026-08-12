import TechPill from "@/components/TechPill";
import JourneyLinksRow from "@/components/JourneyLinkButton";
import { formatJourneyDate } from "@/lib/journeyDate";
import type { JourneyEvent } from "@prisma/client";
import { Avatar } from "@/components/ui/avatar";
import type { JourneyLinkType } from "@/lib/journeyLinkTypes";

export default function JourneyTimeline({ events }: { events: JourneyEvent[] }) {
  return (
    <div>
      {events.map((event, i) => {
        const tags = event.tags as { name: string; iconSlug?: string }[];
        return (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <Avatar src={event.logoUrl} shape="circle" size="sm" padded fallback={event.heading[0]} />
              {i < events.length - 1 && <div className="my-1 w-px flex-1 bg-neutral-200" />}
            </div>

            <div className="pb-8">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400">
                  {formatJourneyDate(
                    event.year,
                    event.month,
                    event.dateLabel,
                    event.endYear,
                    event.endMonth,
                    event.endDateLabel,
                  )}
                </span>
                {event.statusLabel && (
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs ${
                      event.statusVariant === "highlight"
                        ? "border-red-200 text-red-500"
                        : "border-neutral-200 text-neutral-500"
                    }`}
                  >
                    {event.statusLabel}
                  </span>
                )}
              </div>
              <h3 className="mt-1 font-semibold text-neutral-900">{event.heading}</h3>
              <p className="mt-1 text-sm text-neutral-500">{event.description}</p>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <TechPill key={tag.name} name={tag.name} iconSlug={tag.iconSlug ?? null} />
                  ))}
                </div>
              )}

              <JourneyLinksRow links={(event.links as { type: JourneyLinkType; label: string; url: string }[]) ?? []} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
