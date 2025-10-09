import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WishlistState, initialState } from "./initState";
import { IProduct } from "@/types/products";
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IProduct>) => {
      const exists = state.items.find((el) => el.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((el) => el.id !== action.payload);
    },
    removeAllWishlist: (state) => {
        state.items = []
    },
    setWishlist: (state, action: PayloadAction<WishlistState>) => {
        state.items = action.payload.items;
      },
  },
});

export const { addToWishlist, removeFromWishlist, removeAllWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
