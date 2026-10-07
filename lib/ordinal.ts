export const ORDINAL_SUFFIXES = ["st", "nd", "rd", "th"] as const;

// 1 → "st", 12 → "th", 1023 → "rd"
export function ordinalSuffix(n: number): (typeof ORDINAL_SUFFIXES)[number] {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  return ({ 1: "st", 2: "nd", 3: "rd" } as const)[n % 10 as 1 | 2 | 3] ?? "th";
}
