import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ASSET_IMAGES, StoreService } from '../services/store';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, onOpenSearch }) => {
  const { openCart, totalItems, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(() => StoreService.getStoreSettings());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStoreChange = () => {
      setSettings(StoreService.getStoreSettings());
    };
    window.addEventListener('luxury-store-updated', handleStoreChange);
    return () => window.removeEventListener('luxury-store-updated', handleStoreChange);
  }, []);

  const navLinks = [
    { label: 'PRODUK BARU', path: '/new-arrivals' },
    { label: 'WANITA', path: '/women' },
    { label: 'PRIA', path: '/men' },
    { label: 'DENIM', path: '/denim' },
    { label: 'TERLARIS', path: '/best-sellers' },
    { label: 'LOOKBOOK', path: '/lookbook' },
    { label: 'TENTANG KAMI', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isHeroPage = currentPath === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || !isHeroPage
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#C9A45C]/20 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Wordmark */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('/')}
                className="group flex items-center gap-2.5 text-left focus:outline-none"
              >
                <img
                  src={ASSET_IMAGES.logo}
                  alt="Luxury Clothes Monogram"
                  className="w-8 h-8 rounded-full border border-[#C9A45C]/30 object-cover group-hover:border-[#C9A45C] transition-colors"
                />
                <span className="font-serif tracking-[0.22em] text-lg sm:text-xl font-medium text-[#F2EEE6] group-hover:text-[#C9A45C] transition-colors">
                  {settings.brandName || 'LUXURY CLOTHES'}
                </span>
              </button>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[12px] font-medium tracking-[0.16em] text-[#C5C0B6]">
              {navLinks.map(link => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`relative py-1 hover:text-[#F2EEE6] transition-colors ${
                      isActive ? 'text-[#C9A45C]' : ''
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C9A45C]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4 sm:gap-5 text-[#F2EEE6]">
              {/* Search */}
              <button
                onClick={onOpenSearch}
                aria-label="Search collection"
                className="p-1 hover:text-[#C9A45C] transition-colors"
                title="Search Products"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => handleNavClick('/account')}
                aria-label="Wishlist"
                className="relative p-1 hover:text-[#C9A45C] transition-colors hidden sm:block"
                title="Saved Items"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-[#C9A45C] text-black text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account / Admin shortcut */}
              <button
                onClick={() => handleNavClick('/account')}
                aria-label="Account"
                className="p-1 hover:text-[#C9A45C] transition-colors hidden sm:block"
                title="Customer Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Admin Portal link */}
              <button
                onClick={() => handleNavClick('/admin')}
                aria-label="Admin Dashboard"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-[11px] tracking-wider uppercase border border-[#C9A45C]/40 text-[#C9A45C] hover:bg-[#C9A45C]/10 transition-colors"
                title="Access Admin CMS"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>

              {/* Shopping Bag */}
              <button
                onClick={openCart}
                aria-label="Shopping bag"
                className="relative p-1.5 hover:text-[#C9A45C] transition-colors"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A45C] text-black text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label="Toggle navigation menu"
                className="p-1.5 lg:hidden hover:text-[#C9A45C] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-6 overflow-y-auto lg:hidden animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#222]">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSET_IMAGES.logo}
                  alt="Luxury Clothes"
                  className="w-8 h-8 rounded-full border border-[#C9A45C]/40"
                />
                <span className="font-serif tracking-[0.2em] text-lg text-[#F2EEE6]">
                  {settings.brandName || 'LUXURY CLOTHES'}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#C5C0B6] hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-8 flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="text-left font-serif text-2xl tracking-[0.12em] text-[#F2EEE6] hover:text-[#C9A45C] transition-colors flex items-center justify-between py-1"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#C9A45C] font-mono">0{idx + 1}</span>
                </button>
              ))}

              <div className="pt-4 border-t border-[#1F1F1F] flex flex-col space-y-4">
                <button
                  onClick={() => handleNavClick('/shop')}
                  className="text-left text-sm tracking-widest uppercase text-[#C9A45C] hover:underline"
                >
                  LIHAT SEMUA SILUET →
                </button>
                <button
                  onClick={() => handleNavClick('/account')}
                  className="text-left text-sm tracking-widest uppercase text-[#A39E93] hover:text-white"
                >
                  AKUN & RIWAYAT PESANAN
                </button>
                <button
                  onClick={() => handleNavClick('/admin')}
                  className="text-left text-sm tracking-widest uppercase text-[#C9A45C] flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  DASHBOARD ADMIN CMS
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1C1C1C] text-xs text-[#807B72]">
            <p className="tracking-widest uppercase text-[#C9A45C] mb-1 font-serif">
              {settings.tagline || 'THE ART OF EVERYDAY DENIM'}
            </p>
            <p>Pacific Place SCBD • Jakarta</p>
          </div>
        </div>
      )}
    </>
  );
};
