import React, { useState, useEffect } from 'react';
import { ASSET_IMAGES, StoreService } from '../services/store';
import { Product, HomepageConfig, Banner } from '../types';
import { ProductCard } from '../components/ProductCard';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { ArrowRight, Instagram, Sparkles, Tag } from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onSelectProduct }) => {
  const [config, setConfig] = useState<HomepageConfig>(() => StoreService.getHomepageConfig());
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null);

  useEffect(() => {
    const loadData = () => {
      setConfig(StoreService.getHomepageConfig());
      const all = StoreService.getProducts();
      setFeaturedProducts(all.slice(0, 4));
      const allBanners = StoreService.getBanners();
      setActiveBanner(allBanners.find(b => b.status === 'active') || null);
    };

    loadData();
    window.addEventListener('luxury-store-updated', loadData);
    return () => window.removeEventListener('luxury-store-updated', loadData);
  }, []);

  const instagramImages = [
    { src: ASSET_IMAGES.wideAngles, caption: 'Draperi skulptural. The Luna Wide Leg.' },
    { src: ASSET_IMAGES.baggyGrey, caption: 'Noir Baggy Denim dengan marmer abu-abu vintage.' },
    { src: ASSET_IMAGES.heroDuo, caption: 'Kesempurnaan high waist cutbray flared.' },
    { src: ASSET_IMAGES.modelPortrait, caption: 'Kenyamanan santai berpadu aura malam memikat.' },
    { src: ASSET_IMAGES.pinstripeStraight, caption: 'Garis tegas tailored pinstripe denim.' },
    { src: ASSET_IMAGES.flareAngles, caption: 'Mahakarya siluet 360 derajat.' }
  ];

  return (
    <div className="bg-[#080808] text-[#F2EEE6]">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[640px] w-full flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={config.heroImage || ASSET_IMAGES.heroDuo}
            alt="Kampanye Luxury Clothes Denim"
            className="w-full h-full object-cover object-center scale-100 animate-in fade-in zoom-in-105 duration-1000"
          />
          {/* Subtle vignette and contrast scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Subtle gold line & brand badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C9A45C]" />
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#C9A45C]">
              MUSIM GUGUR / DINGIN 2026
            </span>
            <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C9A45C]" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.14em] uppercase text-[#F2EEE6] leading-[1.05] drop-shadow-2xl">
            {config.heroTitle || 'THE ART OF EVERYDAY DENIM'}
          </h1>

          {/* Gold separator */}
          <div className="w-24 h-[1px] bg-[#C9A45C] my-6 opacity-75" />

          <p className="max-w-xl text-sm sm:text-base md:text-lg text-[#D6D0C5] font-light tracking-wide leading-relaxed mb-10 drop-shadow">
            {config.heroSubtitle ||
              'Diciptakan bagi mereka yang mendefinisikan gaya mereka sendiri. Siluet artisanal dengan presisi jahitan dan aura abadi.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate(config.heroCtaLink || '/shop')}
              className="px-8 py-4 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#E1C27A] transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{config.heroCtaText || 'BELANJA KOLEKSI'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate(config.secondaryCtaLink || '/lookbook')}
              className="px-8 py-4 bg-black/60 hover:bg-[#151515] text-[#F2EEE6] border border-[#C9A45C]/40 hover:border-[#C9A45C] text-xs tracking-[0.25em] uppercase transition-all backdrop-blur-sm cursor-pointer"
            >
              {config.secondaryCtaText || 'JELAJAHI LOOKBOOK'}
            </button>
          </div>
        </div>

        {/* Bottom subtle scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#888] opacity-75">
          <span className="text-[10px] font-mono tracking-widest uppercase">GULIR KE BAWAH</span>
          <span className="w-[1px] h-6 bg-gradient-to-b from-[#C9A45C] to-transparent animate-pulse" />
        </div>
      </section>

      {/* 2. ANNOUNCEMENT MARQUEE BAR */}
      <AnnouncementBar text={config.announcementMarquee} />

      {/* 3. BRAND INTRO (EDITORIAL SECTION) */}
      <section className="bg-[#F2EEE6] text-[#0D0D0D] py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Story */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#8A6827]">
                {config.brandIntroKicker || '01 — IDENTITAS MAISON'}
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-[0.06em] leading-tight text-[#0D0D0D]">
                {config.brandIntroTitle || 'DENIM, DIDEFINISIKAN ULANG.'}
              </h2>

              <p className="text-sm sm:text-base text-[#403B33] leading-relaxed font-normal">
                {config.brandIntroBody ||
                  'Denim premium yang dirancang berpusat pada rasa percaya diri, keleluasaan bergerak, dan gaya abadi. Terlahir dari dedikasi mendalam terhadap potongan arsitektural dan tekstur katun murni, LUXURY CLOTHES mengangkat busana harian menjadi karya seni bernilai tinggi.'}
              </p>

              <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
                Setiap siluet dikalibrasi secara presisi: sudut flare kaki yang dinamis, lekuk ban pinggang yang ergonomis, serta gradasi cuci artisanal yang menonjolkan keindahan siluet tubuh Anda secara natural.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#0D0D0D] border-b-2 border-[#8A6827] pb-1 hover:text-[#8A6827] transition-colors cursor-pointer"
                >
                  <span>KISAH KAMI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Editorial Photography */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-2xl border border-black/10 group">
                <img
                  src={config.brandIntroImage || ASSET_IMAGES.modelPortrait}
                  alt="Editorial Potret Model Luxury Clothes"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-4 text-[#F2EEE6] flex items-center justify-between border-l-2 border-[#C9A45C]">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase">
                      ARSIP KOLEKSI
                    </p>
                    <p className="font-serif text-sm tracking-wider">
                      Mahakarya Relaxed High-Rise
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C9A45C]">EDISI 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTION: SIGNATURE DENIM */}
      <section className="bg-[#080808] py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
                PILIHAN KURASI
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.08em] uppercase text-[#F2EEE6]">
                {config.signatureTitle || 'DENIM SIGNATURE'}
              </h2>
              <p className="text-xs sm:text-sm text-[#8F8A7F] font-light max-w-md mt-2">
                {config.signatureSubtitle ||
                  'Siluet ikonik yang dirancang untuk kenyamanan, karakter kuat, dan keanggunan kasual.'}
              </p>
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="text-xs tracking-[0.2em] uppercase text-[#C9A45C] hover:text-[#E1C27A] flex items-center gap-1.5 self-start md:self-end border-b border-[#C9A45C]/30 pb-1 hover:border-[#C9A45C] transition-all cursor-pointer"
            >
              <span>LIHAT SEMUA SILUET</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CATEGORY SHOWCASE (WOMEN, MEN, DENIM) */}
      <section className="bg-[#0D0D0D] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
              JELAJAHI BERDASARKAN KATEGORI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F2EEE6] tracking-[0.08em] uppercase">
              TIGA PILAR UTAMA MAISON
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1: WOMEN */}
            <div
              onClick={() => navigate('/women')}
              className="group relative aspect-[3/4] overflow-hidden bg-black cursor-pointer border border-[#1C1C1C]"
            >
              <img
                src={ASSET_IMAGES.heroDuo}
                alt="Koleksi Wanita"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase">
                    WANITA
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-wide">
                    Siluet Flare & High-Rise
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Category 2: MEN */}
            <div
              onClick={() => navigate('/men')}
              className="group relative aspect-[3/4] overflow-hidden bg-black cursor-pointer border border-[#1C1C1C]"
            >
              <img
                src={ASSET_IMAGES.baggyGrey}
                alt="Koleksi Pria"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase">
                    PRIA
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-wide">
                    Potongan Relaxed & Baggy
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Category 3: DENIM */}
            <div
              onClick={() => navigate('/denim')}
              className="group relative aspect-[3/4] overflow-hidden bg-black cursor-pointer border border-[#1C1C1C]"
            >
              <img
                src={ASSET_IMAGES.wideAngles}
                alt="Arsip Denim"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 transition-all" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A45C] uppercase">
                    ARSIP DENIM
                  </span>
                  <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-wide">
                    Mahakarya Wide Leg
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-black transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5B. PROMOTIONAL BANNER (Managed via Admin CMS) */}
      {activeBanner && (
        <section className="bg-[#050505] border-y border-[#C9A45C]/30 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0E0E0E] border border-[#222] p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black shrink-0 overflow-hidden border border-[#C9A45C]/40">
                <img src={activeBanner.image} alt={activeBanner.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C9A45C] flex items-center gap-1.5">
                  <Tag className="w-3 h-3" />
                  <span>PROMOSI SPESIAL</span>
                </span>
                <h3 className="font-serif text-2xl text-[#F2EEE6] tracking-wide">
                  {activeBanner.title}
                </h3>
                <p className="text-xs text-[#8F8A7F] font-light max-w-md">
                  {activeBanner.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(activeBanner.buttonLink || '/shop')}
              className="px-6 py-3.5 bg-[#C9A45C] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#E1C27A] transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>{activeBanner.buttonText || 'JELAJAHI SEKARANG'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* 6. CAMPAIGN FULL-WIDTH BANNER */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden flex items-center justify-center border-t border-[#1A1A1A]">
        <div className="absolute inset-0">
          <img
            src={config.campaignImage || ASSET_IMAGES.baggyGrey}
            alt="Fitur Kampanye"
            className="w-full h-full object-cover object-center opacity-40 filter saturate-120"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A45C]/15 border border-[#C9A45C]/30 text-[#C9A45C] text-xs font-mono tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KAMPANYE EDITORIAL MUSIMAN</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2EEE6] tracking-[0.1em] uppercase">
            {config.campaignTitle || 'MILIKI SILUET ANDA'}
          </h2>

          <p className="text-sm sm:text-base text-[#C5C0B6] font-light max-w-xl mx-auto leading-relaxed">
            {config.campaignSubtitle ||
              'Dirancang untuk bergerak bersama Anda di setiap ruang, momen istimewa, dan gaya yang tak lekang oleh waktu.'}
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate(config.campaignCtaLink || '/denim')}
              className="px-8 py-3.5 bg-[#C9A45C] text-black font-semibold text-xs tracking-[0.25em] uppercase hover:bg-[#E1C27A] transition-all shadow-xl cursor-pointer"
            >
              {config.campaignCtaText || 'JELAJAHI KOLEKSI'}
            </button>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL LOOKBOOK TEASER */}
      <section className="bg-[#0A0A0A] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1C1C1C]">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#C9A45C]">
            {config.editorialSubtitle || 'STANDAR EDITORIAL DENIM SEHARI-HARI'}
          </p>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F2EEE6] italic font-normal tracking-wide max-w-3xl mx-auto leading-relaxed">
            {config.editorialQuote || '“Kemewahan sejati terpancar dari bagaimana potongan busana bergerak selaras dengan langkah Anda.”'}
          </blockquote>
          <div className="pt-6">
            <button
              onClick={() => navigate('/lookbook')}
              className="text-xs tracking-[0.2em] uppercase text-[#F2EEE6] hover:text-[#C9A45C] inline-flex items-center gap-2 border-b border-[#C9A45C] pb-1 transition-colors cursor-pointer"
            >
              <span>JELAJAHI LOOKBOOK THE DENIM EDIT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM SECTION: FOLLOW THE EDIT */}
      <section className="bg-[#050505] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase block mb-2">
              KOMUNITAS & MOODBOARD
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6] tracking-[0.08em] uppercase mb-2">
              IKUTI KANAL KAMI
            </h2>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#8F8A7F] hover:text-[#C9A45C] tracking-widest font-mono transition-colors"
            >
              @luxuryclothes
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {instagramImages.map((item, idx) => (
              <a
                key={idx}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square bg-[#111] overflow-hidden border border-[#222] block"
              >
                <img
                  src={item.src}
                  alt={`Instagram editorial post ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center">
                  <Instagram className="w-6 h-6 text-[#C9A45C] mb-2" />
                  <span className="text-[10px] text-[#F2EEE6] font-light line-clamp-2">
                    {item.caption}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
