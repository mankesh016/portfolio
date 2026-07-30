import { Calendar } from "lucide-react";
import { CONTACT_CARD, SOCIAL_LINKS } from "@/lib/constants";
import { LinkedinIcon } from "./icons/icons";
import DotPattern from "./DotPattern";

export default function ContactCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 p-8">
      <DotPattern />
      <div className="relative">
        <h2 className="text-3xl font-bold text-neutral-900">{CONTACT_CARD.heading}</h2>
        <p className="mt-3 max-w-[70%] text-neutral-500">{CONTACT_CARD.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={CONTACT_CARD.calUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Calendar className="h-4 w-4" />
            Book a call
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            <LinkedinIcon className="h-4 w-4" />
            Message on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
