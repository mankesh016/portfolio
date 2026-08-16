"use client";

import type { CpAchievementCard } from "@prisma/client";

export default function CpAchievementCardForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: CpAchievementCard;
}) {
  return (
    <form action={action} className="space-y-3">
      <input
        name="label"
        placeholder="Label (e.g. ICPC 2025 · Kanpur Regionals)"
        defaultValue={defaultValues?.label}
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
      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
