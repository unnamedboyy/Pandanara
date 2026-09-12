"use client";

import { useState } from "react";
import Image from "next/image";

type FrameProps = {
  src?: string | null;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Frame renders a photo from /public/images.
 * If the file hasn't been added yet, it falls back to a quiet,
 * on-brand placeholder so the layout still looks finished.
 *
 * To use real photography: drop the file into /public/images
 * with the filename referenced in lib/siteConfig.ts — no code
 * changes needed.
 */
export default function Frame({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "100vw",
}: FrameProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-sand border border-ink/10 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="text-forest/30"
            aria-hidden="true"
          >
            <path
              d="M4 16.5L8.5 12a1.5 1.5 0 0 1 2.12 0L15 16.38M13 14l1.5-1.5a1.5 1.5 0 0 1 2.12 0L20 15.88M4 6.5h16A1.5 1.5 0 0 1 21.5 8v9a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V8A1.5 1.5 0 0 1 4 6.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <circle cx="8" cy="10" r="1.25" fill="currentColor" />
          </svg>
          <span className="text-xs uppercase tracking-[0.14em] text-ink/40">
            {label ?? "Pandanara"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
