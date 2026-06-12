import Link from 'next/link';
import {
  formatPrice,
  statusLabel,
  type Neighborhood,
  type Property,
  type Testimonial,
} from '@/lib/data';

export const Section = ({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`px-[6vw] py-24 md:py-28 ${className}`}>
    <div className="mx-auto max-w-7xl">{children}</div>
  </section>
);

export const SectionHead = ({
  eyebrow,
  title,
  link,
}: {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
}) => (
  <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
    <div>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl">{title}</h2>
    </div>
    {link && (
      <Link
        href={link.href}
        className="border-b border-coal pb-1.5 text-[11px] tracking-[0.24em] uppercase"
      >
        {link.label}
      </Link>
    )}
  </div>
);

export const PropertyCard = ({ p }: { p: Property }) => (
  <Link
    href={`/properties/${p.slug}`}
    className="group block transition-all duration-500 hover:-translate-y-1.5"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-stone shadow-none transition-shadow duration-500 group-hover:shadow-[0_28px_56px_-28px_rgba(17,17,16,0.45)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.mainImage}
        alt={`${p.address}, ${p.city}, ${p.state}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <span className="absolute left-4 top-4 bg-coal/85 px-3.5 py-1.5 text-[10px] tracking-[0.24em] uppercase text-paper">
        {statusLabel[p.status]}
      </span>
    </div>
    <div className="pt-5">
      <p className="font-serif text-2xl">{formatPrice(p)}</p>
      <p className="mt-1 text-[13px] text-mist">
        {p.address}, {p.city}, {p.state} {p.zip}
      </p>
      <p className="mt-3 flex gap-4 border-t border-line pt-3 text-[11px] tracking-[0.14em] uppercase text-mist">
        <span>{p.beds} Beds</span>
        <span>{p.baths} Baths</span>
        <span>{p.squareFeet.toLocaleString()} Sq.Ft.</span>
      </p>
    </div>
  </Link>
);

export const NeighborhoodCard = ({ n }: { n: Neighborhood }) => (
  <Link
    href={`/neighborhoods/${n.slug}`}
    className="group relative flex aspect-[3/4] items-end overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-28px_rgba(17,17,16,0.5)]"
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={n.image}
      alt={n.name}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-coal/75 via-transparent to-transparent" />
    <div className="relative z-10 p-7 text-paper">
      <h3 className="text-3xl">{n.name}</h3>
      <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-paper/75">
        Explore Community
      </p>
    </div>
  </Link>
);

export const TestimonialBlock = ({ t }: { t: Testimonial }) => (
  <figure className="border border-line bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:border-coal hover:shadow-[0_20px_40px_-24px_rgba(17,17,16,0.35)]">
    <blockquote className="font-serif text-xl italic leading-relaxed">
      “{t.quote}”
    </blockquote>
    <figcaption className="mt-5 text-[11px] tracking-[0.26em] uppercase text-mist">
      {t.name} — {t.role}
    </figcaption>
  </figure>
);

export const FaqList = ({ faqs }: { faqs: { q: string; a: string }[] }) => (
  <div className="divide-y divide-line border-y border-line">
    {faqs.map((f) => (
      <details key={f.q} className="faq group py-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl">
          {f.q}
          <span aria-hidden className="text-mist transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-mist">{f.a}</p>
      </details>
    ))}
  </div>
);

export const CTASection = ({
  title = 'Ready for a More Private, Strategic Real Estate Experience?',
  sub = 'Your information remains private and is only used to respond to your inquiry.',
}: {
  title?: string;
  sub?: string;
}) => (
  <section className="bg-coal px-[6vw] py-24 text-center text-paper md:py-28">
    <div className="mx-auto max-w-4xl">
      <p className="eyebrow mb-5 !text-paper/55">Let’s Connect</p>
      <h2 className="mx-auto max-w-[20ch] text-4xl md:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-paper/65">{sub}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/contact" className="btn-light">
          Schedule a Private Consultation
        </Link>
        <Link href="/home-valuation" className="btn-light">
          Request a Home Valuation
        </Link>
      </div>
    </div>
  </section>
);

export const PageHero = ({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) => (
  <div className="bg-coal px-[6vw] pb-20 pt-40 text-paper">
    <div className="mx-auto max-w-7xl">
      <p className="eyebrow mb-4 !text-paper/60">{eyebrow}</p>
      <h1 className="max-w-[18ch] text-5xl md:text-6xl">{title}</h1>
      {sub && <p className="mt-6 max-w-2xl text-paper/75">{sub}</p>}
    </div>
  </div>
);
