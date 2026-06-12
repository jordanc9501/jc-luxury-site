import Link from 'next/link';
import { Header } from '@/components/header';
import {
  CTASection,
  NeighborhoodCard,
  PropertyCard,
  Section,
  SectionHead,
} from '@/components/ui';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { getNeighborhoods, getProperties, getTestimonials } from '@/lib/cms';
import { site } from '@/lib/site';

export const revalidate = 60;

export default async function Home() {
  const [properties, neighborhoods, testimonials] = await Promise.all([
    getProperties(),
    getNeighborhoods(),
    getTestimonials(),
  ]);
  const featured = properties.filter((p) => !p.sample).slice(0, 3);

  return (
    <>
      <Header />

      {/* Hero */}
      <div className="relative flex h-screen min-h-[640px] items-end text-paper">
        {site.heroVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={site.heroVideo}
            poster={site.heroImage}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${site.heroImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/20 to-coal/35" />
        <div className="relative z-10 w-full px-[6vw] pb-24">
          <div className="mx-auto max-w-7xl">
          <p className="eyebrow mb-5 !text-paper/75">
            Scottsdale · Paradise Valley · Arcadia · Biltmore
          </p>
          <h1 className="max-w-[20ch] text-4xl md:text-6xl lg:text-7xl">
            Arizona Real Estate, Curated With Precision.
          </h1>
          <p className="mt-6 max-w-xl text-paper/85">
            A refined advisory experience for buyers and sellers of exceptional
            Valley homes — market intelligence, discretion, and white-glove
            representation at every step.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/properties" className="btn-light">
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="self-center text-xs tracking-[0.22em] uppercase underline underline-offset-8"
            >
              Request a Private Consultation
            </Link>
          </div>
          </div>
        </div>
      </div>

      {/* Featured properties */}
      <Section>
        <SectionHead
          eyebrow="Browse"
          title="Featured Properties"
          link={{ href: '/properties', label: 'View All Properties' }}
        />
        <div className="grid gap-9 md:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </Section>

      {/* Search band */}
      <section className="bg-coal px-[6vw] py-24 text-center text-paper">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4 !text-paper/55">MLS Home Search</p>
          <h2 className="text-4xl md:text-5xl">Search Exceptional Homes</h2>
          <p className="mx-auto mt-5 max-w-2xl text-paper/65">
            Browse every active listing across the Valley — estates, gated
            communities, new construction, and private opportunities — with
            saved searches and instant alerts.
          </p>
          <Link href="/search" className="btn-light mt-10">
            Start Your Search
          </Link>
        </div>
      </section>

      {/* Neighborhoods */}
      <Section>
        <SectionHead
          eyebrow="Areas of Expertise"
          title="Explore Premier Communities"
          link={{ href: '/neighborhoods', label: 'All Neighborhoods' }}
        />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <NeighborhoodCard key={n.slug} n={n} />
          ))}
        </div>
      </Section>

      {/* Sellers */}
      <Section className="bg-stone">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">For Sellers</p>
            <h2 className="text-4xl md:text-5xl">
              Every Exceptional Home Deserves a Strategy.
            </h2>
            <p className="mt-6 text-mist">
              Selling a luxury property requires more than exposure. It
              requires precision — from pricing and presentation to private
              network outreach and negotiation, every detail is designed to
              protect value and attract the right buyer.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line text-sm">
              {[
                'Strategic pricing & market positioning',
                'Architectural photography & film',
                'Pre-market & private exclusive exposure',
                'Compass network & digital campaigns',
                'Expert negotiation, complete discretion',
              ].map((x) => (
                <li key={x} className="py-3.5">
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/home-valuation" className="btn-solid mt-9">
              Request a Home Valuation
            </Link>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=1280/https://media-production.lp-cdn.com/media/66655aed-6f43-441b-8b78-c996458303e0"
              alt="Luxury Arizona home exterior"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Buyers */}
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1 aspect-[4/5] overflow-hidden bg-stone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={neighborhoods[0].image}
              alt="Tree-lined Arcadia street"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4">For Buyers</p>
            <h2 className="text-4xl md:text-5xl">
              A More Curated Way to Find Home.
            </h2>
            <p className="mt-6 text-mist">
              The right home is not always found through a simple search. It
              begins with understanding lifestyle, architecture, privacy,
              location, and long-term value. Receive a tailored buying
              experience designed around your goals — including off-market and
              pre-market opportunities.
            </p>
            <Link href="/buy" className="btn-ghost mt-9">
              Start a Curated Search
            </Link>
          </div>
        </div>
      </Section>

      {/* About */}
      <Section className="bg-stone">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden bg-paper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.portrait}
              alt={`${site.name}, REALTOR®`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow mb-4">Meet Jordan</p>
            <h2 className="text-4xl md:text-5xl">
              Trusted Guidance for Exceptional Real Estate Decisions.
            </h2>
            <p className="mt-6 text-mist">
              A full-time, second-generation real estate professional, Jordan
              Cohen has built his practice on a client-first approach — prompt
              communication, professional and kind demeanor, and deep market
              knowledge that helps clients navigate the complexities of the
              Valley with confidence.
            </p>
            <Link href="/about" className="btn-ghost mt-9">
              Meet Jordan
            </Link>
          </div>
        </div>
      </Section>

      {/* Testimonials — rotates through every review */}
      <Section>
        <TestimonialCarousel items={testimonials} />
      </Section>

      <CTASection />
    </>
  );
}
