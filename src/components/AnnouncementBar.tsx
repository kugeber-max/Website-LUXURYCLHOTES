import React from 'react';

interface AnnouncementBarProps {
  text?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'FREE SHIPPING OVER IDR 1.000.000 • EASY 14-DAY RETURNS • ARCHITECTURAL DENIM CRAFTSMANSHIP • COMPLIMENTARY LUXURY PACKAGING •'
}) => {
  return (
    <div className="bg-[#0F0F0F] border-y border-[#C9A45C]/20 py-2.5 overflow-hidden select-none">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex gap-8 items-center text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-[#C9A45C] font-medium">
          <span>{text}</span>
          <span className="text-[#8A6827]">✦</span>
          <span>{text}</span>
          <span className="text-[#8A6827]">✦</span>
          <span>{text}</span>
          <span className="text-[#8A6827]">✦</span>
        </div>
        <div className="animate-marquee flex gap-8 items-center text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-[#C9A45C] font-medium" aria-hidden="true">
          <span>{text}</span>
          <span className="text-[#8A6827]">✦</span>
          <span>{text}</span>
          <span className="text-[#8A6827]">✦</span>
          <span>{text}</span>
          <span className="text-[#8A6827]">✦</span>
        </div>
      </div>
    </div>
  );
};
