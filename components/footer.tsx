import Link from 'next/link';
import { site } from '@/lib/site';

const cols = [
  {
    h: 'Explore',
    links: [
      ['Properties', '/properties'],
      ['Home Search', '/search'],
      ['Neighborhoods', '/neighborhoods'],
      ['Insights', '/insights'],
    ],
  },
  {
    h: 'Services',
    links: [
      ['Sellers', '/sell'],
      ['Buyers', '/buy'],
      ['Home Valuation', '/home-valuation'],
      ['Contact', '/contact'],
      ['Privacy & Terms', '/terms-and-conditions'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-[6vw] pb-10 pt-20 text-sm text-mist">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logoDark}
              alt={`${site.name} — ${site.brand}`}
              className="mb-5 h-20 w-auto"
            />
            <p className="mb-3 font-serif text-xl text-coal">
              Jordan Cohen — Luxury Residential
            </p>
            <p className="max-w-xs">
              A refined real estate experience for buyers and sellers of
              exceptional Arizona homes.
            </p>
            <address className="mt-4 not-italic leading-7">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
              <br />
              <a href={site.phoneHref} className="hover:text-coal">
                {site.phone}
              </a>
              <br />
              <a href={`mailto:${site.email}`} className="hover:text-coal">
                {site.email}
              </a>
            </address>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <p className="mb-4 text-[10px] tracking-[0.28em] uppercase text-coal">
                {c.h}
              </p>
              <ul className="space-y-2.5">
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-coal">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="mb-4 text-[10px] tracking-[0.28em] uppercase text-coal">
              Follow
            </p>
            <ul className="space-y-2.5">
              <li><a href={site.social.instagram} className="hover:text-coal">Instagram</a></li>
              <li><a href={site.social.linkedin} className="hover:text-coal">LinkedIn</a></li>
              <li><a href={site.social.zillow} className="hover:text-coal">Zillow</a></li>
              <li><a href={site.social.compass} className="hover:text-coal">Compass</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line pt-8 text-[11px] leading-relaxed">
          <p>
            {site.name} · REALTOR® · License #{site.license} · {site.brokerage}{' '}
            is a licensed real estate broker and abides by Equal Housing
            Opportunity laws. All material presented herein is intended for
            informational purposes only. Information is compiled from sources
            deemed reliable but is subject to errors, omissions, changes in
            price, condition, sale, or withdrawal without notice. This is not
            intended to solicit property already listed. Equal Housing
            Opportunity.
          </p>
          <div className="mt-5 flex items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.compassLogo} alt="Compass" className="h-9 w-auto" />
            <p>
              © {new Date().getFullYear()} {site.brand}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
