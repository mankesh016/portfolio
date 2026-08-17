import type { ReactNode } from "react";

/** "Ex-intern, *Google*" -> ["Ex-intern, ", <strong>Google</strong>] */
export function renderBoldText(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <strong key={i} className="font-semibold text-neutral-900">
        {part.slice(1, -1)}
      </strong>
    ) : (
      part
    ),
  );
}
