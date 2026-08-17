import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteCard } from "@/app/actions/platformCards";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

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
          <AdminEntityRow
            key={card.id}
            title={
              <>
                <span className="font-medium text-neutral-800">{card.heading}</span>{" "}
                {card.subtitle && <span className="text-neutral-400">— {card.subtitle}</span>}
              </>
            }
            editHref={`/admin/cp/${card.id}/edit`}
            onDelete={deleteCard.bind(null, card.id)}
          />
        ))}
      </div>
    </div>
  );
}
