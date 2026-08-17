type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_COLORS = ["bg-neutral-100", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800"];

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

  return (
    <div>
      <div className="flex w-full gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-1 flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={`aspect-square w-full rounded-[2px] ${LEVEL_COLORS[day.level]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
        <span>{total} github contributions in the last year</span>
        <span className="flex items-center gap-[3px]">
          Less
          {LEVEL_COLORS.map((c, i) => (
            <span key={i} className="h-[11px] w-[11px] rounded-[2px]" style={{}}>
              <span className={`block h-full w-full rounded-[2px] ${c}`} />
            </span>
          ))}
          More
        </span>
      </div>
    </div>
  );
}
