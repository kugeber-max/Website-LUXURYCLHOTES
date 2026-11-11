export type ProductCategory = 'women' | 'men' | 'denim';
export type ProductBadge = 'NEW' | 'SALE' | 'SOLD OUT' | 'LIMITED' | 'BEST SELLER';
export type ProductFit = 'Wide Leg' | 'Flare' | 'Straight' | 'Baggy' | 'Skinny' | 'Relaxed';

export interface ProductVariant {
  sku: string;
  color: string;
  size: string;
  stock: number;
  price?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  salePrice?: number;
  category: ProductCategory;
  collections: string[];
  fit: ProductFit;
  color: string;
  availableColors: string[];
  availableSizes: string[];
  stock: number;
  variantStocks: Record<string, number>; // key: `${color}_${size}`
  images: string[];
  badge?: ProductBadge;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  rating: number;
  reviewCount: number;
  details: string[];
  fabric?: string;
  rise?: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantKey: string;
  name: string;
  slug: string;
  color: string;
  size: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentMethod =
  | 'QRIS'
  | 'Bank Transfer'
  | 'E-Wallet'
  | 'Credit/Debit Card'
  | 'COD';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  trackingNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpending: number;
  lastOrderDate: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  maxDiscount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface HomepageConfig {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  announcementMarquee: string;
  brandIntroKicker: string;
  brandIntroTitle: string;
  brandIntroBody: string;
  brandIntroImage: string;
  signatureTitle: string;
  signatureSubtitle: string;
  campaignTitle: string;
  campaignSubtitle: string;
  campaignImage: string;
  campaignCtaText: string;
  campaignCtaLink: string;
  editorialQuote: string;
  editorialSubtitle: string;
  newsletterHeadline: string;
  newsletterSubtitle: string;
}

export interface StoreSettings {
  brandName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  tiktok: string;
  address: string;
  currency: string;
  shippingFee: number;
  freeShippingThreshold: number;
  taxRate: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
}
