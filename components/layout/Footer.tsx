import { SOCIAL_LINKS } from "@/lib/constants";
import CodeIcon from "../icons/CodeIcon";

const CODE_HANDLES = [
  { name: "Github", url: SOCIAL_LINKS.github, slug: "github" },
  { name: "Codeforces", url: SOCIAL_LINKS.codeforces, slug: "codeforces" },
  { name: "CodeChef", url: SOCIAL_LINKS.codechef, slug: "codechef" },
  { name: "LeetCode", url: SOCIAL_LINKS.leetcode, slug: "leetcode" },
];

export default function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-4xl px-4 pb-10 pt-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-center divide-x divide-neutral-200 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
        {CODE_HANDLES.map((h) => (
          <a
            key={h.name}
            href={h.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 last:pr-0 hover:text-neutral-900"
          >
            <CodeIcon slug={h.slug} name={h.name} /> {h.name}
          </a>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-neutral-400">© {new Date().getFullYear()} Mankesh Meena</p>
    </footer>
  );
}
