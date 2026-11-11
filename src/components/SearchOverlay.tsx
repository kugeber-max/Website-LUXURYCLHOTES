import React, { useState, useEffect, useRef } from 'react';
import { StoreService } from '../services/store';
import { Product } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchTag: (tag: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchTag
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedTags = ['WIDE LEG', 'FLARE', 'BLACK DENIM', 'NEW ARRIVALS', 'BEST SELLERS'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const all = StoreService.getProducts();
    const matches = all.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fit.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.collections.some(c => c.toLowerCase().includes(q))
      );
    });
    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  return (
    <div className="fixed inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1F1F1F]">
          <span className="text-xs font-mono tracking-[0.2em] text-[#C9A45C] uppercase">
            LIVE SEARCH
          </span>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-2 text-[#8F8A7F] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Heading & Input */}
        <div className="py-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-wide mb-4 text-center sm:text-left">
            APA YANG SEDANG ANDA CARI?
          </h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A45C]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari produk, siluet potongan, warna, atau koleksi..."
              className="w-full bg-[#111] border border-[#2B2B2B] pl-12 pr-10 py-4 text-[#F2EEE6] text-base placeholder-[#635D52] focus:border-[#C9A45C] focus:outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8F8A7F] hover:text-white"
              >
                HAPUS
              </button>
            )}
          </div>

          {/* Suggested searches */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#736E63] uppercase tracking-wider">
              SARAN:
            </span>
            {suggestedTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  onSearchTag(tag);
                }}
                className="text-xs tracking-wider uppercase px-3 py-1 bg-[#141414] hover:bg-[#C9A45C]/15 border border-[#262626] hover:border-[#C9A45C] text-[#C5C0B6] hover:text-[#C9A45C] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto pt-2 pb-8">
          {query.trim() && results.length === 0 ? (
            <div className="text-center py-12 text-[#8F8A7F]">
              <p className="font-serif text-xl text-[#F2EEE6] mb-1">Siluet tidak ditemukan</p>
              <p className="text-xs">Coba kata kunci &quot;Wide Leg&quot;, &quot;Flare&quot;, atau &quot;Denim&quot;.</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-xs font-mono text-[#C9A45C] tracking-widest uppercase mb-4">
                DITEMUKAN {results.length} SILUET
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="flex gap-4 p-3 bg-[#111] border border-[#1F1F1F] hover:border-[#C9A45C]/50 cursor-pointer transition-all group"
                  >
                    <div className="w-16 h-20 bg-black shrink-0 overflow-hidden border border-[#262626]">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col justify-between overflow-hidden">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F8A7F]">
                          {product.fit}
                        </span>
                        <h4 className="font-serif text-sm text-[#F2EEE6] group-hover:text-[#C9A45C] transition-colors truncate">
                          {product.name}
                        </h4>
                      </div>
                      <span className="font-mono text-xs text-[#C9A45C]">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#6B6559]">
              <p className="font-serif text-lg text-[#8F8A7F]">Jelajahi Siluet Ikonik</p>
              <p className="text-xs mt-1">Mulai ketik untuk mencari di katalog mewah kami</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
