"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CardImage = { id: string; url: string; caption?: string | null };

export default function PlatformCardImageCarousel({ images }: { images: CardImage[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, paused]);

  if (images.length === 0) return null;

  const current = images[index];
  const goTo = (i: number) => setIndex((i + images.length) % images.length);

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <img
          key={img.id}
          src={img.url}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1200 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {current.caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/80 px-3 pb-2 pt-8 transition-opacity duration-700">
          <p className="text-sm text-white">{current.caption}</p>
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 text-neutral-700" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4 text-neutral-700" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
