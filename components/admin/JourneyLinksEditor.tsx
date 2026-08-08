"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { JOURNEY_LINK_TYPES, type JourneyLinkType } from "@/lib/journeyLinkTypes";

type JourneyLink = { type: JourneyLinkType; label: string; url: string };

export default function JourneyLinksEditor({ defaultValue }: { defaultValue?: JourneyLink[] }) {
  const [links, setLinks] = useState<JourneyLink[]>(defaultValue ?? []);

  function addLink() {
    setLinks([...links, { type: "external", label: JOURNEY_LINK_TYPES.external.defaultLabel, url: "" }]);
  }

  function updateLink(index: number, patch: Partial<JourneyLink>) {
    setLinks(links.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  }

  function removeLink(index: number) {
    setLinks(links.filter((_, i) => i !== index));
  }

  return (
    <div>
      <input type="hidden" name="links" value={JSON.stringify(links)} />
      <p className="mb-2 text-xs text-neutral-500">Links (optional, any number)</p>
      <div className="space-y-2">
        {links.map((link, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2 rounded-md border border-neutral-100 p-2">
            <select
              value={link.type}
              onChange={(e) => {
                const type = e.target.value as JourneyLinkType;
                updateLink(i, { type, label: JOURNEY_LINK_TYPES[type].defaultLabel });
              }}
              className="rounded-md border border-neutral-200 px-2 py-1 text-sm"
            >
              {Object.keys(JOURNEY_LINK_TYPES).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              value={link.label}
              onChange={(e) => updateLink(i, { label: e.target.value })}
              placeholder="Label"
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
            />
            <input
              value={link.url}
              onChange={(e) => updateLink(i, { url: e.target.value })}
              placeholder="https://..."
              className="flex-1 rounded-md border border-neutral-200 px-2 py-1 text-sm"
            />
            <button type="button" onClick={() => removeLink(i)}>
              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-600" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addLink} className="mt-2 text-xs font-medium text-orange-600">
        + Add Link
      </button>
    </div>
  );
}
