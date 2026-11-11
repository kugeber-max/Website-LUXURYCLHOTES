import React, { useState } from 'react';
import { StoreService } from '../services/store';
import { useCart } from '../context/CartContext';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Clock } from 'lucide-react';

interface ContactPageProps {
  navigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ navigate }) => {
  const { showToast } = useCart();
  const settings = StoreService.getStoreSettings();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Styling & Sizing Consultation',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in the required fields.');
      return;
    }
    setSubmitted(true);
    showToast('Your inquiry has been received. Our concierge will contact you within 2 hours.');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Halo Luxury Clothes Concierge, saya ingin konsultasi ukuran dan pemesanan denim.');
    window.open(`https://wa.me/6281288990011?text=${text}`, '_blank');
  };

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-28">
      {/* Header */}
      <div className="border-b border-[#1C1C1C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C9A45C] uppercase">
            LAYANAN KLIEN & CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-wide uppercase">
            HUBUNGI KAMI
          </h1>
          <p className="text-xs sm:text-sm text-[#8F8A7F] max-w-lg mx-auto font-light">
            Apakah mengenai penyesuaian kelim, ketersediaan stok atelier, atau reservasi fitting privat, staf concierge kami senantiasa siap melayani Anda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contacts & WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            {/* WhatsApp VIP Box */}
            <div className="p-6 bg-[#0E0E0E] border border-[#C9A45C]/40 space-y-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9A45C] block">
                KONSULTASI STYLING LANGSUNG
              </span>
              <h3 className="font-serif text-2xl text-[#F2EEE6]">
                Concierge Pribadi WhatsApp
              </h3>
              <p className="text-xs text-[#9E988C] leading-relaxed">
                Terhubung langsung dengan penata gaya denim senior kami di Jakarta untuk panduan ukuran real-time, referensi foto, atau pemesanan kilat.
              </p>
              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT VIA WHATSAPP (+62 812-8899-0011)</span>
              </button>
            </div>

            {/* Boutique Location */}
            <div className="p-6 bg-[#0E0E0E] border border-[#1F1F1F] space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#F2EEE6] font-sans font-medium mb-1">
                    Salon Butik Jakarta
                  </h4>
                  <p className="text-[#8F8A7F] leading-relaxed">
                    Lantai 3, Pacific Place Mall, SCBD<br />
                    Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Clock className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span className="text-[#8F8A7F]">Senin – Minggu: 10:00 – 22:00 WIB</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span className="text-[#8F8A7F]">{settings.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <span className="text-[#8F8A7F]">{settings.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#0E0E0E] border border-[#1F1F1F] p-8">
            <h2 className="font-serif text-2xl text-[#F2EEE6] mb-2">
              Kirimkan Pesan Anda
            </h2>
            <p className="text-xs text-[#8F8A7F] mb-6">
              Lengkapi rincian di bawah ini dan tim kami akan segera menghubungi Anda.
            </p>

            {submitted ? (
              <div className="p-8 border border-[#C9A45C]/50 bg-[#C9A45C]/10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#C9A45C] mx-auto" />
                <h3 className="font-serif text-2xl text-[#F2EEE6]">Pesan Telah Diterima</h3>
                <p className="text-xs text-[#9E988C] max-w-sm mx-auto">
                  Terima kasih telah menghubungi LUXURY CLOTHES. Concierge khusus kami akan meninjau pesan Anda dan merespons dalam waktu singkat.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-[#C9A45C] underline uppercase tracking-wider cursor-pointer"
                >
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8F8A7F] uppercase mb-1">Topik Pertanyaan</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                    >
                      <option>Konsultasi Styling & Rekomendasi Ukuran</option>
                      <option>Status Pesanan & Pengiriman</option>
                      <option>Reservasi Fitting Salon Butik</option>
                      <option>Kerjasama & Liputan Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#8F8A7F] uppercase mb-1">Pesan / Catatan Khusus *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Ceritakan bagaimana kami dapat membantu Anda..."
                    className="w-full bg-[#141414] border border-[#262626] px-3.5 py-3 text-[#F2EEE6] focus:border-[#C9A45C] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#E1C27A] transition-colors cursor-pointer"
                >
                  KIRIM PESAN KE CONCIERGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
