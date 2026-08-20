import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../data';

export interface BOMItem {
  id: string;
  name: string;
  slug?: string;
  brand: string;
  category: string;
  image: string;
  quantity: number;
  unit: string;
  specs?: string;
}

interface BOMContextType {
  items: BOMItem[];
  addItem: (product: Product | { id: string; name: string; brand: string; category: string; images?: string[]; image?: string }, quantity?: number, unit?: string, specs?: string) => void;
  setItemQuantity: (product: Product | { id: string; name: string; brand: string; category: string; images?: string[]; image?: string }, quantity: number, unit?: string, specs?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBOM: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalCount: number;
}

const BOMContext = createContext<BOMContextType | undefined>(undefined);

const STORAGE_KEY = 'saienterprises_bom_v1';

export function BOMProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BOMItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read BOM from localStorage', e);
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save BOM to localStorage', e);
    }
  }, [items]);

  const addItem = (
    product: Product | { id: string; name: string; brand: string; category: string; images?: string[]; image?: string },
    quantity: number = 1,
    unit: string = 'Pcs',
    specs: string = ''
  ) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const img = ('images' in product && product.images && product.images.length > 0)
        ? product.images[0]
        : ('image' in product && product.image)
          ? product.image
          : 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80';

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: (product as any).slug || '',
          brand: product.brand || 'Generic',
          category: product.category || 'Electrical',
          image: img,
          quantity: Math.max(1, quantity),
          unit,
          specs
        }
      ];
    });
  };

  const setItemQuantity = (
    product: Product | { id: string; name: string; brand: string; category: string; images?: string[]; image?: string },
    quantity: number,
    unit: string = 'Pcs',
    specs: string = ''
  ) => {
    if (quantity <= 0) {
      removeItem(product.id);
      return;
    }

    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity }
            : item
        );
      }

      const img = ('images' in product && product.images && product.images.length > 0)
        ? product.images[0]
        : ('image' in product && product.image)
          ? product.image
          : 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80';

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          slug: (product as any).slug || '',
          brand: product.brand || 'Generic',
          category: product.category || 'Electrical',
          image: img,
          quantity,
          unit,
          specs
        }
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearBOM = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BOMContext.Provider
      value={{
        items,
        addItem,
        setItemQuantity,
        removeItem,
        updateQuantity,
        clearBOM,
        isOpen,
        setIsOpen,
        totalCount,
      }}
    >
      {children}
    </BOMContext.Provider>
  );
}

export function useBOM() {
  const context = useContext(BOMContext);
  if (!context) {
    throw new Error('useBOM must be used within a BOMProvider');
  }
  return context;
}
