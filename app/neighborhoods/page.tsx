import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { CTASection, NeighborhoodCard, PageHero, Section } from '@/components/ui';
import { neighborhoods } from '@/lib/data';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Best Neighborhoods in Scottsdale & Phoenix | Community Guides',
  description:
    'Explore premier Valley communities — Arcadia, Paradise Valley, Biltmore, North Scottsdale, Old Town, and Central Phoenix — with local market insight from Jordan Cohen.',
  alternates: { canonical: '/neighborhoods' },
};

export default function NeighborhoodsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Neighborhoods', path: '/neighborhoods' },
        ])}
      />
      <Header solid />
      <PageHero
        eyebrow="Areas of Expertise"
        title="Explore Premier Communities"
        sub="Neighborhoods defined by architecture, lifestyle, privacy, views, amenities, and enduring value."
      />
      <Section>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <NeighborhoodCard key={n.slug} n={n} />
          ))}
        </div>
      </Section>
      <CTASection title="Not Sure Which Neighborhood Fits Your Life?" />
    </>
  );
}
