import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────
// AVM widget lead intake → Follow Up Boss.
// Reuses the same FUB_API_KEY as /api/lead. Leads arrive as a
// "Property Inquiry" event tagged "AVM Lead" with the address,
// estimate, and selling timeline, so lead-flow rules and action
// plans can target instant-valuation sellers specifically.
// ─────────────────────────────────────────────────────────────

type AvmLeadBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  sellingTimeline?: string;
  fullAddress?: string;
  estimatedValue?: number;
  lowEstimate?: number;
  highEstimate?: number;
  consentGiven?: boolean;
  // Honeypot — humans never fill this
  website?: string;
};

const fmt = (n?: number) => (n != null ? `$${Math.round(n).toLocaleString('en-US')}` : '—');

export async function POST(req: Request) {
  let body: AvmLeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  // Bot honeypot: pretend success, save nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const { firstName, lastName, email, phone, consentGiven } = body;
  if (!firstName || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Name and a valid email are required' },
      { status: 400 },
    );
  }
  if (!consentGiven) {
    return NextResponse.json(
      { ok: false, error: 'Consent is required' },
      { status: 400 },
    );
  }

  const key = process.env.FUB_API_KEY;
  if (!key) {
    console.error('AVM lead received but FUB_API_KEY is not set:', email, body.fullAddress);
    return NextResponse.json({ ok: false, error: 'CRM not configured' }, { status: 503 });
  }

  const event = {
    source: 'jcluxuryresidential.com',
    system: 'Website',
    type: 'Property Inquiry',
    message: [
      'Instant home valuation (AVM widget)',
      body.fullAddress && `Property: ${body.fullAddress}`,
      body.estimatedValue != null &&
        `Estimate: ${fmt(body.estimatedValue)} (range ${fmt(body.lowEstimate)} – ${fmt(body.highEstimate)})`,
      body.sellingTimeline && `Selling timeline: ${body.sellingTimeline}`,
    ]
      .filter(Boolean)
      .join('\n'),
    person: {
      firstName: String(firstName).slice(0, 80),
      lastName: lastName ? String(lastName).slice(0, 80) : undefined,
      emails: [{ value: String(email).slice(0, 254) }],
      phones: phone ? [{ value: String(phone).slice(0, 30) }] : undefined,
      tags: ['Website Lead', 'AVM Lead', 'Seller'],
    },
  };

  const res = await fetch('https://api.followupboss.com/v1/events', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${key}:`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('FUB error (AVM lead)', res.status, detail);
    return NextResponse.json({ ok: false, error: 'CRM error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
