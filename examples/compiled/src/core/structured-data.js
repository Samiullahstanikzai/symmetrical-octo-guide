/**
 * Generate JSON-LD structured data script tag
 */
export function generateStructuredData(data) {
    const structuredData = Array.isArray(data) ? data : [data];
    return structuredData
        .map(item => `<script type="application/ld+json">${JSON.stringify(item, null, 2)}</script>`)
        .join('\n');
}
/**
 * Create Organization structured data
 */
export function createOrganizationSchema(org) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: org.name,
        url: org.url,
    };
    if (org.logo) {
        schema.logo = org.logo;
    }
    if (org.description) {
        schema.description = org.description;
    }
    if (org.contactPoint) {
        schema.contactPoint = {
            '@type': 'ContactPoint',
            ...org.contactPoint,
        };
    }
    if (org.sameAs && org.sameAs.length > 0) {
        schema.sameAs = org.sameAs;
    }
    return schema;
}
/**
 * Create WebSite structured data with search box
 */
export function createWebSiteSchema(site) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
    };
    if (site.description) {
        schema.description = site.description;
    }
    if (site.searchUrl && site.searchInputName) {
        schema.potentialAction = {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${site.searchUrl}?${site.searchInputName}={search_term_string}`,
            },
            'query-input': `required name=${site.searchInputName}`,
        };
    }
    return schema;
}
/**
 * Create Article structured data
 */
export function createArticleSchema(article) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        description: article.description,
        author: {
            '@type': 'Person',
            name: article.author,
        },
        datePublished: article.datePublished,
    };
    if (article.dateModified) {
        schema.dateModified = article.dateModified;
    }
    if (article.image) {
        schema.image = article.image;
    }
    if (article.url) {
        schema.url = article.url;
    }
    if (article.publisher) {
        schema.publisher = {
            '@type': 'Organization',
            name: article.publisher.name,
            ...(article.publisher.logo && { logo: article.publisher.logo }),
        };
    }
    return schema;
}
/**
 * Create BreadcrumbList structured data
 */
export function createBreadcrumbSchema(breadcrumbs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
