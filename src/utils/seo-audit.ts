/**
 * SEO audit checklist
 */
export interface SEOAuditItem {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  checkFunction?: (url: string) => Promise<boolean>;
}

export const SEO_AUDIT_CHECKLIST: SEOAuditItem[] = [
  // Meta Tags
  {
    id: 'title-tag',
    category: 'Meta Tags',
    title: 'Title Tag Present',
    description: 'Page has a unique, descriptive title tag under 60 characters',
    priority: 'high',
  },
  {
    id: 'meta-description',
    category: 'Meta Tags',
    title: 'Meta Description Present',
    description: 'Page has a unique meta description under 160 characters',
    priority: 'high',
  },
  {
    id: 'meta-keywords',
    category: 'Meta Tags',
    title: 'Relevant Keywords',
    description: 'Page includes relevant keywords in meta tags and content',
    priority: 'medium',
  },
  
  // Open Graph
  {
    id: 'og-title',
    category: 'Open Graph',
    title: 'Open Graph Title',
    description: 'Page has og:title meta tag for social media sharing',
    priority: 'medium',
  },
  {
    id: 'og-description',
    category: 'Open Graph',
    title: 'Open Graph Description',
    description: 'Page has og:description meta tag',
    priority: 'medium',
  },
  {
    id: 'og-image',
    category: 'Open Graph',
    title: 'Open Graph Image',
    description: 'Page has og:image meta tag with appropriate image',
    priority: 'medium',
  },

  // Structured Data
  {
    id: 'structured-data',
    category: 'Structured Data',
    title: 'Schema.org Markup',
    description: 'Page includes relevant structured data markup',
    priority: 'high',
  },

  // Technical SEO
  {
    id: 'canonical-url',
    category: 'Technical SEO',
    title: 'Canonical URL',
    description: 'Page has a canonical URL to prevent duplicate content',
    priority: 'high',
  },
  {
    id: 'robots-meta',
    category: 'Technical SEO',
    title: 'Robots Meta Tag',
    description: 'Page has appropriate robots meta tag',
    priority: 'medium',
  },
  {
    id: 'ssl-certificate',
    category: 'Technical SEO',
    title: 'SSL Certificate',
    description: 'Website uses HTTPS for secure connections',
    priority: 'high',
  },
  {
    id: 'mobile-friendly',
    category: 'Technical SEO',
    title: 'Mobile Friendly',
    description: 'Website is responsive and mobile-friendly',
    priority: 'high',
  },
  {
    id: 'page-speed',
    category: 'Technical SEO',
    title: 'Page Speed',
    description: 'Page loads quickly (under 3 seconds)',
    priority: 'high',
  },

  // Content
  {
    id: 'heading-structure',
    category: 'Content',
    title: 'Proper Heading Structure',
    description: 'Page uses H1, H2, H3 tags in proper hierarchy',
    priority: 'medium',
  },
  {
    id: 'alt-text',
    category: 'Content',
    title: 'Image Alt Text',
    description: 'All images have descriptive alt text',
    priority: 'medium',
  },
  {
    id: 'internal-links',
    category: 'Content',
    title: 'Internal Linking',
    description: 'Page has relevant internal links to other pages',
    priority: 'medium',
  },

  // Shopify Specific
  {
    id: 'product-schema',
    category: 'Shopify',
    title: 'Product Schema Markup',
    description: 'Product pages include structured data for products',
    priority: 'high',
  },
  {
    id: 'collection-seo',
    category: 'Shopify',
    title: 'Collection SEO',
    description: 'Collection pages are properly optimized',
    priority: 'medium',
  },
  {
    id: 'shopify-sitemap',
    category: 'Shopify',
    title: 'Sitemap Submission',
    description: 'Shopify sitemap is submitted to search engines',
    priority: 'medium',
  },
];

/**
 * Get audit items by category
 */
export function getAuditItemsByCategory(category: string): SEOAuditItem[] {
  return SEO_AUDIT_CHECKLIST.filter(item => item.category === category);
}

/**
 * Get audit items by priority
 */
export function getAuditItemsByPriority(priority: 'high' | 'medium' | 'low'): SEOAuditItem[] {
  return SEO_AUDIT_CHECKLIST.filter(item => item.priority === priority);
}

/**
 * Get all categories
 */
export function getAuditCategories(): string[] {
  return [...new Set(SEO_AUDIT_CHECKLIST.map(item => item.category))];
}

/**
 * Generate SEO audit report
 */
export function generateAuditReport(): string {
  const categories = getAuditCategories();
  let report = '# SEO Audit Checklist\n\n';
  
  categories.forEach(category => {
    report += `## ${category}\n\n`;
    const items = getAuditItemsByCategory(category);
    
    items.forEach(item => {
      const priority = item.priority.toUpperCase();
      report += `- [ ] **[${priority}]** ${item.title}\n`;
      report += `  - ${item.description}\n\n`;
    });
  });

  return report;
}