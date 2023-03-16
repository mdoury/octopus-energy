import { useCallback, useEffect, useMemo, useState } from "react";

const LS_KEY = "octopus-cart";

export default function useCart() {
  const [cart, setCart] = useState<Record<string, number>>();

  const addToCart = useCallback((productId: string, quantity: number) => {
    setCart((cart) => {
      const productQuantity = cart[productId] ?? 0;
      return { ...cart, [productId]: productQuantity + quantity };
    });
  }, []);

  const removeFromCart = useCallback((productId: string, quantity: number) => {
    setCart((cart) => {
      const productQuantity = cart[productId] ?? 0;
      return { ...cart, [productId]: productQuantity - quantity };
    });
  }, []);

  const total = useMemo(() => {
    if (!cart) return 0;
    return Object.values(cart).reduce((total, number) => total + number, 0);
  }, [cart]);

  useEffect(() => {
    if (!cart) {
      try {
        const lsCart = localStorage.getItem(LS_KEY);
        setCart(lsCart ? JSON.parse(lsCart) : {});
      } catch {
        setCart({});
      }
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  return { cart, addToCart, removeFromCart, total };
}
