import { Calendar } from "lucide-react";
import { CONTACT_CARD, CONTACT_EMAIL, SAY_HI_CARD } from "@/lib/constants";
import CopyMailButton from "./CopyMailButton";
import DotPattern from "./DotPattern";

export default function StillReadingCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-300 bg-[#fdfbf6] p-8">
      <DotPattern />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between lg:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="text-3xl font-bold text-neutral-900">{SAY_HI_CARD.heading}</h2>
          <p className="mt-3 max-w-md text-neutral-500">{SAY_HI_CARD.subtitle}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 items-start md:items-end">
          <a
            href={CONTACT_CARD.calUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <Calendar className="h-4 w-4" />
            Book a call
          </a>
          <CopyMailButton mail={CONTACT_EMAIL} />
        </div>
      </div>
    </div>
  );
}
