import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { ContactForm } from '@/components/contact-form';
import { CTASection, PropertyCard, Section } from '@/components/ui';
import { formatPrice, statusLabel } from '@/lib/data';
import { getProperties, getProperty } from '@/lib/cms';
import { breadcrumbSchema, propertySchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProperties()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/properties/${p.slug}` },
    openGraph: { images: [{ url: p.mainImage }] },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) notFound();

  const all = await getProperties();
  const similar = all.filter((x) => x.slug !== p.slug && !x.sample).slice(0, 3);
  const facts: [string, string][] = [
    ['Status', statusLabel[p.status]],
    ['Beds', String(p.beds)],
    ['Baths', String(p.baths)],
    ['Square Feet', p.squareFeet.toLocaleString()],
    ['Type', p.propertyType],
  ];
  if (p.lotSize) facts.push(['Lot Size', p.lotSize]);
  if (p.yearBuilt) facts.push(['Year Built', String(p.yearBuilt)]);
  if (p.mlsNumber) facts.push(['MLS #', p.mlsNumber]);
  if (p.neighborhood) facts.push(['Neighborhood', p.neighborhood]);

  return (
    <>
      <JsonLd
        data={[
          propertySchema(p),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Properties', path: '/properties' },
            { name: p.address, path: `/properties/${p.slug}` },
          ]),
        ]}
      />
      <Header solid />

      <div className="px-[6vw] pt-28">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 text-[11px] tracking-[0.18em] uppercase text-mist">
            <Link href="/" className="hover:text-coal">Home</Link>
            {' / '}
            <Link href="/properties" className="hover:text-coal">Properties</Link>
            {' / '}
            <span className="text-coal">{p.address}</span>
          </nav>
          <div className="relative aspect-[16/9] overflow-hidden bg-stone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.mainImage}
              alt={`${p.address}, ${p.city}, ${p.state}`}
              className="h-full w-full object-cover"
            />
            <span className="absolute left-5 top-5 bg-coal/85 px-4 py-2 text-[10px] tracking-[0.24em] uppercase text-paper">
              {statusLabel[p.status]}
            </span>
          </div>
        </div>
      </div>

      <Section className="!pt-14">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="eyebrow mb-3">{p.title}</p>
            <h1 className="text-4xl md:text-5xl">{formatPrice(p)}</h1>
            <p className="mt-3 text-mist">
              {p.address}, {p.city}, {p.state} {p.zip}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-paper p-5">
                  <dt className="text-[10px] tracking-[0.24em] uppercase text-mist">{k}</dt>
                  <dd className="mt-1 font-serif text-xl">{v}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-14 text-3xl">About This Home</h2>
            <p className="mt-5 leading-relaxed text-mist">{p.description}</p>

            <h2 className="mt-12 text-3xl">Features</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line text-sm">
              {p.features.map((f) => (
                <li key={f} className="py-3.5">{f}</li>
              ))}
            </ul>

            {p.neighborhood && (
              <p className="mt-10 text-sm text-mist">
                Explore the area:{' '}
                <Link
                  href={`/neighborhoods/${p.neighborhood.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  className="border-b border-coal text-coal"
                >
                  {p.neighborhood} neighborhood guide
                </Link>
              </p>
            )}
          </div>

          <aside className="h-fit border border-line bg-stone p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl">Schedule a Private Showing</h2>
            <p className="mb-6 mt-2 text-sm text-mist">
              Inquire about this property, request a showing, or ask about
              similar off-market opportunities.
            </p>
            <ContactForm subject={`Showing Request: ${p.address}, ${p.city}`} />
          </aside>
        </div>
      </Section>

      {p.gallery.length > 0 && (
        <Section className="!pt-0">
          <h2 className="mb-8 text-3xl md:text-4xl">Photo Gallery</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {p.gallery.map((src, i) => (
              <div
                key={src}
                className={`group overflow-hidden bg-stone ${
                  i % 8 === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${p.address}, ${p.city} — photo ${i + 2}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section className="bg-stone">
        <h2 className="mb-10 text-3xl md:text-4xl">Similar Listings</h2>
        <div className="grid gap-9 md:grid-cols-3">
          {similar.map((s) => (
            <PropertyCard key={s.id} p={s} />
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
