"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/icons/icons";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { useEffect, useState } from "react";
import MobileNavMenu from "../MobileNavMenu";

export default function Navbar({ photoUrl }: { photoUrl?: string | null }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const showPhoto = mounted && !!photoUrl && !isHome;

  return (
    <div className="sticky top-4 z-50 mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full lg:border lg:border-stone-300 lg:bg-[#fdfbf6] px-5 py-2.5 lg:shadow-sm">
      <div
        className={`h-9 w-9 shrink-0 overflow-hidden rounded-full border border-stone-200 transition-opacity duration-800 ${
          showPhoto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {photoUrl && <img src={photoUrl} alt="" className="h-full w-full object-cover" />}
      </div>

      {/* Full nav — large screens only */}
      <nav className="hidden flex-1 flex-wrap items-center justify-center gap-3 text-sm lg:flex">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-label={item.label}
              className="nav-link group rounded-lg px-3 py-1.5 transition-colors hover:bg-stone-100"
            >
              <span
                className={
                  active
                    ? "font-semibold text-stone-900"
                    : "font-normal text-stone-500 transition-colors group-hover:text-amber-700"
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 lg:hidden" />

      <div className="mx-2 flex shrink-0 items-center gap-3 text-stone-500">
        <span className="hidden h-6 w-px bg-stone-300 lg:block" />
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-700">
          <GithubIcon className="h-5 w-5" />
        </a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-700">
          <LinkedinIcon className="h-5 w-5" />
        </a>
        <MobileNavMenu />
      </div>
    </div>
  );
}
