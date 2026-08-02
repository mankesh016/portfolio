"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { PROJECT_BUTTON_TYPES, type ProjectButtonType } from "@/lib/projectButtonTypes";

type ProjectButton = { type: ProjectButtonType; label: string; url: string };

export default function ProjectButtonsEditor({ defaultValue }: { defaultValue?: ProjectButton[] }) {
  const [buttons, setButtons] = useState<ProjectButton[]>(defaultValue ?? []);

  function addButton() {
    if (buttons.length >= 4) return;
    setButtons([...buttons, { type: "github", label: PROJECT_BUTTON_TYPES.github.defaultLabel, url: "" }]);
  }

  function updateButton(index: number, patch: Partial<ProjectButton>) {
    setButtons(buttons.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  }

  function removeButton(index: number) {
    setButtons(buttons.filter((_, i) => i !== index));
  }

  return (
    <div>
      <input type="hidden" name="buttons" value={JSON.stringify(buttons)} />
      <p className="mb-2 text-xs text-neutral-500">Buttons (up to 4)</p>
      <div className="space-y-2">
        {buttons.map((btn, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2 rounded-md border border-neutral-100 p-2">
            <select
              value={btn.type}
              onChange={(e) => {
                const type = e.target.value as ProjectButtonType;
                updateButton(i, { type, label: PROJECT_BUTTON_TYPES[type].defaultLabel });
              }}
              className="rounded-md border border-neutral-200 px-2 py-1 text-sm"
            >
              {Object.keys(PROJECT_BUTTON_TYPES).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              value={btn.label}
              onChange={(e) => updateButton(i, { label: e.target.value })}
              placeholder="Button text"
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
            />
            <input
              value={btn.url}
              onChange={(e) => updateButton(i, { url: e.target.value })}
              placeholder="https://..."
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
            />
            <button type="button" onClick={() => removeButton(i)}>
              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
            </button>
          </div>
        ))}
      </div>
      {buttons.length < 4 && (
        <button type="button" onClick={addButton} className="mt-2 text-xs font-medium text-orange-600">
          + Add Button
        </button>
      )}
    </div>
  );
}
