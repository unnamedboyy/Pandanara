"use client";

import { useEffect, useState } from "react";

type HeroSlideshowProps = {
  images: string[];
  intervalMs?: number;
};

export default function HeroSlideshow({
  images,
  intervalMs = 6000,
}: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, index) => {
        const isActive = index === active;
        if (failed.has(index)) return null;

        return (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1.08)" : "scale(1)",
              transition: `opacity 1500ms ease, transform ${intervalMs}ms ease-out`,
            }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              onError={() =>
                setFailed((prev) => new Set(prev).add(index))
              }
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/40 to-cream/0" />
    </div>
  );
}