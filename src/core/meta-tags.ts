import { SEOConfig, OpenGraphData, TwitterCardData } from './types';

/**
 * Generate HTML meta tags from SEO configuration
 */
export function generateMetaTags(config: SEOConfig): string[] {
  const tags: string[] = [];

  // Basic meta tags
  if (config.charset) {
    tags.push(`<meta charset="${config.charset}">`);
  }

  if (config.viewport) {
    tags.push(`<meta name="viewport" content="${config.viewport}">`);
  }

  if (config.title) {
    tags.push(`<title>${escapeHtml(config.title)}</title>`);
  }

  if (config.description) {
    tags.push(`<meta name="description" content="${escapeHtml(config.description)}">`);
  }

  if (config.keywords && config.keywords.length > 0) {
    tags.push(`<meta name="keywords" content="${config.keywords.map(k => escapeHtml(k)).join(', ')}">`);
  }

  if (config.robots) {
    tags.push(`<meta name="robots" content="${config.robots}">`);
  }

  if (config.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(config.canonical)}">`);
  }

  // Open Graph tags
  if (config.openGraph) {
    tags.push(...generateOpenGraphTags(config.openGraph));
  }

  // Twitter Card tags
  if (config.twitter) {
    tags.push(...generateTwitterCardTags(config.twitter));
  }

  return tags;
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(og: OpenGraphData): string[] {
  const tags: string[] = [];

  if (og.title) {
    tags.push(`<meta property="og:title" content="${escapeHtml(og.title)}">`);
  }

  if (og.description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(og.description)}">`);
  }

  if (og.type) {
    tags.push(`<meta property="og:type" content="${escapeHtml(og.type)}">`);
  }

  if (og.url) {
    tags.push(`<meta property="og:url" content="${escapeHtml(og.url)}">`);
  }

  if (og.image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(og.image)}">`);
  }

  if (og.siteName) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(og.siteName)}">`);
  }

  if (og.locale) {
    tags.push(`<meta property="og:locale" content="${escapeHtml(og.locale)}">`);
  }

  return tags;
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(twitter: TwitterCardData): string[] {
  const tags: string[] = [];

  if (twitter.card) {
    tags.push(`<meta name="twitter:card" content="${twitter.card}">`);
  }

  if (twitter.site) {
    tags.push(`<meta name="twitter:site" content="${escapeHtml(twitter.site)}">`);
  }

  if (twitter.creator) {
    tags.push(`<meta name="twitter:creator" content="${escapeHtml(twitter.creator)}">`);
  }

  if (twitter.title) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(twitter.title)}">`);
  }

  if (twitter.description) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(twitter.description)}">`);
  }

  if (twitter.image) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(twitter.image)}">`);
  }

  return tags;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (div) {
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Fallback for Node.js environment
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}