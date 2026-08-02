"use client";

import LogoUploadField from "./LogoUploadField";
import { useState } from "react";
import type { JourneyEvent } from "@prisma/client";

export default function JourneyEventForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: JourneyEvent;
}) {
  const [linkType, setLinkType] = useState(defaultValues?.linkType ?? "");
  const [endDateLabel, setEndDateLabel] = useState(defaultValues?.endDateLabel ?? "");
  const tags = (defaultValues?.tags as { name: string; iconSlug?: string }[]) ?? [];

  return (
    <form action={action} className="space-y-3">
      <div className="flex gap-2">
        <input
          name="year"
          type="number"
          placeholder="Start year"
          defaultValue={defaultValues?.year}
          required
          className="w-1/3 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="month"
          type="number"
          min={1}
          max={12}
          placeholder="Start month (opt.)"
          defaultValue={defaultValues?.month ?? ""}
          className="w-1/3 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="dateLabel"
          placeholder="Start override (opt.)"
          defaultValue={defaultValues?.dateLabel ?? ""}
          className="w-1/3 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="rounded-md border border-neutral-100 p-3">
        <p className="mb-2 text-xs text-neutral-500">End date (leave all blank for a single-point event)</p>
        <div className="flex flex-wrap gap-2">
          <input
            name="endYear"
            type="number"
            placeholder="End year (opt.)"
            defaultValue={defaultValues?.endYear ?? ""}
            className="w-28 rounded-md border border-neutral-200 px-3 py-2 text-sm"
          />
          <input
            name="endMonth"
            type="number"
            min={1}
            max={12}
            placeholder="End month (opt.)"
            defaultValue={defaultValues?.endMonth ?? ""}
            className="w-32 rounded-md border border-neutral-200 px-3 py-2 text-sm"
          />
          <input
            name="endDateLabel"
            placeholder='Override (e.g. "Present")'
            value={endDateLabel}
            onChange={(e) => setEndDateLabel(e.target.value)}
            className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => setEndDateLabel("Present")}
            className="rounded-md border border-neutral-200 px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-50"
          >
            Set "Present"
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          name="statusLabel"
          placeholder="Status badge text (optional)"
          defaultValue={defaultValues?.statusLabel ?? ""}
          className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <select
          name="statusVariant"
          defaultValue={defaultValues?.statusVariant ?? "neutral"}
          className="rounded-md border border-neutral-200 px-2 py-2 text-sm"
        >
          <option value="neutral">Neutral</option>
          <option value="highlight">Highlight</option>
        </select>
      </div>

      <LogoUploadField name="logoUrl" defaultValue={defaultValues?.logoUrl ?? ""} />
      <input
        name="heading"
        placeholder="Heading"
        defaultValue={defaultValues?.heading}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <textarea
        name="description"
        placeholder="Description"
        defaultValue={defaultValues?.description}
        rows={3}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <textarea
        name="tags"
        placeholder={"One per line: Name | iconSlug (optional)"}
        defaultValue={tags.map((t) => (t.iconSlug ? `${t.name} | ${t.iconSlug}` : t.name)).join("\n")}
        rows={3}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        <select
          name="linkType"
          value={linkType}
          onChange={(e) => setLinkType(e.target.value)}
          className="rounded-md border border-neutral-200 px-2 py-2 text-sm"
        >
          <option value="">No link</option>
          <option value="youtube">YouTube</option>
          <option value="linkedin">LinkedIn</option>
          <option value="external">External</option>
        </select>
        {linkType && (
          <>
            <input
              name="linkLabel"
              placeholder="Label (optional, auto if blank)"
              defaultValue={defaultValues?.linkLabel ?? ""}
              className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
            />
            <input
              name="linkUrl"
              placeholder="URL"
              defaultValue={defaultValues?.linkUrl ?? ""}
              className="flex-1 rounded-md border border-neutral-200 px-3 py-2 text-sm"
            />
          </>
        )}
      </div>

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
