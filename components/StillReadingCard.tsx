import { Calendar } from "lucide-react";
import { CONTACT_CARD, CONTACT_EMAIL, SAY_HI_CARD } from "@/lib/constants";
import CopyMailButton from "./CopyMailButton";
import PageContactCard from "./PageContactCard";
import DarkPillLink from "./ui/DarkPillLink";

export default function StillReadingCard() {
  return (
    <PageContactCard heading={SAY_HI_CARD.heading} subtitle={SAY_HI_CARD.subtitle}>
      <DarkPillLink href={CONTACT_CARD.calUrl}>
        <Calendar className="h-4 w-4" />
        Book a call
      </DarkPillLink>
      <CopyMailButton mail={CONTACT_EMAIL} />
    </PageContactCard>
  );
}
