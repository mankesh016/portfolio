"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

type LinkItem<T extends string> = { type: T; label: string; url: string };

export default function TypedLinkListEditor<T extends string>({
  name,
  defaultValue,
  typeConfig,
  maxItems,
  itemsLabel,
  addLabel = "+ Add",
}: {
  name: string;
  defaultValue?: LinkItem<T>[];
  typeConfig: Record<T, { defaultLabel: string }>;
  maxItems?: number;
  itemsLabel?: string;
  addLabel?: string;
}) {
  const [items, setItems] = useState<LinkItem<T>[]>(defaultValue ?? []);
  const types = Object.keys(typeConfig) as T[];
  const atMax = maxItems != null && items.length >= maxItems;

  function addItem() {
    if (atMax) return;
    const type = types[0];
    setItems([...items, { type, label: typeConfig[type].defaultLabel, url: "" }]);
  }

  function updateItem(index: number, patch: Partial<LinkItem<T>>) {
    setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      {itemsLabel && <p className="mb-2 text-xs text-neutral-500">{itemsLabel}</p>}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2 rounded-md border border-neutral-100 p-2">
            <select
              value={item.type}
              onChange={(e) => {
                const type = e.target.value as T;
                updateItem(i, { type, label: typeConfig[type].defaultLabel });
              }}
              className="rounded-md border border-neutral-200 px-2 py-1 text-sm"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              value={item.label}
              onChange={(e) => updateItem(i, { label: e.target.value })}
              placeholder="Label"
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
            />
            <input
              value={item.url}
              onChange={(e) => updateItem(i, { url: e.target.value })}
              placeholder="https://..."
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
            />
            <button type="button" onClick={() => removeItem(i)}>
              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
            </button>
          </div>
        ))}
      </div>
      {!atMax && (
        <button type="button" onClick={addItem} className="mt-2 text-xs font-medium text-orange-600">
          {addLabel}
        </button>
      )}
    </div>
  );
}
