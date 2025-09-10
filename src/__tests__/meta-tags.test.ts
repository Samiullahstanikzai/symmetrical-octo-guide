import { generateMetaTags, generateOpenGraphTags, generateTwitterCardTags } from '../core/meta-tags';
import { SEOConfig, OpenGraphData, TwitterCardData } from '../core/types';

describe('Meta Tags Generation', () => {
  test('generates basic meta tags', () => {
    const config: SEOConfig = {
      title: 'Test Page',
      description: 'This is a test page',
      keywords: ['test', 'seo', 'meta'],
      canonical: 'https://example.com/test',
      robots: 'index,follow',
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1',
    };

    const tags = generateMetaTags(config);

    expect(tags).toContain('<meta charset="UTF-8">');
    expect(tags).toContain('<meta name="viewport" content="width=device-width, initial-scale=1">');
    expect(tags).toContain('<title>Test Page</title>');
    expect(tags).toContain('<meta name="description" content="This is a test page">');
    expect(tags).toContain('<meta name="keywords" content="test, seo, meta">');
    expect(tags).toContain('<meta name="robots" content="index,follow">');
    expect(tags).toContain('<link rel="canonical" href="https://example.com/test">');
  });

  test('generates Open Graph tags', () => {
    const ogData: OpenGraphData = {
      title: 'OG Title',
      description: 'OG Description',
      type: 'website',
      url: 'https://example.com',
      image: 'https://example.com/image.jpg',
      siteName: 'Example Site',
      locale: 'en_US',
    };

    const tags = generateOpenGraphTags(ogData);

    expect(tags).toContain('<meta property="og:title" content="OG Title">');
    expect(tags).toContain('<meta property="og:description" content="OG Description">');
    expect(tags).toContain('<meta property="og:type" content="website">');
    expect(tags).toContain('<meta property="og:url" content="https://example.com">');
    expect(tags).toContain('<meta property="og:image" content="https://example.com/image.jpg">');
    expect(tags).toContain('<meta property="og:site_name" content="Example Site">');
    expect(tags).toContain('<meta property="og:locale" content="en_US">');
  });

  test('generates Twitter Card tags', () => {
    const twitterData: TwitterCardData = {
      card: 'summary_large_image',
      site: '@example',
      creator: '@author',
      title: 'Twitter Title',
      description: 'Twitter Description',
      image: 'https://example.com/twitter-image.jpg',
    };

    const tags = generateTwitterCardTags(twitterData);

    expect(tags).toContain('<meta name="twitter:card" content="summary_large_image">');
    expect(tags).toContain('<meta name="twitter:site" content="@example">');
    expect(tags).toContain('<meta name="twitter:creator" content="@author">');
    expect(tags).toContain('<meta name="twitter:title" content="Twitter Title">');
    expect(tags).toContain('<meta name="twitter:description" content="Twitter Description">');
    expect(tags).toContain('<meta name="twitter:image" content="https://example.com/twitter-image.jpg">');
  });

  test('escapes HTML in meta content', () => {
    const config: SEOConfig = {
      title: 'Test & "Quotes" <script>',
      description: 'Description with <b>HTML</b> & entities',
    };

    const tags = generateMetaTags(config);
    
    // Should escape HTML entities
    expect(tags.some(tag => tag.includes('&amp;'))).toBe(true);
    expect(tags.some(tag => tag.includes('&quot;'))).toBe(true);
    expect(tags.some(tag => tag.includes('&lt;'))).toBe(true);
    expect(tags.some(tag => tag.includes('&gt;'))).toBe(true);
  });
});