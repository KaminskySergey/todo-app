import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
import { cartSlice } from "./cart/cartSlice";

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { CartState } from "./cart/initState";
import { wishlistSlice } from "./wishlist/wishlistSlice";
import { WishlistState } from "./wishlist/initState";

const saveStateToLocalStorage = (state: { cart: CartState; wishlist: WishlistState }) => {
  if (typeof window === "undefined") return;
  try {
    const data = {
      cart: state.cart,
      wishlist: state.wishlist,
    };
    localStorage.setItem("store", JSON.stringify(data));
  } catch {
    console.error("Failed to save state to localStorage");
  }
};


export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer
  },
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"],
// };

// const rootReducer = combineReducers({
//   cart:  cartSlice.reducer
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   // middleware: (getDefaultMiddleware) =>
//   //       getDefaultMiddleware({
//   //           serializableCheck: {
//   //               ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   //           },
//   //       }),
//   devTools: true,
// })

// export const persistor = persistStore(store);

// export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
