import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { StoreService } from '../services/store';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  freeShippingProgress: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
  toast: { message: string } | null;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'luxury_clothes_cart_items_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => StoreService.getWishlist());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string } | null>(null);

  const settings = StoreService.getStoreSettings();
  const freeShippingThreshold = settings.freeShippingThreshold || 1000000;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      }
    } catch {
      // ignore
    }
  }, [cart]);

  // Listen to store updates
  useEffect(() => {
    const handleUpdate = () => {
      setWishlist(StoreService.getWishlist());
    };
    window.addEventListener('luxury-store-updated', handleUpdate);
    return () => window.removeEventListener('luxury-store-updated', handleUpdate);
  }, []);

  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          ...item,
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${item.name} (${item.size} / ${item.color}) to bag.`);
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(i => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const updated = StoreService.toggleWishlist(productId);
    setWishlist(updated);
    const inList = updated.includes(productId);
    showToast(inList ? 'Added to your private wishlist.' : 'Removed from your wishlist.');
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        freeShippingThreshold,
        remainingForFreeShipping,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideOpen,
        setSizeGuideOpen,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
