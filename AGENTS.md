<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions

Personal portfolio + admin CMS. Next.js (App Router) + React + TypeScript (`strict`) + Prisma/Postgres + Auth.js v5 (Google OAuth, single admin via `ADMIN_EMAIL`) + Tailwind v4/shadcn + Vercel Blob + Sharp.

## Content model

- I am the only person who ever writes data (single-admin CMS). Do not add input-validation libraries (zod, etc.), rate limiting, or defensive parsing for adversarial input unless explicitly asked — that tradeoff is intentional, not an oversight.
- Several relations are intentionally stored as Prisma `Json` columns (`techStack`, `buttons`, `tags`, `skillsUsed`, `links`, `infoLines`) instead of proper relational tables. This is a deliberate speed tradeoff for a small personal site — don't "fix" it into real tables without discussing it first.

## DRY — reuse before you write

This codebase had a lot of copy-pasted components before a cleanup pass. When you're about to add a component or action, check whether one of these shared abstractions already covers it — and if a pattern is about to be copy-pasted a second time, extract it into one of these instead of duplicating:

- **`Avatar`** — any logo/photo image with a fallback (initial letter, square or circle). Used by project/experience/journey/platform cards.
- **`Card`** (`components/ui/card.tsx`, CVA-based like `components/ui/button.tsx`) — the repeated `rounded-lg border border-neutral-200 bg-white p-4` container style. Never re-type that className string inline; use the primitive.
- **`useImageUpload(endpoint)`** hook — the "pick file → POST to an `/api/admin/upload-*` route → track `uploading` state" flow used by every admin upload field.
- **`SortableList`** — wraps `@dnd-kit` `DndContext`/`SortableContext`/`arrayMove` boilerplate for any drag-to-reorder list. Never hand-roll `DndContext` setup a second time, and never type drag handlers as `(event: any)` — import `DragEndEvent` from `@dnd-kit/core`.
- **`TypedLinkListEditor`** — the "type + label + url + delete, add up to N" admin editor pattern (used for project buttons and journey links).
- **`lib/reorder.ts`** — the up/down swap-`order`-with-neighbor-in-a-transaction logic used by every `move*` server action (projects, journey events, info lines, platform card images). New reorderable entities should call this helper, not reimplement the swap.
- **`AdminEntityRow`** — the admin list-page row (title/subtitle + optional move/feature-toggle/edit-link/delete-form actions). New admin list pages should compose this rather than rewriting the row markup.

If one of these doesn't exist yet when you need it, that's a signal to create it rather than copy the nearest similar component.

## Server actions

- Live in `app/actions/*.ts` with `"use server"`.
- Every mutation starts with an admin check. Use the shared guard from `lib/auth-guards.ts` (`assertAdmin()`) rather than redefining it per file.
- Call `revalidatePath` for every route that renders the changed data after a mutation.

## Styling

- Tailwind utility classes via the `cn()` helper (`lib/utils.ts`) for conditional/merged classes. No CSS modules, no styled-components.
- Reuse `components/ui/*` primitives (CVA-based, following `button.tsx`) instead of inlining variant logic with template strings.
