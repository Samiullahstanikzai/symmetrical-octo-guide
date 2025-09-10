import {
  SEOToolkit,
  generateProductSchema,
  generateCollectionSchema,
  generateStoreSchema,
  generateShopifyWebSiteSchema,
  ShopifyLiquidHelpers,
  generateProductSEOConfig,
  generateCollectionSEOConfig,
} from '../src/index';

// Define Shopify store data
const store = {
  name: 'Awesome Shopify Store',
  url: 'https://awesome-store.myshopify.com',
  description: 'The best online store for awesome products',
  logo: 'https://awesome-store.myshopify.com/logo.png',
  currency: 'USD',
  contactInfo: {
    email: 'support@awesome-store.com',
    phone: '+1-555-123-4567',
    address: {
      streetAddress: '123 Commerce St',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
  },
};

// Define a sample product
const product = {
  id: 'gid://shopify/Product/123456789',
  title: 'Premium Wireless Headphones',
  description: 'Experience crystal-clear audio with our premium wireless headphones. Features noise cancellation, 30-hour battery life, and premium comfort.',
  price: 199.99,
  compareAtPrice: 249.99,
  currency: 'USD',
  vendor: 'AudioTech',
  productType: 'Electronics',
  tags: ['headphones', 'wireless', 'audio', 'premium', 'noise-cancellation'],
  images: [
    'https://awesome-store.myshopify.com/products/headphones-1.jpg',
    'https://awesome-store.myshopify.com/products/headphones-2.jpg',
  ],
  url: 'https://awesome-store.myshopify.com/products/premium-wireless-headphones',
  sku: 'AWH-001',
  barcode: '1234567890123',
  availability: 'InStock' as const,
  brand: 'AudioTech',
  condition: 'NewCondition' as const,
};

// Define a sample collection
const collection = {
  id: 'gid://shopify/Collection/987654321',
  title: 'Electronics Collection',
  description: 'Discover our amazing collection of electronic devices and accessories.',
  url: 'https://awesome-store.myshopify.com/collections/electronics',
  image: 'https://awesome-store.myshopify.com/collections/electronics-banner.jpg',
  products: [product], // In real scenario, this would have multiple products
};

console.log('=== Shopify Store Schema ===');
const storeSchema = generateStoreSchema(store);
console.log(JSON.stringify(storeSchema, null, 2));

console.log('\n=== Shopify Website Schema with Search ===');
const websiteSchema = generateShopifyWebSiteSchema(store);
console.log(JSON.stringify(websiteSchema, null, 2));

console.log('\n=== Product Schema ===');
const productSchema = generateProductSchema(product, store);
console.log(JSON.stringify(productSchema, null, 2));

console.log('\n=== Collection Schema ===');
const collectionSchema = generateCollectionSchema(collection, store);
console.log(JSON.stringify(collectionSchema, null, 2));

console.log('\n=== Product SEO Configuration ===');
const productSEO = generateProductSEOConfig(product, store);
const productSEOToolkit = new SEOToolkit(productSEO);
console.log(productSEOToolkit.generateMetaTagsHTML());

console.log('\n=== Collection SEO Configuration ===');
const collectionSEO = generateCollectionSEOConfig(collection, store);
const collectionSEOToolkit = new SEOToolkit(collectionSEO);
console.log(collectionSEOToolkit.generateMetaTagsHTML());

console.log('\n=== Shopify Liquid Templates ===');

console.log('\n--- Product Meta Template ---');
const productMetaTemplate = ShopifyLiquidHelpers.generateProductMetaTemplate();
console.log(productMetaTemplate);

console.log('\n--- Collection Meta Template ---');
const collectionMetaTemplate = ShopifyLiquidHelpers.generateCollectionMetaTemplate();
console.log(collectionMetaTemplate);

console.log('\n--- Product Structured Data Template ---');
const productStructuredTemplate = ShopifyLiquidHelpers.generateProductStructuredDataTemplate();
console.log(productStructuredTemplate);

console.log('\n--- Breadcrumb Template ---');
const breadcrumbTemplate = ShopifyLiquidHelpers.generateBreadcrumbTemplate();
console.log(breadcrumbTemplate);

// Generate complete SEO for a Shopify product page
console.log('\n=== Complete Product Page SEO ===');
const completeProductSEO = new SEOToolkit({
  ...productSEO,
  structuredData: [productSchema],
});

console.log(completeProductSEO.generateHeadHTML());