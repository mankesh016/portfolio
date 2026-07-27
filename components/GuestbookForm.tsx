"use client";

import { useRef, useState } from "react";
import { createEntry } from "@/app/actions/guestbook";

export default function GuestbookForm({ userName }: { userName: string }) {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setPending(true);
        await createEntry(formData);
        formRef.current?.reset();
        setPending(false);
      }}
      className="rounded-lg border border-neutral-200 p-4"
    >
      <p className="text-sm text-neutral-500">
        Signed in as <span className="font-medium text-neutral-800">{userName}</span>
      </p>
      <textarea
        name="message"
        required
        rows={3}
        placeholder="Leave a note..."
        className="mt-3 w-full resize-none rounded-md border border-neutral-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-neutral-500">
          <input type="checkbox" name="anonymous" className="rounded border-neutral-300" />
          Post anonymously
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
        >
          {pending ? "Posting..." : "Sign the guestbook"}
        </button>
      </div>
    </form>
  );
}
