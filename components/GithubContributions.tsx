import { formatMonthYear } from "@/lib/duration";

type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_COLORS = ["bg-neutral-100", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800"];

const MIN_WEEKS_BETWEEN_LABELS = 4;

/** Label the first week of a month, skipping labels too close to the previous one to avoid overlap. */
function buildMonthLabels(weeks: ContributionDay[][]) {
  let lastLabeledWeek = -Infinity;
  let lastLabeledYear: number | null = null;

  return weeks.map((week, wi) => {
    const date = new Date(week[0].date);
    const isNewMonth = wi === 0 || new Date(weeks[wi - 1][0].date).getMonth() !== date.getMonth();
    if (!isNewMonth || wi - lastLabeledWeek < MIN_WEEKS_BETWEEN_LABELS) return null;

    lastLabeledWeek = wi;
    const year = date.getFullYear();
    const showYear = lastLabeledYear !== year;
    lastLabeledYear = year;
    return showYear
      ? formatMonthYear(date.getMonth() + 1, year)
      : formatMonthYear(date.getMonth() + 1, year).split(" ")[0];
  });
}

export default async function GithubContributions({ username }: { username: string }) {
  let days: ContributionDay[] = [];

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      days = data.contributions;
    }
  } catch {
    return null;
  }

  if (days.length === 0) return null;

  const total = days.reduce((sum, d) => sum + d.count, 0);
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  const monthLabels = buildMonthLabels(weeks);

  return (
    <div>
      <div className="flex items-baseline justify-end gap-4">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-sm text-stone-500 hover:text-stone-800"
        >
          github.com/{username} →
        </a>
      </div>

      {/* Shrinks with the container down to a minimum readable cell size, then scrolls
          horizontally instead of squishing the cells further on narrow screens. */}
      <div className="mt-2 overflow-x-auto">
        <div className="min-w-160">
          <div className="flex w-full gap-0.75">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-1 flex-col gap-0.75">
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contributions on ${day.date}`}
                    className={`aspect-square w-full rounded-xs ${LEVEL_COLORS[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-1 flex w-full gap-0.75 text-xs text-neutral-400">
            {monthLabels.map((label, wi) => (
              <div key={wi} className="flex-1 overflow-visible whitespace-nowrap">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
        <p className="text-sm font-normal text-neutral-500">{total} contributions in the last year</p>
        <div className="flex items-center justify-end gap-0.75">
          Less
          {LEVEL_COLORS.map((c, i) => (
            <span key={i} className="h-2.75 w-2.75 rounded-xs">
              <span className={`block h-full w-full rounded-xs ${c}`} />
            </span>
          ))}
          More
        </div>
      </div>
    </div>
  );
}
