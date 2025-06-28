export default function sitemap() {
  return [
    {
      url: 'https://ezinvito.webrizen.com',
      lastModified: new Date(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://ezinvito.webrizen.com/about',
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://ezinvito.webrizen.com/auth/sign-in',
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://ezinvito.webrizen.com/auth/sign-up',
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://ezinvito.webrizen.com/privacy-policy',
      lastModified: new Date(),
      changefreq: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://ezinvito.webrizen.com/pricing',
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://ezinvito.webrizen.com/showcase',
      lastModified: new Date(),
      changefreq: 'monthly',
      priority: 0.8,
    },
  ];
}