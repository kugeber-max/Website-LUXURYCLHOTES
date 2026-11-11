import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { StoreService } from '../services/store';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Tag, ShieldCheck, ChevronRight } from 'lucide-react';

interface CartPageProps {
  navigate: (path: string) => void;
  onSelectProductBySlug: (slug: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate, onSelectProductBySlug }) => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    remainingForFreeShipping,
    freeShippingProgress,
    showToast
  } = useCart();

  const [promoInput, setPromoInput] = useState('DENIM20');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  const isFreeShipping = remainingForFreeShipping === 0;
  const shippingFee = isFreeShipping ? 0 : 35000;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = StoreService.validatePromo(promoInput, subtotal);
    if (res.valid) {
      setAppliedPromo({ code: promoInput.toUpperCase(), discount: res.discount });
      showToast(res.message);
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="border-b border-[#1C1C1C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <nav className="flex items-center gap-2 text-xs font-mono text-[#7D786E] mb-2">
              <button onClick={() => navigate('/')} className="hover:text-[#F2EEE6]">HOME</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => navigate('/shop')} className="hover:text-[#F2EEE6]">SHOP</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#C9A45C]">SHOPPING BAG</span>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-wide">
              YOUR PRIVATE BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h1>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-mono text-[#C9A45C] hover:underline uppercase tracking-wider self-start sm:self-auto"
          >
            ← Continue Browsing
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {cart.length === 0 ? (
          <div className="py-24 text-center border border-[#1A1A1A] bg-[#0C0C0C] p-8 max-w-2xl mx-auto">
            <ShoppingBag className="w-16 h-16 stroke-[1] text-[#333] mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-[#F2EEE6] mb-2">Your Shopping Bag is Empty</h2>
            <p className="text-xs text-[#8F8A7F] max-w-sm mx-auto mb-8 font-light leading-relaxed">
              Discover our signature flare and wide-leg silhouettes designed with timeless elegance and architectural drape.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-all shadow-xl"
            >
              EXPLORE SIGNATURE DENIM
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Itemized Table */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Tracker */}
              <div className="bg-[#121212] p-4 border border-[#222]">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C9A45C]" />
                    {isFreeShipping ? (
                      <span className="text-[#C9A45C] font-bold">
                        Complimentary Express Courier Qualified!
                      </span>
                    ) : (
                      <span className="text-[#C5C0B6]">
                        Add <strong className="text-[#F2EEE6]">{formatPrice(remainingForFreeShipping)}</strong> more to receive Free Shipping
                      </span>
                    )}
                  </div>
                  <span className="text-[#888]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A45C] to-[#E1C27A] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-[#0E0E0E] border border-[#1F1F1F] divide-y divide-[#1A1A1A]">
                {cart.map(item => (
                  <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                    {/* Image */}
                    <div
                      onClick={() => onSelectProductBySlug(item.slug)}
                      className="w-20 sm:w-24 aspect-[3/4] bg-black shrink-0 overflow-hidden border border-[#222] cursor-pointer group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3
                          onClick={() => onSelectProductBySlug(item.slug)}
                          className="font-serif text-lg text-[#F2EEE6] hover:text-[#C9A45C] transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <p className="text-xs font-mono text-[#8F8A7F]">
                          Color: <strong className="text-[#C5C0B6]">{item.color}</strong> • Size: <strong className="text-[#C9A45C]">{item.size}</strong>
                        </p>
                        <p className="font-mono text-sm text-[#C9A45C] font-semibold sm:hidden pt-1">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      {/* Quantity Stepper & Price */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-[#2B2B2B] bg-[#141414]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 text-[#888] hover:text-[#C9A45C]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold text-[#F2EEE6]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 text-[#888] hover:text-[#C9A45C]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="hidden sm:block font-mono text-sm font-semibold text-[#F2EEE6] min-w-24 text-right">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-[#666] hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Summary Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 space-y-6 sticky top-28">
                <h2 className="font-serif text-xl text-[#F2EEE6] pb-3 border-b border-[#1A1A1A]">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div>
                  <label className="block text-[11px] font-mono tracking-widest text-[#8F8A7F] uppercase mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>PROMO CODE / VOUCHER</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="e.g. DENIM20"
                      className="flex-1 bg-[#141414] border border-[#2B2B2B] px-3 py-2.5 text-xs font-mono uppercase text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2.5 bg-[#222] hover:bg-[#C9A45C] hover:text-black text-xs font-mono tracking-wider uppercase transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-red-400 mt-1 font-mono">{promoError}</p>
                  )}
                  {appliedPromo && (
                    <p className="text-[11px] text-emerald-400 mt-1 font-mono">
                      Code {appliedPromo.code} applied (-{formatPrice(appliedPromo.discount)})
                    </p>
                  )}
                </div>

                {/* Calculation breakdown */}
                <div className="pt-4 border-t border-[#1C1C1C] space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between text-[#8F8A7F]">
                    <span>Bag Subtotal</span>
                    <span className="text-[#F2EEE6]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#8F8A7F]">
                    <span>Estimated Shipping</span>
                    <span>
                      {isFreeShipping ? (
                        <strong className="text-[#C9A45C]">FREE (Order &gt; 1M)</strong>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-{formatPrice(appliedPromo.discount)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-[#222] flex justify-between text-sm font-serif text-[#F2EEE6]">
                    <span>Grand Total</span>
                    <span className="font-mono text-xl text-[#C9A45C] font-bold">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-4 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#E1C27A] transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#777] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Secure Encrypted Transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
