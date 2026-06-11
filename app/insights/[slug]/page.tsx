import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { CTASection, Section } from '@/components/ui';
import { insights } from '@/lib/data';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/insights/${a.slug}` },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = insights.find((x) => x.slug === slug);
  if (!a) notFound();
  const more = insights.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(a),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: a.title, path: `/insights/${a.slug}` },
          ]),
        ]}
      />
      <Header solid />

      <Section className="!pt-40">
        <article className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4">
            Market Insights ·{' '}
            {new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <h1 className="text-4xl md:text-5xl">{a.title}</h1>

          {/* AEO: concise answer-first summary */}
          <aside className="mt-10 border border-line bg-stone p-7">
            <p className="eyebrow mb-4">Key Takeaways</p>
            <ul className="space-y-2.5 text-sm leading-relaxed">
              {a.keyTakeaways.map((k) => (
                <li key={k}>— {k}</li>
              ))}
            </ul>
          </aside>

          <div className="mt-10 space-y-6 leading-relaxed text-mist">
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-8 text-sm text-mist">
            <p>
              Written by{' '}
              <Link href="/about" className="border-b border-coal text-coal">
                Jordan Cohen
              </Link>
              , luxury residential advisor at Compass serving Scottsdale,
              Paradise Valley, Arcadia, and Greater Phoenix.
            </p>
          </div>
        </article>
      </Section>

      <Section className="bg-stone">
        <h2 className="mb-8 text-3xl">Continue Reading</h2>
        <div className="grid gap-7 md:grid-cols-2">
          {more.map((x) => (
            <Link key={x.slug} href={`/insights/${x.slug}`} className="group border border-line bg-paper p-8">
              <h3 className="font-serif text-2xl transition-opacity group-hover:opacity-60">
                {x.title}
              </h3>
              <p className="mt-2 text-sm text-mist">{x.excerpt}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
