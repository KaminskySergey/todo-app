'use client';

import { addToCart, removeFromCart } from '@/redux/cart/cartSlice';
import { selectCartItems } from '@/redux/cart/selectors';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/store';
import { IProduct } from '@/types/products';
import React from 'react';

interface IToggleCartButton {
    item: IProduct
}

export default function ToggleCartButton({item}: IToggleCartButton) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems)
    const isCart = cartItems.some(el => el.id === item.id)
    return (
        <>
            {isCart ? <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFromCart(item.id));
                }}
                className="py-2 px-4 rounded-full w-[164px] font-medium cursor-pointer bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
            >
                Delete From Cart
            </button>
                : <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(addToCart({ ...item, quantity: 1 }));
                    }}
                    className="py-2 px-4 rounded-full w-[164px] font-medium cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                >
                    Add To Cart
                </button>}
        </>
    );
}