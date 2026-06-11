import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { CTASection, FaqList, PropertyCard, Section } from '@/components/ui';
import { getNeighborhood, getNeighborhoods, getProperties } from '@/lib/cms';
import { breadcrumbSchema, faqSchema, neighborhoodSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getNeighborhoods()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = await getNeighborhood(slug);
  if (!n) return {};
  return {
    title: `${n.name} Homes for Sale & Neighborhood Guide`,
    description: `${n.blurb} Explore ${n.name} real estate, lifestyle, and market insight with Jordan Cohen, luxury advisor at Compass.`,
    alternates: { canonical: `/neighborhoods/${n.slug}` },
    openGraph: { images: [{ url: n.image }] },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = await getNeighborhood(slug);
  if (!n) notFound();

  const [properties, neighborhoods] = await Promise.all([
    getProperties(),
    getNeighborhoods(),
  ]);
  const listings = properties.filter(
    (p) => p.neighborhood && n.name.toLowerCase().includes(p.neighborhood.toLowerCase()),
  );
  const nearby = neighborhoods.filter((x) => x.slug !== n.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          neighborhoodSchema(n),
          faqSchema(n.faqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Neighborhoods', path: '/neighborhoods' },
            { name: n.name, path: `/neighborhoods/${n.slug}` },
          ]),
        ]}
      />
      <Header />

      {/* Hero */}
      <div className="relative flex h-[70vh] min-h-[480px] items-end text-paper">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${n.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/15 to-coal/30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-[6vw] pb-20">
          <p className="eyebrow mb-4 !text-paper/70">Neighborhood Guide</p>
          <h1 className="text-5xl md:text-7xl">{n.name}</h1>
          <p className="mt-5 max-w-xl text-paper/85">{n.blurb}</p>
        </div>
      </div>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-3xl md:text-4xl">Overview</h2>
            <p className="mt-5 leading-relaxed text-mist">{n.overview}</p>
            <h2 className="mt-12 text-3xl md:text-4xl">The Lifestyle</h2>
            <p className="mt-5 leading-relaxed text-mist">{n.lifestyle}</p>

            <h2 className="mt-14 text-3xl md:text-4xl">
              {n.name} — Questions, Answered
            </h2>
            <div className="mt-7">
              <FaqList faqs={n.faqs} />
            </div>
          </div>

          <aside className="h-fit space-y-8">
            <div className="border border-line bg-stone p-7">
              <p className="eyebrow mb-5">At a Glance</p>
              <dl className="space-y-4">
                {n.marketSnapshot.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[10px] tracking-[0.24em] uppercase text-mist">
                      {s.label}
                    </dt>
                    <dd className="mt-0.5 font-serif text-lg">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="border border-line p-7">
              <p className="eyebrow mb-4">Buying or Selling Here?</p>
              <p className="text-sm text-mist">
                Jordan provides street-level guidance on {n.name} pricing,
                timing, and off-market opportunities.
              </p>
              <Link href="/contact" className="btn-solid mt-6 w-full text-center">
                Talk to Jordan
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {listings.length > 0 && (
        <Section className="bg-stone">
          <h2 className="mb-10 text-3xl md:text-4xl">
            Current Listings in {n.name}
          </h2>
          <div className="grid gap-9 md:grid-cols-3">
            {listings.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        </Section>
      )}

      <Section className={listings.length ? '' : 'bg-stone'}>
        <h2 className="mb-8 text-3xl md:text-4xl">Nearby Communities</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {nearby.map((x) => (
            <li key={x.slug}>
              <Link
                href={`/neighborhoods/${x.slug}`}
                className="block border border-line p-6 transition-colors hover:bg-coal hover:text-paper"
              >
                <span className="font-serif text-2xl">{x.name}</span>
                <span className="mt-1 block text-[11px] tracking-[0.2em] uppercase opacity-60">
                  Explore →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection title={`Thinking About ${n.name}? Let’s Talk Strategy.`} />
    </>
  );
}
