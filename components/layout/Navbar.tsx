"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/icons/icons";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MobileNavMenu from "../MobileNavMenu";

export default function Navbar({ photoUrl }: { photoUrl?: string | null }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page the hero already shows a large photo, so the nav's mini avatar
  // only earns its place once that hero has scrolled out of view.
  const showPhoto = mounted && !!photoUrl && (!isHome || scrolled);

  return (
<<<<<<< Updated upstream
    <div className="sticky top-4 z-50 mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-full lg:border lg:border-neutral-200 lg:bg-white px-5 py-2.5 lg:shadow-sm">
      <div
        className={`h-9 w-9 shrink-0 overflow-hidden rounded-full transition-opacity duration-800 ${
          showPhoto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
=======
    // Slightly wider cap than <main>'s max-w-4xl so the bar is never narrower than the
    // page content — on large screens it can run a touch wider, never less.
    <div className="sticky top-4 z-50 mx-auto max-w-240">
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-full border py-2.5 transition-all duration-300",
          scrolled
            ? "border-stone-300 bg-[#fdfbf6] px-6 shadow-sm md:px-5"
            : "border-transparent bg-transparent px-5 shadow-none",
        )}
>>>>>>> Stashed changes
      >
        <div className={cn("shrink-0 transition-transform duration-300", scrolled && "lg:translate-x-1.5")}>
          <div
            className={`h-9 w-9 overflow-hidden rounded-full border border-stone-200 transition-opacity duration-800 ${
              showPhoto ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {photoUrl && <img src={photoUrl} alt="" className="h-full w-full object-cover" />}
          </div>
        </div>

<<<<<<< Updated upstream
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
=======
        {/* Full nav — tablet and up */}
        <nav className="hidden flex-1 flex-wrap items-center justify-center gap-3 text-sm md:flex">
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
>>>>>>> Stashed changes

        <div className="flex-1 md:hidden" />

<<<<<<< Updated upstream
      <div className="mx-2 flex shrink-0 items-center gap-3 text-neutral-500">
        <span className="hidden h-6 w-px bg-neutral-200 lg:block" />
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-neutral-900">
          <GithubIcon className="h-5 w-5" />
        </a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-amber-700">
          <LinkedinIcon className="h-5 w-5" />
        </a>
        <MobileNavMenu />
=======
        <div
          className={cn(
            "mx-2 flex shrink-0 items-center gap-3 text-stone-500 transition-transform duration-300",
            scrolled && "lg:-translate-x-1.5",
          )}
        >
          <span className="hidden h-6 w-px bg-stone-300 md:block" />
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="hidden transition-colors hover:text-amber-700 md:block"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden transition-colors hover:text-amber-700 md:block"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <MobileNavMenu />
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}
