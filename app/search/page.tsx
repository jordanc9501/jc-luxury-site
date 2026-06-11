import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { IdxEmbed } from '@/components/idx-embed';
import { CTASection, PageHero, PropertyCard, Section } from '@/components/ui';
import { properties } from '@/lib/data';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Search Homes for Sale in Scottsdale & Phoenix | MLS Home Search',
  description:
    'Search every active MLS listing across Scottsdale, Paradise Valley, Arcadia, and Greater Phoenix. Saved searches, instant alerts, and private opportunities.',
  alternates: { canonical: '/search' },
};

export default function SearchPage() {
  return (
    <>
      <Header solid />
      <PageHero
        eyebrow="MLS Home Search"
        title="Search Exceptional Homes"
        sub="Every active listing across the Valley — estates, gated communities, new construction, and lock-and-leave residences."
      />

      <Section>
        {/* Showcase IDX renders here once NEXT_PUBLIC_IDX_SCRIPT_URL is set */}
        <IdxEmbed />

        <div className="mt-20">
          <h2 className="mb-10 text-3xl md:text-4xl">Current Opportunities</h2>
          <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3">
            {properties.filter((p) => !p.sample).map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        </div>

        <p className="mt-16 border-t border-line pt-8 text-xs leading-relaxed text-mist">
          Listing information is provided through an approved IDX/MLS feed and
          is deemed reliable but not guaranteed. {site.brokerage} abides by
          Equal Housing Opportunity laws. Data is refreshed regularly; see each
          listing for its last-updated timestamp.
        </p>
      </Section>

      <CTASection title="Want Alerts the Moment the Right Home Hits the Market?" />
    </>
  );
}
