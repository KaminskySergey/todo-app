'use client';

import { useSidebarContext } from '@/app/context/SidebarProvider';
import { removeFromCart } from '@/redux/cart/cartSlice';
import { selectCartItems, selectTotalPrice } from '@/redux/cart/selectors';
import { useAppDispatch } from '@/redux/hooks';
import { useAppSelector } from '@/redux/store';
import {  Trash, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function SidebarCart() {
  const { isSidebarOpen, openSidebar, closeSidebar } = useSidebarContext()
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice)
  const dispatch = useAppDispatch()
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      if (!event.target.closest(".modal-content")) {
        closeSidebar();
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, openSidebar]);


  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-9998 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />


      <div
        className={`fixed top-0 right-0 z-9999 h-screen w-full max-w-[350px] bg-white dark:bg-[#101828] shadow-xl transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } modal-content`}
      >

        <div className="sticky top-0 px-4 py-4 flex flex-col gap-4">


          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 flex items-center justify-between">
            <h2 className="text-black dark:text-gray-50 font-bold text-lg sm:text-xl">
              Cart View
            </h2>
            <button
              onClick={() => closeSidebar()}
              aria-label="Close sidebar"
              className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>


          <div className="h-[66vh] overflow-y-auto no-scrollbar">
            <ul className="flex flex-col gap-4">
              {cartItems.map((el) => (
                <li
                  key={el.id}
                  className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0"
                >


                  <div className="relative w-[70px] h-[70px] overflow-hidden rounded-lg flex-shrink-0">
                    <Image
                      src={el.images[0]}
                      alt={el.name}
                      fill
                      className="object-cover"
                    />
                    {el.discount && (
                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] z-5 p-1 font-bold  rounded-full ">
                                -{el.discount}%
                            </span>
                        )}
                  </div>


                  <div className="flex flex-col gap-1 flex-1 px-3">
                    <Link
                      href={`/products/${el.id}`}
                      className=" group"
                      onClick={closeSidebar}
                    >

                      <h3 className="text-gray-900 dark:text-gray-50 font-semibold text-sm group-hover:text-indigo-400 dark:group-hover:text-indigo-300 transition-colors duration-200">
                        {el.name} (x{el.quantity})
                      </h3>
                    </Link>
                    <span className="text-gray-600 dark:text-gray-300 group-hover:text-indigo-300 transition-colors duration-200">
                      ${el.finalPrice}
                    </span>
                    {el.discount && (

                      <p className="text-gray-500 dark:text-gray-400 line-through text-sm">
                        {el.price}$
                      </p>


                    )}
                  </div>


                  <button
                    onClick={() => dispatch(removeFromCart(el.id))}
                    type="button"
                    className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    <Trash size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>


          <div className="border-t border-gray-200 dark:border-gray-700 py-4 flex items-center justify-between">
            <p className="text-black dark:text-gray-50 font-bold text-lg sm:text-xl">Total</p>
            <p className="text-black dark:text-gray-50 font-bold text-lg sm:text-xl">{totalPrice.toFixed(2)}$</p>
          </div>


          <div className="flex items-center gap-3">
            <Link href={'/cart'} type='button' onClick={closeSidebar} className='bg-blue-500 w-full transition-colors duration-300 hover:bg-blue-700 cursor-pointer flex items-center justify-center text-white font-medium text-lg border-none rounded-4xl py-2 px-4'>
              View Cart
            </Link>
            <Link href={'/checkout'} className='bg-[#1C274C] w-full transition-colors duration-300 hover:bg-[#1C274C]/70 cursor-pointer flex items-center justify-center text-white font-medium text-lg border-none rounded-4xl py-2 px-4'>
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </>

  );
}