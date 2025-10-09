import { createSlice } from "@reduxjs/toolkit";
import { CartState, initialState } from "./initState";
import { ICartState } from "@/types/products";
import { PayloadAction } from "@reduxjs/toolkit";

// const loadCartFromLocalStorage = (): CartState => {
//   if (typeof window === "undefined") return initialState;
//   const result = localStorage.getItem("cart");
//   if (result) {
//     try {
//       return JSON.parse(result) as CartState;
//     } catch {
//       return initialState;
//     }
//   }
//   return initialState;
// };

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartState>) => {
      const currentItem = state.items.find((el) => el.id === action.payload.id);

      if (currentItem) {
        currentItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
  
    updateQuantityCart: (state, action: PayloadAction<{id: Number, quantity: number}>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if(existingItem){
        existingItem.quantity = quantity
      }
    },
    removeAllCart: (state) => {
      state.items = []
    },
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
    },
  },
});

export const {addToCart, removeFromCart, updateQuantityCart, removeAllCart, setCart} = cartSlice.actions;

export default cartSlice.reducer
