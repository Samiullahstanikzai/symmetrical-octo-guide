import { SEOToolkit } from '../index';
import { SEOConfig } from '../core/types';

describe('SEOToolkit', () => {
  test('initializes with empty config', () => {
    const toolkit = new SEOToolkit();
    const config = toolkit.getConfig();
    
    expect(config).toEqual({});
  });

  test('initializes with provided config', () => {
    const initialConfig: SEOConfig = {
      title: 'Test Site',
      description: 'Test Description',
    };
    
    const toolkit = new SEOToolkit(initialConfig);
    const config = toolkit.getConfig();
    
    expect(config.title).toBe('Test Site');
    expect(config.description).toBe('Test Description');
  });

  test('updates config', () => {
    const toolkit = new SEOToolkit();
    
    toolkit.updateConfig({
      title: 'Updated Title',
      description: 'Updated Description',
    });
    
    const config = toolkit.getConfig();
    expect(config.title).toBe('Updated Title');
    expect(config.description).toBe('Updated Description');
  });

  test('generates meta tags HTML', () => {
    const toolkit = new SEOToolkit({
      title: 'Test Page',
      description: 'Test Description',
      keywords: ['test', 'seo'],
    });
    
    const html = toolkit.generateMetaTagsHTML();
    
    expect(html).toContain('<title>Test Page</title>');
    expect(html).toContain('<meta name="description" content="Test Description">');
    expect(html).toContain('<meta name="keywords" content="test, seo">');
  });

  test('generates structured data HTML', () => {
    const toolkit = new SEOToolkit({
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Test Org',
        },
      ],
    });
    
    const html = toolkit.generateStructuredDataHTML();
    
    expect(html).toContain('<script type="application/ld+json">');
    expect(html).toContain('"@type": "Organization"');
    expect(html).toContain('"name": "Test Org"');
  });

  test('generates complete head HTML', () => {
    const toolkit = new SEOToolkit({
      title: 'Test Page',
      description: 'Test Description',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Test Site',
        },
      ],
    });
    
    const html = toolkit.generateHeadHTML();
    
    expect(html).toContain('<title>Test Page</title>');
    expect(html).toContain('<meta name="description" content="Test Description">');
    expect(html).toContain('<script type="application/ld+json">');
    expect(html).toContain('"@type": "WebSite"');
  });

  test('generates robots.txt', () => {
    const toolkit = new SEOToolkit();
    
    const robotsTxt = toolkit.generateRobotsTxt({
      userAgent: '*',
      disallow: ['/admin', '/private'],
      sitemap: 'https://example.com/sitemap.xml',
    });
    
    expect(robotsTxt).toContain('User-agent: *');
    expect(robotsTxt).toContain('Disallow: /admin');
    expect(robotsTxt).toContain('Disallow: /private');
    expect(robotsTxt).toContain('Sitemap: https://example.com/sitemap.xml');
  });

  test('generates sitemap', () => {
    const toolkit = new SEOToolkit();
    
    const urls = [
      {
        loc: 'https://example.com/',
        lastmod: '2023-01-01',
        changefreq: 'daily' as const,
        priority: 1.0,
      },
      {
        loc: 'https://example.com/about',
        lastmod: '2023-01-01',
        changefreq: 'monthly' as const,
        priority: 0.8,
      },
    ];
    
    const sitemap = toolkit.generateSitemap(urls);
    
    expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(sitemap).toContain('<loc>https://example.com/</loc>');
    expect(sitemap).toContain('<lastmod>2023-01-01</lastmod>');
    expect(sitemap).toContain('<changefreq>daily</changefreq>');
    expect(sitemap).toContain('<priority>1</priority>');
    expect(sitemap).toContain('<loc>https://example.com/about</loc>');
    expect(sitemap).toContain('<changefreq>monthly</changefreq>');
    expect(sitemap).toContain('<priority>0.8</priority>');
  });
});