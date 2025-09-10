# Symmetrical Octo Guide

A comprehensive SEO and website discoverability toolkit that works anywhere, with special support for Shopify stores.

## 🚀 Features

- **Meta Tags Generation**: Comprehensive HTML meta tags including Open Graph and Twitter Cards
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Shopify Integration**: Specialized tools for Shopify stores including Liquid template helpers
- **SEO Files**: Generate robots.txt and XML sitemaps
- **SEO Audit**: Built-in checklist and audit tools
- **TypeScript Support**: Full TypeScript definitions included
- **Browser & Node.js**: Works in both environments

## 📦 Installation

```bash
npm install symmetrical-octo-guide
```

## 🛠️ Quick Start

### Basic Usage

```typescript
import { SEOToolkit } from 'symmetrical-octo-guide';

const seo = new SEOToolkit({
  title: 'My Awesome Website',
  description: 'The best website for awesome things',
  keywords: ['awesome', 'website', 'cool'],
  openGraph: {
    type: 'website',
    image: 'https://mysite.com/og-image.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mysite',
  },
});

// Generate meta tags
const metaTags = seo.generateMetaTagsHTML();
console.log(metaTags);
```

### Meta Tags Generation

```typescript
import { generateMetaTags } from 'symmetrical-octo-guide';

const config = {
  title: 'Product Page - My Store',
  description: 'Amazing product that will change your life',
  canonical: 'https://mystore.com/products/amazing-product',
  openGraph: {
    type: 'product',
    title: 'Amazing Product',
    description: 'Product description',
    image: 'https://mystore.com/product-image.jpg',
    url: 'https://mystore.com/products/amazing-product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amazing Product',
    description: 'Product description',
    image: 'https://mystore.com/product-image.jpg',
  },
};

const tags = generateMetaTags(config);
```

### Structured Data

```typescript
import { 
  createOrganizationSchema, 
  createProductSchema, 
  generateStructuredData 
} from 'symmetrical-octo-guide';

// Organization schema
const orgSchema = createOrganizationSchema({
  name: 'My Company',
  url: 'https://mycompany.com',
  logo: 'https://mycompany.com/logo.png',
  contactPoint: {
    telephone: '+1-234-567-8900',
    contactType: 'customer service',
  },
});

// Generate JSON-LD script tag
const structuredDataHTML = generateStructuredData(orgSchema);
```

### SEO Files

```typescript
import { generateRobotsTxt, generateSitemap } from 'symmetrical-octo-guide';

// Generate robots.txt
const robotsTxt = generateRobotsTxt({
  disallow: ['/admin', '/private'],
  sitemap: 'https://mysite.com/sitemap.xml',
});

// Generate XML sitemap
const sitemap = generateSitemap([
  {
    loc: 'https://mysite.com/',
    lastmod: '2023-01-01',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    loc: 'https://mysite.com/about',
    changefreq: 'monthly',
    priority: 0.8,
  },
]);
```

## 🛍️ Shopify Integration

### Product Schema

```typescript
import { generateProductSchema } from 'symmetrical-octo-guide';

const product = {
  id: 'prod_123',
  title: 'Amazing T-Shirt',
  description: 'The most comfortable t-shirt ever made',
  price: 29.99,
  currency: 'USD',
  vendor: 'My Brand',
  productType: 'Apparel',
  tags: ['clothing', 'tshirt', 'comfortable'],
  images: ['https://store.com/tshirt.jpg'],
  url: 'https://store.com/products/amazing-tshirt',
  availability: 'InStock',
};

const store = {
  name: 'My Store',
  url: 'https://store.com',
  currency: 'USD',
};

const productSchema = generateProductSchema(product, store);
```

### Shopify Liquid Templates

```typescript
import { ShopifyLiquidHelpers } from 'symmetrical-octo-guide';

// Get Liquid template for product meta tags
const productMetaTemplate = ShopifyLiquidHelpers.generateProductMetaTemplate();

// Get Liquid template for structured data
const structuredDataTemplate = ShopifyLiquidHelpers.generateProductStructuredDataTemplate();
```

Use these templates in your Shopify theme's `product.liquid` or `theme.liquid` files:

```liquid
<!-- In your theme.liquid head section -->
{% if template contains 'product' %}
  <!-- Product meta tags -->
  <!-- Paste the generated template here -->
{% endif %}
```

### Collection Pages

```typescript
import { generateCollectionSchema, generateCollectionSEOConfig } from 'symmetrical-octo-guide';

const collection = {
  id: 'col_123',
  title: 'Summer Collection',
  description: 'Our best summer products',
  url: 'https://store.com/collections/summer',
  products: [/* product objects */],
};

const collectionSchema = generateCollectionSchema(collection, store);
const seoConfig = generateCollectionSEOConfig(collection, store);
```

## 🔍 SEO Audit

```typescript
import { SEO_AUDIT_CHECKLIST, generateAuditReport, getAuditItemsByPriority } from 'symmetrical-octo-guide';

// Get high priority items
const highPriorityItems = getAuditItemsByPriority('high');

// Generate audit report
const auditReport = generateAuditReport();
console.log(auditReport);
```

## 🌐 Browser Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/symmetrical-octo-guide/dist/index.js"></script>
  <script>
    const seo = new SymmetricalOctoGuide.SEOToolkit({
      title: 'My Website',
      description: 'Website description',
    });
    
    document.head.innerHTML += seo.generateMetaTagsHTML();
  </script>
</head>
<body>
  <!-- Your content -->
</body>
</html>
```

## 📚 API Reference

### SEOToolkit Class

Main class for SEO management:

- `constructor(config?: SEOConfig)` - Initialize with SEO configuration
- `updateConfig(config: Partial<SEOConfig>)` - Update configuration
- `generateMetaTagsHTML()` - Generate meta tags HTML
- `generateStructuredDataHTML()` - Generate structured data HTML
- `generateHeadHTML()` - Generate complete head content
- `generateRobotsTxt(options)` - Generate robots.txt
- `generateSitemap(urls)` - Generate XML sitemap

### Core Functions

- `generateMetaTags(config: SEOConfig)` - Generate meta tags array
- `generateOpenGraphTags(og: OpenGraphData)` - Generate OG tags
- `generateTwitterCardTags(twitter: TwitterCardData)` - Generate Twitter tags
- `generateStructuredData(data: StructuredData)` - Generate JSON-LD scripts
- `generateRobotsTxt(config)` - Generate robots.txt content
- `generateSitemap(urls)` - Generate XML sitemap

### Shopify Functions

- `generateProductSchema(product, store)` - Product structured data
- `generateCollectionSchema(collection, store)` - Collection structured data
- `generateStoreSchema(store)` - Store/Organization structured data
- `generateProductSEOConfig(product, store)` - Product SEO configuration
- `generateCollectionSEOConfig(collection, store)` - Collection SEO configuration

### Utility Functions

- `slugify(text: string)` - Convert text to URL-friendly slug
- `truncateText(text: string, maxLength: number)` - Truncate text with ellipsis
- `stripHtml(html: string)` - Remove HTML tags from text
- `isValidUrl(url: string)` - Validate URL format
- `isValidEmail(email: string)` - Validate email format

## 🎯 SEO Best Practices

### Meta Tags
- Keep titles under 60 characters
- Keep descriptions under 160 characters
- Use unique titles and descriptions for each page
- Include relevant keywords naturally

### Open Graph
- Use 1200x630px images for best results
- Provide fallback images
- Use descriptive titles and descriptions

### Structured Data
- Use appropriate schema types for content
- Test with Google's Rich Results Test
- Keep data accurate and up-to-date

### Shopify Specific
- Optimize product titles and descriptions
- Use high-quality product images
- Implement breadcrumb navigation
- Create SEO-friendly URLs

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/Samiullahstanikzai/symmetrical-octo-guide.git

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run in development mode
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web standards in mind
- Inspired by SEO best practices
- Shopify community feedback and requirements

---

**Made with ❤️ for better web discoverability**
