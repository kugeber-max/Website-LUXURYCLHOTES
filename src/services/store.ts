import {
  Product,
  Order,
  Customer,
  PromoCode,
  HomepageConfig,
  StoreSettings,
  CollectionItem,
  Banner
} from '../types';

export const ASSET_IMAGES = {
  logo: '/assets/aistudio/Luxury_Clhotes_dengan_konsep_mewah__eksklusif__dan_premium._Berikut_deskripsinya-Elemen_Utama_L_b3cd1f4b.webp',
  heroDuo: '/assets/aistudio/New_Product__a1df8ed6.webp',
  baggyGrey: '/assets/aistudio/New_Product_Big_Sale____4d6803e8.webp',
  modelPortrait: '/assets/aistudio/Yukkk_Jangan_Sampai_Kehabisan_Stok____81a4f78b.webp',
  sizeChart: '/assets/aistudio/Buat_Yang_Masih_Binggung_Pilih_SizeGausaah_Binggung_Lagi_Nih_Mimin_Kasih_Rekomendasi_Buat_kalia_d303774f.webp',
  pinstripeStraight: '/assets/aistudio/234c410e-2de5-47e8-b5d1-3f8d5d15af70_b675f871.png',
  flareAngles: '/assets/aistudio/32ef4e88-bcda-4a6a-9647-7ceee1a5a13a_a6659665.png',
  wideAngles: '/assets/aistudio/4213754e-7bbf-4bfa-aa39-bd92dfdffa3f_6feccc11.png'
};

const STORAGE_KEYS = {
  PRODUCTS: 'luxury_clothes_products_v3_id',
  ORDERS: 'luxury_clothes_orders_v3_id',
  CUSTOMERS: 'luxury_clothes_customers_v3_id',
  PROMOS: 'luxury_clothes_promos_v3_id',
  HOMEPAGE: 'luxury_clothes_homepage_v3_id',
  SETTINGS: 'luxury_clothes_settings_v3_id',
  COLLECTIONS: 'luxury_clothes_collections_v3_id',
  BANNERS: 'luxury_clothes_banners_v3_id',
  WISHLIST: 'luxury_clothes_wishlist_v3_id',
  CART: 'luxury_clothes_cart_v3_id',
  AUTH: 'luxury_clothes_admin_auth_v3_id',
};

// Seed Products in Indonesian
const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'luna-wide-leg-jeans',
    name: 'Luna Wide Leg Jeans',
    sku: 'LC-LUNA-01',
    description: 'Siluet wide-leg berpotongan mewah yang dirancang untuk pergerakan leluasa dan tampilan elegan abadi. Dibuat menggunakan bahan 13.5oz ring-spun cotton denim premium yang jatuh anggun. Dilengkapi potongan high-waist yang kokoh, lipatan bawah rapi, dan sentuhan washing vintage eksklusif.',
    price: 599000,
    category: 'denim',
    collections: ['new-arrivals', 'signature', 'wide-leg', 'women'],
    fit: 'Wide Leg',
    color: 'Stone Blue',
    availableColors: ['Stone Blue', 'Washed Grey', 'Midnight Black'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 56,
    variantStocks: {
      'Stone Blue_XS': 5,
      'Stone Blue_S': 12,
      'Stone Blue_M': 20,
      'Stone Blue_L': 15,
      'Stone Blue_XL': 4,
      'Washed Grey_XS': 6,
      'Washed Grey_S': 10,
      'Washed Grey_M': 14,
      'Washed Grey_L': 8,
      'Washed Grey_XL': 3,
      'Midnight Black_XS': 4,
      'Midnight Black_S': 9,
      'Midnight Black_M': 15,
      'Midnight Black_L': 7,
      'Midnight Black_XL': 2,
    },
    images: [
      ASSET_IMAGES.wideAngles,
      ASSET_IMAGES.baggyGrey,
      ASSET_IMAGES.heroDuo
    ],
    badge: 'NEW',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    status: 'published',
    createdAt: '2026-03-01T10:00:00Z',
    rating: 4.9,
    reviewCount: 38,
    details: [
      '100% Katun Ring-Spun Denim Organik (13.5 oz)',
      'Potongan High-Rise dengan profil kaki lebar elegan',
      'Kancing logam kuningan solid berlapis emas antik',
      'Efek fade alami dan handmade whiskers halus',
      'Diproduksi terbatas dalam batch artisanal'
    ],
    fabric: '100% Katun Denim Tebal (Non-Stretch)',
    rise: 'High Rise (31 cm)'
  },
  {
    id: 'prod-002',
    slug: 'aurelia-flare-jeans',
    name: 'Aurelia Flare Jeans',
    sku: 'LC-AURELIA-02',
    description: 'Jeans cutbray flare high-waist yang membentuk lekuk pinggul dan paha secara proporsional serta memperpanjang garis kaki secara dramatis. Bagian bawah melebar anggun dengan lipatan lebar ganda, sangat sempurna dipadukan dengan heels maupun sneakers.',
    price: 579000,
    category: 'women',
    collections: ['new-arrivals', 'signature', 'flare', 'women', 'best-sellers'],
    fit: 'Flare',
    color: 'Classic Indigo Wash',
    availableColors: ['Classic Indigo Wash', 'Light Azure', 'Noir Carbon'],
    availableSizes: ['27', '28', '29', '30', '31', '32', '33', '34'],
    stock: 48,
    variantStocks: {
      'Classic Indigo Wash_27': 4,
      'Classic Indigo Wash_28': 8,
      'Classic Indigo Wash_29': 10,
      'Classic Indigo Wash_30': 12,
      'Classic Indigo Wash_31': 7,
      'Classic Indigo Wash_32': 5,
      'Classic Indigo Wash_33': 2,
      'Classic Indigo Wash_34': 0,
      'Light Azure_27': 3,
      'Light Azure_28': 6,
      'Light Azure_29': 9,
      'Light Azure_30': 11,
      'Light Azure_31': 5,
      'Light Azure_32': 3,
      'Light Azure_33': 1,
      'Light Azure_34': 0
    },
    images: [
      ASSET_IMAGES.heroDuo,
      ASSET_IMAGES.flareAngles,
      ASSET_IMAGES.sizeChart
    ],
    badge: 'BEST SELLER',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    status: 'published',
    createdAt: '2026-03-02T11:00:00Z',
    rating: 5.0,
    reviewCount: 52,
    details: [
      '98% Katun Premium, 2% Elastane Nyaman',
      'Ultra high-rise dengan potongan cutbray lipat lebar',
      'Jahitan ganda dengan penguat bar-tack emas',
      'Proses enzyme wash lembut untuk sentuhan kain mewah',
      'Tidak mudah melar atau kendur di bagian lutut'
    ],
    fabric: 'Premium Stretch Denim (98% Katun / 2% Spandex)',
    rise: 'Ultra High Rise (32 cm)'
  },
  {
    id: 'prod-003',
    slug: 'eclipse-straight-jeans',
    name: 'Eclipse Straight Jeans',
    sku: 'LC-ECLIPSE-03',
    description: 'Jeans straight-leg arsitektural dengan motif garis pinstripe vertikal eksklusif. Didesain dengan potongan presisi tinggi yang memberikan kesan tegas, ramping, dan modern untuk penampilan harian berkelas.',
    price: 549000,
    category: 'denim',
    collections: ['signature', 'new-arrivals', 'straight'],
    fit: 'Straight',
    color: 'Stripe Indigo Azure',
    availableColors: ['Stripe Indigo Azure', 'Pinstripe Charcoal', 'Pinstripe Raw Blue'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 35,
    variantStocks: {
      'Stripe Indigo Azure_XS': 3,
      'Stripe Indigo Azure_S': 8,
      'Stripe Indigo Azure_M': 14,
      'Stripe Indigo Azure_L': 7,
      'Stripe Indigo Azure_XL': 3,
      'Pinstripe Charcoal_XS': 2,
      'Pinstripe Charcoal_S': 5,
      'Pinstripe Charcoal_M': 10,
      'Pinstripe Charcoal_L': 4,
      'Pinstripe Charcoal_XL': 1
    },
    images: [
      ASSET_IMAGES.pinstripeStraight,
      ASSET_IMAGES.wideAngles
    ],
    badge: 'NEW',
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    status: 'published',
    createdAt: '2026-03-03T09:00:00Z',
    rating: 4.8,
    reviewCount: 24,
    details: [
      'Tenun katun denim pinstripe dengan tekstur premium',
      'Potongan lurus kontemporer (Mid-to-High Rise)',
      'Konstruksi 5 saku minimalis tanpa elemen berlebihan',
      'Kancing shank logam timbul emboss logo LC',
      'Telah melalui proses pre-shrunk anti susut'
    ],
    fabric: '100% Katun Yarn-Dyed Murni',
    rise: 'Mid High Rise (29.5 cm)'
  },
  {
    id: 'prod-004',
    slug: 'noir-baggy-denim',
    name: 'Noir Baggy Denim',
    sku: 'LC-NOIR-04',
    description: 'Perwujudan kemewahan kasual kontemporer. Potongan oversized baggy yang lapang dengan tekstur acid wash artistik, aksen whiskering depan yang tegas, serta hem bawah yang jatuh bervolume memberikan kesan streetwear luxury.',
    price: 649000,
    category: 'denim',
    collections: ['signature', 'best-sellers', 'baggy', 'men', 'women'],
    fit: 'Baggy',
    color: 'Washed Grey Marble',
    availableColors: ['Washed Grey Marble', 'Midnight Pitch', 'Vintage Shadow'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 42,
    variantStocks: {
      'Washed Grey Marble_XS': 4,
      'Washed Grey Marble_S': 11,
      'Washed Grey Marble_M': 16,
      'Washed Grey Marble_L': 8,
      'Washed Grey Marble_XL': 3,
      'Midnight Pitch_XS': 3,
      'Midnight Pitch_S': 7,
      'Midnight Pitch_M': 12,
      'Midnight Pitch_L': 6,
      'Midnight Pitch_XL': 2
    },
    images: [
      ASSET_IMAGES.baggyGrey,
      ASSET_IMAGES.modelPortrait,
      ASSET_IMAGES.wideAngles
    ],
    badge: 'LIMITED',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    status: 'published',
    createdAt: '2026-03-04T14:30:00Z',
    rating: 4.9,
    reviewCount: 46,
    details: [
      'Bahan denim berat 14oz bergaya artisanal Jepang',
      'Siluet baggy bervolume dengan saku dalam fungsional',
      'Detail abrasi handmade dan gradasi warna alami',
      'Hardware logam finishing gold mewah',
      'Jahitan ganda penguat di bagian selangkangan dan sisi'
    ],
    fabric: '14oz Premium Bull Denim (100% Katun)',
    rise: 'High-Rise Relaxed (33 cm)'
  },
  {
    id: 'prod-005',
    slug: 'celeste-vintage-flare',
    name: 'Celeste Vintage Flare Cutbray',
    sku: 'LC-CELESTE-05',
    description: 'Siluet ikonis bergaya era 70-an yang dipadukan dengan teknik jahit modern. Pas di bagian pinggang dan paha, aksen sarang lebah halus di belakang lutut, serta bukaan cutbray lebar untuk tampilan kaki jenjang.',
    price: 589000,
    category: 'women',
    collections: ['flare', 'women', 'best-sellers'],
    fit: 'Flare',
    color: 'Sky Vintage Wash',
    availableColors: ['Sky Vintage Wash', 'Deep Marine'],
    availableSizes: ['27', '28', '29', '30', '31', '32'],
    stock: 28,
    variantStocks: {
      'Sky Vintage Wash_27': 2,
      'Sky Vintage Wash_28': 5,
      'Sky Vintage Wash_29': 8,
      'Sky Vintage Wash_30': 7,
      'Sky Vintage Wash_31': 4,
      'Sky Vintage Wash_32': 2
    },
    images: [
      ASSET_IMAGES.flareAngles,
      ASSET_IMAGES.heroDuo
    ],
    badge: 'BEST SELLER',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    status: 'published',
    createdAt: '2026-03-05T08:15:00Z',
    rating: 4.9,
    reviewCount: 31,
    details: [
      'Bahan stretch dengan daya regang dan pemulihan bentuk tinggi',
      'Panjang inseam 34 inci untuk ilusi kaki jenjang seketika',
      'Patch kulit premium di bagian belakang ban pinggang',
      'Resleting fly tersembunyi dengan kancing kuningan solid'
    ],
    fabric: '98% Katun / 2% Elastane',
    rise: 'High Rise (30 cm)'
  },
  {
    id: 'prod-006',
    slug: 'monolith-dark-wide-leg',
    name: 'Monolith Deep Wash Wide Leg',
    sku: 'LC-MONO-06',
    description: 'Proporsi megah dengan bilasan warna dark indigo rinse yang pekat. Menghadirkan garis potongan arsitektural yang bersih dan bukaan bawah lebar yang berkarakter.',
    price: 629000,
    salePrice: 569000,
    category: 'men',
    collections: ['men', 'wide-leg', 'signature'],
    fit: 'Wide Leg',
    color: 'Deep Midnight Wash',
    availableColors: ['Deep Midnight Wash', 'Raw Indigo'],
    availableSizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    variantStocks: {
      'Deep Midnight Wash_S': 4,
      'Deep Midnight Wash_M': 9,
      'Deep Midnight Wash_L': 7,
      'Deep Midnight Wash_XL': 2
    },
    images: [
      ASSET_IMAGES.wideAngles,
      ASSET_IMAGES.baggyGrey
    ],
    badge: 'SALE',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    status: 'published',
    createdAt: '2026-03-06T12:00:00Z',
    rating: 4.7,
    reviewCount: 19,
    details: [
      'Katun denim 13.8oz kaku bergaya raw selvedge',
      'Pewarnaan indigo mendalam dengan proses bilas minimal',
      'Keling matte gold dan jahitan benang amber kontras'
    ],
    fabric: '100% Rigid Raw Cotton Denim',
    rise: 'Mid-Rise (30 cm)'
  }
];

const SEED_COLLECTIONS: CollectionItem[] = [
  {
    id: 'col-women',
    name: 'Koleksi Wanita',
    slug: 'women',
    description: 'Siluet cutbray flare, wide-leg, dan high-rise yang menonjolkan keanggunan bentuk tubuh dan percaya diri.',
    image: ASSET_IMAGES.heroDuo,
    badge: 'MUSIM TERBARU'
  },
  {
    id: 'col-denim',
    name: 'Koleksi Denim Signature',
    slug: 'denim',
    description: 'Kain katun pilihan, proses wash artisanal berkarakter, dan potongan abadi yang menjadi ciri khas.',
    image: ASSET_IMAGES.wideAngles,
    badge: 'SIGNATURE'
  },
  {
    id: 'col-men',
    name: 'Koleksi Pria',
    slug: 'men',
    description: 'Potongan straight terstruktur dan relaxed baggy dari denim berbobot tinggi untuk gaya kontemporer.',
    image: ASSET_IMAGES.baggyGrey,
    badge: 'KONTEMPORER'
  }
];

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-8021',
    orderNumber: 'LC-2026-8021',
    customer: {
      name: 'Aditya Pratama',
      email: 'aditya.p@gmail.com',
      phone: '+62 812-9844-3210',
      address: 'Jl. Senopati No. 42, Kebayoran Baru',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      notes: 'Tolong packing box luxury dengan pita gold.'
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-001',
        variantKey: 'Stone Blue_M',
        name: 'Luna Wide Leg Jeans',
        slug: 'luna-wide-leg-jeans',
        color: 'Stone Blue',
        size: 'M',
        price: 599000,
        quantity: 1,
        image: ASSET_IMAGES.wideAngles
      },
      {
        id: 'item-2',
        productId: 'prod-004',
        variantKey: 'Washed Grey Marble_L',
        name: 'Noir Baggy Denim',
        slug: 'noir-baggy-denim',
        color: 'Washed Grey Marble',
        size: 'L',
        price: 649000,
        quantity: 1,
        image: ASSET_IMAGES.baggyGrey
      }
    ],
    subtotal: 1248000,
    shippingFee: 0,
    discount: 0,
    total: 1248000,
    paymentMethod: 'QRIS',
    status: 'PAID',
    createdAt: '2026-03-08T09:42:00Z',
    trackingNumber: 'JNE-LC-99482103'
  },
  {
    id: 'ord-8022',
    orderNumber: 'LC-2026-8022',
    customer: {
      name: 'Clarissa Valerie',
      email: 'clarissa.v@outlook.com',
      phone: '+62 817-2233-4455',
      address: 'Apartment Pakubuwono View Tower A Lt. 18',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12120'
    },
    items: [
      {
        id: 'item-3',
        productId: 'prod-002',
        variantKey: 'Classic Indigo Wash_28',
        name: 'Aurelia Flare Jeans',
        slug: 'aurelia-flare-jeans',
        color: 'Classic Indigo Wash',
        size: '28',
        price: 579000,
        quantity: 1,
        image: ASSET_IMAGES.heroDuo
      }
    ],
    subtotal: 579000,
    shippingFee: 35000,
    discount: 115800,
    promoCode: 'DENIM20',
    total: 498200,
    paymentMethod: 'Bank Transfer',
    status: 'SHIPPED',
    createdAt: '2026-03-07T14:15:00Z',
    trackingNumber: 'SICEPAT-LC-7721990'
  }
];

const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cust-01',
    name: 'Aditya Pratama',
    email: 'aditya.p@gmail.com',
    phone: '+62 812-9844-3210',
    city: 'Jakarta Selatan',
    totalOrders: 3,
    totalSpending: 2890000,
    lastOrderDate: '2026-03-08'
  },
  {
    id: 'cust-02',
    name: 'Clarissa Valerie',
    email: 'clarissa.v@outlook.com',
    phone: '+62 817-2233-4455',
    city: 'Jakarta Selatan',
    totalOrders: 2,
    totalSpending: 1248000,
    lastOrderDate: '2026-03-07'
  }
];

const SEED_PROMOS: PromoCode[] = [
  {
    id: 'promo-01',
    code: 'DENIM20',
    discountPercent: 20,
    minSpend: 500000,
    maxDiscount: 200000,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    isActive: true
  },
  {
    id: 'promo-02',
    code: 'LUXURY10',
    discountPercent: 10,
    minSpend: 300000,
    maxDiscount: 100000,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    isActive: true
  }
];

const SEED_HOMEPAGE: HomepageConfig = {
  heroImage: ASSET_IMAGES.heroDuo,
  heroTitle: 'THE ART OF EVERYDAY DENIM',
  heroSubtitle: 'Didesain bagi mereka yang mendefinisikan gaya dan keanggunannya sendiri. Potongan presisi dengan sentuhan abadi.',
  heroCtaText: 'JELAJAHI KOLEKSI',
  heroCtaLink: '/shop',
  secondaryCtaText: 'LIHAT LOOKBOOK',
  secondaryCtaLink: '/lookbook',
  announcementMarquee: 'GRATIS ONGKIR MINIMAL PEMBELIAN RP1.000.000 • PENGEMBALIAN 14 HARI MUDAH • CRAFTSMANSHIP DENIM ARTISANAL • KEMASAN EKSKLUSIF LUXURY',
  brandIntroKicker: '01 — TENTANG KAMI',
  brandIntroTitle: 'DENIM, DIDEFINISIKAN ULANG.',
  brandIntroBody: 'Denim premium yang dirancang berpusat pada rasa percaya diri, kebebasan gerak, dan gaya abadi. LUXURY CLOTHES mengangkat denim harian menjadi karya seni bernilai tinggi.',
  brandIntroImage: ASSET_IMAGES.modelPortrait,
  signatureTitle: 'SIGNATURE DENIM',
  signatureSubtitle: 'Siluet ikonik yang dirancang untuk ekspresi percaya diri dan kehadiran yang memikat.',
  campaignTitle: 'TEMUKAN SILUETMU',
  campaignSubtitle: 'Didesain menyatu dengan setiap langkah dan gerak tubuhmu sepanjang hari.',
  campaignImage: ASSET_IMAGES.baggyGrey,
  campaignCtaText: 'JELAJAHI KOLEKSI DENIM',
  campaignCtaLink: '/denim',
  editorialQuote: '“Kemewahan sejati terpancar dari cara potongan denim bergerak selaras dengan langkahmu.”',
  editorialSubtitle: 'STANDAR BARU DENIM KONTEMPORER',
  newsletterHeadline: 'BERGABUNG DENGAN PRIVATE EDIT',
  newsletterSubtitle: 'Jadilah yang pertama mendapatkan akses rilisan eksklusif, lookbook musiman, dan penawaran privat.'
};

const SEED_SETTINGS: StoreSettings = {
  brandName: 'LUXURY CLOTHES',
  tagline: 'THE ART OF EVERYDAY DENIM',
  logoUrl: ASSET_IMAGES.logo,
  email: 'concierge@luxuryclothes.com',
  phone: '+62 21 5590 8820',
  whatsapp: '+62 812 8899 0011',
  instagram: '@luxuryclothes',
  tiktok: '@luxuryclothes.official',
  address: 'Level 3, Pacific Place Mall, SCBD, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190',
  currency: 'IDR',
  shippingFee: 35000,
  freeShippingThreshold: 1000000,
  taxRate: 0
};

const SEED_BANNERS: Banner[] = [
  {
    id: 'ban-01',
    title: 'THE WIDE LEG EDIT',
    subtitle: 'Proporsi megah dengan potongan drapery arsitektural.',
    image: ASSET_IMAGES.wideAngles,
    buttonText: 'BELANJA WIDE LEG',
    buttonLink: '/shop?fit=Wide%20Leg',
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    status: 'active'
  }
];

let inMemoryStore: Record<string, string> = {};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } else if (inMemoryStore[key]) {
      return JSON.parse(inMemoryStore[key]) as T;
    }
  } catch (e) {
    console.error(`Error reading ${key}:`, e);
  }
  return defaultValue;
}

function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, serialized);
    }
    inMemoryStore[key] = serialized;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('luxury-store-updated', { detail: { key } }));
    }
  } catch (e) {
    console.error(`Error writing ${key}:`, e);
  }
}

export const StoreService = {
  getProducts(): Product[] {
    return getItem<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  },

  getProductBySlug(slug: string): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.slug === slug || p.id === slug);
  },

  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  },

  saveProduct(product: Product): Product {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    let updated: Product[];

    if (index >= 0) {
      updated = [...products];
      updated[index] = product;
    } else {
      updated = [product, ...products];
    }

    setItem(STORAGE_KEYS.PRODUCTS, updated);
    return product;
  },

  deleteProduct(id: string): void {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    setItem(STORAGE_KEYS.PRODUCTS, filtered);
  },

  updateProductPrice(id: string, newPrice: number, newSalePrice?: number): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      price: newPrice,
      salePrice: newSalePrice !== undefined ? newSalePrice : products[index].salePrice
    };

    products[index] = updatedProduct;
    setItem(STORAGE_KEYS.PRODUCTS, [...products]);
    return updatedProduct;
  },

  updateProductStock(id: string, variantKey: string, newStock: number): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const current = products[index];
    const newVariantStocks = {
      ...current.variantStocks,
      [variantKey]: Math.max(0, newStock)
    };

    const totalStock = Object.values(newVariantStocks).reduce((acc, curr) => acc + curr, 0);

    const updatedProduct: Product = {
      ...current,
      variantStocks: newVariantStocks,
      stock: totalStock,
      badge: totalStock === 0 ? 'SOLD OUT' : current.badge === 'SOLD OUT' ? undefined : current.badge
    };

    products[index] = updatedProduct;
    setItem(STORAGE_KEYS.PRODUCTS, [...products]);
    return updatedProduct;
  },

  getCollections(): CollectionItem[] {
    return getItem<CollectionItem[]>(STORAGE_KEYS.COLLECTIONS, SEED_COLLECTIONS);
  },

  saveCollection(collection: CollectionItem): CollectionItem {
    const list = this.getCollections();
    const index = list.findIndex(c => c.id === collection.id);
    let updated: CollectionItem[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = collection;
    } else {
      updated = [...list, collection];
    }
    setItem(STORAGE_KEYS.COLLECTIONS, updated);
    return collection;
  },

  getOrders(): Order[] {
    return getItem<Order[]>(STORAGE_KEYS.ORDERS, SEED_ORDERS);
  },

  getOrderById(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find(o => o.id === id || o.orderNumber === id);
  },

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const newNumber = `LC-2026-${Math.floor(8000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: newNumber,
      createdAt: new Date().toISOString()
    };

    const updated = [newOrder, ...orders];
    setItem(STORAGE_KEYS.ORDERS, updated);

    this.recordCustomerOrder(newOrder);

    for (const item of newOrder.items) {
      const prod = this.getProductById(item.productId);
      if (prod && prod.variantStocks[item.variantKey] !== undefined) {
        const remaining = Math.max(0, prod.variantStocks[item.variantKey] - item.quantity);
        this.updateProductStock(prod.id, item.variantKey, remaining);
      }
    }

    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order['status'], trackingNumber?: string): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    orders[index] = {
      ...orders[index],
      status,
      trackingNumber: trackingNumber || orders[index].trackingNumber
    };

    setItem(STORAGE_KEYS.ORDERS, [...orders]);
    return orders[index];
  },

  getCustomers(): Customer[] {
    return getItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, SEED_CUSTOMERS);
  },

  recordCustomerOrder(order: Order): void {
    const customers = this.getCustomers();
    const existingIndex = customers.findIndex(c => c.email.toLowerCase() === order.customer.email.toLowerCase());

    if (existingIndex >= 0) {
      const c = customers[existingIndex];
      customers[existingIndex] = {
        ...c,
        totalOrders: c.totalOrders + 1,
        totalSpending: c.totalSpending + order.total,
        lastOrderDate: new Date().toISOString().split('T')[0]
      };
    } else {
      customers.push({
        id: `cust-${Date.now()}`,
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        city: order.customer.city,
        totalOrders: 1,
        totalSpending: order.total,
        lastOrderDate: new Date().toISOString().split('T')[0]
      });
    }
    setItem(STORAGE_KEYS.CUSTOMERS, customers);
  },

  getPromoCodes(): PromoCode[] {
    return getItem<PromoCode[]>(STORAGE_KEYS.PROMOS, SEED_PROMOS);
  },

  savePromoCode(promo: PromoCode): PromoCode {
    const promos = this.getPromoCodes();
    const index = promos.findIndex(p => p.id === promo.id || p.code === promo.code);
    let updated: PromoCode[];
    if (index >= 0) {
      updated = [...promos];
      updated[index] = promo;
    } else {
      updated = [promo, ...promos];
    }
    setItem(STORAGE_KEYS.PROMOS, updated);
    return promo;
  },

  deletePromoCode(id: string): void {
    const promos = this.getPromoCodes();
    setItem(STORAGE_KEYS.PROMOS, promos.filter(p => p.id !== id));
  },

  validatePromo(codeStr: string, subtotal: number): { valid: boolean; promo?: PromoCode; discount: number; message: string } {
    const cleanCode = codeStr.trim().toUpperCase();
    const promos = this.getPromoCodes();
    const found = promos.find(p => p.code.toUpperCase() === cleanCode && p.isActive);

    if (!found) {
      return { valid: false, discount: 0, message: 'Kode promo tidak valid atau telah kedaluwarsa.' };
    }

    if (subtotal < found.minSpend) {
      return {
        valid: false,
        discount: 0,
        message: `Minimal belanja untuk kode ${cleanCode} adalah Rp${found.minSpend.toLocaleString('id-ID')}`
      };
    }

    const calculatedDiscount = Math.round((subtotal * found.discountPercent) / 100);
    const finalDiscount = found.maxDiscount ? Math.min(calculatedDiscount, found.maxDiscount) : calculatedDiscount;

    return {
      valid: true,
      promo: found,
      discount: finalDiscount,
      message: `Diskon ${found.discountPercent}% berhasil diterapkan! (Hemat Rp${finalDiscount.toLocaleString('id-ID')})`
    };
  },

  getHomepageConfig(): HomepageConfig {
    return getItem<HomepageConfig>(STORAGE_KEYS.HOMEPAGE, SEED_HOMEPAGE);
  },

  updateHomepageConfig(config: HomepageConfig): HomepageConfig {
    setItem(STORAGE_KEYS.HOMEPAGE, config);
    return config;
  },

  getStoreSettings(): StoreSettings {
    return getItem<StoreSettings>(STORAGE_KEYS.SETTINGS, SEED_SETTINGS);
  },

  updateStoreSettings(settings: StoreSettings): StoreSettings {
    setItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  getBanners(): Banner[] {
    return getItem<Banner[]>(STORAGE_KEYS.BANNERS, SEED_BANNERS);
  },

  saveBanner(banner: Banner): Banner {
    const list = this.getBanners();
    const idx = list.findIndex(b => b.id === banner.id);
    let updated: Banner[];
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = banner;
    } else {
      updated = [banner, ...list];
    }
    setItem(STORAGE_KEYS.BANNERS, updated);
    return banner;
  },

  isAdminAuthenticated(): boolean {
    return getItem<boolean>(STORAGE_KEYS.AUTH, false);
  },

  setAdminAuthenticated(auth: boolean): void {
    setItem(STORAGE_KEYS.AUTH, auth);
  },

  getWishlist(): string[] {
    return getItem<string[]>(STORAGE_KEYS.WISHLIST, ['prod-001', 'prod-002']);
  },

  toggleWishlist(productId: string): string[] {
    const list = this.getWishlist();
    const exists = list.includes(productId);
    const updated = exists ? list.filter(id => id !== productId) : [...list, productId];
    setItem(STORAGE_KEYS.WISHLIST, updated);
    return updated;
  },

  resetAllData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      Object.values(STORAGE_KEYS).forEach(k => window.localStorage.removeItem(k));
    }
    inMemoryStore = {};
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('luxury-store-updated', { detail: { key: 'ALL' } }));
    }
  }
};
