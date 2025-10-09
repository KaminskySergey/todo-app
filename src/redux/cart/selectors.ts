import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectCartItems = (state: RootState) => state.cart.items;


export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce((total, item) => {
    return total + item.finalPrice * item.quantity;
  }, 0);
});