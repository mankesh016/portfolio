"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Briefcase, FolderGit2, Trophy, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/icons";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";

const NAV_ICONS: Record<string, typeof Home> = {
  "/": Home,
  "/about": User,
  "/experience": Briefcase,
  "/projects": FolderGit2,
  "/cp": Trophy,
  "/guestbook": MessageSquare,
};

export default function MobileNavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-stone-300 bg-[#fdfbf6] p-2 shadow-lg">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                const Icon = NAV_ICONS[item.href];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
<<<<<<< HEAD
                    className={`rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active ? "font-semibold text-stone-900" : "text-stone-500"
                    } hover:bg-stone-100 hover:text-amber-700`}
=======
<<<<<<< Updated upstream
                    className={`rounded-lg px-3 py-2.5 text-sm ${
                      active ? "font-semibold text-neutral-900" : "text-neutral-500"
                    } hover:bg-neutral-50`}
=======
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active ? "font-semibold text-stone-900" : "text-stone-500"
                    } hover:bg-stone-100 hover:text-amber-700`}
>>>>>>> Stashed changes
>>>>>>> 2b661ef (fix: improve mobile responsiveness across layout and components)
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mx-3 my-2 h-px bg-stone-200" />

            <div className="flex items-center gap-1 px-1">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-stone-100 hover:text-amber-700"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-stone-100 hover:text-amber-700"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
