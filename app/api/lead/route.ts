import { NextResponse } from 'next/server';

// ─────────────────────────────────────────────────────────────
// Follow Up Boss lead intake.
// Set FUB_API_KEY in .env.local / Vercel env vars
// (Follow Up Boss → Admin → API → create key).
// Uses the FUB Events API so leads trigger action plans and
// lead-flow rules: https://docs.followupboss.com/reference/events-post
// ─────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const key = process.env.FUB_API_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, error: 'CRM not configured' },
      { status: 503 },
    );
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }

  const { name, email, phone, interest, area, price, message, subject } = body;
  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: 'Name and email are required' },
      { status: 400 },
    );
  }

  const [firstName, ...rest] = String(name).trim().split(/\s+/);

  const event = {
    source: 'jcluxuryresidential.com',
    system: 'Website',
    type: 'General Inquiry',
    message: [
      subject && `Form: ${subject}`,
      interest && `Interested in: ${interest}`,
      area && `Area: ${area}`,
      price && `Price range / est. value: ${price}`,
      message,
    ]
      .filter(Boolean)
      .join('\n'),
    person: {
      firstName,
      lastName: rest.join(' ') || undefined,
      emails: [{ value: email }],
      phones: phone ? [{ value: phone }] : undefined,
      tags: ['Website Lead'],
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
    console.error('FUB error', res.status, detail);
    return NextResponse.json({ ok: false, error: 'CRM error' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
