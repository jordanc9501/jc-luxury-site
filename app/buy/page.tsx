import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { ContactForm } from '@/components/contact-form';
import { FaqList, PageHero, Section, TestimonialBlock } from '@/components/ui';
import { buyerFaqs } from '@/lib/data';
import { getTestimonials } from '@/lib/cms';

export const revalidate = 60;
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Buy a Luxury Home in Scottsdale & Phoenix | Curated Home Search',
  description:
    'A curated luxury buying experience — neighborhood guidance, off-market access, relocation support, and expert representation across the Valley.',
  alternates: { canonical: '/buy' },
};

const pillars = [
  ['Curated Search', 'Listings matched to lifestyle, architecture, and long-term value — not just filters.'],
  ['Off-Market Access', 'Private exclusives and pre-market opportunities through the Compass network.'],
  ['Neighborhood Guidance', 'Street-level insight across Scottsdale, Paradise Valley, Arcadia, and beyond.'],
  ['Relocation Support', 'Remote tours, timing strategy, and short-notice housing for out-of-state moves.'],
  ['Negotiation Strategy', 'Disciplined offers grounded in data, comparable sales, and market dynamics.'],
  ['Through Closing & Beyond', 'Inspections, vendors, and questions answered long after keys change hands.'],
];

export default async function BuyPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <JsonLd
        data={[
          faqSchema(buyerFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Buyers', path: '/buy' },
          ]),
        ]}
      />
      <Header solid />
      <PageHero
        eyebrow="For Buyers"
        title="A Private, Curated Buying Experience."
        sub="The search begins with understanding lifestyle, timing, privacy, and long-term value — then widens to include opportunities most buyers never see."
      />

      <Section>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {pillars.map(([t, d], i) => (
            <div key={t} className="bg-paper p-8">
              <p className="eyebrow mb-3">0{i + 1}</p>
              <h2 className="text-2xl">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/search" className="btn-solid">
            Begin Your Home Search
          </Link>
        </div>
      </Section>

      <Section className="bg-stone">
        <h2 className="mb-8 text-3xl md:text-4xl">Buyer Questions, Answered</h2>
        <FaqList faqs={buyerFaqs} />
      </Section>

      <Section>
        <h2 className="mb-10 text-3xl md:text-4xl">From Recent Buyers</h2>
        <div className="grid gap-7 md:grid-cols-2">
          {testimonials.slice(0, 2).map((t) => (
            <TestimonialBlock key={t.name} t={t} />
          ))}
        </div>
      </Section>

      <Section className="bg-stone">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl">Start a Curated Search</h2>
          <p className="mb-8 mt-3 text-mist">
            Tell Jordan what you’re looking for — including what you haven’t
            found on the portals.
          </p>
          <ContactForm subject="Buyer Inquiry" />
        </div>
      </Section>
    </>
  );
}
