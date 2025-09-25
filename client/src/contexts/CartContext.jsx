import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products.js';

const STORAGE_KEY = 'hb_cart_items';
const CartContext = createContext(undefined);

const PRODUCT_MAP = new Map(PRODUCTS.map((product) => [product.slug, product]));

function loadInitialCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item?.slug === 'string' && Number.isFinite(item?.quantity));
  } catch (error) {
    console.warn('Failed to parse cart from storage', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadInitialCart());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const cartItems = useMemo(() =>
    items
      .map((item) => {
        const product = PRODUCT_MAP.get(item.slug);
        if (!product) return null;
        const subtotal = product.price * item.quantity;
        return {
          ...item,
          product,
          price: product.price,
          subtotal,
        };
      })
      .filter(Boolean),
  [items]);

  const totalQuantity = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const totalPrice = useMemo(() => cartItems.reduce((acc, item) => acc + item.subtotal, 0), [cartItems]);

  function addToCart(slug, quantity = 1) {
    if (!PRODUCT_MAP.has(slug)) {
      console.warn('Attempted to add unknown product to cart', slug);
      return;
    }

    const parsed = Number(quantity);
    const safeQuantity = Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : 1;

    setItems((current) => {
      const existing = current.find((item) => item.slug === slug);
      if (existing) {
        return current.map((item) =>
          item.slug === slug ? { ...item, quantity: item.quantity + safeQuantity } : item
        );
      }
      return [...current, { slug, quantity: safeQuantity }];
    });
  }

  function removeFromCart(slug) {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }

  function updateQuantity(slug, quantity) {
    const parsed = Number(quantity);
    const nextQuantity = Number.isFinite(parsed) ? Math.floor(parsed) : 1;
    if (nextQuantity <= 0) {
      removeFromCart(slug);
      return;
    }

    setItems((current) =>
      current.map((item) => (item.slug === slug ? { ...item, quantity: nextQuantity } : item))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = useMemo(
    () => ({
      items,
      cartItems,
      totalQuantity,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, cartItems, totalQuantity, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
