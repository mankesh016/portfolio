import { JOURNEY_LINK_TYPES, type JourneyLinkType } from "@/lib/journeyLinkTypes";

type JourneyLink = { type: JourneyLinkType; label: string; url: string };

export default function JourneyLinksRow({ links }: { links: JourneyLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {links.map((link, i) => {
        const { Icon } = JOURNEY_LINK_TYPES[link.type];
        return (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
