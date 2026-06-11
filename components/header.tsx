'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

const links = [
  { href: '/properties', label: 'Properties' },
  { href: '/search', label: 'Search' },
  { href: '/neighborhoods', label: 'Neighborhoods' },
  { href: '/sell', label: 'Sellers' },
  { href: '/buy', label: 'Buyers' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dark = solid || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-paper/90 backdrop-blur border-b border-line py-3'
          : 'py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-12 px-[6vw]">
        <Link href="/" onClick={() => setOpen(false)} className="block shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dark ? site.logoDark : site.logoLight}
            alt={`${site.name} — ${site.brand}`}
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-50 ${
                dark ? 'text-coal' : 'text-paper'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`whitespace-nowrap border px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase transition-colors ${
              dark
                ? 'border-coal text-coal hover:bg-coal hover:text-paper'
                : 'border-paper text-paper hover:bg-paper hover:text-coal'
            }`}
          >
            Private Consultation
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={`xl:hidden text-[11px] tracking-[0.3em] uppercase ${dark ? 'text-coal' : 'text-paper'}`}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="xl:hidden bg-paper border-t border-line px-[6vw] py-10">
          <ul className="space-y-6">
            {[...links, { href: '/contact', label: 'Private Consultation' }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-3xl text-coal"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
