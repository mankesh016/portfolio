"use client";

import LogoUploadField from "./LogoUploadField";
import type { HeroEntry } from "@prisma/client";

export default function HeroEntryForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: HeroEntry;
}) {
  return (
    <form action={action} className="space-y-3">
      <LogoUploadField name="logoUrl" defaultValue={defaultValues?.logoUrl ?? ""} />
      <input
        name="text"
        placeholder="Text — wrap in *asterisks* for bold, e.g. Ex-intern, *Google*"
        defaultValue={defaultValues?.text}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <input
        name="link"
        placeholder="Link (optional)"
        defaultValue={defaultValues?.link ?? ""}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
