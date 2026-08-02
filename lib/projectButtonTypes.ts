import { GithubIcon, YoutubeIcon } from "@/components/icons/icons";
import { ExternalLink, PlayCircle } from "lucide-react";

export const PROJECT_BUTTON_TYPES = {
  github: { defaultLabel: "View on GitHub", Icon: GithubIcon },
  live: { defaultLabel: "View Live", Icon: ExternalLink },
  demo: { defaultLabel: "View Demo", Icon: PlayCircle },
  youtube: { defaultLabel: "View on YouTube", Icon: YoutubeIcon },
} as const;

export type ProjectButtonType = keyof typeof PROJECT_BUTTON_TYPES;
