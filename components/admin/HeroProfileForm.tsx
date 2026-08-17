"use client";

import { useState } from "react";
import type { HeroProfile } from "@prisma/client";

export default function HeroProfileForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: HeroProfile | null;
}) {
  const [isOpenToWork, setIsOpenToWork] = useState(defaultValues?.isOpenToWork ?? false);

  return (
    <form action={action} className="space-y-3 rounded-lg border border-neutral-200 p-4">
      <input
        name="mail"
        type="email"
        placeholder="Email (optional)"
        defaultValue={defaultValues?.mail ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="resumeUrl"
        placeholder="Resume link (optional, e.g. Google Drive URL)"
        defaultValue={defaultValues?.resumeUrl ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="location"
        placeholder="Location (optional, e.g. Jaipur, India)"
        defaultValue={defaultValues?.location ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <label className="flex items-center gap-2 text-sm text-neutral-600">
        <input
          type="checkbox"
          name="isOpenToWork"
          checked={isOpenToWork}
          onChange={(e) => setIsOpenToWork(e.target.checked)}
        />
        Open to work
      </label>

      {isOpenToWork && (
        <input
          name="openToWorkText"
          placeholder='e.g. "Open to full-time SWE roles"'
          defaultValue={defaultValues?.openToWorkText ?? ""}
          className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      )}

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
