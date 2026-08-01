import { YoutubeIcon, LinkedinIcon } from "@/components/icons/icons";
import { ExternalLink } from "lucide-react";

export default function JourneyLinkButton({
  type,
  label,
  url,
}: {
  type: string;
  label: string | null;
  url: string | null;
}) {
  if (!url) return null;
  const Icon = type === "youtube" ? YoutubeIcon : type === "linkedin" ? LinkedinIcon : ExternalLink;
  const defaultLabel = type === "youtube" ? "Watch Video" : type === "linkedin" ? "LinkedIn Post" : "View";

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800"
    >
      <Icon className="h-3.5 w-3.5" />
      {label || defaultLabel}
    </a>
  );
}
