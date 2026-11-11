import React, { useState, useEffect } from 'react';
import { StoreService } from '../services/store';
import { Order, Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import {
  Package,
  Heart,
  User,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface AccountPageProps {
  navigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ navigate, onSelectProduct }) => {
  const { wishlist } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = () => {
      setOrders(StoreService.getOrders());
      const all = StoreService.getProducts();
      setWishlistProducts(all.filter(p => wishlist.includes(p.id)));
    };
    load();
    window.addEventListener('luxury-store-updated', load);
    return () => window.removeEventListener('luxury-store-updated', load);
  }, [wishlist]);

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'PAID':
        return 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50';
      case 'SHIPPED':
        return 'bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/40';
      case 'PROCESSING':
        return 'bg-amber-950/60 text-amber-400 border border-amber-800/50';
      case 'COMPLETED':
        return 'bg-blue-950/60 text-blue-400 border border-blue-800/50';
      case 'CANCELLED':
        return 'bg-red-950/60 text-red-400 border border-red-800/50';
      default:
        return 'bg-[#222] text-[#888] border border-[#333]';
    }
  };

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="border-b border-[#1C1C1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-1">
              CONCIERGE KLIEN
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-wide">
              AKUN SAYA
            </h1>
            <p className="text-xs text-[#8F8A7F] font-mono mt-1">
              Aditya Pratama • aditya.p@gmail.com
            </p>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 border transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-semibold'
                  : 'border-[#262626] text-[#A39E93] hover:border-[#444]'
              }`}
            >
              Riwayat Pesanan ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2 border transition-all cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-semibold'
                  : 'border-[#262626] text-[#A39E93] hover:border-[#444]'
              }`}
            >
              Daftar Keinginan ({wishlistProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 border transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-semibold'
                  : 'border-[#262626] text-[#A39E93] hover:border-[#444]'
              }`}
            >
              Profil Klien
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-20 text-center border border-[#1A1A1A] p-8">
                <Package className="w-12 h-12 text-[#333] mx-auto mb-3" />
                <p className="font-serif text-xl text-[#F2EEE6]">Belum Ada Riwayat Pesanan</p>
                <p className="text-xs text-[#888] mt-1 mb-6">Temukan standar baru seni memakai denim sehari-hari.</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-2.5 bg-[#C9A45C] text-black text-xs font-semibold uppercase tracking-widest cursor-pointer"
                >
                  JELAJAHI KATALOG
                </button>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 space-y-4">
                  {/* Order Top Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1A1A1A] gap-2">
                    <div>
                      <span className="font-mono text-sm font-bold text-[#F2EEE6]">{order.orderNumber}</span>
                      <p className="text-[11px] font-mono text-[#888]">
                        Dipesan pada {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                      {order.trackingNumber && (
                        <span className="text-xs font-mono text-[#C9A45C] border border-[#C9A45C]/30 px-2.5 py-1">
                          No. Resi: {order.trackingNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-[#171717]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-14 object-cover bg-black border border-[#222]" />
                          <div>
                            <h4 className="font-serif text-sm text-[#F2EEE6]">{item.name}</h4>
                            <p className="text-[11px] font-mono text-[#888]">
                              Ukuran: {item.size} • Warna: {item.color} • Jumlah: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-[#C9A45C]">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Bottom */}
                  <div className="pt-3 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono gap-2">
                    <span className="text-[#888]">Metode Pembayaran: {order.paymentMethod}</span>
                    <span className="text-sm font-serif text-[#F2EEE6]">
                      Total: <strong className="font-mono text-[#C9A45C] font-semibold">{formatPrice(order.total)}</strong>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center border border-[#1A1A1A] p-8">
                <Heart className="w-12 h-12 text-[#333] mx-auto mb-3" />
                <p className="font-serif text-xl text-[#F2EEE6]">Daftar Keinginan Anda Masih Kosong</p>
                <p className="text-xs text-[#888] mt-1 mb-6">Jelajahi potongan wide leg dan flare ikonik kami, lalu tekan ikon hati untuk menyimpan.</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-2.5 bg-[#C9A45C] text-black text-xs font-semibold uppercase tracking-widest cursor-pointer"
                >
                  JELAJAHI DENIM
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {wishlistProducts.map(p => (
                  <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#0E0E0E] border border-[#1F1F1F] p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl text-[#F2EEE6] pb-3 border-b border-[#1A1A1A]">
              Informasi Pribadi & Rekomendasi Ukuran
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#888] block mb-1">NAMA LENGKAP</span>
                  <p className="text-[#F2EEE6] font-sans font-medium text-sm">Aditya Pratama</p>
                </div>
                <div>
                  <span className="text-[#888] block mb-1">STATUS KEANGGOTAAN</span>
                  <p className="text-[#C9A45C] font-sans font-medium text-sm">Private Patron (Gold)</p>
                </div>
              </div>

              <div>
                <span className="text-[#888] block mb-1">EMAIL UTAMA</span>
                <p className="text-[#F2EEE6]">aditya.p@gmail.com</p>
              </div>

              <div>
                <span className="text-[#888] block mb-1">ALAMAT PENGIRIMAN TERSIMPAN</span>
                <p className="text-[#F2EEE6] leading-relaxed">
                  Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190
                </p>
              </div>

              <div>
                <span className="text-[#888] block mb-1">UKURAN DENIM PREFERENSI</span>
                <p className="text-[#C9A45C] font-bold">M / Size 30 (Rekomendasi BB 50-54 kg)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
