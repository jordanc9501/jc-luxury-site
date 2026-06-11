import { site } from './site';
import type { Insight, Neighborhood, Property } from './data';

export const agentSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${site.url}/#agent`,
  name: site.name,
  alternateName: site.brand,
  url: site.url,
  image: site.portrait,
  description: `${site.name} is a luxury residential real estate advisor at ${site.brokerage} serving buyers and sellers in ${site.market}.`,
  telephone: '+1-602-677-8411',
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: 'US',
  },
  areaServed: site.areaServed,
  knowsAbout: ['Luxury real estate', 'Scottsdale homes', 'Paradise Valley estates', 'Arcadia real estate', 'Relocation'],
  memberOf: { '@type': 'Organization', name: site.brokerage },
  sameAs: Object.values(site.social),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: `${site.name} — ${site.brand}`,
  publisher: { '@id': `${site.url}/#agent` },
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const propertySchema = (p: Property) => ({
  '@context': 'https://schema.org',
  '@type': 'SingleFamilyResidence',
  name: p.title,
  description: p.description,
  url: `${site.url}/properties/${p.slug}`,
  image: [p.mainImage, ...p.gallery],
  address: {
    '@type': 'PostalAddress',
    streetAddress: p.address,
    addressLocality: p.city,
    addressRegion: p.state,
    postalCode: p.zip,
    addressCountry: 'US',
  },
  floorSize: { '@type': 'QuantitativeValue', value: p.squareFeet, unitCode: 'FTK' },
  numberOfBedrooms: p.beds,
  numberOfBathroomsTotal: p.baths,
  offers:
    p.status === 'sold'
      ? undefined
      : {
          '@type': 'Offer',
          price: p.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          offeredBy: { '@id': `${site.url}/#agent` },
        },
});

export const neighborhoodSchema = (n: Neighborhood) => ({
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: n.name,
  description: n.overview,
  url: `${site.url}/neighborhoods/${n.slug}`,
  image: n.image,
  containedInPlace: { '@type': 'State', name: 'Arizona' },
});

export const articleSchema = (a: Insight) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.excerpt,
  datePublished: a.date,
  url: `${site.url}/insights/${a.slug}`,
  author: { '@id': `${site.url}/#agent` },
  publisher: { '@id': `${site.url}/#agent` },
});

// JsonLd render component lives in components/json-ld.tsx
