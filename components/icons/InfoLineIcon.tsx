import { LUCIDE_ICON_MAP, type LucideIconKey } from "@/lib/lucideIcons";

export default function InfoLineIcon({ iconType, iconValue }: { iconType: string; iconValue: string }) {
  if (iconType === "lucide") {
    const Icon = LUCIDE_ICON_MAP[iconValue as LucideIconKey];
    if (!Icon) return null;
    return <Icon className="h-4 w-4 text-neutral-400" />;
  }
  return <img src={`https://cdn.simpleicons.org/${iconValue}/737373`} alt="" className="h-4 w-4" />;
}
