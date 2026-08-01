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
    <div className="sticky top-4 z-50 mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full lg:border lg:border-neutral-200 lg:bg-white px-5 py-2.5 lg:shadow-sm">
      <div
        className={`h-9 w-9 shrink-0 overflow-hidden rounded-full transition-opacity duration-800 ${
          showPhoto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {photoUrl && <img src={photoUrl} alt="" className="h-full w-full object-cover" />}
      </div>

      {/* Full nav — large screens only */}
      <nav className="hidden flex-1 flex-wrap items-center justify-center gap-1 text-sm lg:flex">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-label={item.label}
              className={`nav-link rounded-lg px-3 py-1.5 transition-colors hover:bg-neutral-100`}
            >
              <span className={active ? "font-semibold text-neutral-900" : "font-normal text-neutral-500"}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex-1 lg:hidden" />

      <div className="mx-2 flex shrink-0 items-center gap-3 text-neutral-500">
        <span className="hidden h-6 w-px bg-neutral-200 lg:block" />
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-neutral-900">
          <GithubIcon className="h-5 w-5" />
        </a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-neutral-900">
          <LinkedinIcon className="h-5 w-5" />
        </a>
        <MobileNavMenu />
      </div>
    </div>
  );
}
