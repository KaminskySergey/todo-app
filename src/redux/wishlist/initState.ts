import { IProduct } from "@/types/products";

export interface WishlistState {
  items: IProduct[];
}

export const initialState: WishlistState = {
  items: [],
};
