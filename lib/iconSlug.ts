export function guessIconSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\./g, "dot")
    .replace(/[^a-z0-9]/g, "");
}
