export function formatRange(
  startMonth: number,
  startYear: number,
  endMonth?: number | null,
  endYear?: number | null,
  isCurrent?: boolean,
) {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const start = `${MONTHS[startMonth - 1]} ${startYear}`;
  const end = isCurrent ? "Present" : `${MONTHS[(endMonth ?? startMonth) - 1]} ${endYear ?? startYear}`;
  return `${start} — ${end}`;
}

export function formatDuration(
  startMonth: number,
  startYear: number,
  endMonth?: number | null,
  endYear?: number | null,
  isCurrent?: boolean,
) {
  const start = startYear * 12 + (startMonth - 1);
  const now = new Date();
  const end = isCurrent
    ? now.getFullYear() * 12 + now.getMonth()
    : (endYear ?? startYear) * 12 + ((endMonth ?? startMonth) - 1);

  const totalMonths = Math.max(end - start + 1, 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}
