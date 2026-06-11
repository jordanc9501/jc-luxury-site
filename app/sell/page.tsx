import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { ContactForm } from '@/components/contact-form';
import { FaqList, PageHero, Section, TestimonialBlock } from '@/components/ui';
import { sellerFaqs } from '@/lib/data';
import { getTestimonials } from '@/lib/cms';

export const revalidate = 60;
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Sell Your Luxury Home in Scottsdale & Phoenix',
  description:
    'Strategic pricing, premium marketing, private network exposure, and expert negotiation when selling your luxury home in Scottsdale, Paradise Valley, or Greater Phoenix.',
  alternates: { canonical: '/sell' },
};

const process = [
  ['Private Consultation', 'Your goals, timeline, and privacy needs set the strategy — not a template.'],
  ['Precision Pricing', 'A rigorous comparable analysis adjusted for architecture, lot, views, and condition.'],
  ['Presentation', 'Editing, styling, architectural photography, and film that does the property justice.'],
  ['Exposure Strategy', 'Public launch, private exclusive, or pre-market introduction — chosen deliberately.'],
  ['Marketing Campaign', 'Compass network, digital campaigns, and targeted outreach to qualified buyers.'],
  ['Negotiation & Close', 'Skilled negotiation and white-glove management through funding.'],
];

export default async function SellPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <JsonLd
        data={[
          faqSchema(sellerFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Sellers', path: '/sell' },
          ]),
        ]}
      />
      <Header solid />
      <PageHero
        eyebrow="For Sellers"
        title="Selling a Luxury Home Requires More Than a Listing."
        sub="Every property deserves a strategy: pricing, presentation, positioning, and negotiation — executed with discretion."
      />

      <Section>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {process.map(([t, d], i) => (
            <div key={t} className="bg-paper p-8">
              <p className="eyebrow mb-3">0{i + 1}</p>
              <h2 className="text-2xl">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/home-valuation" className="btn-solid">
            Request a Luxury Home Valuation
          </Link>
        </div>
      </Section>

      <Section className="bg-stone">
        <h2 className="mb-8 text-3xl md:text-4xl">Seller Questions, Answered</h2>
        <FaqList faqs={sellerFaqs} />
      </Section>

      <Section>
        <h2 className="mb-10 text-3xl md:text-4xl">From Recent Sellers</h2>
        <div className="grid gap-7 md:grid-cols-2">
          {testimonials.slice(0, 2).map((t) => (
            <TestimonialBlock key={t.name} t={t} />
          ))}
        </div>
      </Section>

      <Section className="bg-stone">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl">Start the Conversation</h2>
          <p className="mb-8 mt-3 text-mist">
            Confidential, no-obligation. Tell Jordan about your home and goals.
          </p>
          <ContactForm subject="Seller Inquiry" />
        </div>
      </Section>
    </>
  );
}
