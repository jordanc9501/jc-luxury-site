import { NextResponse } from 'next/server';
import { normalizeAddress, getPropertyDetails } from '@/lib/avm';

// Step 1: address string → normalized address + property details
export async function POST(req: Request) {
  let body: { address?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  const input = String(body.address ?? '').trim();
  if (input.length < 5 || input.length > 300) {
    return NextResponse.json(
      { error: 'Please enter a complete property address.' },
      { status: 400 },
    );
  }
  try {
    const address = normalizeAddress(input);
    const details = getPropertyDetails(address);
    return NextResponse.json({ address, details });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Could not look up that address.' },
      { status: 400 },
    );
  }
}
