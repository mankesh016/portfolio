import { formatJourneyDate } from "@/lib/journeyDate";
import type { JourneyEvent } from "@prisma/client";
import { cn } from "@/lib/utils";

const VARIANT_STYLES: Record<string, { dot: string; label: string }> = {
  highlight: { dot: "border-amber-700 bg-amber-700", label: "text-amber-700" },
  neutral: { dot: "border-stone-300 bg-[#fdfbf6]", label: "text-stone-400" },
};

export default function JourneyTimeline({ events }: { events: JourneyEvent[] }) {
  return (
    <div>
      {events.map((event, i) => {
        const variant = VARIANT_STYLES[event.statusVariant] ?? VARIANT_STYLES.neutral;
        return (
          <div key={event.id} className="flex gap-4 sm:gap-6">
            <div className="flex flex-col items-center pt-1.5">
              <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full border-2", variant.dot)} />
              {i < events.length - 1 && <div className="my-1 w-px flex-1 bg-stone-200" />}
            </div>

            <div className="flex flex-1 flex-col gap-1 pb-8 sm:flex-row sm:gap-6">
              <span
                className={cn(
                  "shrink-0 pt-0.5 font-mono text-xs tracking-wide uppercase sm:w-28",
                  variant.label,
                )}
              >
                {formatJourneyDate(
                  event.year,
                  event.month,
                  event.dateLabel,
                  event.endYear,
                  event.endMonth,
                  event.endDateLabel,
                )}
              </span>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-neutral-900">{event.heading}</h3>
                  {event.statusLabel && (
                    <span className="rounded-full border border-stone-300 px-2 py-0.5 font-mono text-[10px] tracking-wide text-stone-500 uppercase">
                      {event.statusLabel}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-neutral-500">{event.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
