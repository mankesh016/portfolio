"use client";

import LogoUploadField from "./LogoUploadField";
import type { PlatformCard } from "@prisma/client";

export default function PlatformCardForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: PlatformCard;
}) {
  const infoLines = (defaultValues?.infoLines as { icon: string; text: string }[]) ?? [];

  return (
    <form action={action} className="space-y-3">
      <input
        name="heading"
        placeholder="Heading (e.g. Codeforces, or Best Ranks)"
        defaultValue={defaultValues?.heading}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="subtitle"
        placeholder="Subtitle (e.g. Candidate Master · 2040 rating)"
        defaultValue={defaultValues?.subtitle ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <div>
        <p className="mb-1 text-xs text-neutral-500">Logo (optional — leave blank for cards like Best Ranks)</p>
        <LogoUploadField name="logoUrl" defaultValue={defaultValues?.logoUrl ?? ""} />
      </div>
      <textarea
        name="infoLines"
        placeholder={"One per line: lucide-slug | Text\ne.g.\ntrophy | Contests: 150\nhash | Problems Solved: 1800"}
        defaultValue={infoLines.map((l) => `${l.icon} | ${l.text}`).join("\n")}
        rows={6}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
