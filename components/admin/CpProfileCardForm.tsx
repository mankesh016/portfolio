"use client";

import type { CpProfileCard } from "@prisma/client";

export default function CpProfileCardForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: CpProfileCard;
}) {
  return (
    <form action={action} className="space-y-3">
      <input
        name="platform"
        placeholder="Platform (e.g. Codeforces)"
        defaultValue={defaultValues?.platform}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="iconSlug"
        placeholder="Simple Icons slug (optional — falls back to platform name)"
        defaultValue={defaultValues?.iconSlug ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="rankTitle"
        placeholder="Rank title (e.g. Candidate Master)"
        defaultValue={defaultValues?.rankTitle}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="rankSubtitle"
        placeholder="Optional caption (e.g. Among Top 0.9% in Country)"
        defaultValue={defaultValues?.rankSubtitle ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        <input
          name="sinceMonth"
          type="number"
          min={1}
          max={12}
          placeholder="Since month (opt.)"
          defaultValue={defaultValues?.sinceMonth ?? ""}
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="sinceYear"
          type="number"
          placeholder="Since year"
          defaultValue={defaultValues?.sinceYear}
          required
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          name="peak"
          type="number"
          placeholder="Peak rating"
          defaultValue={defaultValues?.peak}
          required
          className="rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="contests"
          type="number"
          placeholder="Contests"
          defaultValue={defaultValues?.contests}
          required
          className="rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="solved"
          type="number"
          placeholder="Solved"
          defaultValue={defaultValues?.solved}
          required
          className="rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="bestRank"
          type="number"
          placeholder="Best rank"
          defaultValue={defaultValues?.bestRank}
          required
          className="rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
