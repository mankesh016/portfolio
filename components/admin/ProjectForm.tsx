"use client";

import LogoUploadField from "./LogoUploadField";
import ProjectMediaField from "./ProjectMediaField";
import ProjectButtonsEditor from "./ProjectButtonsEditor";
import type { Project } from "@prisma/client";

export default function ProjectForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Project;
}) {
  const techStack = (defaultValues?.techStack as { name: string; iconSlug?: string }[]) ?? [];
  const buttons = (defaultValues?.buttons as any[]) ?? [];

  return (
    <form action={action} className="space-y-4">
      <input
        name="name"
        placeholder="Project name"
        defaultValue={defaultValues?.name}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <LogoUploadField name="logoUrl" defaultValue={defaultValues?.logoUrl ?? ""} />
      <textarea
        name="shortDescription"
        placeholder="Short description (for list page)"
        defaultValue={defaultValues?.shortDescription}
        rows={2}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />
      <textarea
        name="longDescription"
        placeholder="Full description (for detail page)"
        defaultValue={defaultValues?.longDescription}
        rows={4}
        required
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <ProjectMediaField defaultValues={defaultValues} />
      <ProjectButtonsEditor defaultValue={buttons} />

      <textarea
        name="techStack"
        placeholder={"One per line: Name | iconSlug (optional)\ne.g.\nNext.js | nextdotjs\nBullMQ"}
        defaultValue={techStack.map((t) => (t.iconSlug ? `${t.name} | ${t.iconSlug}` : t.name)).join("\n")}
        rows={4}
        className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm"
      />

      <button type="submit" className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        Save
      </button>
    </form>
  );
}
