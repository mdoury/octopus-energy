import type { PropsWithChildren } from "react";

import { createContext, useContext } from "react";

import useCart from "hooks/useCart";

const CartContext = createContext<ReturnType<typeof useCart>>(null);

type Props = PropsWithChildren<{}>;

export function CartProvider({ children }: Props) {
  const value = useCart();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
