import React, { useState } from 'react';
import { ASSET_IMAGES, StoreService } from '../services/store';
import { useCart } from '../context/CartContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { setSizeGuideOpen, showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const settings = StoreService.getStoreSettings();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Silakan masukkan alamat email yang valid.');
      return;
    }
    setSubscribed(true);
    showToast('Selamat datang di Private Edit. Anda telah terdaftar.');
    setEmail('');
  };

  return (
    <footer className="bg-[#050505] text-[#C5C0B6] border-t border-[#1F1F1F]">
      {/* Newsletter Section: BERGABUNG DENGAN PRIVATE EDIT */}
      <section className="border-b border-[#1A1A1A] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.25em] text-[#C9A45C] uppercase mb-3 font-mono">
            UNDANGAN EKSKLUSIF
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-[0.08em] mb-3">
            BERGABUNG DENGAN PRIVATE EDIT
          </h2>
          <p className="text-[#8F8A7F] text-sm max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Jadilah yang pertama menemukan koleksi terbaru, peluncuran denim artisanal terbatas, dan penawaran privat musiman.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 border border-[#C9A45C]/40 bg-[#C9A45C]/10 text-[#C9A45C] text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Anda telah terdaftar dalam daftar klien privat kami. Terima kasih.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Masukkan alamat email Anda"
                required
                className="flex-1 bg-[#0F0F0F] border border-[#2B2B2B] px-4 py-3 text-sm text-[#F2EEE6] placeholder-[#5C574F] focus:border-[#C9A45C] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-[#C9A45C] text-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#E1C27A] transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <span>BERLANGGANAN</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={ASSET_IMAGES.logo}
                alt="Luxury Clothes"
                className="w-10 h-10 rounded-full border border-[#C9A45C]/30 object-cover"
              />
              <span className="font-serif tracking-[0.2em] text-xl text-[#F2EEE6]">
                {settings.brandName || 'LUXURY CLOTHES'}
              </span>
            </div>
            <p className="text-[#8F8A7F] text-xs font-mono tracking-widest text-[#C9A45C] uppercase">
              {settings.tagline || 'THE ART OF EVERYDAY DENIM'}
            </p>
            <p className="text-[#8F8A7F] text-xs leading-relaxed max-w-sm">
              Rumah mode kontemporer independen yang mengkhususkan diri pada potongan denim berkelas tinggi. Didesain dengan proporsi patung, katun ring-spun bernilai seni, dan standar keanggunan modern tanpa kompromi.
            </p>
            <p className="text-[11px] text-[#6E695F] pt-2">
              {settings.address}
            </p>
          </div>

          {/* BELANJA Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[#F2EEE6] font-semibold mb-4">
              KOLEKSI
            </h3>
            <ul className="space-y-2.5 text-xs text-[#9E988C]">
              <li>
                <button onClick={() => navigate('/new-arrivals')} className="hover:text-[#C9A45C] transition-colors">
                  Produk Baru
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/women')} className="hover:text-[#C9A45C] transition-colors">
                  Koleksi Wanita
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/men')} className="hover:text-[#C9A45C] transition-colors">
                  Koleksi Pria
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/denim')} className="hover:text-[#C9A45C] transition-colors">
                  Arsip Denim
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/best-sellers')} className="hover:text-[#C9A45C] transition-colors">
                  Produk Terlaris
                </button>
              </li>
            </ul>
          </div>

          {/* BANTUAN Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[#F2EEE6] font-semibold mb-4">
              LAYANAN & BANTUAN
            </h3>
            <ul className="space-y-2.5 text-xs text-[#9E988C]">
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#C9A45C] transition-colors">
                  Kontak Concierge
                </button>
              </li>
              <li>
                <button onClick={() => setSizeGuideOpen(true)} className="hover:text-[#C9A45C] transition-colors">
                  Panduan Ukuran & BB
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#C9A45C] transition-colors">
                  Pengiriman & Pengembalian
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-[#C9A45C] transition-colors">
                  Lacak Pesanan
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#C9A45C] transition-colors">
                  FAQ & Perawatan Denim
                </button>
              </li>
            </ul>
          </div>

          {/* MAISON & SOSIAL Column */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-[#F2EEE6] font-semibold mb-4">
              MAISON
            </h3>
            <ul className="space-y-2.5 text-xs text-[#9E988C] mb-6">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#C9A45C] transition-colors">
                  Cerita Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/lookbook')} className="hover:text-[#C9A45C] transition-colors">
                  Lookbook Editorial
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#C9A45C] transition-colors">
                  Pengerjaan & Material
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-[#C9A45C] hover:underline flex items-center gap-1 font-mono text-[11px]">
                  <span>Portal Admin CMS</span>
                </button>
              </li>
            </ul>

            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#F2EEE6] font-semibold mb-2">
              SOSIAL MEDIA
            </h4>
            <div className="flex gap-4 text-xs text-[#9E988C]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#C9A45C] transition-colors">
                Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#C9A45C] transition-colors">
                TikTok
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#C9A45C] transition-colors">
                Pinterest
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#141414] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#69645B] gap-4">
          <p>© 2026 LUXURY CLOTHES. HAK CIPTA DILINDUNGI.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/about')} className="hover:text-[#C5C0B6] transition-colors">
              Kebijakan Privasi
            </button>
            <button onClick={() => navigate('/about')} className="hover:text-[#C5C0B6] transition-colors">
              Syarat & Ketentuan
            </button>
            <button onClick={() => navigate('/admin')} className="hover:text-[#C9A45C] transition-colors">
              Manajemen Toko
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
