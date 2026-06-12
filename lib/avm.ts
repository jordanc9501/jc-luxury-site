// ─────────────────────────────────────────────────────────────
// AVM engine — server-side only.
// Currently a deterministic simulated model (same address always
// returns the same estimate). To switch to a real data provider
// (ATTOM, Estated, HouseCanary), replace the function bodies below;
// the widget and API routes need no changes.
// ─────────────────────────────────────────────────────────────

export type NormalizedAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
};

export type PropertyDetails = {
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSizeSqFt?: number;
  yearBuilt?: number;
};

export type ValuationResult = {
  estimatedValue: number;
  lowEstimate: number;
  highEstimate: number;
  confidenceScore: number;
  valuationDate: string;
  provider: string;
};

export type ComparableSale = {
  address: string;
  salePrice: number;
  saleDate: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  distanceMiles?: number;
};

export type MarketTrendSummary = {
  medianSalePrice: number;
  yearOverYearChangePct: number;
  averageDaysOnMarket: number;
  summaryText: string;
};

// FNV-1a hash → deterministic results per address
function hash(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function seeded(seed: number, salt: number): number {
  const x = Math.sin(seed * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

const PROPERTY_TYPES = ['Single Family', 'Townhouse', 'Condo', 'Single Family', 'Single Family'];

export function normalizeAddress(input: string): NormalizedAddress {
  const raw = input.trim().replace(/\s+/g, ' ');
  if (raw.length < 5) {
    throw new Error('Please enter a complete property address.');
  }
  const parts = raw.split(',').map((p) => p.trim()).filter(Boolean);
  const street = parts[0] ?? raw;
  const city = parts[1] ?? 'Phoenix';
  const tail = (parts[2] ?? '').split(' ').filter(Boolean);
  const state = (tail[0] ?? 'AZ').toUpperCase().slice(0, 2);
  const seed = hash(raw.toLowerCase());
  const postalCode = tail[1] ?? String(85001 + (seed % 99)).padStart(5, '0');
  return {
    street,
    city,
    state,
    postalCode,
    country: 'US',
    latitude: Number((33.2 + seeded(seed, 1) * 0.6).toFixed(6)),
    longitude: Number((-112.4 + seeded(seed, 2) * 0.7).toFixed(6)),
  };
}

export function getPropertyDetails(address: NormalizedAddress): PropertyDetails {
  const seed = hash(`${address.street}|${address.postalCode}`.toLowerCase());
  const beds = 2 + Math.floor(seeded(seed, 3) * 4);
  const baths = Math.max(1.5, Math.round((beds - 0.5 + seeded(seed, 4)) * 2) / 2);
  const sqft = 1400 + Math.floor(seeded(seed, 5) * 4600); // 1,400–6,000
  return {
    propertyType: PROPERTY_TYPES[seed % PROPERTY_TYPES.length],
    bedrooms: beds,
    bathrooms: baths,
    squareFeet: sqft,
    lotSizeSqFt: 6000 + Math.floor(seeded(seed, 7) * 24000),
    yearBuilt: 1958 + Math.floor(seeded(seed, 6) * 66),
  };
}

export function getValuation(
  address: NormalizedAddress,
  details?: PropertyDetails,
): ValuationResult {
  const d = details ?? getPropertyDetails(address);
  const seed = hash(`${address.street}|${address.postalCode}`.toLowerCase());
  const sqft = d.squareFeet ?? 2200;
  const pricePerSqFt = 280 + seeded(seed, 10) * 320; // $280–$600/sqft (Valley luxury)
  const ageFactor = d.yearBuilt ? 1 + (d.yearBuilt - 1985) * 0.0015 : 1;
  const bedFactor = 1 + ((d.bedrooms ?? 3) - 3) * 0.03;
  const estimated = Math.round((sqft * pricePerSqFt * ageFactor * bedFactor) / 1000) * 1000;
  const confidence = Number((0.62 + seeded(seed, 11) * 0.3).toFixed(2));
  const spread = (1 - confidence) * 0.35 + 0.04;
  return {
    estimatedValue: estimated,
    lowEstimate: Math.round((estimated * (1 - spread)) / 1000) * 1000,
    highEstimate: Math.round((estimated * (1 + spread)) / 1000) * 1000,
    confidenceScore: confidence,
    valuationDate: new Date().toISOString().slice(0, 10),
    provider: 'JC Market Model',
  };
}

export function getComparableSales(
  address: NormalizedAddress,
  details?: PropertyDetails,
): ComparableSale[] {
  const valuation = getValuation(address, details);
  const d = details ?? getPropertyDetails(address);
  const seed = hash(`${address.street}|${address.postalCode}|comps`.toLowerCase());
  const streets = ['Hummingbird', 'Camelback', 'Lafayette', 'Mockingbird', 'Exeter', 'Arcadia'];
  const suffixes = ['Ln', 'Rd', 'Blvd', 'Dr', 'Way', 'Pl'];
  return [0, 1, 2].map((i) => {
    const s = seed + i * 7919;
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(30 + seeded(s, 1) * 150));
    return {
      address: `${100 + Math.floor(seeded(s, 2) * 9800)} E ${streets[s % 6]} ${suffixes[s % 6]}, ${address.city}, ${address.state}`,
      salePrice: Math.round((valuation.estimatedValue * (0.9 + seeded(s, 3) * 0.2)) / 1000) * 1000,
      saleDate: date.toISOString().slice(0, 10),
      bedrooms: d.bedrooms,
      bathrooms: d.bathrooms,
      squareFeet: Math.round((d.squareFeet ?? 2200) * (0.88 + seeded(s, 4) * 0.24)),
      distanceMiles: Number((0.2 + seeded(s, 5) * 1.3).toFixed(1)),
    };
  });
}

export function getMarketTrends(address: NormalizedAddress): MarketTrendSummary {
  const seed = hash(`${address.postalCode}|trends`);
  const yoy = Number((-2 + seeded(seed, 1) * 9).toFixed(1));
  const median = Math.round((650000 + seeded(seed, 2) * 900000) / 5000) * 5000;
  const dom = 18 + Math.floor(seeded(seed, 3) * 40);
  return {
    medianSalePrice: median,
    yearOverYearChangePct: yoy,
    averageDaysOnMarket: dom,
    summaryText: `Homes near ${address.postalCode} have a median sale price of $${median.toLocaleString()}, ${yoy >= 0 ? 'up' : 'down'} ${Math.abs(yoy)}% year over year, averaging ${dom} days on market.`,
  };
}
