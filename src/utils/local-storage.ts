import { initialState } from "@/redux/cart/initState";
import { ICartState } from "@/types/products";

interface CartState {
  items: ICartState[];
}
export const loadStateCart = (): { cart: CartState } => {
  if (typeof window === "undefined") return { cart: initialState };
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState
      ? JSON.parse(serializedState)
      : { cart: initialState };
  } catch {
    return { cart: initialState };
  }
};

export const saveStateCart = (state: Partial<{ cart: CartState }>) => {
  if (typeof window === "undefined") return;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};
