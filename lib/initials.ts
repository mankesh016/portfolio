const STOPWORDS = new Set(["and", "of", "the", "&"]);

/** "Jaipur Engineering College and Research Centre" -> "JECRC" */
export function getInitials(name: string, maxLetters = 5): string {
  const initials = name
    .split(/\s+/)
    .filter((word) => word && !STOPWORDS.has(word.toLowerCase()))
    .map((word) => word[0]!.toUpperCase())
    .join("");

  return initials.slice(0, maxLetters);
}
