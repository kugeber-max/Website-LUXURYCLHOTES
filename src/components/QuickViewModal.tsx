import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Check, Heart, Shield, ArrowRight } from 'lucide-react';

interface QuickViewModalProps {
  onNavigateToProduct: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigateToProduct }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, setSizeGuideOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.includes(product.id);
  const color = selectedColor || product.availableColors[0] || product.color;
  const size = selectedSize || product.availableSizes[0] || 'M';

  // Variant key check
  const variantKey = `${color}_${size}`;
  const variantStock = product.variantStocks[variantKey] !== undefined ? product.variantStocks[variantKey] : 5;
  const isVariantSoldOut = variantStock <= 0;

  const formatPrice = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;

  const handleAddToCart = () => {
    if (isVariantSoldOut) return;
    addToCart({
      productId: product.id,
      variantKey,
      name: product.name,
      slug: product.slug,
      color,
      size,
      price: product.salePrice || product.price,
      originalPrice: product.salePrice ? product.price : undefined,
      quantity: 1,
      image: product.images[activeImageIdx] || product.images[0]
    });
    setQuickViewProduct(null);
  };

  const handleGoToDetails = () => {
    setQuickViewProduct(null);
    onNavigateToProduct(product.slug);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-[#C9A45C]/30 text-[#F2EEE6] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-[#C9A45C] hover:text-black transition-colors rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-between bg-[#080808]">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#222]">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-black/80 text-[#C9A45C] border border-[#C9A45C]/40">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-18 border shrink-0 overflow-hidden transition-colors ${
                    activeImageIdx === idx ? 'border-[#C9A45C]' : 'border-[#262626] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8F8A7F] font-mono tracking-widest uppercase mb-1">
              <span>{product.fit}</span>
              <span>SKU: {product.sku}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-wide mb-2">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              {product.salePrice ? (
                <>
                  <span className="font-mono text-xl text-[#E1C27A] font-semibold">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="font-mono text-sm text-[#6E685C] line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="font-mono text-xl text-[#C9A45C] font-semibold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#9E988C] leading-relaxed line-clamp-3 mb-6">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mb-5">
              <label className="block text-xs font-mono tracking-widest uppercase text-[#C5C0B6] mb-2">
                WARNA: <span className="text-[#C9A45C] font-semibold">{color}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs tracking-wider border transition-all ${
                      color === c
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-[#F2EEE6]'
                        : 'border-[#292929] text-[#8F8A7F] hover:border-[#444]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector & Guide */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono tracking-widest uppercase text-[#C5C0B6]">
                  UKURAN: <span className="text-[#C9A45C] font-semibold">{size}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[11px] text-[#C9A45C] hover:underline uppercase tracking-wider"
                >
                  Panduan Ukuran & BB
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(s => {
                  const checkKey = `${color}_${s}`;
                  const isSold = (product.variantStocks[checkKey] !== undefined ? product.variantStocks[checkKey] : 5) <= 0;
                  return (
                    <button
                      key={s}
                      disabled={isSold}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-10 px-3 py-2 text-xs font-mono border transition-all ${
                        size === s
                          ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-bold'
                          : isSold
                          ? 'border-[#1C1C1C] text-[#444] cursor-not-allowed line-through'
                          : 'border-[#292929] text-[#C5C0B6] hover:border-[#C9A45C]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Stock Warning */}
              <div className="mt-2 text-[11px] font-mono">
                {isVariantSoldOut ? (
                  <span className="text-red-400">Stok habis untuk ukuran ini</span>
                ) : variantStock < 5 ? (
                  <span className="text-[#E1C27A]">Stok menipis: Tersisa {variantStock} pcs di atelier</span>
                ) : (
                  <span className="text-emerald-400/80">Stok tersedia, siap dikirim</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#1C1C1C] flex flex-col gap-2.5">
            <div className="flex gap-2">
              <button
                disabled={isVariantSoldOut}
                onClick={handleAddToCart}
                className={`flex-1 py-3 text-xs tracking-[0.2em] uppercase font-semibold transition-all ${
                  isVariantSoldOut
                    ? 'bg-[#222] text-[#666] cursor-not-allowed'
                    : 'bg-[#C9A45C] text-black hover:bg-[#E1C27A]'
                }`}
              >
                {isVariantSoldOut ? 'STOK HABIS' : 'MASUKKAN KE TAS'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 border transition-colors ${
                  isWishlisted ? 'border-[#C9A45C] text-[#C9A45C]' : 'border-[#333] text-white hover:border-[#C9A45C]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C9A45C]' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleGoToDetails}
              className="w-full py-2.5 text-[11px] tracking-[0.16em] uppercase text-[#A39E93] hover:text-[#C9A45C] flex items-center justify-center gap-1 transition-colors"
            >
              <span>Lihat Spesifikasi Lengkap Produk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
