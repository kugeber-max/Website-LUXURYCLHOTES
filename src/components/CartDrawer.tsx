import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
  onNavigateToProduct: (slug: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onNavigateToProduct }) => {
  const {
    isOpen,
    closeCart,
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    remainingForFreeShipping,
    freeShippingProgress
  } = useCart();

  if (!isOpen) return null;

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0D0D] border-l border-[#C9A45C]/30 text-[#F2EEE6] flex flex-col shadow-2xl">
          {/* Top Bar */}
          <div className="p-5 border-b border-[#1F1F1F] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C9A45C]" />
              <h2 className="font-serif text-lg tracking-wider text-[#F2EEE6]">
                TAS BELANJA ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Tutup tas belanja"
              className="p-1.5 text-[#8F8A7F] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#121212] px-5 py-3 border-b border-[#1F1F1F]">
            <div className="flex items-center gap-2 text-xs text-[#C5C0B6] mb-1.5">
              <Truck className="w-4 h-4 text-[#C9A45C]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#C9A45C] font-semibold">
                  Selamat! Anda berhak atas Bebas Ongkir Kilat Eksklusif!
                </span>
              ) : (
                <span>
                  Tambah <strong className="text-[#F2EEE6]">{formatPrice(remainingForFreeShipping)}</strong> lagi untuk Gratis Ongkir
                </span>
              )}
            </div>
            <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C9A45C] to-[#E1C27A] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#1C1C1C]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#787265]">
                <ShoppingBag className="w-12 h-12 stroke-[1] text-[#333] mb-4" />
                <p className="font-serif text-lg text-[#C5C0B6] mb-1">Tas Belanja Masih Kosong</p>
                <p className="text-xs max-w-xs mb-6">
                  Jelajahi koleksi siluet wide leg & cutbray flare denim artisanal kami untuk pengalaman busana premium.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 border border-[#C9A45C] text-[#C9A45C] text-xs tracking-widest uppercase hover:bg-[#C9A45C] hover:text-black transition-colors"
                >
                  JELAJAHI KOLEKSI DENIM
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      closeCart();
                      onNavigateToProduct(item.slug);
                    }}
                    className="w-20 h-24 bg-black shrink-0 overflow-hidden border border-[#222] cursor-pointer group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4
                          onClick={() => {
                            closeCart();
                            onNavigateToProduct(item.slug);
                          }}
                          className="font-serif text-sm text-[#F2EEE6] hover:text-[#C9A45C] transition-colors cursor-pointer line-clamp-1"
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Hapus produk"
                          className="text-[#666] hover:text-red-400 p-0.5 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#8F8A7F] font-mono mt-1 space-x-2">
                        <span>Warna: {item.color}</span>
                        <span>•</span>
                        <span>Ukuran: <strong className="text-[#C9A45C]">{item.size}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#262626] bg-[#111]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Kurangi kuantitas"
                          className="p-1 hover:text-[#C9A45C] text-[#888] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Tambah kuantitas"
                          className="p-1 hover:text-[#C9A45C] text-[#888] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono text-xs sm:text-sm text-[#F2EEE6] font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1F1F1F] bg-[#0A0A0A] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8F8A7F]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F2EEE6]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8F8A7F]">
                  <span>Ongkos Kirim</span>
                  <span className="font-mono">
                    {remainingForFreeShipping === 0 ? (
                      <span className="text-[#C9A45C] font-semibold">GRATIS</span>
                    ) : (
                      'Dihitung di Pembayaran'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif text-[#F2EEE6] pt-2 border-t border-[#1C1C1C]">
                  <span>Estimasi Total</span>
                  <span className="font-mono text-base text-[#C9A45C] font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCart();
                    onCheckout();
                  }}
                  className="w-full py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>LANJUTKAN KE PEMBAYARAN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-2 text-[11px] text-[#888] hover:text-[#F2EEE6] tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Lanjut Belanja
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
