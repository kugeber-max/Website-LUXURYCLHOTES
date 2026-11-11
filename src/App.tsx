import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchOverlay } from './components/SearchOverlay';
import { CartDrawer } from './components/CartDrawer';
import { ToastNotification } from './components/ToastNotification';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LookbookPage } from './pages/LookbookPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Product } from './types';

function AppContent() {
  const getPathFromLocation = (): string => {
    if (typeof window === 'undefined') return '/';
    // If loaded with hash (e.g. /#/shop or /#shop)
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      return window.location.hash.slice(1) || '/';
    }
    const p = window.location.pathname;
    return p === '' ? '/' : p;
  };

  const [currentPath, setCurrentPath] = useState<string>(getPathFromLocation);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart } = useCart();

  // Listen to browser navigation (back/forward and hash changes)
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(getPathFromLocation());
    };
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  // Sync document title for SEO & Luxury UX
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      document.title = 'LUXURY CLOTHES — Premium Denim & Contemporary Fashion';
    } else if (currentPath === '/shop') {
      document.title = 'Katalog Lengkap — LUXURY CLOTHES';
    } else if (currentPath === '/women') {
      document.title = 'Koleksi Wanita — LUXURY CLOTHES';
    } else if (currentPath === '/men') {
      document.title = 'Koleksi Pria — LUXURY CLOTHES';
    } else if (currentPath === '/denim') {
      document.title = 'Arsip Denim Signature — LUXURY CLOTHES';
    } else if (currentPath === '/new-arrivals') {
      document.title = 'Produk Rilisan Baru — LUXURY CLOTHES';
    } else if (currentPath === '/best-sellers') {
      document.title = 'Siluet Terlaris — LUXURY CLOTHES';
    } else if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '');
      const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      document.title = `${name} — LUXURY CLOTHES`;
    } else if (currentPath === '/lookbook') {
      document.title = 'The Denim Edit Lookbook Vol. IV — LUXURY CLOTHES';
    } else if (currentPath === '/about') {
      document.title = 'Kisah Kami & Pengerjaan Denim — LUXURY CLOTHES';
    } else if (currentPath === '/contact') {
      document.title = 'Concierge Klien & Salon SCBD — LUXURY CLOTHES';
    } else if (currentPath === '/checkout') {
      document.title = 'Pembayaran Aman — LUXURY CLOTHES';
    } else if (currentPath === '/account') {
      document.title = 'Akun Klien & Riwayat Pesanan — LUXURY CLOTHES';
    } else if (currentPath === '/admin') {
      document.title = 'Dashboard Admin CMS — LUXURY CLOTHES';
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.startsWith('#/')) {
      window.location.hash = '#' + path;
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    navigate(`/product/${product.slug}`);
  };

  const handleSelectProductBySlug = (slug: string) => {
    navigate(`/product/${slug}`);
  };

  // Route matching
  let renderedPage = null;

  if (currentPath === '/' || currentPath === '') {
    renderedPage = (
      <HomePage
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/shop') {
    renderedPage = (
      <ShopPage
        initialCategory="all"
        pageTitle="THE COMPLETE CATALOG"
        pageSubtitle="All silhouettes, architectural wide-leg cuts, sculpted flares, and artisan washes."
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/women') {
    renderedPage = (
      <ShopPage
        initialCategory="women"
        pageTitle="WOMEN COLLECTION"
        pageSubtitle="Sculpted high-waist flares, wide-leg profiles, and leg-lengthening silhouettes."
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/men') {
    renderedPage = (
      <ShopPage
        initialCategory="men"
        pageTitle="MEN COLLECTION"
        pageSubtitle="Architectural straight cuts, heavy-gauge relaxed denim, and contemporary attitude."
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/denim') {
    renderedPage = (
      <ShopPage
        initialCategory="denim"
        pageTitle="SIGNATURE DENIM ARCHIVE"
        pageSubtitle="Iconic silhouettes engineered with ring-spun cotton and artisan washes."
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/new-arrivals') {
    renderedPage = (
      <ShopPage
        initialCategory="new-arrivals"
        pageTitle="NEW ARRIVALS"
        pageSubtitle="The latest seasonal drops from our studio atelier."
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/best-sellers') {
    renderedPage = (
      <ShopPage
        initialCategory="best-sellers"
        pageTitle="BEST SELLERS"
        pageSubtitle="The most celebrated silhouettes chosen by our private clientele."
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath.startsWith('/product/')) {
    const slug = currentPath.replace('/product/', '');
    renderedPage = (
      <ProductDetailPage
        slug={slug}
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/lookbook') {
    renderedPage = (
      <LookbookPage
        navigate={navigate}
        onSelectProductBySlug={handleSelectProductBySlug}
      />
    );
  } else if (currentPath === '/about') {
    renderedPage = <AboutPage navigate={navigate} />;
  } else if (currentPath === '/contact') {
    renderedPage = <ContactPage navigate={navigate} />;
  } else if (currentPath === '/checkout') {
    renderedPage = <CheckoutPage navigate={navigate} />;
  } else if (currentPath === '/cart') {
    renderedPage = (
      <CartPage
        navigate={navigate}
        onSelectProductBySlug={handleSelectProductBySlug}
      />
    );
  } else if (currentPath === '/account') {
    renderedPage = (
      <AccountPage
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  } else if (currentPath === '/admin') {
    renderedPage = <AdminDashboard navigate={navigate} />;
  } else {
    // Fallback to Home
    renderedPage = (
      <HomePage
        navigate={navigate}
        onSelectProduct={handleSelectProduct}
      />
    );
  }

  const isAdminPage = currentPath === '/admin';

  return (
    <div className="min-h-screen bg-[#080808] text-[#F2EEE6] flex flex-col font-sans selection:bg-[#C9A45C] selection:text-black">
      {/* Navbar (Hidden on full Admin page for maximum CMS screen space, with toggle) */}
      {!isAdminPage && (
        <Navbar
          currentPath={currentPath}
          navigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
        />
      )}

      {/* Main Page Content */}
      <main className="flex-1">{renderedPage}</main>

      {/* Footer (Hidden on Admin page) */}
      {!isAdminPage && <Footer navigate={navigate} />}

      {/* Global Interactive Overlays */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={p => {
          setSearchOpen(false);
          handleSelectProduct(p);
        }}
        onSearchTag={tag => {
          setSearchOpen(false);
          navigate(`/shop?q=${encodeURIComponent(tag)}`);
        }}
      />

      <QuickViewModal onNavigateToProduct={handleSelectProductBySlug} />
      <SizeGuideModal />
      <CartDrawer
        onCheckout={() => navigate('/checkout')}
        onNavigateToProduct={handleSelectProductBySlug}
      />
      <ToastNotification />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
