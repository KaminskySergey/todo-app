'use client';

import { ICartState } from '@/types/products';
import React, { useState } from 'react';
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image"
import { useAppDispatch } from '@/redux/hooks';
import { removeFromCart, updateQuantityCart } from '@/redux/cart/cartSlice';
interface IItemSingleTable {
    item: ICartState
}

export default function ItemSingleTable({ item }: IItemSingleTable) {
    const [quantity, setQuantity] = useState(item.quantity)
    const dispatch = useAppDispatch()

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
            dispatch(updateQuantityCart({ id: item.id, quantity: item.quantity - 1 }))
        }
    }

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1)
        dispatch(updateQuantityCart({ id: item.id, quantity: item.quantity + 1 }))
    }

    const handleRemoveItemFromCart = () => {
        dispatch(removeFromCart(item.id))
    }
    return (
        <tr className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
            <td className="py-4 px-6 ">
                <div className="flex items-center gap-4">
                    <div className="relative  w-20 h-20 flex-shrink-0 rounded-lg bg-gray-2 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                        <Image
                            src={item.images[0]}
                            width={80}
                            height={80}
                            alt={item.name}
                            className="object-cover w-full h-full"
                        />
                        {item.discount && (
                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[12px] z-5 p-1 font-bold  rounded-full ">
                                -{item.discount}%
                            </span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-black dark:text-white text-lg">
                            {item.name}
                        </h3>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <h3 className="font-semibold text-black dark:text-white text-lg">
                    {item.finalPrice}$
                </h3>
                {item.discount && (

                    <p className="text-gray-500 dark:text-gray-400 line-through text-sm">
                        {item.price}$
                    </p>


                )}
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center rounded-4xl border border-gray-400 dark:border-gray-600 overflow-hidden w-max">
                    <button
                        onClick={handleDecreaseQuantity}
                        disabled={quantity <= 1}
                        className={`
                  flex items-center justify-center px-3 h-11.5 cursor-pointer
                  ${quantity <= 1
                                ? "text-gray-300 dark:text-gray-500 cursor-not-allowed"
                                : "text-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500"}
                  border-r border-gray-300 dark:border-gray-600
                  transition-colors duration-200
                `}
                    >
                        <Minus size={20} />
                    </button>

                    <div className="px-4 text-lg font-semibold text-black dark:text-white border-x border-gray-200 dark:border-gray-600">
                        {quantity}
                    </div>

                    <button
                        onClick={handleIncreaseQuantity}
                        className="flex items-center cursor-pointer border-gray-300 dark:border-gray-600 justify-center px-3 h-11.5 text-blue dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 border-l"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </td>
            <td className="py-4 px-6">
                <h3 className="font-semibold text-black dark:text-white text-lg">
                    {item.finalPrice * quantity}$
                </h3>
            </td>
            <td className="py-4 px-6">
                <button
                    onClick={handleRemoveItemFromCart}
                    className="flex items-center justify-center rounded-full w-9.5 h-9.5 bg-gray-300 dark:bg-gray-700 border-none ease-out duration-200 cursor-pointer hover:bg-red-500 hover:border-red-500"
                >
                    <Trash className="dark:text-white" />
                </button>
            </td>
        </tr>
    );

}