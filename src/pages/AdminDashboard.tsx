import React, { useState, useEffect } from 'react';
import { StoreService, ASSET_IMAGES } from '../services/store';
import {
  Product,
  Order,
  Customer,
  PromoCode,
  HomepageConfig,
  StoreSettings,
  CollectionItem,
  Banner,
  ProductBadge,
  ProductCategory,
  ProductFit
} from '../types';
import { useCart } from '../context/CartContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Percent,
  Sliders,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Save,
  Check,
  X,
  AlertTriangle,
  ArrowUpRight,
  LogOut,
  RefreshCw,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  navigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
  const { showToast } = useCart();

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    StoreService.isAdminAuthenticated()
  );
  const [loginEmail, setLoginEmail] = useState('admin@luxuryclothes.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'stock' | 'collections' | 'banners' | 'orders' | 'customers' | 'promos' | 'homepage' | 'settings'
  >('overview');

  // Loaded Data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() =>
    StoreService.getHomepageConfig()
  );
  const [settings, setStoreSettings] = useState<StoreSettings>(() =>
    StoreService.getStoreSettings()
  );

  // Search & Filter state for product management
  const [productSearch, setProductSearch] = useState('');

  // Editing Product Modal / Form
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  // Quick Inline Price Editing
  const [quickPriceEditId, setQuickPriceEditId] = useState<string | null>(null);
  const [quickPriceValue, setQuickPriceValue] = useState<number>(0);
  const [quickSalePriceValue, setQuickSalePriceValue] = useState<number | undefined>(undefined);

  // Refresh data from StoreService
  const refreshData = () => {
    setProducts(StoreService.getProducts());
    setOrders(StoreService.getOrders());
    setCustomers(StoreService.getCustomers());
    setPromos(StoreService.getPromoCodes());
    setCollections(StoreService.getCollections());
    setBanners(StoreService.getBanners());
    setHomepageConfig(StoreService.getHomepageConfig());
    setStoreSettings(StoreService.getStoreSettings());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener('luxury-store-updated', refreshData);
    return () => window.removeEventListener('luxury-store-updated', refreshData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@luxuryclothes.com' && loginPassword === 'admin123') {
      StoreService.setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setLoginError('');
      showToast('Admin session authenticated.');
    } else {
      setLoginError('Invalid credentials. Use admin@luxuryclothes.com / admin123');
    }
  };

  const handleLogout = () => {
    StoreService.setAdminAuthenticated(false);
    setIsAuthenticated(false);
    showToast('Admin logged out.');
  };

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  // Metrics calculation
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== 'CANCELLED' ? o.total : 0), 0);
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 15);
  const soldOutProducts = products.filter(p => p.stock <= 0);

  // Inline Price Edit Handler (Section 25)
  const startQuickPriceEdit = (product: Product) => {
    setQuickPriceEditId(product.id);
    setQuickPriceValue(product.price);
    setQuickSalePriceValue(product.salePrice);
  };

  const saveQuickPriceEdit = (productId: string) => {
    StoreService.updateProductPrice(productId, quickPriceValue, quickSalePriceValue);
    setQuickPriceEditId(null);
    showToast(`Price updated for ${products.find(p => p.id === productId)?.name} -> ${formatPrice(quickPriceValue)}`);
  };

  // Stock Edit Handler
  const handleStockChange = (productId: string, variantKey: string, delta: number) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const current = prod.variantStocks[variantKey] || 0;
    const next = Math.max(0, current + delta);
    StoreService.updateProductStock(productId, variantKey, next);
    showToast(`Stock updated: ${variantKey} is now ${next}`);
  };

  // Duplicate Product
  const handleDuplicateProduct = (p: Product) => {
    const newProduct: Product = {
      ...p,
      id: `prod-${Date.now()}`,
      slug: `${p.slug}-copy-${Math.floor(Math.random() * 999)}`,
      name: `${p.name} (Copy)`,
      sku: `${p.sku}-CPY`,
      createdAt: new Date().toISOString()
    };
    StoreService.saveProduct(newProduct);
    showToast(`Duplicated ${p.name}`);
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      StoreService.deleteProduct(id);
      showToast(`Deleted ${name}`);
    }
  };

  // Save Full Product
  const handleSaveProductModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    StoreService.saveProduct(editingProduct);
    setEditingProduct(null);
    setIsNewProductModalOpen(false);
    showToast(`Product ${editingProduct.name} saved successfully.`);
  };

  // Save Homepage CMS
  const handleSaveHomepageConfig = (e: React.FormEvent) => {
    e.preventDefault();
    StoreService.updateHomepageConfig(homepageConfig);
    showToast('Homepage CMS updated. Live changes reflected on store.');
  };

  // Save Store Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    StoreService.updateStoreSettings(settings);
    showToast('Store settings saved successfully.');
  };

  // Reset demo data
  const handleResetDemoData = () => {
    if (confirm('Reset database to initial luxury showroom defaults?')) {
      StoreService.resetAllData();
      showToast('Database reset to initial demo seeds.');
    }
  };

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#F2EEE6] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0E0E0E] border border-[#C9A45C]/40 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img
              src={ASSET_IMAGES.logo}
              alt="Luxury Clothes"
              className="w-12 h-12 rounded-full border border-[#C9A45C] mx-auto mb-3 object-cover"
            />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C9A45C]">
              CMS INTERNAL
            </span>
            <h1 className="font-serif text-2xl text-[#F2EEE6] tracking-wide mt-1">
              Autentikasi Administrator
            </h1>
            <p className="text-xs text-[#8F8A7F] font-mono mt-1">
              Akses terbatas khusus staf atelier berwenang.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-[#8F8A7F] uppercase mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
                className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8F8A7F] uppercase mb-1">Kata Sandi</label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
                className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
              />
            </div>

            {loginError && <p className="text-xs text-red-400">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-colors cursor-pointer"
            >
              MASUK KE DASHBOARD CMS
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#1C1C1C] flex justify-between items-center text-[11px] font-mono text-[#666]">
            <span>Akun demo: admin@luxuryclothes.com / admin123</span>
            <button onClick={() => navigate('/')} className="text-[#C9A45C] hover:underline cursor-pointer">
              Kembali ke Toko
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Products for Table
  const filteredProductsTable = products.filter(
    p =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.fit.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] text-[#F2EEE6] flex flex-col pt-16">
      {/* Top Admin Header Bar */}
      <header className="bg-[#0D0D0D] border-b border-[#1F1F1F] px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.logo}
            alt="Admin"
            className="w-7 h-7 rounded-full border border-[#C9A45C]/40 object-cover"
          />
          <span className="font-serif text-lg tracking-wider text-[#F2EEE6]">
            LUXURY CLOTHES <span className="text-xs font-mono text-[#C9A45C] tracking-widest uppercase">CMS</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#333] hover:border-[#C9A45C] text-[#C5C0B6] hover:text-[#C9A45C] transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Toko Live</span>
          </button>

          <button
            onClick={handleResetDemoData}
            title="Reset ke database awal showroom"
            className="p-1.5 text-[#888] hover:text-[#C9A45C] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-[#888] hover:text-red-400 p-1.5 transition-colors cursor-pointer"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Responsive Sidebar Navigation + Work Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-60 bg-[#0A0A0A] border-r border-[#171717] p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0 text-xs font-mono">
          {[
            { id: 'overview', label: 'Ringkasan Eksekutif', icon: LayoutDashboard },
            { id: 'products', label: 'Katalog Siluet', icon: Package },
            { id: 'stock', label: 'Stok & Varian', icon: Layers },
            { id: 'collections', label: 'Koleksi CMS', icon: Layers, count: collections.length },
            { id: 'banners', label: 'Banner & Promosi', icon: ImageIcon, count: banners.length },
            { id: 'orders', label: 'Pesanan Klien', icon: ShoppingBag, count: orders.length },
            { id: 'customers', label: 'Arsip Pelanggan', icon: Users, count: customers.length },
            { id: 'promos', label: 'Kode Promo', icon: Percent },
            { id: 'homepage', label: 'Editor Beranda', icon: Sliders },
            { id: 'settings', label: 'Pengaturan Toko', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-between px-3 py-2.5 transition-all text-left whitespace-nowrap md:whitespace-normal cursor-pointer ${
                  active
                    ? 'bg-[#C9A45C] text-black font-semibold'
                    : 'text-[#A39E93] hover:bg-[#141414] hover:text-[#F2EEE6]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded ${
                      active ? 'bg-black text-[#C9A45C]' : 'bg-[#1C1C1C] text-[#888]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                  RINGKASAN EKSEKUTIF
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                  Kinerja Toko & Penjualan
                </h2>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-[#0E0E0E] border border-[#1C1C1C] space-y-1">
                  <span className="text-[10px] font-mono text-[#888] uppercase">TOTAL PENDAPATAN</span>
                  <p className="font-mono text-xl sm:text-2xl text-[#C9A45C] font-bold">
                    {formatPrice(totalRevenue)}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono">+18.4% bulan ini</p>
                </div>

                <div className="p-5 bg-[#0E0E0E] border border-[#1C1C1C] space-y-1">
                  <span className="text-[10px] font-mono text-[#888] uppercase">TOTAL PESANAN</span>
                  <p className="font-mono text-xl sm:text-2xl text-[#F2EEE6] font-bold">
                    {totalOrdersCount}
                  </p>
                  <p className="text-[11px] text-[#888] font-mono">Tingkat pemenuhan 100%</p>
                </div>

                <div className="p-5 bg-[#0E0E0E] border border-[#1C1C1C] space-y-1">
                  <span className="text-[10px] font-mono text-[#888] uppercase">SILUET AKTIF</span>
                  <p className="font-mono text-xl sm:text-2xl text-[#F2EEE6] font-bold">
                    {totalProductsCount}
                  </p>
                  <p className="text-[11px] text-[#888] font-mono">{soldOutProducts.length} habis</p>
                </div>

                <div className="p-5 bg-[#0E0E0E] border border-[#1C1C1C] space-y-1">
                  <span className="text-[10px] font-mono text-[#888] uppercase">TOTAL PELANGGAN</span>
                  <p className="font-mono text-xl sm:text-2xl text-[#E1C27A] font-bold">
                    {totalCustomersCount}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono">Retensi klien tinggi</p>
                </div>
              </div>

              {/* Low Stock Warning Banner if any */}
              {lowStockProducts.length > 0 && (
                <div className="p-4 bg-amber-950/40 border border-amber-600/40 text-amber-200 text-xs font-mono flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>
                      <strong>Peringatan Stok:</strong> {lowStockProducts.length} siluet memiliki stok menipis di atelier.
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('stock')}
                    className="underline hover:text-white uppercase tracking-wider cursor-pointer"
                  >
                    Kelola Stok
                  </button>
                </div>
              )}

              {/* Visual Simulated Revenue & Order Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Trend Chart */}
                <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-lg text-[#F2EEE6]">Lintasan Pendapatan Bulanan</h3>
                    <span className="text-xs font-mono text-[#C9A45C]">Tahun Fiskal 2026</span>
                  </div>
                  {/* CSS Bars for Revenue */}
                  <div className="h-44 flex items-end gap-3 pt-6 pb-2 border-b border-[#222]">
                    {[
                      { month: 'Oct', val: 45, rev: 'Rp28.5M' },
                      { month: 'Nov', val: 60, rev: 'Rp38.2M' },
                      { month: 'Dec', val: 85, rev: 'Rp54.1M' },
                      { month: 'Jan', val: 70, rev: 'Rp44.8M' },
                      { month: 'Feb', val: 90, rev: 'Rp59.3M' },
                      { month: 'Mar', val: 100, rev: 'Rp68.9M' }
                    ].map(bar => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[9px] font-mono text-[#888] opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.rev}
                        </span>
                        <div
                          className="w-full bg-[#262626] group-hover:bg-[#C9A45C] transition-colors"
                          style={{ height: `${bar.val}%` }}
                        />
                        <span className="text-[10px] font-mono text-[#666]">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best Selling Silhouettes */}
                <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-4">
                  <h3 className="font-serif text-lg text-[#F2EEE6]">Top Performing Denim</h3>
                  <div className="space-y-3">
                    {products.slice(0, 4).map((p, idx) => (
                      <div key={p.id} className="flex items-center justify-between text-xs font-mono py-2 border-b border-[#1A1A1A]">
                        <div className="flex items-center gap-3">
                          <span className="text-[#C9A45C] font-bold">0{idx + 1}</span>
                          <span className="text-[#F2EEE6]">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[#888]">{p.fit}</span>
                          <span className="text-[#C9A45C] font-medium">{formatPrice(p.salePrice || p.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg text-[#F2EEE6]">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-xs font-mono text-[#C9A45C] hover:underline">
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#141414] text-[#888] border-b border-[#222]">
                      <tr>
                        <th className="py-2.5 px-3">Order</th>
                        <th className="py-2.5 px-3">Client</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Total</th>
                        <th className="py-2.5 px-3">Payment</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1A1A] text-[#C5C0B6]">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-[#121212]">
                          <td className="py-2.5 px-3 text-[#F2EEE6] font-bold">{o.orderNumber}</td>
                          <td className="py-2.5 px-3">{o.customer.name}</td>
                          <td className="py-2.5 px-3 text-[#888]">
                            {new Date(o.createdAt).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-2.5 px-3 text-[#C9A45C]">{formatPrice(o.total)}</td>
                          <td className="py-2.5 px-3">{o.paymentMethod}</td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 text-[10px] uppercase font-bold border border-[#333] bg-[#161616]">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS (FULL MANAGEMENT + INLINE PRICE EDITING) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                    CATALOG MANAGEMENT
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                    Silhouettes & Products ({products.length})
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `prod-${Date.now()}`,
                      slug: 'new-denim-silhouette',
                      name: 'New Tailored Denim',
                      sku: `LC-NEW-${Math.floor(10 + Math.random() * 90)}`,
                      description: 'Crafted with premium high-density cotton denim with timeless silhouette.',
                      price: 599000,
                      category: 'denim',
                      collections: ['new-arrivals', 'signature'],
                      fit: 'Wide Leg',
                      color: 'Classic Indigo',
                      availableColors: ['Classic Indigo', 'Washed Grey'],
                      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
                      stock: 30,
                      variantStocks: {
                        'Classic Indigo_XS': 5,
                        'Classic Indigo_S': 8,
                        'Classic Indigo_M': 10,
                        'Classic Indigo_L': 5,
                        'Classic Indigo_XL': 2
                      },
                      images: [ASSET_IMAGES.wideAngles, ASSET_IMAGES.heroDuo],
                      badge: 'NEW',
                      isFeatured: true,
                      isBestSeller: false,
                      isNewArrival: true,
                      status: 'published',
                      createdAt: new Date().toISOString(),
                      rating: 5.0,
                      reviewCount: 1,
                      details: ['100% Premium Cotton Denim', 'Artisanal wash finish']
                    });
                    setIsNewProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#E1C27A] flex items-center gap-2 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW PRODUCT</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-3 bg-[#0E0E0E] border border-[#1C1C1C]">
                <input
                  type="text"
                  placeholder="Filter by name, SKU, or fit..."
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-xs text-[#F2EEE6] font-mono focus:border-[#C9A45C] focus:outline-none"
                />
              </div>

              {/* Products Table with INLINE PRICE EDITING (Section 25 requirement) */}
              <div className="overflow-x-auto border border-[#1C1C1C]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#121212] text-[#888] border-b border-[#222]">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Silhouette Name & SKU</th>
                      <th className="py-3 px-4">Fit / Category</th>
                      <th className="py-3 px-4">Price (Inline Editable)</th>
                      <th className="py-3 px-4">Stock</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A] text-[#C5C0B6]">
                    {filteredProductsTable.map(p => {
                      const isEditingPrice = quickPriceEditId === p.id;
                      return (
                        <tr key={p.id} className="hover:bg-[#121212] transition-colors">
                          <td className="py-3 px-4">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-12 h-16 object-cover bg-black border border-[#262626]"
                            />
                          </td>

                          <td className="py-3 px-4">
                            <p className="font-serif text-sm text-[#F2EEE6]">{p.name}</p>
                            <p className="text-[10px] text-[#777]">SKU: {p.sku}</p>
                          </td>

                          <td className="py-3 px-4">
                            <span className="text-[#C9A45C]">{p.fit}</span>
                            <span className="text-[#666] block text-[10px] uppercase">{p.category}</span>
                          </td>

                          {/* INLINE PRICE EDITING CELL */}
                          <td className="py-3 px-4">
                            {isEditingPrice ? (
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  value={quickPriceValue}
                                  onChange={e => setQuickPriceValue(Number(e.target.value))}
                                  className="w-24 bg-[#1B1B1B] border border-[#C9A45C] px-2 py-1 text-xs text-[#F2EEE6] font-mono"
                                />
                                <button
                                  onClick={() => saveQuickPriceEdit(p.id)}
                                  className="p-1 bg-[#C9A45C] text-black hover:bg-[#E1C27A]"
                                  title="Save price change"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setQuickPriceEditId(null)}
                                  className="p-1 text-[#888] hover:text-white"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 group">
                                <span className="font-bold text-[#F2EEE6]">{formatPrice(p.price)}</span>
                                {p.salePrice && (
                                  <span className="text-[10px] text-[#E1C27A]">
                                    (Sale: {formatPrice(p.salePrice)})
                                  </span>
                                )}
                                <button
                                  onClick={() => startQuickPriceEdit(p)}
                                  className="opacity-0 group-hover:opacity-100 text-[#C9A45C] hover:underline text-[10px]"
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            {p.stock <= 0 ? (
                              <span className="text-red-400 font-bold">SOLD OUT</span>
                            ) : p.stock < 10 ? (
                              <span className="text-amber-400 font-bold">{p.stock} (LOW)</span>
                            ) : (
                              <span className="text-emerald-400">{p.stock} in stock</span>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 text-[10px] border border-[#333] uppercase">
                              {p.status}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct({ ...p });
                                  setIsNewProductModalOpen(true);
                                }}
                                title="Edit Full Product & Photos"
                                className="p-1.5 text-[#888] hover:text-[#C9A45C]"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDuplicateProduct(p)}
                                title="Duplicate Product"
                                className="p-1.5 text-[#888] hover:text-white"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                title="Delete Product"
                                className="p-1.5 text-[#888] hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: STOCK & VARIANTS (SECTION 27-28) */}
          {activeTab === 'stock' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                  INVENTORY CONTROL
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                  Stock Management by Variant
                </h2>
                <p className="text-xs text-[#8F8A7F] font-mono mt-1">
                  Adjust quantities for each size & color variant. Changes automatically reflect on the product page.
                </p>
              </div>

              <div className="space-y-6">
                {products.map(p => (
                  <div key={p.id} className="bg-[#0E0E0E] border border-[#1C1C1C] p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1A1A1A] gap-2">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-black border border-[#222]" />
                        <div>
                          <h4 className="font-serif text-lg text-[#F2EEE6]">{p.name}</h4>
                          <p className="text-xs font-mono text-[#888]">SKU: {p.sku} • Total Stock: {p.stock}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#C9A45C] font-semibold">
                        {formatPrice(p.price)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {p.availableSizes.map(size => {
                        const defaultColor = p.availableColors[0] || p.color;
                        const vKey = `${defaultColor}_${size}`;
                        const qty = p.variantStocks[vKey] !== undefined ? p.variantStocks[vKey] : 0;
                        return (
                          <div
                            key={size}
                            className={`p-3 border text-xs font-mono space-y-2 ${
                              qty === 0 ? 'bg-red-950/20 border-red-900/40' : qty < 5 ? 'bg-amber-950/20 border-amber-900/40' : 'bg-[#141414] border-[#222]'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-[#F2EEE6]">{size}</span>
                              <span className={qty === 0 ? 'text-red-400' : qty < 5 ? 'text-amber-400' : 'text-emerald-400'}>
                                {qty === 0 ? 'SOLD OUT' : `${qty} left`}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1 pt-1">
                              <button
                                onClick={() => handleStockChange(p.id, vKey, -1)}
                                className="px-2 py-1 bg-[#222] hover:bg-[#333] text-white"
                              >
                                -1
                              </button>
                              <span className="font-bold text-center flex-1">{qty}</span>
                              <button
                                onClick={() => handleStockChange(p.id, vKey, 1)}
                                className="px-2 py-1 bg-[#222] hover:bg-[#333] text-white"
                              >
                                +1
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: COLLECTIONS CMS (SECTION 29) */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                    EDITORIAL CURATION
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                    Collection Management ({collections.length})
                  </h2>
                </div>

                <button
                  onClick={() => {
                    const name = prompt('Enter new Collection Name (e.g. RAW BLACK DENIM):');
                    if (!name) return;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    const newCol: CollectionItem = {
                      id: `col-${Date.now()}`,
                      name,
                      slug,
                      description: 'Curated editorial selection of signature silhouettes.',
                      image: ASSET_IMAGES.wideAngles,
                      badge: 'SPECIAL RELEASE'
                    };
                    StoreService.saveCollection(newCol);
                    refreshData();
                    showToast(`Created collection: ${name}`);
                  }}
                  className="px-4 py-2 bg-[#C9A45C] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD COLLECTION</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collections.map(col => {
                  const matchingProducts = products.filter(
                    p => p.collections.includes(col.slug) || p.category === col.slug
                  );
                  return (
                    <div key={col.id} className="bg-[#0E0E0E] border border-[#1C1C1C] overflow-hidden flex flex-col justify-between">
                      <div className="relative aspect-[16/9] bg-black overflow-hidden border-b border-[#222]">
                        <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                          <h3 className="font-serif text-xl text-[#F2EEE6]">{col.name}</h3>
                        </div>
                      </div>

                      <div className="p-4 space-y-3 font-mono text-xs">
                        <p className="text-[#888] line-clamp-2">{col.description}</p>
                        <div className="flex justify-between text-[#C9A45C] pt-2 border-t border-[#1C1C1C]">
                          <span>Assigned Products:</span>
                          <span className="font-bold">{matchingProducts.length} Silhouettes</span>
                        </div>

                        {/* Quick toggle list */}
                        <div className="pt-2 space-y-1 max-h-36 overflow-y-auto">
                          {products.map(p => {
                            const isIncluded = p.collections.includes(col.slug);
                            return (
                              <button
                                key={p.id}
                                onClick={() => {
                                  const updatedCols = isIncluded
                                    ? p.collections.filter(c => c !== col.slug)
                                    : [...p.collections, col.slug];
                                  StoreService.saveProduct({ ...p, collections: updatedCols });
                                  refreshData();
                                  showToast(`${isIncluded ? 'Removed' : 'Added'} ${p.name} to ${col.name}`);
                                }}
                                className={`w-full text-left px-2 py-1 flex items-center justify-between text-[11px] border transition-colors ${
                                  isIncluded
                                    ? 'bg-[#C9A45C]/15 border-[#C9A45C]/50 text-[#F2EEE6]'
                                    : 'border-transparent text-[#777] hover:text-[#999]'
                                }`}
                              >
                                <span className="truncate max-w-[170px]">{p.name}</span>
                                <span className="font-bold">{isIncluded ? '✓ INCLUDED' : '+ ADD'}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: BANNERS & PROMO MANAGEMENT (SECTION 31) */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                    STOREFRONT PROMOTION
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                    Promotional Banners ({banners.length})
                  </h2>
                </div>

                <button
                  onClick={() => {
                    const newBanner = {
                      id: `ban-${Date.now()}`,
                      title: 'EXCLUSIVE CLIENT DROP',
                      subtitle: 'Complimentary shipping & private tailoring consult.',
                      image: ASSET_IMAGES.heroDuo,
                      buttonText: 'SHOP THE EDIT',
                      buttonLink: '/shop',
                      startDate: '2026-03-01',
                      endDate: '2026-12-31',
                      status: 'active' as const
                    };
                    StoreService.saveBanner(newBanner);
                    refreshData();
                    showToast('Created new promotional banner.');
                  }}
                  className="px-4 py-2 bg-[#C9A45C] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW BANNER</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map(banner => (
                  <div key={banner.id} className="bg-[#0E0E0E] border border-[#1C1C1C] overflow-hidden flex flex-col justify-between">
                    <div className="relative aspect-[16/7] bg-black overflow-hidden border-b border-[#222]">
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4">
                        <span className={`self-start px-2 py-0.5 text-[9px] font-mono uppercase mb-1 font-bold ${
                          banner.status === 'active' ? 'bg-[#C9A45C] text-black' : 'bg-red-950 text-red-400'
                        }`}>
                          {banner.status}
                        </span>
                        <h4 className="font-serif text-lg text-[#F2EEE6]">{banner.title}</h4>
                        <p className="text-xs text-[#8F8A7F] font-mono">{banner.subtitle}</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 font-mono text-xs">
                      <div className="flex justify-between text-[#888]">
                        <span>Button CTA:</span>
                        <span className="text-[#F2EEE6]">{banner.buttonText} → {banner.buttonLink}</span>
                      </div>
                      <div className="flex justify-between text-[#888]">
                        <span>Schedule:</span>
                        <span>{banner.startDate} to {banner.endDate}</span>
                      </div>

                      <div className="pt-2 border-t border-[#1C1C1C] flex justify-end gap-2">
                        <button
                          onClick={() => {
                            const updated = {
                              ...banner,
                              status: banner.status === 'active' ? 'inactive' as const : 'active' as const
                            };
                            StoreService.saveBanner(updated);
                            refreshData();
                            showToast(`Banner status changed to ${updated.status}`);
                          }}
                          className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#262626] text-xs text-[#C5C0B6]"
                        >
                          {banner.status === 'active' ? 'Disable Banner' : 'Enable Banner'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS (SECTION 33) */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                  SALES FULFILLMENT
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                  Customer Orders ({orders.length})
                </h2>
              </div>

              <div className="overflow-x-auto border border-[#1C1C1C]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#121212] text-[#888] border-b border-[#222]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A] text-[#C5C0B6]">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-[#121212]">
                        <td className="py-3 px-4">
                          <p className="font-bold text-[#F2EEE6]">{order.orderNumber}</p>
                          <p className="text-[10px] text-[#777]">{new Date(order.createdAt).toLocaleDateString('id-ID')}</p>
                        </td>

                        <td className="py-3 px-4">
                          <p className="text-[#F2EEE6] font-medium">{order.customer.name}</p>
                          <p className="text-[10px] text-[#888]">{order.customer.phone}</p>
                          <p className="text-[10px] text-[#777]">{order.customer.city}</p>
                        </td>

                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {order.items.map((it, i) => (
                              <p key={i} className="text-[11px] truncate max-w-xs">
                                {it.quantity}x {it.name} ({it.size})
                              </p>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-[#C9A45C] font-bold">
                          {formatPrice(order.total)}
                        </td>

                        <td className="py-3 px-4">{order.paymentMethod}</td>

                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={e => {
                              const newStatus = e.target.value as Order['status'];
                              StoreService.updateOrderStatus(order.id, newStatus);
                              showToast(`Order ${order.orderNumber} status changed to ${newStatus}`);
                            }}
                            className="bg-[#161616] border border-[#333] text-[#F2EEE6] px-2 py-1 text-xs focus:border-[#C9A45C] focus:outline-none"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PAID">PAID</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS (SECTION 34) */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                  CRM ARCHIVE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                  Private Clients ({customers.length})
                </h2>
              </div>

              <div className="overflow-x-auto border border-[#1C1C1C]">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#121212] text-[#888] border-b border-[#222]">
                    <tr>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Total Orders</th>
                      <th className="py-3 px-4">Total Spending</th>
                      <th className="py-3 px-4">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A] text-[#C5C0B6]">
                    {customers.map(c => (
                      <tr key={c.id} className="hover:bg-[#121212]">
                        <td className="py-3 px-4 text-[#F2EEE6] font-medium">{c.name}</td>
                        <td className="py-3 px-4 text-[#888]">{c.email}</td>
                        <td className="py-3 px-4">{c.phone}</td>
                        <td className="py-3 px-4">{c.city}</td>
                        <td className="py-3 px-4 font-bold">{c.totalOrders}</td>
                        <td className="py-3 px-4 text-[#C9A45C] font-bold">{formatPrice(c.totalSpending)}</td>
                        <td className="py-3 px-4 text-[#777]">{c.lastOrderDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PROMOTIONS (SECTION 32) */}
          {activeTab === 'promos' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                    PROMO & VOUCHER ENGINE
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                    Promotional Codes
                  </h2>
                </div>

                <button
                  onClick={() => {
                    const newPromo: PromoCode = {
                      id: `promo-${Date.now()}`,
                      code: `VIP${Math.floor(10 + Math.random() * 90)}`,
                      discountPercent: 15,
                      minSpend: 400000,
                      maxDiscount: 150000,
                      validFrom: '2026-01-01',
                      validUntil: '2026-12-31',
                      isActive: true
                    };
                    StoreService.savePromoCode(newPromo);
                    showToast(`Created promo code ${newPromo.code}`);
                  }}
                  className="px-4 py-2 bg-[#C9A45C] text-black font-semibold text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD PROMO CODE</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promos.map(pr => (
                  <div key={pr.id} className="p-5 bg-[#0E0E0E] border border-[#1C1C1C] space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-base font-bold text-[#C9A45C] tracking-wider">{pr.code}</span>
                        <p className="text-[11px] text-[#888]">{pr.discountPercent}% OFF (Min spend {formatPrice(pr.minSpend)})</p>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] ${pr.isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                        {pr.isActive ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#777] space-y-1">
                      <p>Max Discount: {formatPrice(pr.maxDiscount)}</p>
                      <p>Valid until: {pr.validUntil}</p>
                    </div>

                    <div className="pt-2 border-t border-[#1C1C1C] flex justify-end gap-2">
                      <button
                        onClick={() => {
                          const updated = { ...pr, isActive: !pr.isActive };
                          StoreService.savePromoCode(updated);
                          showToast(`Toggled ${pr.code} to ${updated.isActive ? 'Active' : 'Inactive'}`);
                        }}
                        className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#262626] text-xs"
                      >
                        {pr.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => {
                          StoreService.deletePromoCode(pr.id);
                          showToast(`Deleted ${pr.code}`);
                        }}
                        className="p-1 text-[#888] hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: HOMEPAGE CMS EDITOR (SECTION 30) */}
          {activeTab === 'homepage' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                  WYSIWYG CONTENT MANAGEMENT
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                  Homepage Editor
                </h2>
                <p className="text-xs text-[#8F8A7F] font-mono mt-1">
                  Edit copy, banners, and headlines without code. Changes reflect instantly on the customer frontend.
                </p>
              </div>

              <form onSubmit={handleSaveHomepageConfig} className="space-y-6 text-xs font-mono">
                {/* Hero Settings */}
                <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-4">
                  <h3 className="font-serif text-lg text-[#F2EEE6] pb-2 border-b border-[#1A1A1A]">
                    Hero Section
                  </h3>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Hero Title</label>
                    <input
                      type="text"
                      value={homepageConfig.heroTitle}
                      onChange={e => setHomepageConfig({ ...homepageConfig, heroTitle: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-2.5 text-[#F2EEE6] font-serif text-lg focus:border-[#C9A45C] focus:outline-none"
                    />
                    <span className="text-[10px] text-[#666]">Example: &quot;THE ART OF DENIM&quot; or &quot;THE NEW ERA OF DENIM&quot;</span>
                  </div>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={homepageConfig.heroSubtitle}
                      onChange={e => setHomepageConfig({ ...homepageConfig, heroSubtitle: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-2.5 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Primary CTA Button</label>
                      <input
                        type="text"
                        value={homepageConfig.heroCtaText}
                        onChange={e => setHomepageConfig({ ...homepageConfig, heroCtaText: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Secondary CTA Button</label>
                      <input
                        type="text"
                        value={homepageConfig.secondaryCtaText}
                        onChange={e => setHomepageConfig({ ...homepageConfig, secondaryCtaText: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Announcement Marquee Ticker</label>
                    <input
                      type="text"
                      value={homepageConfig.announcementMarquee}
                      onChange={e => setHomepageConfig({ ...homepageConfig, announcementMarquee: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                    />
                  </div>
                </div>

                {/* Brand Intro & Campaign */}
                <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-4">
                  <h3 className="font-serif text-lg text-[#F2EEE6] pb-2 border-b border-[#1A1A1A]">
                    Brand Intro & Campaign
                  </h3>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Brand Intro Heading</label>
                    <input
                      type="text"
                      value={homepageConfig.brandIntroTitle}
                      onChange={e => setHomepageConfig({ ...homepageConfig, brandIntroTitle: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Brand Intro Body</label>
                    <textarea
                      rows={3}
                      value={homepageConfig.brandIntroBody}
                      onChange={e => setHomepageConfig({ ...homepageConfig, brandIntroBody: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Campaign Headline</label>
                    <input
                      type="text"
                      value={homepageConfig.campaignTitle}
                      onChange={e => setHomepageConfig({ ...homepageConfig, campaignTitle: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Editorial Quote</label>
                    <input
                      type="text"
                      value={homepageConfig.editorialQuote}
                      onChange={e => setHomepageConfig({ ...homepageConfig, editorialQuote: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>PUBLISH HOMEPAGE CHANGES</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: STORE SETTINGS (SECTION 39) */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
                  STORE CONFIGURATION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
                  Store Settings
                </h2>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 text-xs font-mono">
                <div className="p-6 bg-[#0E0E0E] border border-[#1C1C1C] space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={settings.brandName}
                        onChange={e => setStoreSettings({ ...settings, brandName: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Brand Tagline</label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={e => setStoreSettings({ ...settings, tagline: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888] uppercase mb-1">WhatsApp Concierge</label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={e => setStoreSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Support Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={e => setStoreSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Default Flat Shipping (IDR)</label>
                      <input
                        type="number"
                        value={settings.shippingFee}
                        onChange={e => setStoreSettings({ ...settings, shippingFee: Number(e.target.value) })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] uppercase mb-1">Free Shipping Threshold (IDR)</label>
                      <input
                        type="number"
                        value={settings.freeShippingThreshold}
                        onChange={e => setStoreSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#888] uppercase mb-1">Boutique Atelier Address</label>
                    <textarea
                      rows={2}
                      value={settings.address}
                      onChange={e => setStoreSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-[#F2EEE6]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE STORE SETTINGS</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* FULL PRODUCT EDIT / ADD MODAL (Section 24 & 26) */}
      {isNewProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#0E0E0E] border border-[#C9A45C]/40 text-[#F2EEE6] shadow-2xl max-h-[90vh] flex flex-col">
            <div className="p-5 border-b border-[#1F1F1F] flex justify-between items-center">
              <h3 className="font-serif text-xl text-[#F2EEE6]">
                {editingProduct.id.includes('prod-') ? 'Edit Silhouette & Photos' : 'Add New Silhouette'}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsNewProductModalOpen(false);
                }}
                className="text-[#888] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="p-6 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#888] uppercase mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-[#F2EEE6]"
                  />
                </div>
                <div>
                  <label className="block text-[#888] uppercase mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-[#F2EEE6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#888] uppercase mb-1">Regular Price (IDR) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-[#F2EEE6]"
                  />
                </div>
                <div>
                  <label className="block text-[#888] uppercase mb-1">Sale Price (Optional)</label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-[#F2EEE6]"
                  />
                </div>
                <div>
                  <label className="block text-[#888] uppercase mb-1">Silhouette Fit</label>
                  <select
                    value={editingProduct.fit}
                    onChange={e => setEditingProduct({ ...editingProduct, fit: e.target.value as ProductFit })}
                    className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-[#F2EEE6]"
                  >
                    <option value="Wide Leg">Wide Leg</option>
                    <option value="Flare">Flare</option>
                    <option value="Straight">Straight</option>
                    <option value="Baggy">Baggy</option>
                    <option value="Skinny">Skinny</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#888] uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#141414] border border-[#2B2B2B] px-3 py-2 text-[#F2EEE6]"
                />
              </div>

              {/* Photo Management (Section 26 - Drag & Drop / Upload / Reorder) */}
              <div className="p-4 bg-[#121212] border border-[#222] space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[#C9A45C] uppercase font-bold text-xs flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Product Photography Studio ({editingProduct.images.length} Photos)</span>
                  </label>
                  <span className="text-[10px] text-[#888]">Drag & Drop supported</span>
                </div>

                {/* File Upload & Drag & Drop Zone */}
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                    if (files.length === 0) return;
                    files.forEach(file => {
                      const reader = new FileReader();
                      reader.onload = ev => {
                        if (ev.target?.result) {
                          setEditingProduct(prev => prev ? ({
                            ...prev,
                            images: [...prev.images, ev.target!.result as string]
                          }) : null);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                    showToast(`Uploaded ${files.length} photo(s).`);
                  }}
                  className="p-4 border-2 border-dashed border-[#333] hover:border-[#C9A45C] transition-colors bg-[#161616] text-center cursor-pointer relative"
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => {
                      if (!e.target.files) return;
                      const files = Array.from(e.target.files);
                      files.forEach(file => {
                        const reader = new FileReader();
                        reader.onload = ev => {
                          if (ev.target?.result) {
                            setEditingProduct(prev => prev ? ({
                              ...prev,
                              images: [...prev.images, ev.target!.result as string]
                            }) : null);
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                      showToast(`Added ${files.length} photo(s).`);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <p className="text-xs text-[#F2EEE6] font-medium">
                    Drag and drop photos here, or <span className="text-[#C9A45C] underline">browse device</span>
                  </p>
                  <p className="text-[10px] text-[#777] mt-0.5">Supports JPG, PNG, WebP up to 10MB</p>
                </div>

                {/* Showroom Archive Quick Asset Picker */}
                <div>
                  <span className="text-[10px] text-[#888] uppercase block mb-1.5">
                    Or select from Luxury Studio Photography Archive:
                  </span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {[
                      { name: 'Wide Drape Angle', src: ASSET_IMAGES.wideAngles },
                      { name: 'Flare Campaign Duo', src: ASSET_IMAGES.heroDuo },
                      { name: 'Noir Baggy Wash', src: ASSET_IMAGES.baggyGrey },
                      { name: 'Pinstripe Straight', src: ASSET_IMAGES.pinstripeStraight },
                      { name: 'Studio Flare 3-Angle', src: ASSET_IMAGES.flareAngles },
                      { name: 'Intimate Editorial', src: ASSET_IMAGES.modelPortrait }
                    ].map((asset, aIdx) => (
                      <button
                        key={aIdx}
                        type="button"
                        onClick={() => {
                          setEditingProduct({
                            ...editingProduct,
                            images: [...editingProduct.images, asset.src]
                          });
                          showToast(`Attached ${asset.name}`);
                        }}
                        className="w-14 h-18 bg-black border border-[#2B2B2B] hover:border-[#C9A45C] overflow-hidden shrink-0 group relative"
                        title={asset.name}
                      >
                        <img src={asset.src} alt={asset.name} className="w-full h-full object-cover" />
                        <span className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-[#C9A45C] font-bold">
                          + Add
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Photo List with Reordering */}
                <div className="space-y-2">
                  <span className="text-[10px] text-[#888] uppercase block">
                    Active Photos (First image is primary card cover):
                  </span>
                  {editingProduct.images.map((imgUrl, i) => (
                    <div key={i} className="flex gap-2 items-center bg-[#171717] p-2 border border-[#282828]">
                      <div className="relative w-10 h-12 bg-black shrink-0 border border-[#333] overflow-hidden">
                        <img src={imgUrl} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-[#C9A45C] text-black text-[8px] text-center font-bold">
                            MAIN
                          </span>
                        )}
                      </div>

                      <input
                        type="text"
                        value={imgUrl.startsWith('data:') ? '[Uploaded Image File]' : imgUrl}
                        readOnly={imgUrl.startsWith('data:')}
                        onChange={e => {
                          const newImgs = [...editingProduct.images];
                          newImgs[i] = e.target.value;
                          setEditingProduct({ ...editingProduct, images: newImgs });
                        }}
                        className="flex-1 bg-[#121212] border border-[#333] px-2 py-1 text-xs text-[#F2EEE6] font-mono truncate"
                      />

                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newImgs = [...editingProduct.images];
                            const [moved] = newImgs.splice(i, 1);
                            newImgs.unshift(moved);
                            setEditingProduct({ ...editingProduct, images: newImgs });
                          }}
                          className="px-2 py-1 bg-[#222] hover:bg-[#C9A45C] hover:text-black text-[10px]"
                          title="Set as main image"
                        >
                          Set Main
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const newImgs = editingProduct.images.filter((_, idx) => idx !== i);
                          setEditingProduct({ ...editingProduct, images: newImgs });
                        }}
                        className="p-1 text-red-400 hover:text-white"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1F1F1F]">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-5 py-2.5 border border-[#333] text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C9A45C] text-black font-semibold text-xs uppercase hover:bg-[#E1C27A]"
                >
                  Save Silhouette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
