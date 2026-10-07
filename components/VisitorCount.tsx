"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { mono } from "@/lib/fonts";
import { ORDINAL_SUFFIXES, ordinalSuffix } from "@/lib/ordinal";

type Visit = { n: number; admin?: boolean };

const COUNT_UP_MS = 2500;

// Zero-pads to the final number's digit count so the width never changes mid-count: 7 of 1234 → "0,007".
function padTo(n: number, final: number): string {
  return String(n)
    .padStart(String(final).length, "0")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// One digit slot: on change, the old digit slides up and out while the new one slides up from below.
function RollingDigit({ digit }: { digit: string }) {
  const [roll, setRoll] = useState({ cur: digit, prev: null as string | null, id: 0 });
  // Derive the previous digit during render (not in an effect) so both animate in the same frame.
  if (roll.cur !== digit) setRoll({ cur: digit, prev: roll.cur, id: roll.id + 1 });

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      {roll.prev !== null && (
        <span
          key={`out-${roll.id}`}
          className="absolute inset-0 animate-out fade-out slide-out-to-top fill-mode-forwards duration-200"
        >
          {roll.prev}
        </span>
      )}
      <span key={`in-${roll.id}`} className={cn("block", roll.id > 0 && "animate-in slide-in-from-bottom duration-200")}>
        {roll.cur}
      </span>
    </span>
  );
}

function RollingNumber({ value }: { value: string }) {
  return (
    <span className={cn(mono.className, "font-medium slashed-zero")}>
      {/* Keyed by position from the right, so each slot keeps its own animation state as digits change. */}
      {[...value].map((ch, i) => {
        const key = value.length - i;
        return /\d/.test(ch) ? <RollingDigit key={key} digit={ch} /> : <span key={key}>{ch}</span>;
      })}
    </span>
  );
}

export default function VisitorCount() {
  const [visit, setVisit] = useState<Visit | null>(null);
  const [shown, setShown] = useState(1);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // The visit is counted on load regardless of scrolling; only the animation waits for the user.
  useEffect(() => {
    fetch("/api/visit", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then(setVisit)
      .catch(() => {});
  }, []);

  // Start the count-up only once the line is fully on screen. The footer lives in the root layout,
  // so this runs once per full page load: client-side navigation keeps the final number as-is,
  // while a refresh remounts and animates again.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Count up from 1 to the real number. Quintic ease-out: races through most of the range,
  // then ticks the last few numbers slowly so each digit roll is visible.
  useEffect(() => {
    if (!visit || !inView) return;
    // Reduced-motion users jump straight to the final number on the first frame.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : COUNT_UP_MS;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = duration ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - (1 - t) ** 5;
      setShown(Math.max(1, Math.round(eased * visit.n)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visit, inView]);

  // Same size/color as the footer links. Fixed height so the footer doesn't jump when the number
  // arrives; tabular-nums + zero-padding keep the number's width fixed while it counts up.
  return (
    <p ref={ref} className="mt-6 h-5 text-center text-sm text-neutral-500 tabular-nums">
      {visit &&
        (visit.admin ? (
          <>
            <RollingNumber value={padTo(shown, visit.n)} /> visitors so far
          </>
        ) : (
          <>
            You are the <RollingNumber value={padTo(shown, visit.n)} />
            {/* All suffixes stacked in one grid cell, only the current one visible, so the slot is
                always as wide as the widest suffix. */}
            <span className="inline-grid">
              {ORDINAL_SUFFIXES.map((s) => (
                <span key={s} className={cn("[grid-area:1/1]", s !== ordinalSuffix(shown) && "invisible")}>
                  {s}
                </span>
              ))}
            </span>{" "}
            visitor
          </>
        ))}
    </p>
  );
}
