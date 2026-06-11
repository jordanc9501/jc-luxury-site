/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow remote images from current CDNs (used until media is migrated)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media-production.lp-cdn.com' },
      { protocol: 'https', hostname: 'dlajgvw9htjpb.cloudfront.net' },
    ],
  },
  // 301s from the old Luxury Presence URL structure (SEO preservation)
  async redirects() {
    return [
      { source: '/properties/sale', destination: '/properties', permanent: true },
      { source: '/properties/sold', destination: '/properties', permanent: true },
      { source: '/home-search/listings', destination: '/search', permanent: true },
      { source: '/home-search/account', destination: '/search', permanent: true },
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/blog/:slug', destination: '/insights', permanent: true },
      { source: '/testimonials', destination: '/about', permanent: true },
      { source: '/market-exclusives', destination: '/properties', permanent: true },
      { source: '/compass-concierge', destination: '/sell', permanent: true },
    ];
  },
};

export default nextConfig;
