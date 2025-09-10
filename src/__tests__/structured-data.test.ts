import {
  generateStructuredData,
  createOrganizationSchema,
  createWebSiteSchema,
  createArticleSchema,
  createBreadcrumbSchema,
} from '../core/structured-data';

describe('Structured Data Generation', () => {
  test('generates JSON-LD script tag', () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Test Company',
      url: 'https://example.com',
    };

    const result = generateStructuredData(data);
    
    expect(result).toContain('<script type="application/ld+json">');
    expect(result).toContain('"@context": "https://schema.org"');
    expect(result).toContain('"@type": "Organization"');
    expect(result).toContain('"name": "Test Company"');
    expect(result).toContain('</script>');
  });

  test('generates multiple JSON-LD script tags', () => {
    const data = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Test Company',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Test Website',
      },
    ];

    const result = generateStructuredData(data);
    
    // Should contain two script tags
    const scriptCount = (result.match(/<script type="application\/ld\+json">/g) || []).length;
    expect(scriptCount).toBe(2);
    
    expect(result).toContain('"@type": "Organization"');
    expect(result).toContain('"@type": "WebSite"');
  });

  test('creates Organization schema', () => {
    const orgData = {
      name: 'Example Corp',
      url: 'https://example.com',
      logo: 'https://example.com/logo.png',
      description: 'A test organization',
      contactPoint: {
        telephone: '+1-234-567-8900',
        contactType: 'customer service',
        email: 'contact@example.com',
      },
      sameAs: ['https://twitter.com/example', 'https://facebook.com/example'],
    };

    const schema = createOrganizationSchema(orgData);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('Example Corp');
    expect(schema.url).toBe('https://example.com');
    expect(schema.logo).toBe('https://example.com/logo.png');
    expect(schema.description).toBe('A test organization');
    expect(schema.contactPoint).toEqual({
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'customer service',
      email: 'contact@example.com',
    });
    expect(schema.sameAs).toEqual(['https://twitter.com/example', 'https://facebook.com/example']);
  });

  test('creates WebSite schema with search', () => {
    const siteData = {
      name: 'Example Website',
      url: 'https://example.com',
      description: 'A test website',
      searchUrl: 'https://example.com/search',
      searchInputName: 'q',
    };

    const schema = createWebSiteSchema(siteData);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Example Website');
    expect(schema.url).toBe('https://example.com');
    expect(schema.description).toBe('A test website');
    expect(schema.potentialAction).toEqual({
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://example.com/search?q={search_term_string}',
      },
      'query-input': 'required name=q',
    });
  });

  test('creates Article schema', () => {
    const articleData = {
      headline: 'Test Article',
      description: 'This is a test article',
      author: 'John Doe',
      datePublished: '2023-01-01T00:00:00Z',
      dateModified: '2023-01-02T00:00:00Z',
      image: 'https://example.com/article-image.jpg',
      url: 'https://example.com/articles/test',
      publisher: {
        name: 'Example Publisher',
        logo: 'https://example.com/publisher-logo.png',
      },
    };

    const schema = createArticleSchema(articleData);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Test Article');
    expect(schema.description).toBe('This is a test article');
    expect(schema.author).toEqual({
      '@type': 'Person',
      name: 'John Doe',
    });
    expect(schema.datePublished).toBe('2023-01-01T00:00:00Z');
    expect(schema.dateModified).toBe('2023-01-02T00:00:00Z');
    expect(schema.image).toBe('https://example.com/article-image.jpg');
    expect(schema.url).toBe('https://example.com/articles/test');
    expect(schema.publisher).toEqual({
      '@type': 'Organization',
      name: 'Example Publisher',
      logo: 'https://example.com/publisher-logo.png',
    });
  });

  test('creates Breadcrumb schema', () => {
    const breadcrumbs = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'Products', url: 'https://example.com/products' },
      { name: 'Shoes', url: 'https://example.com/products/shoes' },
    ];

    const schema = createBreadcrumbSchema(breadcrumbs);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    
    expect(schema.itemListElement[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com',
    });
    
    expect(schema.itemListElement[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'Shoes',
      item: 'https://example.com/products/shoes',
    });
  });
});