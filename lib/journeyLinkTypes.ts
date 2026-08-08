import { LinkedinIcon, YoutubeIcon } from "@/components/icons/icons";
import { ExternalLink } from "lucide-react";

export const JOURNEY_LINK_TYPES = {
  youtube: { defaultLabel: "View on YouTube", Icon: YoutubeIcon },
  linkedin: { defaultLabel: "View on LinkedIn", Icon: LinkedinIcon },
  external: { defaultLabel: "View", Icon: ExternalLink },
} as const;

export type JourneyLinkType = keyof typeof JOURNEY_LINK_TYPES;
