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
import { generateMetaTags } from './core/meta-tags';
import { generateStructuredData } from './core/structured-data';
import { generateRobotsTxt, generateSitemap } from './core/seo-files';
export class SEOToolkit {
    constructor(config = {}) {
        this.config = config;
    }
    /**
     * Update SEO configuration
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Generate all meta tags as HTML string
     */
    generateMetaTagsHTML() {
        return generateMetaTags(this.config).join('\n');
    }
    /**
     * Generate structured data as HTML script tags
     */
    generateStructuredDataHTML() {
        if (!this.config.structuredData || this.config.structuredData.length === 0) {
            return '';
        }
        return generateStructuredData(this.config.structuredData);
    }
    /**
     * Generate complete HTML head content
     */
    generateHeadHTML() {
        const parts = [];
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
    generateRobotsTxt(options = {}) {
        return generateRobotsTxt(options);
    }
    /**
     * Generate XML sitemap
     */
    generateSitemap(urls) {
        return generateSitemap(urls);
    }
}
// Default export for convenience
export default SEOToolkit;
