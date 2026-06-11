import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { CTASection, Section, TestimonialBlock } from '@/components/ui';
import { testimonials } from '@/lib/data';
import { site } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'About Jordan Cohen | Luxury Real Estate Advisor at Compass',
  description:
    'Jordan Cohen is a full-time, second-generation real estate professional at Compass serving Scottsdale, Paradise Valley, Arcadia, and Greater Phoenix.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <Header solid />

      <Section className="!pt-40">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden bg-stone lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.portrait}
              alt={`${site.name}, REALTOR®`}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-4">Meet Jordan</p>
            <h1 className="text-5xl md:text-6xl">
              Trusted Guidance for Exceptional Real Estate Decisions.
            </h1>
            <div className="mt-8 space-y-5 leading-relaxed text-mist">
              <p>
                As a full-time, second-generation real estate professional,
                Jordan dedicates himself every day to serving individuals and
                families in the pursuit of turning their real estate dreams
                into reality.
              </p>
              <p>
                Having built his practice on a client-first approach, Jordan
                prides himself on prompt communication, a professional and kind
                demeanor, and an expansive knowledge of the Valley that he uses
                to educate clients on the complexities of the market.
              </p>
              <p>
                Whether representing a luxury seller or guiding a buyer through
                a competitive search, Jordan understands the value of
                cultivating lasting relationships — putting clients’ needs
                above all else and creating an experience they won’t soon
                forget.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line">
              {[
                ['Brokerage', site.brokerage],
                ['License', `#${site.license}`],
                ['Market', site.market],
                ['Office', `${site.address.city}, ${site.address.state}`],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper p-5">
                  <dt className="text-[10px] tracking-[0.24em] uppercase text-mist">{k}</dt>
                  <dd className="mt-1 font-serif text-lg">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-sm text-mist">
              Serving {site.areaServed.join(', ')}, and the surrounding Valley.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-solid">
                Schedule a Consultation
              </Link>
              <a href={site.phoneHref} className="btn-ghost">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-stone">
        <h2 className="mb-10 text-3xl md:text-4xl">
          Trusted by Discerning Clients
        </h2>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialBlock key={t.name} t={t} />
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
