import { defineField, defineType } from 'sanity';

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Listing Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'active',
      options: {
        list: [
          { title: 'For Sale', value: 'active' },
          { title: 'Pending', value: 'pending' },
          { title: 'Sold', value: 'sold' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Private Exclusive', value: 'private-exclusive' },
          { title: 'For Lease', value: 'for-lease' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'price', type: 'number', validation: (r) => r.required() }),
    defineField({
      name: 'priceLabel',
      title: 'Price label override (e.g. "$4,650/mo")',
      type: 'string',
    }),
    defineField({ name: 'address', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'city', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'state', type: 'string', initialValue: 'AZ' }),
    defineField({ name: 'zip', type: 'string' }),
    defineField({ name: 'neighborhood', type: 'string' }),
    defineField({ name: 'beds', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'baths', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'squareFeet', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'lotSize', type: 'string' }),
    defineField({ name: 'propertyType', type: 'string', initialValue: 'Single Family Residence' }),
    defineField({ name: 'yearBuilt', type: 'number' }),
    defineField({ name: 'mlsNumber', type: 'string' }),
    defineField({ name: 'description', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'mainImage', type: 'image', validation: (r) => r.required() }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text' }),
  ],
  preview: {
    select: { title: 'address', subtitle: 'status', media: 'mainImage' },
  },
});

export const neighborhoodType = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'image', type: 'image', validation: (r) => r.required() }),
    defineField({ name: 'blurb', title: 'Short blurb (cards)', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'overview', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'lifestyle', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'marketSnapshot',
      title: 'At a Glance',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs (powers Google rich results)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'q', title: 'Question', type: 'string' },
            { name: 'a', title: 'Answer', type: 'text' },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'name', media: 'image' } },
});

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Client name (e.g. "Andrea O.")', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Label (e.g. "Seller", "Buyer · Relocation")', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'quote' } },
});

export const insightType = defineType({
  name: 'insight',
  title: 'Market Insight (Article)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'date', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways (3 short bullets, shown in summary box)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'body',
      title: 'Article paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'date' } },
});

export const schemaTypes = [propertyType, neighborhoodType, testimonialType, insightType];
