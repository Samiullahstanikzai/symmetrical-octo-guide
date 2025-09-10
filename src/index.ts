// Core SEO functionality
export * from './core/types';
export * from './core/meta-tags';
export * from './core/structured-data';
export * from './core/seo-files';

// Shopify-specific functionality
export * from './shopify/types';
export * from './shopify/schema';
export * from './shopify/liquid-helpers';

// Utilities
export * from './utils/seo-audit';
export * from './utils/helpers';

// Main SEO class for easy usage
import { SEOConfig } from './core/types';
import { generateMetaTags } from './core/meta-tags';
import { generateStructuredData } from './core/structured-data';
import { generateRobotsTxt, generateSitemap } from './core/seo-files';

export class SEOToolkit {
  private config: SEOConfig;

  constructor(config: SEOConfig = {}) {
    this.config = config;
  }

  /**
   * Update SEO configuration
   */
  updateConfig(config: Partial<SEOConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Get current configuration
   */
  getConfig(): SEOConfig {
    return { ...this.config };
  }

  /**
   * Generate all meta tags as HTML string
   */
  generateMetaTagsHTML(): string {
    return generateMetaTags(this.config).join('\n');
  }

  /**
   * Generate structured data as HTML script tags
   */
  generateStructuredDataHTML(): string {
    if (!this.config.structuredData || this.config.structuredData.length === 0) {
      return '';
    }
    return generateStructuredData(this.config.structuredData);
  }

  /**
   * Generate complete HTML head content
   */
  generateHeadHTML(): string {
    const parts: string[] = [];
    
    // Meta tags
    const metaTags = this.generateMetaTagsHTML();
    if (metaTags) {
      parts.push(metaTags);
    }

    // Structured data
    const structuredData = this.generateStructuredDataHTML();
    if (structuredData) {
      parts.push(structuredData);
    }

    return parts.join('\n\n');
  }

  /**
   * Generate robots.txt content
   */
  generateRobotsTxt(options: {
    userAgent?: string;
    allow?: string[];
    disallow?: string[];
    sitemap?: string;
    crawlDelay?: number;
    host?: string;
  } = {}): string {
    return generateRobotsTxt(options);
  }

  /**
   * Generate XML sitemap
   */
  generateSitemap(urls: Array<{
    loc: string;
    lastmod?: string;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  }>): string {
    return generateSitemap(urls);
  }
}

// Default export for convenience
export default SEOToolkit;