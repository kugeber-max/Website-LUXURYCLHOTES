import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ASSET_IMAGES } from '../services/store';
import { X, Ruler, Sparkles, Check, Calculator, ArrowRight } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { sizeGuideOpen, setSizeGuideOpen } = useCart();
  const [calculatorWeight, setCalculatorWeight] = useState<number | ''>(52);
  const [isCurvyHip, setIsCurvyHip] = useState<boolean>(false);

  if (!sizeGuideOpen) return null;

  const sizeTable = [
    { size: '27', bbMin: 38, bbMax: 42, bb: '38 - 42 kg', waist: '68 - 71 cm', hip: '88 - 91 cm', standard: 'XS' },
    { size: '28', bbMin: 43, bbMax: 46, bb: '43 - 46 kg', waist: '71 - 74 cm', hip: '91 - 94 cm', standard: 'S' },
    { size: '29', bbMin: 47, bbMax: 49, bb: '47 - 49 kg', waist: '74 - 76 cm', hip: '94 - 97 cm', standard: 'S / M' },
    { size: '30', bbMin: 50, bbMax: 54, bb: '50 - 54 kg', waist: '76 - 79 cm', hip: '97 - 100 cm', standard: 'M' },
    { size: '31', bbMin: 55, bbMax: 57, bb: '55 - 57 kg', waist: '79 - 82 cm', hip: '100 - 103 cm', standard: 'M / L' },
    { size: '32', bbMin: 58, bbMax: 62, bb: '58 - 62 kg', waist: '82 - 85 cm', hip: '103 - 106 cm', standard: 'L' },
    { size: '33', bbMin: 62, bbMax: 65, bb: '62 - 65 kg', waist: '85 - 88 cm', hip: '106 - 110 cm', standard: 'XL' },
    { size: '34', bbMin: 66, bbMax: 75, bb: '66 - 75 kg', waist: '88 - 93 cm', hip: '110 - 116 cm', standard: 'XL' },
  ];

  // Calculate recommended size
  const getRecommendation = () => {
    if (!calculatorWeight || calculatorWeight <= 0) return null;
    let baseMatch = sizeTable.find(
      s => calculatorWeight >= s.bbMin && calculatorWeight <= s.bbMax
    );
    if (!baseMatch) {
      if (calculatorWeight < 38) baseMatch = sizeTable[0];
      else baseMatch = sizeTable[sizeTable.length - 1];
    }

    if (isCurvyHip) {
      const idx = sizeTable.findIndex(s => s.size === baseMatch?.size);
      if (idx !== -1 && idx < sizeTable.length - 1) {
        return {
          recommended: sizeTable[idx + 1],
          note: 'Naik 1 size untuk kenyamanan ekstra di area pinggul & paha.'
        };
      }
    }

    return {
      recommended: baseMatch,
      note: 'Ukuran proporsional sesuai standar fitting Luxury Clothes.'
    };
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-[#C9A45C]/30 text-[#F2EEE6] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#222]">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-[#C9A45C]" />
            <div>
              <h2 className="font-serif text-2xl text-[#F2EEE6] tracking-wide">
                SIZE GUIDE & FIT CALCULATOR
              </h2>
              <p className="text-xs text-[#8F8A7F] font-mono tracking-widest uppercase">
                LUXURY DENIM TAILORING ARCHIVE
              </p>
            </div>
          </div>
          <button
            onClick={() => setSizeGuideOpen(false)}
            aria-label="Close size guide"
            className="p-2 text-[#8F8A7F] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Interactive Size Calculator Section */}
          <div className="bg-[#121212] border border-[#C9A45C]/40 p-5 rounded-none">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-4 h-4 text-[#C9A45C]" />
              <h3 className="text-xs font-mono tracking-widest uppercase text-[#C9A45C] font-semibold">
                INTERACTIVE SIZE RECOMMENDER
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4">
                <label className="block text-[11px] font-mono text-[#8F8A7F] uppercase mb-1">
                  Berat Badan Kamu (kg)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="35"
                    max="120"
                    value={calculatorWeight}
                    onChange={e => setCalculatorWeight(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-[#181818] border border-[#333] px-3 py-2 text-sm text-[#F2EEE6] font-mono focus:border-[#C9A45C] focus:outline-none"
                    placeholder="Contoh: 52"
                  />
                  <span className="bg-[#222] px-3 py-2 text-xs font-mono border border-l-0 border-[#333] text-[#888]">
                    kg
                  </span>
                </div>
              </div>

              <div className="md:col-span-4 flex items-center pt-2 md:pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#C5C0B6]">
                  <input
                    type="checkbox"
                    checked={isCurvyHip}
                    onChange={e => setIsCurvyHip(e.target.checked)}
                    className="accent-[#C9A45C] w-4 h-4"
                  />
                  <span>Pinggul / Paha Berisi (+1 Size)</span>
                </label>
              </div>

              <div className="md:col-span-4 bg-[#0A0A0A] p-3 border border-[#2B2B2B] flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-[#888] uppercase">REKOMENDASI UKURAN</span>
                {recommendation ? (
                  <>
                    <span className="font-serif text-2xl text-[#C9A45C] font-bold">
                      Size {recommendation.recommended.size} ({recommendation.recommended.standard})
                    </span>
                    <span className="text-[10px] text-[#A39E93] font-mono mt-0.5">
                      {recommendation.note}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-[#666]">Masukkan BB kamu</span>
                )}
              </div>
            </div>
          </div>

          {/* Authentic Size Chart Graphic Preview & Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#080808] p-4 border border-[#1F1F1F]">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative aspect-[3/4] max-w-[260px] overflow-hidden border border-[#C9A45C]/30 shadow-lg">
                <img
                  src={ASSET_IMAGES.sizeChart}
                  alt="Luxury Clothes Authentic Size Chart"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C9A45C]/10 border border-[#C9A45C]/30 text-[#C9A45C] text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPERT FIT CONSULTATION</span>
              </div>
              <h3 className="font-serif text-xl text-[#F2EEE6]">
                Cutbray Jeans Lipat Lebar & Flare Denim
              </h3>
              <p className="text-xs text-[#A39E93] leading-relaxed">
                Dirancang khusus dengan potongan high-waist yang menopang pinggang dengan kokoh, serta bukaan bawah lipat lebar yang memperpanjang proporsi kaki secara dramatis.
              </p>

              <div className="space-y-2 text-xs text-[#C5C0B6]">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span>
                    <strong>Catatan Pinggul:</strong> Buat kalian yang merasa pinggul & paha agak besar, sangat disarankan naik 1 size agar jatuhnya denim tetap flowy dan nyaman.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                  <span>
                    <strong>Toleransi Produksi:</strong> Semua ukuran memiliki toleransi 1–3 cm sebagaimana diproduksi massal secara artisanal.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sizing Table */}
          <div>
            <h4 className="text-xs font-mono tracking-widest uppercase text-[#C9A45C] mb-3">
              TABEL REKOMENDASI BERAT BADAN & UKURAN
            </h4>
            <div className="overflow-x-auto border border-[#222]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141414] text-[#F2EEE6] font-mono uppercase tracking-wider text-[11px] border-b border-[#222]">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">International</th>
                    <th className="py-3 px-4">Rekomendasi BB (Weight)</th>
                    <th className="py-3 px-4">Lingkar Pinggang</th>
                    <th className="py-3 px-4">Lingkar Pinggul</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1C1C] text-[#C5C0B6] font-mono">
                  {sizeTable.map((row, idx) => {
                    const isSelected = recommendation?.recommended.size === row.size;
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isSelected ? 'bg-[#C9A45C]/20 border-l-2 border-[#C9A45C]' : 'hover:bg-[#121212]'
                        }`}
                      >
                        <td className="py-3 px-4 font-bold text-[#C9A45C]">
                          {row.size} {isSelected && '★ (Pilihanmu)'}
                        </td>
                        <td className="py-3 px-4 text-[#A39E93]">{row.standard}</td>
                        <td className="py-3 px-4 text-[#F2EEE6] font-medium">{row.bb}</td>
                        <td className="py-3 px-4">{row.waist}</td>
                        <td className="py-3 px-4">{row.hip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1C1C1C] flex items-center justify-between bg-[#080808] text-xs">
          <span className="text-[#8F8A7F]">
            Butuh konsultasi lebih lanjut? Hubungi concierge via WhatsApp.
          </span>
          <button
            onClick={() => setSizeGuideOpen(false)}
            className="px-6 py-2.5 bg-[#C9A45C] text-black text-xs font-semibold tracking-widest uppercase hover:bg-[#E1C27A] transition-colors"
          >
            TUTUP PANDUAN
          </button>
        </div>
      </div>
    </div>
  );
};
