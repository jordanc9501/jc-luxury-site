'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

// ─────────────────────────────────────────────────────────────
// Instant home valuation widget.
// Flow: address → confirm details → contact capture → estimate.
// Leads post to /api/avm/lead (Follow Up Boss, tagged "AVM Lead").
// If the CRM is unavailable, falls back to a pre-filled email so
// no lead is ever lost — the estimate still displays either way.
// ─────────────────────────────────────────────────────────────

type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Details = {
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSizeSqFt?: number;
  yearBuilt?: number;
};

type Valuation = {
  estimatedValue: number;
  lowEstimate: number;
  highEstimate: number;
  confidenceScore: number;
  valuationDate: string;
};

type Comp = {
  address: string;
  salePrice: number;
  saleDate: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  distanceMiles?: number;
};

type Trends = { summaryText: string };

const field =
  'w-full border border-line bg-paper px-4 py-3.5 text-sm placeholder:text-mist/70 focus:border-coal focus:outline-none';

const fmt = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

const DISCLAIMER =
  'This estimate is generated using automated data sources and market modeling. It is not an appraisal, CMA, or guarantee of sale price. For a precise valuation, request a personalized market analysis from a licensed real estate professional.';

export function AvmWidget() {
  const [step, setStep] = useState<'address' | 'confirm' | 'lead' | 'result'>('address');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [addressInput, setAddressInput] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const [details, setDetails] = useState<Details>({});
  const [valuation, setValuation] = useState<Valuation | null>(null);
  const [comps, setComps] = useState<Comp[]>([]);
  const [trends, setTrends] = useState<Trends | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeline, setTimeline] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const fullAddress = address
    ? `${address.street}, ${address.city}, ${address.state} ${address.postalCode}`
    : '';

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    setError('');
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const lookup = () =>
    run(async () => {
      const res = await fetch('/api/avm/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: addressInput }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Could not look up that address.');
      setAddress(data.address);
      setDetails(data.details);
      setStep('confirm');
    });

  const reveal = () =>
    run(async () => {
      if (honeypot) return;
      const res = await fetch('/api/avm/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Could not generate an estimate.');
      setValuation(data.valuation);
      setComps(data.comps ?? []);
      setTrends(data.trends ?? null);

      // Deliver the lead; never block the estimate on CRM availability.
      try {
        const leadRes = await fetch('/api/avm/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            sellingTimeline: timeline,
            fullAddress,
            estimatedValue: data.valuation.estimatedValue,
            lowEstimate: data.valuation.lowEstimate,
            highEstimate: data.valuation.highEstimate,
            consentGiven: consent,
            website: honeypot,
          }),
        });
        if (!leadRes.ok) throw new Error('lead endpoint unavailable');
      } catch {
        // Fallback: pre-filled email so the inquiry isn't lost.
        const body = [
          `Name: ${firstName} ${lastName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Property: ${fullAddress}`,
          `Selling timeline: ${timeline || '—'}`,
          '',
          'Requested an instant home valuation via the website.',
        ].join('\n');
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          'Instant Valuation Request',
        )}&body=${encodeURIComponent(body)}`;
      }
      setStep('result');
    });

  const num = (v: string) => (v === '' ? undefined : Number(v));

  const setD = (patch: Partial<Details>) => setDetails((d) => ({ ...d, ...patch }));

  return (
    <div>
      {step === 'address' && (
        <>
          <p className="mb-8 mt-2 text-sm text-mist">
            Enter your address for an instant, data-driven estimate of your
            home’s current market value.
          </p>
          <label className="sr-only" htmlFor="avm-address">
            Property address
          </label>
          <input
            id="avm-address"
            className={field}
            placeholder="Street address, city, state"
            value={addressInput}
            autoComplete="street-address"
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addressInput.trim().length >= 5 && lookup()}
          />
          <button
            type="button"
            onClick={lookup}
            disabled={busy || addressInput.trim().length < 5}
            className="btn-solid mt-5 w-full text-center disabled:cursor-default disabled:opacity-40"
          >
            {busy ? 'Locating…' : 'Get My Estimate'}
          </button>
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
          <p className="mt-6 text-[11px] leading-relaxed text-mist">{DISCLAIMER}</p>
        </>
      )}

      {step === 'confirm' && address && (
        <>
          <p className="mb-6 mt-2 text-sm text-mist">
            Confirm the details we found for{' '}
            <span className="text-ink">{fullAddress}</span> — corrections
            sharpen your estimate.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="eyebrow">Type</span>
              <select
                className={`${field} mt-1.5`}
                value={details.propertyType ?? ''}
                onChange={(e) => setD({ propertyType: e.target.value })}
              >
                {['Single Family', 'Townhouse', 'Condo', 'Multi-Family', 'Land', 'Other'].map(
                  (t) => (
                    <option key={t}>{t}</option>
                  ),
                )}
              </select>
            </div>
            <div>
              <span className="eyebrow">Year Built</span>
              <input
                type="number"
                className={`${field} mt-1.5`}
                value={details.yearBuilt ?? ''}
                onChange={(e) => setD({ yearBuilt: num(e.target.value) })}
              />
            </div>
            <div>
              <span className="eyebrow">Beds</span>
              <input
                type="number"
                min={0}
                className={`${field} mt-1.5`}
                value={details.bedrooms ?? ''}
                onChange={(e) => setD({ bedrooms: num(e.target.value) })}
              />
            </div>
            <div>
              <span className="eyebrow">Baths</span>
              <input
                type="number"
                min={0}
                step={0.5}
                className={`${field} mt-1.5`}
                value={details.bathrooms ?? ''}
                onChange={(e) => setD({ bathrooms: num(e.target.value) })}
              />
            </div>
            <div>
              <span className="eyebrow">Square Feet</span>
              <input
                type="number"
                min={0}
                className={`${field} mt-1.5`}
                value={details.squareFeet ?? ''}
                onChange={(e) => setD({ squareFeet: num(e.target.value) })}
              />
            </div>
            <div>
              <span className="eyebrow">Lot (Sq Ft)</span>
              <input
                type="number"
                min={0}
                className={`${field} mt-1.5`}
                value={details.lotSizeSqFt ?? ''}
                onChange={(e) => setD({ lotSizeSqFt: num(e.target.value) })}
              />
            </div>
          </div>
          <button type="button" onClick={() => setStep('lead')} className="btn-solid mt-6 w-full text-center">
            Continue
          </button>
          <button
            type="button"
            onClick={() => setStep('address')}
            className="mt-4 w-full text-center text-xs tracking-[0.18em] text-mist uppercase hover:text-ink"
          >
            ← Different Address
          </button>
        </>
      )}

      {step === 'lead' && (
        <>
          <p className="mb-6 mt-2 text-sm text-mist">
            Your estimate is ready. Where should we send your private home
            value report?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className={field}
              placeholder="First name"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className={field}
              placeholder="Last name"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className={`${field} sm:col-span-2`}
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={`${field} sm:col-span-2`}
              type="tel"
              placeholder="Phone (optional)"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <select
              className={`${field} sm:col-span-2`}
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            >
              <option value="">When are you thinking of selling?</option>
              <option value="immediately">Immediately</option>
              <option value="1-3 months">1–3 months</option>
              <option value="3-6 months">3–6 months</option>
              <option value="6-12 months">6–12 months</option>
              <option value="just curious">Just curious</option>
            </select>
          </div>
          {/* Honeypot — hidden from humans */}
          <input
            type="text"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 opacity-0"
          />
          <label className="mt-5 flex items-start gap-3 text-[11px] leading-relaxed text-mist">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I agree to be contacted about my home value, including by phone,
              email, or text. Consent is not a condition of any purchase.
              Message and data rates may apply. Your information remains
              private and is never shared.
            </span>
          </label>
          <button
            type="button"
            onClick={reveal}
            disabled={
              busy ||
              !firstName.trim() ||
              !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ||
              !consent
            }
            className="btn-solid mt-6 w-full text-center disabled:cursor-default disabled:opacity-40"
          >
            {busy ? 'Preparing Your Estimate…' : 'Show My Estimate'}
          </button>
          {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
        </>
      )}

      {step === 'result' && valuation && (
        <>
          <p className="mt-2 text-sm text-mist">{fullAddress}</p>
          <p className="mt-4 font-serif text-5xl text-coal">{fmt(valuation.estimatedValue)}</p>
          <p className="mt-2 text-sm text-mist">
            Estimated range {fmt(valuation.lowEstimate)} – {fmt(valuation.highEstimate)}
          </p>
          <p className="eyebrow mt-3">
            Estimate confidence · {Math.round(valuation.confidenceScore * 100)}%
          </p>

          {trends && (
            <>
              <p className="eyebrow mt-8">Market Snapshot</p>
              <p className="mt-2 text-sm leading-relaxed text-mist">{trends.summaryText}</p>
            </>
          )}

          {comps.length > 0 && (
            <>
              <p className="eyebrow mt-8">Recent Comparable Sales</p>
              <ul className="mt-3 space-y-3">
                {comps.map((c) => (
                  <li key={c.address} className="border border-line bg-paper p-4 text-sm">
                    <p className="text-ink">{c.address}</p>
                    <p className="mt-1 text-xs text-mist">
                      {fmt(c.salePrice)} · {c.bedrooms} bd / {c.bathrooms} ba ·{' '}
                      {c.squareFeet?.toLocaleString()} sq.ft. · sold {c.saleDate}
                      {c.distanceMiles != null && <> · {c.distanceMiles} mi</>}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          <a href="/contact" className="btn-solid mt-8 block w-full text-center">
            Request a Detailed Valuation
          </a>
          <p className="mt-4 text-center text-xs text-mist">
            An automated estimate is a starting point — a precise valuation of
            architecture, condition, and timing requires a human analysis.
          </p>
          <p className="mt-6 text-[11px] leading-relaxed text-mist">{DISCLAIMER}</p>
        </>
      )}
    </div>
  );
}
