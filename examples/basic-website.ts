import { SEOToolkit } from '../src/index';

// Basic website SEO setup
const basicSEO = new SEOToolkit({
  title: 'My Amazing Website',
  description: 'The best website for amazing content and services',
  keywords: ['amazing', 'website', 'services', 'content'],
  canonical: 'https://mywebsite.com',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index,follow',
  openGraph: {
    type: 'website',
    title: 'My Amazing Website',
    description: 'The best website for amazing content and services',
    url: 'https://mywebsite.com',
    image: 'https://mywebsite.com/og-image.jpg',
    siteName: 'My Website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mywebsite',
    creator: '@webmaster',
    title: 'My Amazing Website',
    description: 'The best website for amazing content and services',
    image: 'https://mywebsite.com/twitter-image.jpg',
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'My Amazing Website',
      url: 'https://mywebsite.com',
      description: 'The best website for amazing content and services',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://mywebsite.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'My Amazing Company',
      url: 'https://mywebsite.com',
      logo: 'https://mywebsite.com/logo.png',
      description: 'We create amazing websites and services',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-234-567-8900',
        contactType: 'customer service',
        email: 'contact@mywebsite.com',
      },
      sameAs: [
        'https://twitter.com/mywebsite',
        'https://facebook.com/mywebsite',
        'https://linkedin.com/company/mywebsite',
      ],
    },
  ],
});

// Generate complete HTML head content
console.log('=== Complete HTML Head Content ===');
console.log(basicSEO.generateHeadHTML());

// Generate robots.txt
console.log('\n=== Robots.txt ===');
const robotsTxt = basicSEO.generateRobotsTxt({
  userAgent: '*',
  allow: ['/'],
  disallow: ['/admin', '/private', '/temp'],
  sitemap: 'https://mywebsite.com/sitemap.xml',
  crawlDelay: 1,
});
console.log(robotsTxt);

// Generate XML sitemap
console.log('\n=== XML Sitemap ===');
const sitemap = basicSEO.generateSitemap([
  {
    loc: 'https://mywebsite.com/',
    lastmod: '2023-12-01',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    loc: 'https://mywebsite.com/about',
    lastmod: '2023-11-15',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    loc: 'https://mywebsite.com/services',
    lastmod: '2023-11-20',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    loc: 'https://mywebsite.com/contact',
    lastmod: '2023-10-01',
    changefreq: 'yearly',
    priority: 0.5,
  },
]);
console.log(sitemap);