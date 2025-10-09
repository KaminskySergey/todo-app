import { ICartState } from "@/types/products";



export interface CartState {
  items: ICartState[]
  }

  
  
 export const initialState: CartState = {
  items: []
  };

  