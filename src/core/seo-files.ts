/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(config: {
  userAgent?: string;
  allow?: string[];
  disallow?: string[];
  sitemap?: string;
  crawlDelay?: number;
  host?: string;
}): string {
  const lines: string[] = [];
  
  const userAgent = config.userAgent || '*';
  lines.push(`User-agent: ${userAgent}`);

  if (config.allow && config.allow.length > 0) {
    config.allow.forEach(path => {
      lines.push(`Allow: ${path}`);
    });
  }

  if (config.disallow && config.disallow.length > 0) {
    config.disallow.forEach(path => {
      lines.push(`Disallow: ${path}`);
    });
  }

  if (config.crawlDelay) {
    lines.push(`Crawl-delay: ${config.crawlDelay}`);
  }

  if (config.host) {
    lines.push(`Host: ${config.host}`);
  }

  if (config.sitemap) {
    lines.push('');
    lines.push(`Sitemap: ${config.sitemap}`);
  }

  return lines.join('\n');
}

/**
 * Generate XML sitemap
 */
export function generateSitemap(urls: Array<{
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}>): string {
  const urlElements = urls.map(url => {
    let urlElement = `  <url>\n    <loc>${escapeXml(url.loc)}</loc>`;
    
    if (url.lastmod) {
      urlElement += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      urlElement += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlElement += `\n    <priority>${url.priority}</priority>`;
    }
    
    urlElement += '\n  </url>';
    return urlElement;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

/**
 * Generate sitemap index for multiple sitemaps
 */
export function generateSitemapIndex(sitemaps: Array<{
  loc: string;
  lastmod?: string;
}>): string {
  const sitemapElements = sitemaps.map(sitemap => {
    let element = `  <sitemap>\n    <loc>${escapeXml(sitemap.loc)}</loc>`;
    
    if (sitemap.lastmod) {
      element += `\n    <lastmod>${sitemap.lastmod}</lastmod>`;
    }
    
    element += '\n  </sitemap>';
    return element;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}