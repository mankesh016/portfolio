import { cn } from "@/lib/utils";
import { serif } from "@/lib/fonts";
import { formatMonthYear } from "@/lib/duration";
import { guessIconSlug } from "@/lib/iconSlug";
import CpPlatformIcon from "@/components/CpPlatformIcon";
import HighlightsPanel from "@/components/HighlightsPanel";
import type { CpProfileCard, CpAchievementCard } from "@prisma/client";

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-wide text-stone-400 uppercase">{label}</p>
      <p className="text-sm font-semibold text-stone-900">{value}</p>
    </div>
  );
}

function ProfileCard({ card }: { card: CpProfileCard }) {
  const slug = card.iconSlug || guessIconSlug(card.platform);

  return (
    <div className="group rounded-xl border border-stone-300 bg-[#fdfbf6] p-5 transition-colors hover:border-amber-600">
      <div className="flex items-center justify-between">
        <CpPlatformIcon
          slug={slug}
          className="h-5 w-5 transition-colors duration-200 text-amber-600 group-hover:text-amber-700"
        />
        {card.sinceYear && (
          <span className="font-mono text-xs tracking-wide text-stone-400 uppercase">
            Since {card.sinceMonth ? formatMonthYear(card.sinceMonth, card.sinceYear) : card.sinceYear}
          </span>
        )}
      </div>

      <p className="mt-4 font-mono text-xs tracking-wide text-stone-400 uppercase">{card.platform}</p>
      <p className={cn(serif.className, "mt-1 text-2xl text-stone-900 transition-colors group-hover:text-amber-700")}>
        {card.rankTitle}
      </p>
      {card.rankSubtitle && <p className="mt-0.5 text-sm text-stone-500">{card.rankSubtitle}</p>}

      <div className="mt-5 grid grid-cols-2 gap-4">
        <StatCell label="Peak" value={card.peak} />
        <StatCell label="Contests" value={card.contests} />
        <StatCell label="Solved" value={card.solved} />
        <StatCell label="Best Rank" value={card.bestRank} />
      </div>
    </div>
  );
}

function AchievementCard({ card }: { card: CpAchievementCard }) {
  return (
    <div className="flex-1 rounded-xl border border-stone-300 bg-[#fdfbf6] p-5 transition-colors hover:border-amber-600">
      <p className="font-mono text-xs tracking-wide text-stone-400 uppercase">{card.label}</p>
      <p className="mt-3 font-mono text-sm leading-relaxed text-stone-700">{card.description}</p>
    </div>
  );
}

/** Groups items into pairs — [a,b,c,d,e] -> [[a,b],[c,d],[e]] */
function pairUp<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));
  return pairs;
}

export default function CpHighlights({
  profileCards,
  achievementCards,
}: {
  profileCards: CpProfileCard[];
  achievementCards: CpAchievementCard[];
}) {
  if (profileCards.length === 0 && achievementCards.length === 0) return null;

  const achievementPairs = pairUp(achievementCards);

  return (
    <HighlightsPanel
      title="Competitive Programming"
      linkHref="/competitive-programming"
      linkLabel="All ratings and ranks →"
    >
      {/* Profile cards fill one grid cell each; achievement cards pair up (stacked) to fill
          a cell at a time, so they backfill the space next to an odd trailing profile card
          instead of leaving it empty or starting an awkward new row. */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {profileCards.map((card) => (
          <ProfileCard key={card.id} card={card} />
        ))}
        {achievementPairs.map((pair, i) => (
          <div key={i} className="flex h-full flex-col gap-3">
            {pair.map((card) => (
              <AchievementCard key={card.id} card={card} />
            ))}
          </div>
        ))}
      </div>
    </HighlightsPanel>
  );
}
