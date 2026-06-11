import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';
import { agentSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/json-ld';
import { Footer } from '@/components/footer';
import { LeadModal } from '@/components/lead-modal';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Luxury Real Estate Advisor in Scottsdale & Phoenix | ${site.name}`,
    template: `%s | ${site.name} — ${site.brand}`,
  },
  description: `Explore luxury homes, private listings, and premier Valley neighborhoods with ${site.name}, a trusted luxury real estate advisor at ${site.brokerage} in ${site.market}.`,
  openGraph: {
    type: 'website',
    siteName: `${site.name} — ${site.brand}`,
    images: [{ url: site.heroImage }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={[agentSchema(), websiteSchema()]} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:p-3"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
        <LeadModal />
      </body>
    </html>
  );
}
