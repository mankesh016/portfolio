import { PROJECT_BUTTON_TYPES, type ProjectButtonType } from "@/lib/projectButtonTypes";

type ProjectButton = { type: ProjectButtonType; label: string; url: string };

export default function ProjectButtonsRow({ buttons }: { buttons: ProjectButton[] }) {
  if (buttons.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((btn, i) => {
        const { Icon } = PROJECT_BUTTON_TYPES[btn.type];
        return (
          <a
            key={i}
            href={btn.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
          >
            <Icon className="h-4 w-4" />
            {btn.label}
          </a>
        );
      })}
    </div>
  );
}
