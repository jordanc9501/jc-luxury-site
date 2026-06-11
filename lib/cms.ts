// CMS data layer. Reads from Sanity when configured AND populated;
// otherwise falls back to the local content in lib/data.ts.
// Per-type fallback: e.g. properties can come from the CMS while
// neighborhoods still come from code until you add them in /studio.

import { createClient } from 'next-sanity';
import {
  insights as localInsights,
  neighborhoods as localNeighborhoods,
  properties as localProperties,
  testimonials as localTestimonials,
  type Insight,
  type Neighborhood,
  type Property,
  type Testimonial,
} from './data';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

const client = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-10-01', useCdn: true })
  : null;

async function fetchOrFallback<T>(query: string, fallback: T[]): Promise<T[]> {
  if (!client) return fallback;
  try {
    const docs = await client.fetch<T[]>(query);
    return docs && docs.length > 0 ? docs : fallback;
  } catch {
    return fallback;
  }
}

const PROPERTY_Q = `*[_type == "property"] | order(_createdAt desc) {
  "id": _id,
  "slug": slug.current,
  title, status, price, priceLabel, address, city,
  "state": coalesce(state, "AZ"),
  "zip": coalesce(zip, ""),
  neighborhood, beds, baths, squareFeet, lotSize,
  "propertyType": coalesce(propertyType, "Single Family Residence"),
  yearBuilt, mlsNumber, description,
  "features": coalesce(features, []),
  "mainImage": mainImage.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  "seoTitle": coalesce(seoTitle, title),
  "seoDescription": coalesce(seoDescription, description)
}`;

const NEIGHBORHOOD_Q = `*[_type == "neighborhood"] | order(name asc) {
  "slug": slug.current,
  name, blurb, overview, lifestyle,
  "image": image.asset->url,
  "marketSnapshot": coalesce(marketSnapshot, []),
  "faqs": coalesce(faqs, [])
}`;

const TESTIMONIAL_Q = `*[_type == "testimonial"] | order(_createdAt desc) {
  quote, name, "role": coalesce(role, "Client")
}`;

const INSIGHT_Q = `*[_type == "insight"] | order(date desc) {
  "slug": slug.current,
  title, excerpt, date,
  "keyTakeaways": coalesce(keyTakeaways, []),
  "body": coalesce(body, [])
}`;

export const getProperties = () =>
  fetchOrFallback<Property>(PROPERTY_Q, localProperties);

export const getNeighborhoods = () =>
  fetchOrFallback<Neighborhood>(NEIGHBORHOOD_Q, localNeighborhoods);

export const getTestimonials = () =>
  fetchOrFallback<Testimonial>(TESTIMONIAL_Q, localTestimonials);

export const getInsights = () =>
  fetchOrFallback<Insight>(INSIGHT_Q, localInsights);

export async function getProperty(slug: string) {
  return (await getProperties()).find((p) => p.slug === slug);
}

export async function getNeighborhood(slug: string) {
  return (await getNeighborhoods()).find((n) => n.slug === slug);
}

export async function getInsight(slug: string) {
  return (await getInsights()).find((a) => a.slug === slug);
}
