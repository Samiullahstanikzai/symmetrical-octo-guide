/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Strip HTML tags from text
 */
export function stripHtml(html: string): string {
  if (typeof document !== 'undefined') {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
  
  // Fallback for Node.js environment
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Generate current ISO date string
 */
export function getCurrentISODate(): string {
  return new Date().toISOString();
}

/**
 * Format date for sitemaps
 */
export function formatSitemapDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Clean and validate meta tag content
 */
export function cleanMetaContent(content: string): string {
  return stripHtml(content)
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate random ID
 */
export function generateId(prefix: string = ''): string {
  const id = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Merge objects deeply
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: any[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Check if value is an object
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Convert price to number (handles various formats)
 */
export function parsePrice(price: string | number): number {
  if (typeof price === 'number') {
    return price;
  }
  
  // Remove currency symbols and commas, then parse
  const cleanPrice = price.replace(/[^0-9.-]/g, '');
  return parseFloat(cleanPrice) || 0;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}