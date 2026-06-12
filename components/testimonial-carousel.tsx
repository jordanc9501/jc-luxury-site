'use client';

// Rotating testimonial: crossfades through every review, with dots.
import { useEffect, useState } from 'react';
import type { Testimonial } from '@/lib/data';

const INTERVAL = 7000;

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const t = setInterval(
      () => setActive((v) => (v + 1) % items.length),
      INTERVAL,
    );
    return () => clearInterval(t);
  }, [items.length, paused]);

  if (items.length === 0) return null;

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="eyebrow mb-6">Trusted by Discerning Clients</p>
      <div className="grid">
        {items.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            aria-hidden={i !== active}
            className={`col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-1000 ${
              i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <blockquote className="font-serif text-3xl italic leading-snug md:text-4xl">
              “{t.quote}”
            </blockquote>
            <p className="mt-7 text-[11px] tracking-[0.28em] uppercase text-mist">
              {t.name} — {t.role}
            </p>
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-9 flex justify-center gap-3">
          {items.map((t, i) => (
            <button
              key={`dot-${i}`}
              aria-label={`Show review ${i + 1} of ${items.length}`}
              onClick={() => setActive(i)}
              className={`h-1.5 w-7 transition-colors duration-300 ${
                i === active ? 'bg-coal' : 'bg-line hover:bg-mist'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
