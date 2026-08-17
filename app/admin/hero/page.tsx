import { prisma } from "@/lib/prisma";
import Link from "next/link";
import HeroProfileForm from "@/components/admin/HeroProfileForm";
import AdminEntityRow from "@/components/admin/AdminEntityRow";
import { updateHeroProfile, deleteHeroEntry, moveHeroEntry } from "@/app/actions/hero";

export default async function AdminHeroPage() {
  const [heroProfile, entries] = await Promise.all([
    prisma.heroProfile.findUnique({ where: { id: "singleton" } }),
    prisma.heroEntry.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Hero</h1>
        <div className="mt-4">
          <HeroProfileForm action={updateHeroProfile} defaultValues={heroProfile} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Hero Entries</h2>
          <Link href="/admin/hero/entries/new" className="text-sm text-orange-600">
            + Add
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {entries.map((entry) => (
            <AdminEntityRow
              key={entry.id}
              title={<span className="font-medium text-neutral-800">{entry.text}</span>}
              editHref={`/admin/hero/entries/${entry.id}/edit`}
              onDelete={deleteHeroEntry.bind(null, entry.id)}
              onMoveUp={moveHeroEntry.bind(null, entry.id, "up")}
              onMoveDown={moveHeroEntry.bind(null, entry.id, "down")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
