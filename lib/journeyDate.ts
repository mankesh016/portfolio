const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatJourneyDate(year: number, month: number | null, override: string | null) {
  if (override) return override;
  if (month) return `${MONTHS[month - 1]} ${year}`;
  return `${year}`;
}
