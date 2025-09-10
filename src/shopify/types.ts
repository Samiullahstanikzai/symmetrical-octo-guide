export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: string[];
  url: string;
  sku?: string;
  barcode?: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  condition?: 'NewCondition' | 'UsedCondition' | 'RefurbishedCondition';
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  products: ShopifyProduct[];
}

export interface ShopifyStore {
  name: string;
  url: string;
  description?: string;
  logo?: string;
  currency: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
}