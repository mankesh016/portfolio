const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

// Covers 0–100, which is the only range this site's stat call-outs (years, moments) will ever hit.
export function numberToWords(n: number): string {
  if (n === 100) return "one hundred";
  if (n < 20) return ONES[n];
  const tens = Math.floor(n / 10);
  const rem = n % 10;
  return rem === 0 ? TENS[tens] : `${TENS[tens]}-${ONES[rem]}`;
}
