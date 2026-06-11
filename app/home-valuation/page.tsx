import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { ContactForm } from '@/components/contact-form';
import { FaqList, PageHero, Section } from '@/components/ui';
import { sellerFaqs } from '@/lib/data';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'What Is My Home Worth? | Free Luxury Home Valuation',
  description:
    'Request a precise, data-driven valuation of your Scottsdale, Paradise Valley, or Phoenix home from Jordan Cohen — not an automated estimate.',
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
        sub="Automated estimates miss what makes a luxury home valuable — architecture, lot, views, condition, and timing. Receive a precise, human analysis instead."
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
            <h2 className="text-3xl">Request Your Valuation</h2>
            <p className="mb-8 mt-2 text-sm text-mist">
              Free, confidential, and tailored to your property. Include the
              address in your message.
            </p>
            <ContactForm subject="Home Valuation Request" />
          </div>
        </div>
      </Section>
    </>
  );
}
