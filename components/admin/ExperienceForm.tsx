"use client";

import LogoUploadField from "./LogoUploadField";
import { useState } from "react";
import type { Experience } from "@prisma/client";

export default function ExperienceForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Experience;
}) {
  const [isCurrent, setIsCurrent] = useState(defaultValues?.isCurrent ?? false);
  const skills = (defaultValues?.skillsUsed as { name: string; iconSlug?: string }[]) ?? [];

  return (
    <form action={action} className="space-y-3">
      <input
        name="companyName"
        placeholder="Company name"
        defaultValue={defaultValues?.companyName}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="companyUrl"
        placeholder="https://company.com"
        defaultValue={defaultValues?.companyUrl ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <LogoUploadField name="logoUrl" defaultValue={defaultValues?.logoUrl ?? ""} />
      <input
        name="title"
        placeholder="Title (e.g. Software Engineering Intern)"
        defaultValue={defaultValues?.title}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="location"
        placeholder="Location"
        defaultValue={defaultValues?.location ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <div className="flex gap-2">
        <input
          name="startMonth"
          type="number"
          min={1}
          max={12}
          placeholder="Start month (1-12)"
          defaultValue={defaultValues?.startMonth}
          required
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
        <input
          name="startYear"
          type="number"
          placeholder="Start year"
          defaultValue={defaultValues?.startYear}
          required
          className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-600">
        <input type="checkbox" name="isCurrent" checked={isCurrent} onChange={(e) => setIsCurrent(e.target.checked)} />
        Current role
      </label>

      {!isCurrent && (
        <div className="flex gap-2">
          <input
            name="endMonth"
            type="number"
            min={1}
            max={12}
            placeholder="End month (1-12)"
            defaultValue={defaultValues?.endMonth ?? ""}
            className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
          />
          <input
            name="endYear"
            type="number"
            placeholder="End year"
            defaultValue={defaultValues?.endYear ?? ""}
            className="w-1/2 rounded-md border border-neutral-200 px-3 py-2 text-sm"
          />
        </div>
      )}

      <textarea
        name="summaryShort"
        placeholder="Short summary (for Home page)"
        defaultValue={defaultValues?.summaryShort}
        rows={2}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <textarea
        name="bulletsLong"
        placeholder={"One bullet per line (for /experience page)"}
        defaultValue={(defaultValues?.bulletsLong as string[])?.join("\n")}
        rows={5}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <textarea
        name="skillsUsed"
        placeholder={
          "One skill per line: Name | iconSlug (iconSlug optional)\ne.g.\nGo | go\nKubernetes | kubernetes\nCobra CLI Framework"
        }
        defaultValue={skills.map((s) => (s.iconSlug ? `${s.name} | ${s.iconSlug}` : s.name)).join("\n")}
        rows={4}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <label className="flex items-center gap-2 text-sm text-neutral-600">
        <input type="checkbox" name="isFeatured" defaultChecked={defaultValues?.isFeatured} />
        Show on Home page
      </label>

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
