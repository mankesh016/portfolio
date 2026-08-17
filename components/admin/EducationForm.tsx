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
      <input
        name="location"
        placeholder="Location (optional, e.g. Jaipur, Rajasthan)"
        defaultValue={defaultValues?.location ?? ""}
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

      <div className="flex gap-2">
        <input
          name="cgpaAttained"
          type="number"
          step="0.01"
          placeholder="CGPA attained (optional, e.g. 8.2)"
          defaultValue={defaultValues?.cgpaAttained ?? ""}
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="cgpaTotal"
          type="number"
          step="0.01"
          placeholder="CGPA total (e.g. 10)"
          defaultValue={defaultValues?.cgpaTotal ?? ""}
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <textarea
        name="relevantCoursework"
        placeholder="Relevant coursework (optional, e.g. DSA, Operating Systems, DBMS, Computer Networks, OOPS)"
        defaultValue={defaultValues?.relevantCoursework ?? ""}
        rows={2}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
