import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { CTASection, PageHero, Section } from '@/components/ui';
import { getInsights } from '@/lib/cms';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Market Insights | Scottsdale & Phoenix Luxury Real Estate',
  description:
    'Market updates, seller strategy, buyer guidance, and neighborhood intelligence for the Scottsdale and Phoenix luxury market from Jordan Cohen.',
  alternates: { canonical: '/insights' },
};

export default async function InsightsPage() {
  const insights = await getInsights();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ])}
      />
      <Header solid />
      <PageHero
        eyebrow="The Journal"
        title="Market Insights"
        sub="Clear, current thinking on the Valley’s luxury market — for buyers, sellers, and the curious."
      />
      <Section>
        <div className="divide-y divide-line border-y border-line">
          {insights.map((a) => (
            <Link
              key={a.slug}
              href={`/insights/${a.slug}`}
              className="group grid gap-4 py-10 md:grid-cols-[140px_1fr_auto] md:items-baseline"
            >
              <time dateTime={a.date} className="text-[11px] tracking-[0.2em] uppercase text-mist">
                {new Date(a.date + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <div>
                <h2 className="font-serif text-3xl transition-opacity group-hover:opacity-60">
                  {a.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-mist">{a.excerpt}</p>
              </div>
              <span className="text-[11px] tracking-[0.24em] uppercase">Read →</span>
            </Link>
          ))}
        </div>
      </Section>
      <CTASection title="Have a Question the Market Data Doesn’t Answer?" />
    </>
  );
}
