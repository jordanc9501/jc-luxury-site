import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { CTASection, PageHero, PropertyCard, Section } from '@/components/ui';
import { getProperties } from '@/lib/cms';
import { JsonLd } from '@/components/json-ld';
import { breadcrumbSchema } from '@/lib/schema';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Luxury Homes for Sale in Scottsdale & Phoenix | Property Search',
  description:
    'Search luxury homes for sale in Scottsdale, Paradise Valley, Arcadia, and Greater Phoenix — estate homes, gated communities, new construction, and private opportunities.',
  alternates: { canonical: '/properties' },
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <>
      <Header solid />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
        ])}
      />
      <PageHero
        eyebrow="Portfolio"
        title="Featured Properties"
        sub="A curated selection of exceptional residences, private opportunities, and standout homes across the Valley."
      />
      <Section>
        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
        <div className="mt-16 border-t border-line pt-12 text-center">
          <p className="mx-auto max-w-xl text-mist">
            Looking for something specific? Search every active MLS listing
            across the Valley, or contact Jordan about private exclusives not
            shown publicly.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/search" className="btn-solid">
              Search All Homes
            </Link>
            <Link href="/contact" className="btn-ghost">
              Ask About Private Exclusives
            </Link>
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
