import { NextResponse } from 'next/server';
import {
  getValuation,
  getComparableSales,
  getMarketTrends,
  type NormalizedAddress,
  type PropertyDetails,
} from '@/lib/avm';

// Step 2: confirmed address + details → valuation, comps, market trends
export async function POST(req: Request) {
  let body: { address?: NormalizedAddress; details?: PropertyDetails };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  const a = body.address;
  if (!a?.street || !a?.city || !a?.state || !a?.postalCode) {
    return NextResponse.json({ error: 'A confirmed address is required.' }, { status: 400 });
  }
  const address: NormalizedAddress = {
    street: String(a.street).slice(0, 200),
    city: String(a.city).slice(0, 100),
    state: String(a.state).slice(0, 2),
    postalCode: String(a.postalCode).slice(0, 12),
    country: 'US',
  };
  const details = body.details ?? undefined;
  return NextResponse.json({
    valuation: getValuation(address, details),
    comps: getComparableSales(address, details),
    trends: getMarketTrends(address),
  });
}
