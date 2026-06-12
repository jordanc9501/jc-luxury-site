'use client';

// Property photo lightbox: clicking the hero or any gallery photo opens a
// fullscreen carousel over a darkened backdrop. Arrow keys / Esc supported.
import { useEffect, useState } from 'react';

const OPEN_EVENT = 'jc-gallery-open';

export function openGalleryAt(index: number) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: index }));
}

/** Hero image — owns the lightbox for ALL images (hero + gallery). */
export function PropertyHero({
  images,
  alt,
  badge,
}: {
  images: string[];
  alt: string;
  badge: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => setOpen((e as CustomEvent<number>).detail);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const n = images.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((v) => ((v ?? 0) + 1) % n);
      if (e.key === 'ArrowLeft') setOpen((v) => ((v ?? 0) - 1 + n) % n);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, images.length]);

  const n = images.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        aria-label="View photo gallery"
        className="group relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-stone"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0]}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <span className="absolute left-5 top-5 bg-coal/85 px-4 py-2 text-[10px] tracking-[0.24em] uppercase text-paper">
          {badge}
        </span>
        {n > 1 && (
          <span className="absolute bottom-5 right-5 bg-coal/85 px-4 py-2 text-[10px] tracking-[0.24em] uppercase text-paper">
            View All {n} Photos
          </span>
        )}
      </button>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-coal/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close gallery"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 z-10 p-3 text-3xl leading-none text-paper/80 transition-colors hover:text-paper"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => ((v ?? 0) - 1 + n) % n);
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-4 text-4xl text-paper/70 transition-colors hover:text-paper md:left-6"
          >
            ‹
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open]}
            alt={`${alt} — photo ${open + 1} of ${n}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[88vw] object-contain shadow-2xl"
          />

          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => ((v ?? 0) + 1) % n);
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-4 text-4xl text-paper/70 transition-colors hover:text-paper md:right-6"
          >
            ›
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.28em] text-paper/70">
            {open + 1} / {n}
          </p>
        </div>
      )}
    </>
  );
}

/** Gallery grid — clicking a photo opens the lightbox owned by PropertyHero. */
export function GalleryGrid({
  gallery,
  alt,
}: {
  gallery: string[];
  alt: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {gallery.map((src, i) => (
        <button
          key={src}
          type="button"
          aria-label={`Open photo ${i + 2}`}
          onClick={() => openGalleryAt(i + 1)}
          className={`group cursor-zoom-in overflow-hidden bg-stone ${
            i % 8 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${alt} — photo ${i + 2}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </button>
      ))}
    </div>
  );
}
