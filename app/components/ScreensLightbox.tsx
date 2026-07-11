"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Thumbnail grid + fullscreen lightbox for stage 04 (Screens). Thumbnails at
 * grid width are too small to read a 1440px frame — click opens the same
 * image large over a dark overlay. No prev/next: one image at a time is
 * enough, closing is the only interaction that matters here.
 */
export default function ScreensLightbox({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    window.addEventListener("keydown", onKeyDown);
    // Lock the page scroll while the overlay is up — otherwise the artifact
    // list keeps scrolling under the fixed lightbox.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  const open = openIndex !== null ? images[openIndex] : null;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="cursor-pointer overflow-hidden rounded-lg border border-zinc-800 p-1 transition-opacity hover:opacity-80"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1568}
              height={1028}
              loading="lazy"
              className="w-full rounded-md"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4 sm:p-10"
        >
          <Image
            src={open.src}
            alt={open.alt}
            width={1900}
            height={1080}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
