import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { wishlist, toggleWishlist, setQuickViewProduct, addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  // Image handling
  const mainImage = product.images[0] || '';
  const hoverImage = product.images[1] || product.images[0] || '';
  const isSoldOut = product.stock <= 0 || product.badge === 'SOLD OUT';

  const formatPrice = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.availableColors[0] || product.color;
    const defaultSize = product.availableSizes[0] || 'M';
    addToCart({
      productId: product.id,
      variantKey: `${defaultColor}_${defaultSize}`,
      name: product.name,
      slug: product.slug,
      color: defaultColor,
      size: defaultSize,
      price: product.salePrice || product.price,
      originalPrice: product.salePrice ? product.price : undefined,
      quantity: 1,
      image: mainImage
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#111] border border-[#1C1C1C] group-hover:border-[#C9A45C]/40 transition-colors duration-300">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {isSoldOut ? (
            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 bg-black/80 text-[#8C877D] border border-[#333]">
              SOLD OUT
            </span>
          ) : product.badge ? (
            <span
              className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 ${
                product.badge === 'SALE'
                  ? 'bg-[#8F2D2D] text-white'
                  : product.badge === 'NEW'
                  ? 'bg-[#C9A45C] text-black font-semibold'
                  : 'bg-black/80 text-[#E1C27A] border border-[#C9A45C]/40'
              }`}
            >
              {product.badge}
            </span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#C9A45C] text-black'
              : 'bg-black/60 text-white hover:bg-[#C9A45C] hover:text-black backdrop-blur-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Product Photos with Cross-fade & Subtle Zoom */}
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out transform ${
              isHovered && hoverImage !== mainImage
                ? 'opacity-0 scale-105'
                : 'opacity-100 group-hover:scale-105'
            }`}
          />
          {hoverImage && hoverImage !== mainImage && (
            <img
              src={hoverImage}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out transform ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </div>

        {/* Quick View & Add Overlays on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 bg-black/80 hover:bg-[#1A1A1A] text-[#F2EEE6] text-[11px] font-medium tracking-[0.16em] uppercase border border-[#333] hover:border-[#C9A45C] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>LIHAT CEPAT</span>
          </button>
          {!isSoldOut && (
            <button
              onClick={handleQuickAdd}
              title="Masukkan ke Tas"
              className="p-2 bg-[#C9A45C] hover:bg-[#E1C27A] text-black transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3.5 pb-1 flex flex-col space-y-1">
        <div className="flex items-center justify-between text-[11px] text-[#8A8478] tracking-widest uppercase font-mono">
          <span>{product.fit}</span>
          {product.availableColors && product.availableColors.length > 1 && (
            <span>{product.availableColors.length} Pilihan Warna</span>
          )}
        </div>

        <h3 className="font-serif text-base sm:text-lg text-[#F2EEE6] tracking-[0.04em] group-hover:text-[#C9A45C] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 pt-0.5">
          {product.salePrice ? (
            <>
              <span className="font-mono text-sm sm:text-base text-[#E1C27A] font-medium">
                {formatPrice(product.salePrice)}
              </span>
              <span className="font-mono text-xs text-[#6B6559] line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-mono text-sm sm:text-base text-[#C5C0B6]">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Color pills or hint */}
        <p className="text-[11px] text-[#736E64] truncate pt-0.5">
          {product.color}
        </p>
      </div>
    </div>
  );
};
