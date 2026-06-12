import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { ContactForm } from '@/components/contact-form';
import { AvmWidget } from '@/components/avm-widget';
import { FaqList, PageHero, Section } from '@/components/ui';
import { sellerFaqs } from '@/lib/data';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'What Is My Home Worth? | Instant & Expert Home Valuation',
  description:
    'Get an instant estimate of your Scottsdale, Paradise Valley, or Phoenix home’s value — then request a precise, human valuation from Jordan Cohen.',
  alternates: { canonical: '/home-valuation' },
};

export default function HomeValuationPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(sellerFaqs.slice(0, 2)),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Home Valuation', path: '/home-valuation' },
          ]),
        ]}
      />
      <Header solid />
      <PageHero
        eyebrow="For Homeowners"
        title="What Is Your Home Actually Worth?"
        sub="Start with an instant, data-driven estimate — then go deeper with a precise, human analysis of architecture, lot, views, condition, and timing."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl">How Your Valuation Is Built</h2>
            <ul className="mt-8 space-y-6">
              {[
                ['Comparable Analysis', 'Recent sales adjusted for architecture, lot, views, and condition — not ZIP-code averages.'],
                ['Market Position', 'Where your home sits against active competition and current buyer demand.'],
                ['Strategy Notes', 'What to address before listing, and whether a public or private launch serves you best.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="eyebrow pt-1">0{i + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <FaqList faqs={sellerFaqs.slice(0, 2)} />
            </div>
          </div>
          <div className="h-fit border border-line bg-stone p-8 md:p-10 lg:sticky lg:top-28">
            <p className="eyebrow">Instant Estimate</p>
            <h2 className="mt-2 text-3xl">What’s My Home Worth?</h2>
            <AvmWidget />
          </div>
        </div>
      </Section>

      <Section className="bg-stone">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Prefer a Human Analysis?</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Request a Private, Detailed Valuation</h2>
          <p className="mx-auto mt-4 mb-10 max-w-xl text-sm leading-relaxed text-mist">
            Free, confidential, and tailored to your property. Include the
            address in your message.
          </p>
          <div className="text-left">
            <ContactForm subject="Home Valuation Request" />
          </div>
        </div>
      </Section>
    </>
  );
}
