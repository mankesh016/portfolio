import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteCard } from "@/app/actions/platformCards";

export default async function AdminCPPage() {
  const cards = await prisma.platformCard.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">Competitive Programming Cards</h1>
        <Link href="/admin/cp/new" className="text-sm text-orange-600">
          + Add Card
        </Link>
      </div>
      <div className="mt-4 space-y-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-md border border-neutral-100 px-3 py-2 text-sm"
          >
            <div>
              <span className="font-medium text-neutral-800">{card.heading}</span>{" "}
              {card.subtitle && <span className="text-neutral-400">— {card.subtitle}</span>}
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/cp/${card.id}/edit`} className="text-blue-600">
                Edit
              </Link>
              <form action={deleteCard.bind(null, card.id)}>
                <button className="text-red-600">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
