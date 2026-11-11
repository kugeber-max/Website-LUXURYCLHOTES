import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { StoreService } from '../services/store';
import { PaymentMethod, Order } from '../types';
import {
  ShieldCheck,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building2,
  Wallet,
  Truck,
  ArrowRight,
  ArrowLeft,
  Copy,
  Tag
} from 'lucide-react';

interface CheckoutPageProps {
  navigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate }) => {
  const { cart, subtotal, clearCart, showToast, freeShippingThreshold } = useCart();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    name: 'Aditya Pratama',
    email: 'aditya.p@gmail.com',
    phone: '+62 812-9844-3210',
    address: 'Jl. Senopati No. 42, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    notes: ''
  });

  // Promo Code
  const [promoInput, setPromoInput] = useState('DENIM20');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');
  const [selectedBank, setSelectedBank] = useState<'BCA' | 'Mandiri' | 'BNI' | 'BRI'>('BCA');
  const [selectedWallet, setSelectedWallet] = useState<'GoPay' | 'OVO' | 'ShopeePay'>('GoPay');

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const formatPrice = (p: number) => `Rp${p.toLocaleString('id-ID')}`;

  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 35000;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

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

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      showToast('Please fill in all mandatory customer details.');
      setCurrentStep(2);
      return;
    }

    const newOrder = StoreService.createOrder({
      customer: formData,
      items: cart,
      subtotal,
      shippingFee,
      discount: discountAmount,
      promoCode: appliedPromo?.code,
      total: finalTotal,
      paymentMethod,
      status: paymentMethod === 'COD' ? 'PENDING' : 'PAID'
    });

    setCompletedOrder(newOrder);
    clearCart();
    showToast(`Order ${newOrder.orderNumber} successfully placed.`);
    window.scrollTo(0, 0);
  };

  // 1. ORDER CONFIRMATION SCREEN
  if (completedOrder) {
    return (
      <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-[#0E0E0E] border border-[#C9A45C]/40 p-6 sm:p-10 shadow-2xl">
          <div className="text-center pb-8 border-b border-[#1C1C1C]">
            <div className="w-16 h-16 rounded-full bg-[#C9A45C]/15 border border-[#C9A45C] flex items-center justify-center mx-auto mb-4 text-[#C9A45C]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C9A45C] block mb-1">
              ORDER CONFIRMED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-wide mb-2">
              Thank You, {completedOrder.customer.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-[#8F8A7F] font-mono">
              INVOICE #{completedOrder.orderNumber}
            </p>
          </div>

          {/* Payment Guidance Screen */}
          <div className="py-6 border-b border-[#1C1C1C] space-y-4">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#C9A45C]">
              PAYMENT METHOD: {completedOrder.paymentMethod}
            </h3>

            {completedOrder.paymentMethod === 'QRIS' && (
              <div className="p-4 bg-white text-black flex flex-col items-center text-center space-y-2">
                <p className="text-xs font-bold tracking-wider uppercase">Scan with GoPay / OVO / BCA / ShopeePay</p>
                <div className="p-3 bg-black rounded">
                  <QrCode className="w-36 h-36 text-white" />
                </div>
                <p className="text-[11px] font-mono text-gray-700">QRIS Verified Merchant • LUXURY CLOTHES OFFICIAL</p>
                <span className="text-xs font-mono font-bold text-emerald-700">Status: Verified & Auto-Approved</span>
              </div>
            )}

            {completedOrder.paymentMethod === 'Bank Transfer' && (
              <div className="p-4 bg-[#141414] border border-[#2B2B2B] space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#8F8A7F]">Bank Account ({selectedBank})</span>
                  <span className="font-mono font-bold text-[#F2EEE6] text-sm">8801 9283 0019</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F8A7F]">Account Name</span>
                  <span className="text-[#F2EEE6]">PT LUXURY CLOTHES INDONESIA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8F8A7F]">Total Amount</span>
                  <span className="font-mono text-[#C9A45C] font-bold text-sm">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>
            )}

            {completedOrder.paymentMethod === 'COD' && (
              <div className="p-4 bg-[#141414] border border-[#2B2B2B] text-xs text-[#C5C0B6]">
                <p>Cash on Delivery confirmed. Please prepare exact cash of <strong>{formatPrice(completedOrder.total)}</strong> upon courier delivery.</p>
              </div>
            )}

            {completedOrder.paymentMethod === 'Credit/Debit Card' && (
              <div className="p-4 bg-[#141414] border border-[#2B2B2B] text-xs text-emerald-400">
                <p>Card payment authorized securely. Reference Auth ID: AUTH-VISA-889102</p>
              </div>
            )}
          </div>

          {/* Delivery & Items Summary */}
          <div className="py-6 border-b border-[#1C1C1C] space-y-3 text-xs">
            <h3 className="font-mono tracking-widest uppercase text-[#C9A45C]">
              DELIVERY DESTINATION
            </h3>
            <p className="text-[#F2EEE6] font-medium">{completedOrder.customer.name} ({completedOrder.customer.phone})</p>
            <p className="text-[#8F8A7F]">{completedOrder.customer.address}, {completedOrder.customer.city}, {completedOrder.customer.province} {completedOrder.customer.postalCode}</p>

            <h4 className="font-mono tracking-widest uppercase text-[#C9A45C] pt-3">
              PURCHASED SILHOUETTES
            </h4>
            <div className="space-y-2">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-[#8F8A7F]">
                  <span>{item.quantity}x {item.name} ({item.size} / {item.color})</span>
                  <span className="font-mono text-[#F2EEE6]">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1C1C1C] flex justify-between text-sm font-serif">
              <span>Total Amount Paid</span>
              <span className="font-mono text-base text-[#C9A45C] font-semibold">{formatPrice(completedOrder.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/6281288990011?text=${encodeURIComponent(
                  `Halo Luxury Clothes Concierge, saya telah memesan invoice ${completedOrder.orderNumber} atas nama ${completedOrder.customer.name} total ${formatPrice(completedOrder.total)} via ${completedOrder.paymentMethod}. Mohon info jadwal pengiriman. Terima kasih.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs tracking-[0.16em] uppercase transition-colors text-center flex items-center justify-center gap-2"
              >
                <span>KIRIM BUKTI PESANAN KE WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-3.5 px-6 border border-[#C9A45C]/50 hover:bg-[#C9A45C]/15 text-[#C9A45C] text-xs font-mono tracking-wider uppercase transition-colors text-center"
              >
                CETAK / SIMPAN INVOICE
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => navigate('/account')}
                className="flex-1 py-3 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-colors text-center"
              >
                VIEW ORDER IN ACCOUNT
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="flex-1 py-3 border border-[#333] text-xs tracking-[0.2em] uppercase text-[#F2EEE6] hover:bg-[#1A1A1A] transition-colors text-center"
              >
                CONTINUE BROWSING
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. EMPTY CART CHECK
  if (cart.length === 0) {
    return (
      <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-32 pb-24 text-center px-4">
        <h2 className="font-serif text-3xl mb-3">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#8F8A7F] max-w-sm mx-auto mb-6">
          Explore our signature flare and wide leg cuts before proceeding to checkout.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-[#C9A45C] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#E1C27A]"
        >
          EXPLORE CATALOG
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="border-b border-[#1C1C1C] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-1">
              SECURE CHECKOUT
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-wide">
              LUXURY CONCIERGE ORDER
            </h1>
          </div>

          {/* Stepper (01 CART, 02 INFORMATION, 03 PAYMENT) */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-[#C9A45C] font-bold' : 'text-[#666]'}`}
            >
              <span>01</span>
              <span>BAG</span>
            </button>
            <span className="text-[#333]">/</span>
            <button
              onClick={() => setCurrentStep(2)}
              className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-[#C9A45C] font-bold' : 'text-[#666]'}`}
            >
              <span>02</span>
              <span>INFORMATION</span>
            </button>
            <span className="text-[#333]">/</span>
            <button
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#C9A45C] font-bold' : 'text-[#666]'}`}
            >
              <span>03</span>
              <span>PAYMENT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, Order Summary on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Bag Review */}
            {currentStep === 1 && (
              <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
                  <h2 className="font-serif text-xl text-[#F2EEE6]">01. Review Bag Items</h2>
                  <span className="text-xs font-mono text-[#8F8A7F]">{cart.length} Silhouette(s)</span>
                </div>

                <div className="divide-y divide-[#1A1A1A]">
                  {cart.map(item => (
                    <div key={item.id} className="py-4 first:pt-0 flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-black border border-[#222]" />
                      <div className="flex-1">
                        <h4 className="font-serif text-base text-[#F2EEE6]">{item.name}</h4>
                        <p className="text-xs font-mono text-[#8F8A7F]">
                          Size: <strong className="text-[#C9A45C]">{item.size}</strong> • Color: {item.color} • Qty: {item.quantity}
                        </p>
                        <p className="text-xs font-mono text-[#C9A45C] mt-1">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-4 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-colors flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO CUSTOMER INFORMATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Customer Information */}
            {currentStep === 2 && (
              <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
                  <h2 className="font-serif text-xl text-[#F2EEE6]">02. Delivery Information</h2>
                  <button onClick={() => setCurrentStep(1)} className="text-xs font-mono text-[#C9A45C] hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="sm:col-span-2">
                    <label className="block text-[#8F8A7F] uppercase mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#8F8A7F] uppercase mb-1">Street Address, Apt / Suite *</label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Province *</label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={e => setFormData({ ...formData, province: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Postal Code *</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                      required
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Special Packaging Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Gift box, Leave at concierge"
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-4 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-colors flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO PAYMENT METHOD</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 3: Payment Method */}
            {currentStep === 3 && (
              <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
                  <h2 className="font-serif text-xl text-[#F2EEE6]">03. Select Payment Method</h2>
                  <button onClick={() => setCurrentStep(2)} className="text-xs font-mono text-[#C9A45C] hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Payment option: QRIS */}
                  <label
                    onClick={() => setPaymentMethod('QRIS')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'QRIS'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-[#F2EEE6]'
                        : 'border-[#222] bg-[#121212] text-[#8F8A7F] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-[#C9A45C]" />
                      <div>
                        <p className="text-xs font-mono font-bold uppercase text-[#F2EEE6]">QRIS Instant Payment</p>
                        <p className="text-[11px] text-[#888]">GoPay, OVO, ShopeePay, BCA Mobile, Dana</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#C9A45C] border border-[#C9A45C]/40 px-2 py-0.5">Instant Verify</span>
                  </label>

                  {/* Payment option: Bank Transfer */}
                  <label
                    onClick={() => setPaymentMethod('Bank Transfer')}
                    className={`flex flex-col p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'Bank Transfer'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-[#F2EEE6]'
                        : 'border-[#222] bg-[#121212] text-[#8F8A7F] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-[#C9A45C]" />
                        <div>
                          <p className="text-xs font-mono font-bold uppercase text-[#F2EEE6]">Virtual Account / Bank Transfer</p>
                          <p className="text-[11px] text-[#888]">Automated verification within 60 seconds</p>
                        </div>
                      </div>
                    </div>
                    {paymentMethod === 'Bank Transfer' && (
                      <div className="mt-3 pt-3 border-t border-[#262626] flex gap-2">
                        {(['BCA', 'Mandiri', 'BNI', 'BRI'] as const).map(bank => (
                          <button
                            key={bank}
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedBank(bank);
                            }}
                            className={`px-3 py-1 text-xs font-mono border ${
                              selectedBank === bank ? 'border-[#C9A45C] bg-[#C9A45C] text-black font-bold' : 'border-[#333] text-[#888]'
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    )}
                  </label>

                  {/* Payment option: E-Wallet */}
                  <label
                    onClick={() => setPaymentMethod('E-Wallet')}
                    className={`flex flex-col p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'E-Wallet'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-[#F2EEE6]'
                        : 'border-[#222] bg-[#121212] text-[#8F8A7F] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-[#C9A45C]" />
                      <div>
                        <p className="text-xs font-mono font-bold uppercase text-[#F2EEE6]">Direct E-Wallet</p>
                        <p className="text-[11px] text-[#888]">Direct wallet push confirmation</p>
                      </div>
                    </div>
                  </label>

                  {/* Payment option: Credit/Debit Card */}
                  <label
                    onClick={() => setPaymentMethod('Credit/Debit Card')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'Credit/Debit Card'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-[#F2EEE6]'
                        : 'border-[#222] bg-[#121212] text-[#8F8A7F] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#C9A45C]" />
                      <div>
                        <p className="text-xs font-mono font-bold uppercase text-[#F2EEE6]">Credit / Debit Card</p>
                        <p className="text-[11px] text-[#888]">Visa, MasterCard, JCB with 3D-Secure</p>
                      </div>
                    </div>
                  </label>

                  {/* Payment option: COD */}
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 text-[#F2EEE6]'
                        : 'border-[#222] bg-[#121212] text-[#8F8A7F] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#C9A45C]" />
                      <div>
                        <p className="text-xs font-mono font-bold uppercase text-[#F2EEE6]">Cash On Delivery (COD)</p>
                        <p className="text-[11px] text-[#888]">Pay with cash to courier upon package arrival</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#E1C27A] transition-all shadow-2xl flex items-center justify-center gap-2"
                  >
                    <span>PLACE LUXURY ORDER ({formatPrice(finalTotal)})</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] font-mono text-[#666] mt-2">
                    256-Bit Encrypted Payment • Compliant with Indonesian E-Commerce Regulations
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (Sticky) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-6 space-y-6 sticky top-28">
              <h3 className="font-serif text-lg text-[#F2EEE6] pb-3 border-b border-[#1A1A1A]">
                Order Summary
              </h3>

              {/* Items preview list */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={item.image} alt={item.name} className="w-10 h-12 object-cover bg-black border border-[#222]" />
                      <div>
                        <p className="text-[#F2EEE6] font-serif truncate max-w-[160px]">{item.name}</p>
                        <p className="text-[10px] font-mono text-[#888]">{item.size} • {item.color} • x{item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[#C5C0B6]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-[#1C1C1C]">
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
                    className="flex-1 bg-[#141414] border border-[#262626] px-3 py-2 text-xs font-mono uppercase text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#222] hover:bg-[#C9A45C] hover:text-black text-xs font-mono tracking-wider uppercase transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-red-400 mt-1 font-mono">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-mono">
                    Code {appliedPromo.code} applied: -{formatPrice(appliedPromo.discount)}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="pt-4 border-t border-[#1C1C1C] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#8F8A7F]">
                  <span>Subtotal</span>
                  <span className="text-[#F2EEE6]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#8F8A7F]">
                  <span>Shipping Courier</span>
                  <span>{isFreeShipping ? <strong className="text-[#C9A45C]">FREE (Order &gt; 1M)</strong> : formatPrice(shippingFee)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-{formatPrice(appliedPromo.discount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#222] flex justify-between text-sm font-serif text-[#F2EEE6]">
                  <span>Grand Total</span>
                  <span className="font-mono text-lg text-[#C9A45C] font-semibold">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
