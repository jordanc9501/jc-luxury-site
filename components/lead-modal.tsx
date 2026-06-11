'use client';

import { useEffect, useState } from 'react';

// Lead-capture modal: shows once per visitor after a delay or
// meaningful scroll, posts to /api/lead (Follow Up Boss).
// Dismissal is remembered for 30 days via localStorage.

const KEY = 'jc-lead-modal-dismissed';
const DELAY_MS = 12000;
const SCROLL_TRIGGER = 0.4;

export function LeadModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(KEY);
      if (dismissed && Date.now() - Number(dismissed) < 30 * 864e5) return;
    } catch {}

    let shown = false;
    const show = () => {
      if (!shown) {
        shown = true;
        setOpen(true);
      }
    };
    const timer = setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > SCROLL_TRIGGER) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Market Updates Signup (Pop-up)',
          name: String(f.get('name') ?? ''),
          email: String(f.get('email') ?? ''),
          interest: String(f.get('interest') ?? ''),
          message: 'Signed up via website pop-up for market updates and new listing alerts.',
        }),
      });
    } catch {}
    setStatus('sent');
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
    setTimeout(() => setOpen(false), 2600);
  }

  if (!open) return null;

  const field =
    'w-full border border-line bg-paper px-4 py-3.5 text-sm placeholder:text-mist/70 focus:border-coal focus:outline-none';

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-coal/60 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Sign up for market updates"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-md border border-line bg-paper p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-3 text-2xl leading-none text-mist hover:text-coal"
        >
          ×
        </button>

        {status === 'sent' ? (
          <p className="py-6 text-center font-serif text-2xl">
            Welcome — you’re on the list.
          </p>
        ) : (
          <>
            <p className="eyebrow mb-3">Stay Ahead of the Market</p>
            <h2 className="font-serif text-3xl leading-tight">
              New Listings & Valley Market Updates, First.
            </h2>
            <p className="mt-3 text-sm text-mist">
              Be the first to hear about new listings, private opportunities,
              and what’s really happening in the Scottsdale & Phoenix market.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <label className="sr-only" htmlFor="lm-name">Name</label>
              <input id="lm-name" name="name" required placeholder="Name" className={field} />
              <label className="sr-only" htmlFor="lm-email">Email</label>
              <input id="lm-email" name="email" type="email" required placeholder="Email" className={field} />
              <label className="sr-only" htmlFor="lm-interest">I’m interested in</label>
              <select id="lm-interest" name="interest" className={field} defaultValue="Market updates">
                <option>Market updates</option>
                <option>Buying</option>
                <option>Selling</option>
                <option>Both buying & selling</option>
              </select>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-solid w-full text-center"
              >
                {status === 'sending' ? 'Signing Up…' : 'Sign Me Up'}
              </button>
              <p className="text-[11px] leading-relaxed text-mist">
                Your information remains private and is only used to share
                market updates. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
