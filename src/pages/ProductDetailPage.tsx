import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { StoreService } from '../services/store';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  Heart,
  Share2,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  navigate,
  onSelectProduct
}) => {
  const { addToCart, wishlist, toggleWishlist, setSizeGuideOpen, showToast } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [activeAccordion, setActiveAccordion] = useState<'details' | 'shipping' | 'care'>('details');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const p = StoreService.getProductBySlug(slug);
    if (p) {
      setProduct(p);
      setSelectedColor(p.availableColors[0] || p.color);
      setSelectedSize(p.availableSizes[0] || 'M');
      setActiveImageIdx(0);
      window.scrollTo(0, 0);

      // Related
      const all = StoreService.getProducts();
      setRelatedProducts(all.filter(item => item.id !== p.id).slice(0, 4));
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#F2EEE6] pt-32 pb-20 text-center">
        <h2 className="font-serif text-3xl mb-4">Silhouette Not Found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-widest uppercase"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const currentColor = selectedColor || product.color;
  const currentSize = selectedSize || product.availableSizes[0] || 'M';
  const variantKey = `${currentColor}_${currentSize}`;
  const stockAvailable =
    product.variantStocks[variantKey] !== undefined ? product.variantStocks[variantKey] : product.stock;
  const isSoldOut = stockAvailable <= 0;

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart({
      productId: product.id,
      variantKey,
      name: product.name,
      slug: product.slug,
      color: currentColor,
      size: currentSize,
      price: product.salePrice || product.price,
      originalPrice: product.salePrice ? product.price : undefined,
      quantity: 1,
      image: product.images[activeImageIdx] || product.images[0]
    });
  };

  const handleBuyNow = () => {
    if (isSoldOut) return;
    addToCart({
      productId: product.id,
      variantKey,
      name: product.name,
      slug: product.slug,
      color: currentColor,
      size: currentSize,
      price: product.salePrice || product.price,
      originalPrice: product.salePrice ? product.price : undefined,
      quantity: 1,
      image: product.images[activeImageIdx] || product.images[0]
    });
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs font-mono text-[#7D786E]">
          <button onClick={() => navigate('/')} className="hover:text-[#F2EEE6] cursor-pointer">BERANDA</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate('/shop')} className="hover:text-[#F2EEE6] cursor-pointer">KATALOG</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#C9A45C] uppercase">{product.fit}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#A39E93] truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails (desktop vertical strip) */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 md:w-20 shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[3/4] w-16 md:w-full overflow-hidden border transition-all cursor-pointer ${
                    activeImageIdx === idx ? 'border-[#C9A45C] ring-1 ring-[#C9A45C]' : 'border-[#222] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Sudut pandang ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Primary View */}
            <div className="flex-1 relative aspect-[3/4] bg-[#111] overflow-hidden border border-[#1F1F1F]">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[11px] font-mono tracking-widest uppercase bg-black/80 text-[#C9A45C] border border-[#C9A45C]/40">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Fit & SKU */}
              <div className="flex items-center justify-between text-xs font-mono text-[#8A8478] tracking-widest uppercase mb-2">
                <span>SILUET {product.fit}</span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-wide mb-3 leading-tight">
                {product.name}
              </h1>

              {/* Star Rating & Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#C9A45C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A45C]" />
                  ))}
                </div>
                <span className="text-xs font-mono text-[#A39E93]">
                  {product.rating} ({product.reviewCount} ulasan editorial)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#1A1A1A]">
                {product.salePrice ? (
                  <>
                    <span className="font-mono text-2xl sm:text-3xl text-[#E1C27A] font-semibold">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="font-mono text-base text-[#6E685C] line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs font-mono text-[#C9A45C] uppercase tracking-wider bg-[#C9A45C]/10 px-2 py-0.5 border border-[#C9A45C]/30">
                      HEMAT {formatPrice(product.price - product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="font-mono text-2xl sm:text-3xl text-[#C9A45C] font-semibold">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#9E988C] font-light leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono tracking-widest uppercase text-[#C5C0B6]">
                    PILIHAN WARNA: <span className="text-[#C9A45C] font-semibold">{currentColor}</span>
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableColors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3.5 py-2 text-xs tracking-wider border transition-all cursor-pointer ${
                        currentColor === c
                          ? 'border-[#C9A45C] bg-[#C9A45C]/15 text-[#F2EEE6] font-medium'
                          : 'border-[#262626] text-[#8F8A7F] hover:border-[#444]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector & Guide */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono tracking-widest uppercase text-[#C5C0B6]">
                    UKURAN: <span className="text-[#C9A45C] font-semibold">{currentSize}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-[#C9A45C] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Panduan Ukuran & Rekomendasi BB</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map(s => {
                    const checkKey = `${currentColor}_${s}`;
                    const qty =
                      product.variantStocks[checkKey] !== undefined ? product.variantStocks[checkKey] : 5;
                    const sold = qty <= 0;
                    return (
                      <button
                        key={s}
                        disabled={sold}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2.5 text-xs font-mono border transition-all cursor-pointer ${
                          currentSize === s
                            ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-bold shadow-md'
                            : sold
                            ? 'border-[#1C1C1C] text-[#444] cursor-not-allowed line-through'
                            : 'border-[#262626] text-[#C5C0B6] hover:border-[#C9A45C]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Indicator */}
                <div className="mt-2.5 text-xs font-mono">
                  {isSoldOut ? (
                    <span className="text-red-400">Stok habis untuk varian ukuran ini.</span>
                  ) : stockAvailable < 5 ? (
                    <span className="text-[#E1C27A]">
                      Stok menipis: Tersisa {stockAvailable} pasang di atelier.
                    </span>
                  ) : (
                    <span className="text-emerald-400/80">Stok tersedia, siap kirim segera</span>
                  )}
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="space-y-3 mb-8">
                <div className="flex gap-2">
                  <button
                    disabled={isSoldOut}
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all cursor-pointer ${
                      isSoldOut
                        ? 'bg-[#1F1F1F] text-[#555] cursor-not-allowed'
                        : 'bg-[#C9A45C] text-black hover:bg-[#E1C27A] shadow-xl'
                    }`}
                  >
                    {isSoldOut ? 'STOK HABIS' : 'MASUKKAN KE TAS'}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Wishlist"
                    className={`p-4 border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-[#C9A45C] text-[#C9A45C] bg-[#C9A45C]/10'
                        : 'border-[#333] text-white hover:border-[#C9A45C]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C9A45C]' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    aria-label="Bagikan produk"
                    className="p-4 border border-[#333] text-white hover:border-[#C9A45C] transition-colors cursor-pointer"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {!isSoldOut && (
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 bg-black/60 border border-[#C9A45C]/50 text-[#C9A45C] hover:bg-[#C9A45C]/10 text-xs tracking-[0.2em] uppercase font-semibold transition-all cursor-pointer"
                  >
                    BELI SEKARANG (1-KLIK CHECKOUT)
                  </button>
                )}
              </div>

              {/* Guarantees Strip */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#1A1A1A] text-center text-[10px] font-mono text-[#8F8A7F]">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#C9A45C]" />
                  <span>Gratis Ongkir &gt; 1Jt</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#C9A45C]" />
                  <span>Tukar Ukuran 14 Hari</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#C9A45C]" />
                  <span>100% Denim Artisanal</span>
                </div>
              </div>
            </div>

            {/* Accordions: Specifications, Fabric & Shipping */}
            <div className="mt-8 border-t border-[#1C1C1C] divide-y divide-[#1C1C1C]">
              {/* Accordion 1: Details */}
              <div className="py-3">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' as any : 'details')}
                  className="w-full flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#F2EEE6] cursor-pointer"
                >
                  <span>PENGERJAAN & DETAIL KAIN</span>
                  <span>{activeAccordion === 'details' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'details' && (
                  <div className="pt-3 text-xs text-[#9E988C] space-y-2">
                    <p><strong>Komposisi Kain:</strong> {product.fabric || '100% Organic Ring-Spun Cotton Denim'}</p>
                    <p><strong>Tinggi Ban Pinggang (Rise):</strong> {product.rise || 'High Rise (31 cm)'}</p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping */}
              <div className="py-3">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' as any : 'shipping')}
                  className="w-full flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#F2EEE6] cursor-pointer"
                >
                  <span>PENGIRIMAN & PENUKARAN</span>
                  <span>{activeAccordion === 'shipping' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pt-3 text-xs text-[#9E988C] space-y-2">
                    <p>Layanan kurir kilat gratis untuk setiap pesanan di atas Rp1.000.000 ke seluruh Indonesia.</p>
                    <p>Estimasi pengiriman Jakarta: 1–2 hari kerja. Luar kota: 2–4 hari kerja.</p>
                    <p>Penukaran ukuran gratis diterima dalam 14 hari sejak barang diterima dengan kondisi produk belum dicuci dan tag lengkap.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Silhouettes Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#1A1A1A]">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs font-mono tracking-[0.2em] text-[#C9A45C] uppercase block mb-1">
                  PILIHAN LAINNYA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-wide uppercase">
                  SILUET PELENGKAP
                </h2>
              </div>
              <button
                onClick={() => navigate('/shop')}
                className="text-xs tracking-widest uppercase text-[#C9A45C] hover:underline cursor-pointer"
              >
                LIHAT SEMUA KOLEKSI →
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(item => (
                <ProductCard key={item.id} product={item} onSelect={onSelectProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Bag Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#C9A45C]/30 p-3 flex items-center justify-between gap-3 lg:hidden">
        <div>
          <p className="font-serif text-xs text-[#F2EEE6] truncate max-w-[140px]">{product.name}</p>
          <p className="font-mono text-xs text-[#C9A45C]">
            {formatPrice(product.salePrice || product.price)}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSizeGuideOpen(true)}
            className="px-2.5 py-2 border border-[#333] text-[10px] uppercase font-mono text-[#8F8A7F] cursor-pointer"
          >
            Panduan Ukuran
          </button>
          <button
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase cursor-pointer ${
              isSoldOut ? 'bg-[#222] text-[#666]' : 'bg-[#C9A45C] text-black'
            }`}
          >
            {isSoldOut ? 'STOK HABIS' : 'MASUKKAN KE TAS'}
          </button>
        </div>
      </div>
    </div>
  );
};
