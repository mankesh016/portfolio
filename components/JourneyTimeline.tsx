import TechPill from "@/components/TechPill";
import JourneyLinkButton from "@/components/JourneyLinkButton";
import { formatJourneyDate } from "@/lib/journeyDate";
import type { JourneyEvent } from "@prisma/client";

export default function JourneyTimeline({ events }: { events: JourneyEvent[] }) {
  return (
    <div>
      {events.map((event, i) => {
        const tags = event.tags as { name: string; iconSlug?: string }[];
        return (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white">
                {event.logoUrl ? (
                  <img src={event.logoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs font-semibold text-neutral-300">{event.heading[0]}</span>
                )}
              </div>
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

              {event.linkUrl && (
                <div className="mt-2">
                  <JourneyLinkButton type={event.linkType ?? "external"} label={event.linkLabel} url={event.linkUrl} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
