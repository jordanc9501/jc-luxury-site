# JC Luxury Residential — Website

A production-ready Next.js rebuild of jcluxuryresidential.com for Jordan Cohen (Compass, Scottsdale AZ). Black-and-white editorial luxury design, IDX-ready architecture, and full SEO/AEO/AIO optimization.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deploy: push to GitHub → import to [Vercel](https://vercel.com) → set the domain to jcluxuryresidential.com.

## Structure

- `lib/site.ts` — brand, contact, license, social (edit once, used everywhere)
- `lib/data.ts` — properties, neighborhoods, testimonials, insights, FAQs (the content layer; swap for a CMS or IDX feed later)
- `lib/schema.ts` — JSON-LD builders (RealEstateAgent, FAQ, Residence, Breadcrumb, Article, Place)
- `components/` — Header, Footer, cards, forms, FAQ accordion
- `app/` — all routes: `/`, `/properties`, `/properties/[slug]`, `/search`, `/neighborhoods`, `/neighborhoods/[slug]`, `/sell`, `/buy`, `/about`, `/contact`, `/insights`, `/insights/[slug]`, `/home-valuation`, plus dynamic `sitemap.xml`, `robots.txt`, and a styled 404

One sample listing (`sample: true` in `lib/data.ts`) demonstrates the private-exclusive template — replace or delete it.

## IDX — Showcase IDX (chosen)

The `/search` page renders Showcase IDX once configured (`components/idx-embed.tsx`):

1. Sign up at showcaseidx.com and connect ARMLS (they handle MLS paperwork; expect a few days for feed approval).
2. In Showcase IDX, create a Search page and copy the embed script URL.
3. Set `NEXT_PUBLIC_IDX_SCRIPT_URL=<that URL>` in `.env.local` locally and in Vercel → Settings → Environment Variables.

Until set, a styled placeholder renders. Compliance (attribution, disclaimers, refresh rules) is handled by Showcase IDX; site-level disclaimers are already in the footer and `/search`.

## CRM — Follow Up Boss (chosen)

All forms POST to `/api/lead`, which creates a lead via the FUB Events API (source: jcluxuryresidential.com, tag: "Website Lead") so your action plans and lead-flow rules fire. Setup:

1. In Follow Up Boss: Admin → API → Create API Key.
2. Set `FUB_API_KEY=<key>` in `.env.local` and in Vercel env vars.

If the key is missing or FUB errors, forms gracefully fall back to opening a pre-filled email to jordan@jcluxuryresidential.com.

## Deploying to Vercel

1. Create a free GitHub account and a Vercel account (vercel.com → sign up with GitHub). These must be created by you.
2. Push this folder to a new GitHub repo (Claude can do this for you once the repo exists).
3. In Vercel: Add New Project → import the repo → Framework preset: Next.js → add the two env vars above → Deploy.
4. Test everything on the free `*.vercel.app` URL: forms land in FUB, IDX search loads, all pages render.
5. Cutover: in Vercel → Domains, add jcluxuryresidential.com, then update the DNS records at your registrar as Vercel instructs. The 301 redirects in `next.config.mjs` preserve your existing Google rankings.
6. After cutover: verify the domain in Google Search Console and submit `/sitemap.xml`.

## SEO / AEO already built in

Per-page titles, meta descriptions, and canonical URLs; Open Graph + Twitter cards; JSON-LD on every page type; FAQ schema on sell/buy/neighborhood/valuation pages; Key-Takeaways answer boxes on articles; breadcrumbs; dynamic sitemap and robots; semantic HTML, skip-link, alt text, keyboard-accessible menus.

After launch: verify domain in Google Search Console, submit `sitemap.xml`, validate JSON-LD at validator.schema.org, and keep publishing `/insights` articles (each adds Article + FAQ surface for AI search).

## Launch checklist

- [ ] Replace sample listing in `lib/data.ts`; confirm prices/statuses are current
- [ ] Migrate images to your own hosting or Vercel (currently hot-linked to existing CDNs — fine for staging, not for launch)
- [ ] Choose IDX path and wire `/search`
- [ ] Wire forms to CRM; test lead delivery end-to-end
- [ ] Add GA4 + Search Console + GTM
- [ ] Add privacy policy / terms page (link in footer)
- [ ] Confirm brokerage/MLS compliance review (Compass marketing team)
- [ ] Lighthouse pass: target 90+ performance, 95+ SEO
- [ ] 301-redirect old URLs (`/properties/sale`, `/home-search/listings`, etc.) in `next.config.mjs`
