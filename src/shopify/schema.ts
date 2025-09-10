import { StructuredData } from '../core/types';
import { ShopifyProduct, ShopifyCollection, ShopifyStore } from './types';

/**
 * Generate Product structured data for Shopify products
 */
export function generateProductSchema(product: ShopifyProduct, store: ShopifyStore): StructuredData {
  const offers: any = {
    '@type': 'Offer',
    price: product.price.toString(),
    priceCurrency: product.currency,
    availability: `https://schema.org/${product.availability}`,
    url: product.url,
    seller: {
      '@type': 'Organization',
      name: store.name,
    },
  };

  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    offers.priceSpecification = {
      '@type': 'UnitPriceSpecification',
      price: product.price.toString(),
      priceCurrency: product.currency,
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: '1',
      },
    };
  }

  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    url: product.url,
    brand: {
      '@type': 'Brand',
      name: product.brand || product.vendor,
    },
    category: product.productType,
    offers: offers,
  };

  if (product.sku) {
    schema.sku = product.sku;
  }

  if (product.barcode) {
    schema.gtin = product.barcode;
  }

  if (product.condition) {
    schema.itemCondition = `https://schema.org/${product.condition}`;
  }

  // Add aggregateRating if available (placeholder for reviews integration)
  // schema.aggregateRating = {
  //   '@type': 'AggregateRating',
  //   ratingValue: '4.5',
  //   reviewCount: '24'
  // };

  return schema;
}

/**
 * Generate CollectionPage structured data for Shopify collections
 */
export function generateCollectionSchema(collection: ShopifyCollection, store: ShopifyStore): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    url: collection.url,
    mainEntity: {
      '@type': 'ItemList',
      name: collection.title,
      description: collection.description,
      numberOfItems: collection.products.length,
      itemListElement: collection.products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.title,
          url: product.url,
          image: product.images[0] || '',
          offers: {
            '@type': 'Offer',
            price: product.price.toString(),
            priceCurrency: product.currency,
            availability: `https://schema.org/${product.availability}`,
          },
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: store.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Collections',
          item: `${store.url}/collections`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: collection.title,
          item: collection.url,
        },
      ],
    },
  };

  if (collection.image) {
    schema.image = collection.image;
  }

  return schema;
}

/**
 * Generate Store/Organization structured data
 */
export function generateStoreSchema(store: ShopifyStore): StructuredData {
  const schema: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: store.name,
    url: store.url,
  };

  if (store.description) {
    schema.description = store.description;
  }

  if (store.logo) {
    schema.logo = store.logo;
  }

  if (store.contactInfo) {
    const contact = store.contactInfo;
    
    if (contact.email || contact.phone) {
      schema.contactPoint = {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        ...(contact.email && { email: contact.email }),
        ...(contact.phone && { telephone: contact.phone }),
      };
    }

    if (contact.address) {
      schema.address = {
        '@type': 'PostalAddress',
        streetAddress: contact.address.streetAddress,
        addressLocality: contact.address.addressLocality,
        addressRegion: contact.address.addressRegion,
        postalCode: contact.address.postalCode,
        addressCountry: contact.address.addressCountry,
      };
    }
  }

  return schema;
}

/**
 * Generate WebSite structured data with Shopify-specific search
 */
export function generateShopifyWebSiteSchema(store: ShopifyStore): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: store.name,
    url: store.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${store.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}