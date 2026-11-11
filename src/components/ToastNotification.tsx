import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#111] border border-[#C9A45C]/50 text-[#F2EEE6] px-4 py-3 shadow-2xl flex items-center gap-3 max-w-sm">
        <Sparkles className="w-4 h-4 text-[#C9A45C] shrink-0" />
        <span className="text-xs tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
};
