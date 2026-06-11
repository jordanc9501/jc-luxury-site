import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { PageHero, Section } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Use',
  description:
    'Privacy policy and terms of use for jcluxuryresidential.com, the website of Jordan Cohen, luxury real estate advisor at Compass.',
  alternates: { canonical: '/terms-and-conditions' },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <Header solid />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy & Terms of Use"
        sub="How this site handles your information, and the terms governing its use."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-10 leading-relaxed text-mist">
          <div>
            <h2 className="mb-4 text-3xl text-coal">Privacy Policy</h2>
            <p>
              Information submitted through forms on this site (name, email,
              phone, and message details) is used solely to respond to your
              inquiry and provide real estate services. Your information is
              never sold. By submitting a form and checking the consent box,
              you agree to be contacted by {site.name} via call, email, and
              text for real estate services. You may opt out at any time by
              replying “stop” to texts or using the unsubscribe link in
              emails. Message and data rates may apply; message frequency may
              vary.
            </p>
            <p className="mt-4">
              This site may use standard analytics tools (such as Google
              Analytics) that collect anonymized usage data to improve the
              experience. No personally identifying information is shared with
              advertisers.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-3xl text-coal">Terms of Use</h2>
            <p>
              All material presented on this site is intended for
              informational purposes only. Information is compiled from
              sources deemed reliable but is subject to errors, omissions,
              changes in price, condition, sale, or withdrawal without notice.
              Nothing on this site constitutes legal, financial, or tax
              advice. This is not intended to solicit property already listed.
            </p>
            <p className="mt-4">
              {site.brokerage} is a licensed real estate broker and abides by
              Equal Housing Opportunity laws. {site.name} · REALTOR® · License
              #{site.license}. Listing data, where displayed, is provided
              through approved MLS/IDX feeds and remains the property of its
              respective owners.
            </p>
          </div>
          <p className="border-t border-line pt-6 text-sm">
            Questions? Contact {site.name} at{' '}
            <a href={`mailto:${site.email}`} className="border-b border-coal text-coal">
              {site.email}
            </a>{' '}
            or {site.phone}.
          </p>
        </div>
      </Section>
    </>
  );
}
