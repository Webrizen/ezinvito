export default function sitemap() {
  return [
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: '/about',
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: '/auth/sign-in',
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: '/auth/sign-up',
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: '/privacy-policy',
      changefreq: 'yearly',
      priority: 0.5,
    },
    {
      url: '/pricing',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      url: '/showcase',
      changefreq: 'monthly',
      priority: 0.8,
    },
  ];
}