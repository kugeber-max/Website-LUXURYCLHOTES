import React, { useState, useMemo, useEffect } from 'react';
import { StoreService } from '../services/store';
import { Product, ProductCategory, ProductFit } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Filter, X, ChevronDown, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ShopPageProps {
  initialCategory?: ProductCategory | 'all' | 'new-arrivals' | 'best-sellers';
  pageTitle?: string;
  pageSubtitle?: string;
  navigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  pageTitle,
  pageSubtitle,
  navigate,
  onSelectProduct
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const loadData = () => {
      setProducts(StoreService.getProducts());
    };
    loadData();
    window.addEventListener('luxury-store-updated', loadData);
    return () => window.removeEventListener('luxury-store-updated', loadData);
  }, []);

  // Filter options derived from database
  const availableFits: ProductFit[] = ['Wide Leg', 'Flare', 'Straight', 'Baggy'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '27', '28', '29', '30', '31', '32', '33', '34'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category / Collection
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new-arrivals' && !p.isNewArrival) return false;
        if (selectedCategory === 'best-sellers' && !p.isBestSeller) return false;
        if (['women', 'men', 'denim'].includes(selectedCategory) && p.category !== selectedCategory && !p.collections.includes(selectedCategory)) {
          return false;
        }
      }

      // Fit
      if (selectedFit !== 'all' && p.fit !== selectedFit) return false;

      // Size
      if (selectedSize !== 'all' && !p.availableSizes.includes(selectedSize)) return false;

      // Color
      if (selectedColor !== 'all' && !p.availableColors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()))) {
        return false;
      }

      // Price
      const actualPrice = p.salePrice || p.price;
      if (actualPrice > maxPrice) return false;

      // Stock
      if (onlyInStock && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;

      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'price-asc') {
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        return priceB - priceA;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedFit, selectedSize, selectedColor, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFit('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setMaxPrice(1000000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFit !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    maxPrice < 1000000 ||
    onlyInStock;

  const displayTitle = pageTitle || (
    selectedCategory === 'women' ? 'KOLEKSI WANITA' :
    selectedCategory === 'men' ? 'KOLEKSI PRIA' :
    selectedCategory === 'denim' ? 'ARSIP DENIM SIGNATURE' :
    selectedCategory === 'new-arrivals' ? 'PRODUK TERBARU' :
    selectedCategory === 'best-sellers' ? 'PRODUK TERLARIS' :
    'KATALOG LENGKAP'
  );

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-20">
      {/* Page Header */}
      <div className="border-b border-[#1A1A1A] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
            LUXURY CLOTHES • ARSIP
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-[0.08em] uppercase mb-3">
            {displayTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#8F8A7F] max-w-lg mx-auto font-light">
            {pageSubtitle || 'Dirancang dengan katun ring-spun pilihan, gradasi artisanal bernilai seni, dan siluet kontemporer.'}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Control Bar (Filter count & Sort dropdown) */}
        <div className="flex items-center justify-between pb-6 border-b border-[#171717] gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#121212] border border-[#262626] text-xs font-mono tracking-wider uppercase flex items-center gap-2 hover:border-[#C9A45C] text-[#C5C0B6] cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Filter ({filteredProducts.length})</span>
            </button>

            <span className="text-xs font-mono text-[#8A8478] tracking-wider hidden lg:block">
              MENAMPILKAN <strong className="text-[#F2EEE6]">{filteredProducts.length}</strong> SILUET
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[#736E63] hidden sm:inline uppercase tracking-wider">URUTKAN:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#121212] border border-[#262626] text-[#F2EEE6] px-3 py-2 text-xs focus:border-[#C9A45C] focus:outline-none uppercase tracking-wider cursor-pointer"
            >
              <option value="featured">Pilihan Utama</option>
              <option value="newest">Rilisan Terbaru</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
            </select>
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="py-3 flex flex-wrap items-center gap-2 border-b border-[#141414] text-xs font-mono">
            <span className="text-[#888]">Filter Aktif:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[#C9A45C] flex items-center gap-1">
                Kategori: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedFit !== 'all' && (
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[#C9A45C] flex items-center gap-1">
                Potongan: {selectedFit}
                <button onClick={() => setSelectedFit('all')} className="hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[#C9A45C] flex items-center gap-1">
                Ukuran: {selectedSize}
                <button onClick={() => setSelectedSize('all')} className="hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            {onlyInStock && (
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#333] text-[#C9A45C] flex items-center gap-1">
                Hanya Ready Stock
                <button onClick={() => setOnlyInStock(false)} className="hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[#8A6827] hover:text-[#C9A45C] ml-2 flex items-center gap-1 uppercase tracking-wider text-[11px] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Hapus Filter</span>
            </button>
          </div>
        )}

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Left Sidebar Filter */}
          <aside className="hidden lg:block space-y-8 pr-4">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#C9A45C] mb-3">
                KOLEKSI
              </h3>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'Semua Koleksi' },
                  { id: 'new-arrivals', label: 'Produk Terbaru' },
                  { id: 'women', label: 'Koleksi Wanita' },
                  { id: 'men', label: 'Koleksi Pria' },
                  { id: 'denim', label: 'Denim Signature' },
                  { id: 'best-sellers', label: 'Produk Terlaris' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`block w-full text-left py-1.5 transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'text-[#C9A45C] font-semibold tracking-wider'
                        : 'text-[#9E988C] hover:text-[#F2EEE6]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Silhouette Fit Filter */}
            <div className="border-t border-[#1C1C1C] pt-6">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#C9A45C] mb-3">
                BENTUK POTONGAN
              </h3>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedFit('all')}
                  className={`block w-full text-left py-1.5 transition-colors cursor-pointer ${
                    selectedFit === 'all' ? 'text-[#C9A45C] font-semibold' : 'text-[#9E988C] hover:text-[#F2EEE6]'
                  }`}
                >
                  Semua Potongan
                </button>
                {availableFits.map(fit => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(fit)}
                    className={`block w-full text-left py-1.5 transition-colors cursor-pointer ${
                      selectedFit === fit ? 'text-[#C9A45C] font-semibold' : 'text-[#9E988C] hover:text-[#F2EEE6]'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-t border-[#1C1C1C] pt-6">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#C9A45C] mb-3">
                UKURAN TERSEDIA
              </h3>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                    selectedSize === 'all'
                      ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-bold'
                      : 'border-[#262626] text-[#A39E93] hover:border-[#555]'
                  }`}
                >
                  SEMUA
                </button>
                {availableSizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 text-xs font-mono border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-bold'
                        : 'border-[#262626] text-[#A39E93] hover:border-[#555]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-[#1C1C1C] pt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#C9A45C]">
                  BATAS HARGA
                </h3>
                <span className="text-xs font-mono text-[#F2EEE6]">
                  Rp{maxPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                type="range"
                min="400000"
                max="1000000"
                step="25000"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C9A45C] bg-[#222] cursor-pointer"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="border-t border-[#1C1C1C] pt-6 flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#9E988C]">Hanya Produk Ready</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={e => setOnlyInStock(e.target.checked)}
                className="accent-[#C9A45C] w-4 h-4 cursor-pointer"
              />
            </div>
          </aside>

          {/* Right: Products Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-[#1A1A1A] bg-[#0C0C0C] p-8">
                <p className="font-serif text-2xl text-[#F2EEE6] mb-2">Tidak Ada Siluet yang Sesuai Kriteria</p>
                <p className="text-xs text-[#8F8A7F] max-w-sm mx-auto mb-6">
                  Coba sesuaikan atau atur ulang filter Anda untuk menjelajahi seluruh koleksi denim premium kami.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#C9A45C] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#E1C27A] transition-colors cursor-pointer"
                >
                  ATUR ULANG SEMUA FILTER
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slide-out Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-[#0F0F0F] border-l border-[#262626] h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#222]">
                <h3 className="font-serif text-lg text-[#F2EEE6]">Filter Siluet</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="text-[#888] hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div>
                <h4 className="text-xs font-mono text-[#C9A45C] uppercase mb-2">Koleksi</h4>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'all', label: 'SEMUA KOLEKSI' },
                    { id: 'women', label: 'WANITA' },
                    { id: 'men', label: 'PRIA' },
                    { id: 'denim', label: 'ARSIP DENIM' },
                    { id: 'new-arrivals', label: 'PRODUK BARU' },
                    { id: 'best-sellers', label: 'TERLARIS' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`block w-full text-left py-1 cursor-pointer ${
                        selectedCategory === c.id ? 'text-[#C9A45C] font-bold' : 'text-[#888]'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Fit */}
              <div>
                <h4 className="text-xs font-mono text-[#C9A45C] uppercase mb-2">Bentuk Potongan</h4>
                <div className="space-y-1 text-xs">
                  {['all', ...availableFits].map(f => (
                    <button
                      key={f}
                      onClick={() => setSelectedFit(f)}
                      className={`block w-full text-left py-1 cursor-pointer ${
                        selectedFit === f ? 'text-[#C9A45C] font-bold' : 'text-[#888]'
                      }`}
                    >
                      {f === 'all' ? 'SEMUA POTONGAN' : f.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Size */}
              <div>
                <h4 className="text-xs font-mono text-[#C9A45C] uppercase mb-2">Ukuran</h4>
                <div className="grid grid-cols-4 gap-1">
                  {['all', ...availableSizes].map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1 text-xs font-mono border cursor-pointer ${
                        selectedSize === s ? 'bg-[#C9A45C] text-black font-bold' : 'border-[#333] text-[#888]'
                      }`}
                    >
                      {s === 'all' ? 'SEMUA' : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#222] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 border border-[#333] text-xs uppercase tracking-wider text-[#888] cursor-pointer"
              >
                Atur Ulang
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#C9A45C] text-black font-semibold text-xs uppercase tracking-wider cursor-pointer"
              >
                Terapkan ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
