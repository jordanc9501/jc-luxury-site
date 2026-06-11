// ─────────────────────────────────────────────────────────────
// Content layer. Replace with a headless CMS (Sanity/Payload)
// or IDX feed when ready — page templates consume these types.
// ─────────────────────────────────────────────────────────────

export type PropertyStatus =
  | 'active'
  | 'pending'
  | 'sold'
  | 'coming-soon'
  | 'private-exclusive'
  | 'for-lease';

export type Property = {
  id: string;
  slug: string;
  title: string;
  status: PropertyStatus;
  price: number;
  priceLabel?: string; // e.g. "$4,650/mo"
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood?: string;
  beds: number;
  baths: number;
  squareFeet: number;
  lotSize?: string;
  propertyType: string;
  yearBuilt?: number;
  mlsNumber?: string;
  description: string;
  features: string[];
  mainImage: string;
  gallery: string[];
  seoTitle: string;
  seoDescription: string;
  sample?: boolean; // placeholder listing — remove when IDX is live
};

export type Neighborhood = {
  slug: string;
  name: string;
  image: string;
  blurb: string;
  overview: string;
  lifestyle: string;
  marketSnapshot: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export type Testimonial = { quote: string; name: string; role: string };

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string[];
  keyTakeaways: string[];
};

const lpcdn = (id: string, w = 1280) =>
  `https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=${w}/https://media-production.lp-cdn.com/media/${id}`;

// ── Properties ──────────────────────────────────────────────

export const properties: Property[] = [
  {
    id: 'p1',
    slug: '27201-n-71st-lane-peoria-az-85383',
    title: 'Refined Desert Contemporary in North Peoria',
    status: 'active',
    price: 865000,
    address: '27201 N 71st Lane',
    city: 'Peoria',
    state: 'AZ',
    zip: '85383',
    beds: 4,
    baths: 4,
    squareFeet: 3558,
    propertyType: 'Single Family Residence',
    description:
      'A light-filled residence offering generous entertaining spaces, a private backyard retreat, and refined finishes throughout — minutes from North Peoria’s best amenities, trails, and dining.',
    features: ['4 ensuite-style bedrooms', 'Open-concept great room', 'Chef’s kitchen', 'Resort-style backyard', '3-car garage'],
    mainImage:
      'https://dlajgvw9htjpb.cloudfront.net/cms/d9ce252e-da93-41ef-828c-39a9050646dc/7023389/-2186927962652531557.jpg',
    gallery: [],
    seoTitle: '27201 N 71st Lane, Peoria, AZ 85383 | Jordan Cohen',
    seoDescription:
      '4 bed, 4 bath, 3,558 sq ft home for sale in North Peoria. Represented by Jordan Cohen, JC Luxury Residential at Compass.',
  },
  {
    id: 'p2',
    slug: '4955-e-indian-school-road-9-phoenix-az-85018',
    title: 'Modern Townhome Near Arcadia',
    status: 'active',
    price: 579000,
    address: '4955 E Indian School Road #9',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85018',
    neighborhood: 'Arcadia',
    beds: 2,
    baths: 3,
    squareFeet: 1175,
    propertyType: 'Townhouse',
    description:
      'A sleek, low-maintenance residence in the heart of the Indian School corridor — walkable to Arcadia’s celebrated dining and minutes to Old Town Scottsdale and the Biltmore.',
    features: ['Designer finishes', 'Private patio', 'Two primary suites', 'Gated community', 'Lock-and-leave lifestyle'],
    mainImage:
      'https://dlajgvw9htjpb.cloudfront.net/cms/d9ce252e-da93-41ef-828c-39a9050646dc/7022925/3777019137980065314.jpg',
    gallery: [],
    seoTitle: '4955 E Indian School Rd #9, Phoenix, AZ 85018 | Jordan Cohen',
    seoDescription:
      '2 bed, 3 bath modern townhome for sale near Arcadia. Represented by Jordan Cohen, JC Luxury Residential at Compass.',
  },
  {
    id: 'p3',
    slug: '4464-e-campbell-avenue-phoenix-az-85018',
    title: 'Arcadia-Area Residence for Lease',
    status: 'for-lease',
    price: 4650,
    priceLabel: '$4,650/mo',
    address: '4464 E Campbell Avenue',
    city: 'Phoenix',
    state: 'AZ',
    zip: '85018',
    neighborhood: 'Arcadia',
    beds: 3,
    baths: 3,
    squareFeet: 1548,
    propertyType: 'Single Family Residence',
    description:
      'A beautifully appointed home for lease in the Arcadia area, combining contemporary comfort with one of Phoenix’s most sought-after locations.',
    features: ['3 bedrooms', 'Updated interiors', 'Private yard', 'Prime Arcadia-area location'],
    mainImage:
      'https://dlajgvw9htjpb.cloudfront.net/cms/d9ce252e-da93-41ef-828c-39a9050646dc/6994689/1185550085119223806.jpg',
    gallery: [],
    seoTitle: '4464 E Campbell Ave, Phoenix, AZ 85018 — For Lease | Jordan Cohen',
    seoDescription:
      '3 bed, 3 bath Arcadia-area home for lease. Represented by Jordan Cohen, JC Luxury Residential at Compass.',
  },
  {
    id: 's1',
    slug: 'sample-paradise-valley-estate',
    title: 'Sample: Modern Estate in Paradise Valley',
    status: 'private-exclusive',
    price: 4250000,
    address: '[Sample Listing — Replace]',
    city: 'Paradise Valley',
    state: 'AZ',
    zip: '85253',
    neighborhood: 'Paradise Valley',
    beds: 5,
    baths: 6,
    squareFeet: 6100,
    lotSize: '1.1 acres',
    propertyType: 'Single Family Residence',
    yearBuilt: 2022,
    description:
      'A sample private-exclusive listing demonstrating the property template: architectural design, Camelback Mountain views, resort grounds, and expansive indoor-outdoor entertaining spaces.',
    features: ['Camelback views', 'Negative-edge pool', 'Wine room', 'Guest casita', '4-car garage'],
    mainImage: lpcdn('66655aed-6f43-441b-8b78-c996458303e0'),
    gallery: [],
    seoTitle: 'Private Exclusive: Modern Estate in Paradise Valley | Jordan Cohen',
    seoDescription:
      'Sample private exclusive estate listing in Paradise Valley, AZ. Contact Jordan Cohen for discreet opportunities.',
    sample: true,
  },
];

export const formatPrice = (p: Property) =>
  p.priceLabel ?? `$${p.price.toLocaleString('en-US')}`;

export const statusLabel: Record<PropertyStatus, string> = {
  active: 'For Sale',
  pending: 'Pending',
  sold: 'Sold',
  'coming-soon': 'Coming Soon',
  'private-exclusive': 'Private Exclusive',
  'for-lease': 'For Lease',
};

// ── Neighborhoods ───────────────────────────────────────────

const hoodFaq = (name: string) => [
  {
    q: `What is it like to live in ${name}?`,
    a: `${name} offers a distinctive blend of lifestyle, architecture, and access that has made it one of the Valley’s most sought-after areas. Jordan Cohen helps buyers evaluate streets, micro-markets, and long-term value within ${name}.`,
  },
  {
    q: `How do I find homes for sale in ${name}?`,
    a: `Active MLS listings in ${name} can be searched on this site, and many opportunities surface privately before reaching the market. Contact Jordan for both public listings and discreet, off-market options.`,
  },
  {
    q: `Is ${name} a good place to buy a luxury home?`,
    a: `${name} has shown enduring demand driven by location, architecture, and lifestyle. The right answer depends on your goals — Jordan provides a data-driven view of pricing and trajectory before you commit.`,
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: 'arcadia',
    name: 'Arcadia',
    image: lpcdn('261941e3-24fe-4746-896a-ab01cb2f2ac0'),
    blurb: 'Lush, tree-lined streets and timeless charm — suburban tranquility with urban convenience.',
    overview:
      'Set against Camelback Mountain between Phoenix and Scottsdale, Arcadia is known for its mature landscaping, irrigated lots, and a mix of restored ranch homes and striking new builds.',
    lifestyle:
      'Weekend mornings at celebrated cafés, evenings at some of the Valley’s best restaurants, and quick access to hiking, Old Town Scottsdale, and the Biltmore corridor.',
    marketSnapshot: [
      { label: 'Character', value: 'Estate ranch & new construction' },
      { label: 'Positioning', value: 'Premier Phoenix luxury' },
      { label: 'Draw', value: 'Camelback views, walkable dining' },
    ],
    faqs: hoodFaq('Arcadia'),
  },
  {
    slug: 'biltmore',
    name: 'Biltmore',
    image: lpcdn('47e1c3d7-8856-491d-a4bc-df2e573ee64b'),
    blurb: 'Historic resort elegance, golf-course living, and refined urban convenience.',
    overview:
      'Anchored by the Arizona Biltmore, this storied corridor blends gated communities, golf-course estates, and luxury condominiums minutes from Phoenix’s business core.',
    lifestyle:
      'Golf, resort spas, Biltmore Fashion Park shopping and dining, and an established, polished atmosphere prized by executives and seasonal residents.',
    marketSnapshot: [
      { label: 'Character', value: 'Gated & golf communities' },
      { label: 'Positioning', value: 'Established prestige' },
      { label: 'Draw', value: 'Resort amenities, central location' },
    ],
    faqs: hoodFaq('the Biltmore corridor'),
  },
  {
    slug: 'paradise-valley',
    name: 'Paradise Valley',
    image: lpcdn('499c7bec-4448-4093-91f3-e046f2c2dfb7'),
    blurb: 'Arizona’s most exclusive town — acre-plus estates, mountain views, total privacy.',
    overview:
      'Paradise Valley is the Valley’s pinnacle luxury market: large estate lots, world-class resorts, and architecturally significant homes framed by Camelback and Mummy Mountain.',
    lifestyle:
      'Private, quiet, and discreet — with five-star resorts, top schools nearby, and a short drive to Old Town Scottsdale and Sky Harbor.',
    marketSnapshot: [
      { label: 'Character', value: 'Acre-plus estate properties' },
      { label: 'Positioning', value: 'Pinnacle of the Valley' },
      { label: 'Draw', value: 'Privacy, views, prestige' },
    ],
    faqs: hoodFaq('Paradise Valley'),
  },
  {
    slug: 'central-north-scottsdale',
    name: 'Central / North Scottsdale',
    image: lpcdn('4c5039c5-24c1-434a-b446-b717e665cfe5'),
    blurb: 'Golf communities, desert contemporary estates, and resort living.',
    overview:
      'From Kierland and Gainey Ranch to DC Ranch, Silverleaf, and Troon, Central and North Scottsdale offer the Valley’s widest range of guard-gated golf and desert-mountain communities.',
    lifestyle:
      'Championship golf, hiking in the McDowell Sonoran Preserve, and dining at Scottsdale Quarter and Kierland Commons.',
    marketSnapshot: [
      { label: 'Character', value: 'Guard-gated golf communities' },
      { label: 'Positioning', value: 'Resort & lifestyle luxury' },
      { label: 'Draw', value: 'Golf, preserve access, amenities' },
    ],
    faqs: hoodFaq('North Scottsdale'),
  },
  {
    slug: 'old-town-south-scottsdale',
    name: 'Old Town / South Scottsdale',
    image: lpcdn('261bf0aa-3033-4c93-bd9f-152d72eb327b'),
    blurb: 'Walkable energy — galleries, dining, nightlife, and lock-and-leave luxury.',
    overview:
      'Old Town pairs Scottsdale’s arts district and dining scene with a fast-growing market of luxury condominiums, townhomes, and renovated mid-century properties.',
    lifestyle:
      'Walk to galleries, spring training, the canal banks, and the Valley’s liveliest restaurant scene — ideal for seasonal residents and urban buyers.',
    marketSnapshot: [
      { label: 'Character', value: 'Condos, townhomes, mid-century' },
      { label: 'Positioning', value: 'Urban lock-and-leave' },
      { label: 'Draw', value: 'Walkability, culture, nightlife' },
    ],
    faqs: hoodFaq('Old Town Scottsdale'),
  },
  {
    slug: 'central-phoenix',
    name: 'Central Phoenix',
    image: lpcdn('a66b9d89-8ab2-4f59-b3c2-1afb25f97b0b'),
    blurb: 'Historic districts, urban character, and the Valley’s cultural core.',
    overview:
      'Central Phoenix spans historic districts, the Central Avenue corridor, and uptown enclaves — character homes and new urban residences with genuine architectural identity.',
    lifestyle:
      'Light rail access, museums, indie dining, and historic charm minutes from downtown’s business and sports core.',
    marketSnapshot: [
      { label: 'Character', value: 'Historic & urban residences' },
      { label: 'Positioning', value: 'Character-driven value' },
      { label: 'Draw', value: 'Culture, history, connectivity' },
    ],
    faqs: hoodFaq('Central Phoenix'),
  },
];

// ── Testimonials (from jcluxuryresidential.com) ─────────────

export const testimonials: Testimonial[] = [
  {
    quote:
      'He gave straightforward, savvy advice, understood the emotions of selling a house you have loved, and hustled from the day we broached the subject to the day the sale funded.',
    name: 'Andrea O.',
    role: 'Seller',
  },
  {
    quote:
      'He went above and beyond what normal realtors do, actually canvassing a neighborhood on my watch list to see if any current homeowners would be interested in selling. He knows Phoenix like the back of his hand.',
    name: 'Wade O.',
    role: 'Buyer · Relocation',
  },
  {
    quote:
      'This was my second go-round with Jordan as my realtor, and he always delivers more than you could ever imagine. He knows the market inside and out and has great connections in the real estate industry.',
    name: 'Patrick L.',
    role: 'Repeat Client · Buyer',
  },
  {
    quote:
      'Absolutely phenomenal. Seriously, Jordan went above and beyond for literally everything... he ensured everything, ultimately, worked out in the end. Highly recommended!',
    name: 'Trevor T.',
    role: 'Buyer',
  },
  {
    quote:
      'Jordan provided outstanding service in helping us obtain temporary housing in Scottsdale on short notice. His knowledge of the market helped us find the perfect location for our needs.',
    name: 'Thomas B.',
    role: 'Client · Scottsdale',
  },
  {
    quote:
      'He is trustworthy, honest, and quick to respond... As a first-time home buyer, he couldn’t have made the process any easier for me.',
    name: 'Keara T.',
    role: 'Buyer',
  },
];

// ── Insights (sample SEO/AEO articles) ──────────────────────

export const insights: Insight[] = [
  {
    slug: 'scottsdale-luxury-market-outlook',
    title: 'The Scottsdale & Paradise Valley Luxury Market Outlook',
    excerpt:
      'What buyers and sellers of exceptional Valley homes should understand about pricing, inventory, and timing this year.',
    date: '2026-06-01',
    body: [
      'The Scottsdale and Paradise Valley luxury market continues to behave differently from the broader Phoenix metro. Estate properties, guard-gated golf communities, and architecturally significant homes trade on scarcity, presentation, and buyer confidence rather than headline interest rates alone.',
      'For sellers, the implication is clear: positioning matters more than ever. Homes that are priced with precision, presented with professional photography and film, and introduced strategically — sometimes privately before a public launch — consistently outperform.',
      'For buyers, patience and access are the levers. Many of the Valley’s most compelling opportunities surface through agent networks before they reach public portals. A well-connected advisor widens the field considerably.',
    ],
    keyTakeaways: [
      'Luxury inventory in Scottsdale and Paradise Valley remains structurally scarce.',
      'Strategic pricing and presentation drive outsized results for sellers.',
      'Off-market access is a meaningful advantage for serious buyers.',
    ],
  },
  {
    slug: 'how-to-prepare-a-luxury-home-for-sale',
    title: 'How to Prepare a Luxury Home for Sale in the Valley',
    excerpt:
      'A strategic checklist for sellers: presentation, pricing, pre-market exposure, and the details that protect value.',
    date: '2026-05-15',
    body: [
      'Selling a luxury home in Scottsdale, Paradise Valley, or Arcadia is a campaign, not a listing. The work begins weeks before the first photograph: editing, styling, lighting, landscaping, and addressing the small details a discerning buyer will notice in the first ninety seconds.',
      'Pricing is the single most consequential decision. The luxury market punishes overpricing with silence — and rewards precise positioning with competition. A rigorous comparable analysis, adjusted for architecture, lot, views, and condition, is the foundation.',
      'Finally, consider your exposure strategy. Some homes benefit from a full public launch; others are best introduced quietly to a private network first. The right path depends on your timeline, privacy needs, and the property itself.',
    ],
    keyTakeaways: [
      'Preparation and presentation directly protect sale value.',
      'Precise pricing creates competition; overpricing creates silence.',
      'Public vs. private launch should be a deliberate strategic choice.',
    ],
  },
  {
    slug: 'best-neighborhoods-for-luxury-buyers-phoenix-scottsdale',
    title: 'The Best Neighborhoods for Luxury Buyers in Phoenix & Scottsdale',
    excerpt:
      'From Paradise Valley estates to Arcadia charm and North Scottsdale golf communities — how to choose the right area.',
    date: '2026-04-20',
    body: [
      'The best luxury neighborhood in the Valley depends on how you live. Paradise Valley offers acre-plus privacy and mountain views. Arcadia delivers lush, walkable charm minutes from the city’s best dining. North Scottsdale’s guard-gated communities — DC Ranch, Silverleaf, Troon — pair security with golf and preserve access.',
      'The Biltmore corridor suits buyers who want established prestige and resort amenities with a central location, while Old Town Scottsdale serves lock-and-leave buyers who want energy and walkability.',
      'Visit at different times of day, study the micro-markets street by street, and weigh commute, schools, privacy, and long-term trajectory. This is where local representation earns its keep.',
    ],
    keyTakeaways: [
      'Match neighborhood to lifestyle first, budget second.',
      'Micro-markets within each area vary street by street.',
      'Paradise Valley, Arcadia, and North Scottsdale lead the Valley’s luxury demand.',
    ],
  },
];

// ── FAQs (AEO) ──────────────────────────────────────────────

export const sellerFaqs = [
  {
    q: 'How do I sell a luxury home in Scottsdale or Paradise Valley?',
    a: 'Selling a luxury home in the Valley requires strategic pricing, elevated presentation, targeted digital marketing, private network exposure, and skilled negotiation. Jordan Cohen builds a tailored plan for each property designed to protect value and attract qualified buyers.',
  },
  {
    q: 'What makes luxury real estate marketing different?',
    a: 'Luxury marketing focuses on storytelling, architecture, lifestyle, and audience precision. The goal is not simply views — it is reaching qualified buyers who understand the property’s value, through professional film, design-forward materials, and the Compass network.',
  },
  {
    q: 'Should I list my home publicly or privately?',
    a: 'It depends on your goals, timing, privacy needs, and the property. Some homes benefit from full market exposure; others are best introduced privately to select buyers and agents before a public launch. Jordan advises on the right strategy case by case.',
  },
  {
    q: 'How is my home’s value determined?',
    a: 'Through a rigorous comparable analysis adjusted for architecture, lot, views, condition, and current buyer demand — not an automated estimate. Request a valuation and Jordan will prepare a precise, data-driven assessment.',
  },
];

export const buyerFaqs = [
  {
    q: 'How can I find off-market luxury homes in the Valley?',
    a: 'Off-market homes surface through agent relationships, brokerage networks, and direct seller conversations. Jordan Cohen helps qualified buyers explore both public MLS listings and discreet opportunities, including Compass Private Exclusives where available.',
  },
  {
    q: 'What should I look for when buying a luxury home?',
    a: 'Architecture, location, privacy, views, build quality, amenities, resale value, neighborhood trajectory, and lifestyle fit. Jordan provides a structured evaluation of each so the decision is grounded in more than aesthetics.',
  },
  {
    q: 'Can I set up alerts for new luxury listings?',
    a: 'Yes. Saved-search alerts notify you the moment homes matching your criteria hit the market — often the difference-maker in a low-inventory luxury segment.',
  },
  {
    q: 'Do you help with relocation to Arizona?',
    a: 'Yes. Jordan regularly guides relocating executives and families through neighborhoods, schools, commutes, and timing — including remote tours and short-notice housing when needed.',
  },
];
