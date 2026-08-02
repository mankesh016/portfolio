const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatPart(year: number, month: number | null, override: string | null) {
  if (override) return override;
  if (month) return `${MONTHS[month - 1]} ${year}`;
  return `${year}`;
}

export function formatJourneyDate(
  year: number,
  month: number | null,
  dateLabel: string | null,
  endYear?: number | null,
  endMonth?: number | null,
  endDateLabel?: string | null,
) {
  const start = formatPart(year, month, dateLabel);
  const hasEnd = endYear != null || endDateLabel;

  if (!hasEnd) return start;

  const end = endDateLabel ? endDateLabel : formatPart(endYear as number, endMonth ?? null, null);

  return `${start} — ${end}`;
}
