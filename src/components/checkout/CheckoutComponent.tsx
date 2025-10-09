'use client'
import React from 'react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Container } from '../ui/Container';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';
import { selectCartItems, selectTotalPrice } from '@/redux/cart/selectors';
import { useAppDispatch } from '@/redux/hooks';
import { removeFromCart } from '@/redux/cart/cartSlice';
import { CheckoutForm } from './CheckoutForm';
import { IAddress } from '@/types/address';

interface ICheckoutComponent {
  savedAddress: IAddress | null
}

export default function CheckoutComponent({savedAddress}: ICheckoutComponent) {
  const cartItems = useAppSelector(selectCartItems)
  const dispatch = useAppDispatch()
  const totalPrice = useAppSelector(selectTotalPrice)
  return (
    <>
      <Breadcrumb title="Checkout" />
      <section className="py-16 bg-gray-200 dark:bg-[#101828]">
        <Container className='flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col gap-5 w-1/2'>
            <h2 className="font-medium text-black dark:text-white text-2xl">Detaills Information</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
              <CheckoutForm savedAddress={savedAddress}/>
            </div>
          </div>
          <div className='flex flex-col gap-5 w-1/2'>
            <h2 className="font-medium text-black dark:text-white text-2xl">Your Order</h2>
            <div className="o bg-white dark:bg-gray-800 rounded-xl  flex flex-col justify-between shadow-md p-5">
              <ul className="flex flex-col h-[38.5vh] custom-scroll overflow-y-auto  gap-4">
                {cartItems.map((el) => (
                  <li
                    key={el.id}
                    className="flex items-center justify-between pr-3 border-b border-gray-100 dark:border-gray-700 pb-3 last:border-b-0"
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
                      className="w-8 h-8  flex cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-200 hover:bg-red-500 hover:text-white transition-colors duration-200"
                    >
                      <Trash size={18} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-3 border-t border-gray-300 dark:border-gray-700">
                <p className="font-bold text-black dark:text-white text-lg">Total</p>
                <p className="font-bold text-black dark:text-white text-lg">{totalPrice.toFixed(2)}$</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}