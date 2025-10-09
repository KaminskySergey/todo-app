'use client'
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { setCart } from "./cart/cartSlice";
import { PreLoader } from "@/components/common/Preloader";
import { setWishlist } from "./wishlist/wishlistSlice";

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const dispatch = useAppDispatch();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("store");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.cart) dispatch(setCart(parsed.cart));
                if (parsed.wishlist) dispatch(setWishlist(parsed.wishlist));
            }
            setHydrated(true);
        }
    }, [dispatch]);

    if (!hydrated) return <PreLoader />;
    return <>{children}</>;
};