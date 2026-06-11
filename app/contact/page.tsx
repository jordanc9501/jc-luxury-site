import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { ContactForm } from '@/components/contact-form';
import { PageHero, Section } from '@/components/ui';
import { site } from '@/lib/site';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';

export const metadata: Metadata = {
  title: 'Contact Jordan Cohen | Scottsdale Luxury Real Estate',
  description:
    'Schedule a private consultation with Jordan Cohen, luxury real estate advisor at Compass in Scottsdale, AZ. Call (602) 677-8411.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <Header solid />
      <PageHero
        eyebrow="Let’s Connect"
        title="Ready for a More Private, Strategic Real Estate Experience?"
        sub="Confidential, no-obligation. Every inquiry receives a prompt, personal response."
      />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-3xl">Contact Details</h2>
            <dl className="mt-8 space-y-6 text-mist">
              <div>
                <dt className="eyebrow mb-1">Phone</dt>
                <dd>
                  <a href={site.phoneHref} className="font-serif text-2xl text-coal">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="font-serif text-2xl text-coal">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Office</dt>
                <dd className="leading-7">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Follow</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a href={site.social.instagram} className="border-b border-line hover:border-coal">Instagram</a>
                  <a href={site.social.linkedin} className="border-b border-line hover:border-coal">LinkedIn</a>
                  <a href={site.social.zillow} className="border-b border-line hover:border-coal">Zillow</a>
                  <a href={site.social.youtube} className="border-b border-line hover:border-coal">YouTube</a>
                  <a href={site.social.compass} className="border-b border-line hover:border-coal">Compass</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="border border-line bg-stone p-8 md:p-10">
            <h2 className="text-3xl">Leave a Message</h2>
            <p className="mb-8 mt-2 text-sm text-mist">
              Tell Jordan a little about your plans — buying, selling, or both.
            </p>
            <ContactForm subject="Website Contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
