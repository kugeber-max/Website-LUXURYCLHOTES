import React from 'react';
import { ASSET_IMAGES } from '../services/store';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-28">
      {/* Hero Header */}
      <div className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-b border-[#1C1C1C] overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C9A45C] uppercase">
            DIRIKAN TAHUN 2026 • JAKARTA & TOKYO
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F2EEE6] tracking-[0.1em] uppercase">
            THE ART OF EVERYDAY DENIM
          </h1>
          <div className="w-16 h-[1px] bg-[#C9A45C] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#9E988C] font-light max-w-2xl mx-auto leading-relaxed">
            LUXURY CLOTHES didirikan atas sebuah keyakinan mendasar: dunia tidak membutuhkan sepasang celana jeans biasa lainnya—dunia membutuhkan denim yang diangkat ke standar busana tailoring mewah.
          </p>
        </div>
      </div>

      {/* Chapter 1: The Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase">
              BAB I: TAILORING ARSITEKTURAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EEE6] tracking-wide leading-tight">
              Denim yang Dirancang Berpusat pada Gerak Tubuh
            </h2>
            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
              Setiap pola busana berawal dari studi draperi tiga dimensi. Kami menganalisis bagaimana kain denim mentah maupun hasil cuci jatuh saat bergerak—langkah kaki dinamis, saat duduk santai, hingga perpindahan postur tubuh yang membuat penampilan terlihat rileks namun memancarkan wibawa dan rasa percaya diri tinggi.
            </p>
            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
              Siluet flare dan wide-leg khas kami dilengkapi ban pinggang ergonomis high-rise yang membingkai proporsi pinggul secara anggun sembari memberi kenyamanan tanpa batas sepanjang hari.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] bg-[#111] overflow-hidden border border-[#222]">
              <img
                src={ASSET_IMAGES.wideAngles}
                alt="Studi Tailoring Arsitektural"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Craftsmanship Pillars */}
      <section className="bg-[#0E0E0E] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
              DEDIKASI TANPA KOMPROMI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-wide uppercase">
              TIGA PILAR KEUNGGULAN ARTISANAL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#121212] border border-[#1F1F1F] space-y-4">
              <Sparkles className="w-6 h-6 text-[#C9A45C]" />
              <h3 className="font-serif text-xl text-[#F2EEE6]">01. 100% Katun Ring-Spun Pilihan</h3>
              <p className="text-xs text-[#8F8A7F] leading-relaxed">
                Kami mengurasi katun organik ring-spun dengan kerapatan tinggi yang memiliki sirkulasi udara alami, tidak melar atau bergelombang di bagian lutut, serta membentuk patina autentik yang semakin memikat seiring pemakaian.
              </p>
            </div>

            <div className="p-8 bg-[#121212] border border-[#1F1F1F] space-y-4">
              <Compass className="w-6 h-6 text-[#C9A45C]" />
              <h3 className="font-serif text-xl text-[#F2EEE6]">02. Gradasi Cuci Buatan Tangan</h3>
              <p className="text-xs text-[#8F8A7F] leading-relaxed">
                Alih-alih menggunakan mesin kimia massal, setiap helai denim melewati proses hand-whiskering teliti, pencucian batu apung vulkanik, dan pelembut enzim alami untuk tekstur lembut sejak hari pertama.
              </p>
            </div>

            <div className="p-8 bg-[#121212] border border-[#1F1F1F] space-y-4">
              <ShieldCheck className="w-6 h-6 text-[#C9A45C]" />
              <h3 className="font-serif text-xl text-[#F2EEE6]">03. Aksesoris Kuningan Solid Kustom</h3>
              <p className="text-xs text-[#8F8A7F] leading-relaxed">
                Setiap kancing, paku keling, dan ritsleting dicetak dari kuningan padat dengan kilau emas metalik khas Luxury Clothes, diukir dengan monogram eksklusif kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Boutique Visit */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase">
          ATELIER BUTIK PRIVAT
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6]">
          Kunjungi Salon Butik Luxury Clothes
        </h2>
        <p className="text-xs sm:text-sm text-[#A39E93] max-w-xl mx-auto leading-relaxed">
          Lantai 3, Pacific Place Mall, SCBD Jakarta Selatan. Buka setiap hari pukul 10:00 – 22:00 WIB. Layanan fitting stylist privat dan pemotongan kelim kustom tersedia melalui reservasi.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#E1C27A] transition-colors cursor-pointer"
          >
            JELAJAHI KOLEKSI DENIM
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3.5 border border-[#333] text-xs tracking-widest uppercase text-[#F2EEE6] hover:bg-[#1A1A1A] transition-colors cursor-pointer"
          >
            RESERVASI FITTING
          </button>
        </div>
      </section>
    </div>
  );
};
