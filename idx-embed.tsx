'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────
// Showcase IDX integration.
// After signing up at showcaseidx.com and connecting ARMLS:
//   1. In Showcase IDX, create a Search page and copy its embed
//      script URL (looks like https://widgets.showcaseidx.com/...).
//   2. Set NEXT_PUBLIC_IDX_SCRIPT_URL to that URL in .env.local
//      (and in Vercel → Project → Settings → Environment Variables).
// Until the variable is set, a styled placeholder renders instead.
// ─────────────────────────────────────────────────────────────

const IDX_SCRIPT_URL = process.env.NEXT_PUBLIC_IDX_SCRIPT_URL;

export function IdxEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!IDX_SCRIPT_URL || !ref.current) return;
    const s = document.createElement('script');
    s.src = IDX_SCRIPT_URL;
    s.async = true;
    ref.current.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  if (IDX_SCRIPT_URL) {
    // Showcase IDX renders its search UI into this container
    return <div ref={ref} id="showcaseidx" className="min-h-[70vh]" />;
  }

  return (
    <div className="border border-dashed border-line bg-stone p-12 text-center">
      <p className="eyebrow mb-4">IDX Search</p>
      <h2 className="text-3xl">Full MLS Search Coming Online</h2>
      <p className="mx-auto mt-4 max-w-xl text-mist">
        This area connects to Showcase IDX (live MLS search, map view,
        filters, saved searches, and instant alerts). Until then, browse
        featured properties or contact Jordan for a curated search.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/properties" className="btn-solid">
          View Featured Properties
        </Link>
        <Link href="/contact" className="btn-ghost">
          Request a Curated Search
        </Link>
      </div>
    </div>
  );
}
