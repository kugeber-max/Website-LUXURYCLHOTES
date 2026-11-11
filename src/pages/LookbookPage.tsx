import React from 'react';
import { ASSET_IMAGES } from '../services/store';
import { Product } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LookbookPageProps {
  navigate: (path: string) => void;
  onSelectProductBySlug: (slug: string) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({ navigate, onSelectProductBySlug }) => {
  const editorialSpreads = [
    {
      num: '01 / 06',
      title: 'SILUET FLARE ARSITEKTURAL',
      subtitle: 'SILUET AURELIA',
      caption: 'Proporsi kaki yang jenjang, geometri saku presisi, dan lipatan kelim lebar berkancing ganda.',
      image: ASSET_IMAGES.heroDuo,
      slug: 'aurelia-flare-jeans',
      aspect: 'aspect-[3/4]',
      colSpan: 'md:col-span-8'
    },
    {
      num: '02 / 06',
      title: 'TEKSTUR MARMER ASAM TAKTIL',
      subtitle: 'NOIR BAGGY DALAM ACID WASH',
      caption: 'Katun arang pekat hasil cuci asam khusus dengan draperi berat yang jatuh sempurna di atas sepatu.',
      image: ASSET_IMAGES.baggyGrey,
      slug: 'noir-baggy-denim',
      aspect: 'aspect-[4/5]',
      colSpan: 'md:col-span-4'
    },
    {
      num: '03 / 06',
      title: 'GARIS STRIPE KONTEMPORER',
      subtitle: 'POTONGAN ECLIPSE STRAIGHT',
      caption: 'Denim pinstripe vertikal yang diwarnai serat demi serat, menghadirkan disiplin garis linear yang tegas.',
      image: ASSET_IMAGES.pinstripeStraight,
      slug: 'eclipse-straight-jeans',
      aspect: 'aspect-[4/5]',
      colSpan: 'md:col-span-5'
    },
    {
      num: '04 / 06',
      title: 'PRESISI VOLUMETRIK 360°',
      subtitle: 'PROFIL LUNA WIDE LEG',
      caption: 'Jangkar pinggang tinggi seimbang dengan bukaan kelim bawah 26 inci untuk langkah kaki yang dinamis.',
      image: ASSET_IMAGES.wideAngles,
      slug: 'luna-wide-leg-jeans',
      aspect: 'aspect-[16/10]',
      colSpan: 'md:col-span-7'
    },
    {
      num: '05 / 06',
      title: 'KEINTIMAN & RELAKSASI STUDIO',
      subtitle: 'RELAKSASI GAYA MALAM',
      caption: 'Dipadukan secara elegan bersama rajutan halus monokrom dan aksen perhiasan berkarakter.',
      image: ASSET_IMAGES.modelPortrait,
      slug: 'noir-baggy-denim',
      aspect: 'aspect-[3/4]',
      colSpan: 'md:col-span-6'
    },
    {
      num: '06 / 06',
      title: 'KEBANGKITAN ERA TUJUH PULUH',
      subtitle: 'SUDUT CUTBRAY CELESTE',
      caption: 'Lekukan pinggul dan paha yang disempurnakan dengan pelebaran lonceng proporsional.',
      image: ASSET_IMAGES.flareAngles,
      slug: 'celeste-vintage-flare',
      aspect: 'aspect-[3/4]',
      colSpan: 'md:col-span-6'
    }
  ];

  return (
    <div className="bg-[#080808] text-[#F2EEE6] min-h-screen pt-24 pb-28">
      {/* Editorial Header */}
      <div className="border-b border-[#1C1C1C] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono tracking-[0.3em] text-[#C9A45C] uppercase">
            EDITORIAL VOL. IV • 2026
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#F2EEE6] tracking-[0.1em] uppercase">
            THE DENIM EDIT
          </h1>
          <div className="w-16 h-[1px] bg-[#C9A45C] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#9E988C] font-light max-w-xl mx-auto leading-relaxed">
            Studi visual proporsi, bayangan, dan serat katun ring-spun. Diabadikan di bawah pencahayaan sinematik untuk menonjolkan struktur dan poise busana denim modern.
          </p>
        </div>
      </div>

      {/* Editorial Quote Ribbon */}
      <div className="bg-[#0D0D0D] border-b border-[#171717] py-8 px-4 text-center">
        <p className="font-serif text-lg sm:text-xl text-[#D6D0C5] italic">
          “STANDAR BARU DENIM SEHARI-HARI — DIRANCANG UNTUK BERGERAK DENGAN RASA PERCAYA DIRI ALAMI.”
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {editorialSpreads.map((spread, idx) => (
            <div
              key={idx}
              className={`${spread.colSpan} flex flex-col group cursor-pointer`}
              onClick={() => onSelectProductBySlug(spread.slug)}
            >
              {/* Photo Box */}
              <div className={`relative ${spread.aspect} w-full overflow-hidden bg-[#111] border border-[#1F1F1F] group-hover:border-[#C9A45C]/50 transition-colors duration-500`}>
                <img
                  src={spread.image}
                  alt={spread.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Floating Numbering */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 border border-[#333] text-xs font-mono text-[#C9A45C]">
                  {spread.num}
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="pt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#8F8A7F] uppercase">
                  <span>{spread.subtitle}</span>
                  <span className="text-[#C9A45C] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    BELANJA SILUET <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F2EEE6] tracking-wide group-hover:text-[#C9A45C] transition-colors">
                  {spread.title}
                </h3>
                <p className="text-xs text-[#8F8A7F] font-light leading-relaxed">
                  {spread.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Invitation */}
        <div className="mt-20 p-10 bg-[#0E0E0E] border border-[#1F1F1F] text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono tracking-[0.25em] text-[#C9A45C] uppercase">
            LAYANAN FITTING PRIVAT
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2EEE6]">
            Rasakan Pengalaman Busana Secara Langsung
          </h2>
          <p className="text-xs text-[#9E988C] max-w-md mx-auto leading-relaxed">
            Kunjungi butik atelier kami di Pacific Place Mall Jakarta untuk sesi konsultasi fitting privat, penyesuaian kelim khusus, dan peninjauan koleksi rilis terbatas.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-[#C9A45C] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#E1C27A] transition-colors cursor-pointer"
            >
              RESERVASI FITTING PRIVAT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
