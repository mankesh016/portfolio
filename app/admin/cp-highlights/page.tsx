import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  deleteCpProfileCard,
  moveCpProfileCard,
  deleteCpAchievementCard,
  moveCpAchievementCard,
} from "@/app/actions/cpHighlights";
import { formatMonthYear } from "@/lib/duration";
import AdminEntityRow from "@/components/admin/AdminEntityRow";

export default async function AdminCpHighlightsPage() {
  const [profileCards, achievementCards] = await Promise.all([
    prisma.cpProfileCard.findMany({ orderBy: { order: "asc" } }),
    prisma.cpAchievementCard.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-neutral-900">CP Highlights — Profile Cards</h1>
          <Link href="/admin/cp-highlights/profile/new" className="text-sm text-orange-600">
            + Add
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {profileCards.map((card) => (
            <AdminEntityRow
              key={card.id}
              title={
                <>
                  <span className="font-medium text-neutral-800">{card.platform}</span>{" "}
                  <span className="text-neutral-400">— {card.rankTitle}</span>
                </>
              }
              meta={`Since ${card.sinceMonth ? formatMonthYear(card.sinceMonth, card.sinceYear) : card.sinceYear}`}
              editHref={`/admin/cp-highlights/profile/${card.id}/edit`}
              onDelete={deleteCpProfileCard.bind(null, card.id)}
              onMoveUp={moveCpProfileCard.bind(null, card.id, "up")}
              onMoveDown={moveCpProfileCard.bind(null, card.id, "down")}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-neutral-900">CP Highlights — Achievement Cards</h1>
          <Link href="/admin/cp-highlights/achievement/new" className="text-sm text-orange-600">
            + Add
          </Link>
        </div>
        <div className="mt-4 space-y-2">
          {achievementCards.map((card) => (
            <AdminEntityRow
              key={card.id}
              title={<span className="font-medium text-neutral-800">{card.label}</span>}
              editHref={`/admin/cp-highlights/achievement/${card.id}/edit`}
              onDelete={deleteCpAchievementCard.bind(null, card.id)}
              onMoveUp={moveCpAchievementCard.bind(null, card.id, "up")}
              onMoveDown={moveCpAchievementCard.bind(null, card.id, "down")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
