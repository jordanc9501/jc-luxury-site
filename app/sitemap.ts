import type { MetadataRoute } from 'next';
import { getInsights, getNeighborhoods, getProperties } from '@/lib/cms';
import { site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, neighborhoods, insights] = await Promise.all([
    getProperties(),
    getNeighborhoods(),
    getInsights(),
  ]);
  const now = new Date();
  const statics = [
    '',
    '/properties',
    '/search',
    '/neighborhoods',
    '/sell',
    '/buy',
    '/about',
    '/contact',
    '/insights',
    '/home-valuation',
  ].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  return [
    ...statics,
    ...properties.map((p) => ({
      url: `${site.url}/properties/${p.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })),
    ...neighborhoods.map((n) => ({
      url: `${site.url}/neighborhoods/${n.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...insights.map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
