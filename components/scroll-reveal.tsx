'use client';

// Sections gently rise + fade in as they enter the viewport.
// Above-the-fold content renders instantly; respects reduced-motion.
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>('main section, body > footer'),
    );

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in');
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    for (const el of els) {
      if (el.classList.contains('reveal-in')) continue;
      // Don't animate what's already visible on load
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        el.classList.add('reveal-in');
        continue;
      }
      el.classList.add('reveal-init');
      obs.observe(el);
    }

    return () => obs.disconnect();
  }, [pathname]);

  return null;
}
