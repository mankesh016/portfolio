"use client";

import LogoUploadField from "./LogoUploadField";
import { useState } from "react";
import type { Education } from "@prisma/client";

export default function EducationForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Education;
}) {
  const [isCurrent, setIsCurrent] = useState(defaultValues?.isCurrent ?? false);

  return (
    <form action={action} className="space-y-3">
      <input
        name="institutionName"
        placeholder="Institution name"
        defaultValue={defaultValues?.institutionName}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="institutionUrl"
        placeholder="https://institution.edu"
        defaultValue={defaultValues?.institutionUrl ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <LogoUploadField name="logoUrl" defaultValue={defaultValues?.logoUrl ?? ""} />
      <input
        name="degree"
        placeholder="Degree (e.g. Bachelor of Technology in Computer Science)"
        defaultValue={defaultValues?.degree}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        <input
          name="startYear"
          type="number"
          placeholder="Start year"
          defaultValue={defaultValues?.startYear}
          required
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="endYear"
          type="number"
          placeholder="End year (expected)"
          defaultValue={defaultValues?.endYear ?? ""}
          disabled={isCurrent}
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm disabled:opacity-50"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600">
        <input type="checkbox" name="isCurrent" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} />
        Currently studying here
      </label>

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
