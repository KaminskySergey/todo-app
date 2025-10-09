import { ShoppingCart } from 'lucide-react';
import Link from "next/link";
import React from 'react';

export function NoItemCart() {
  return (
    <div className='flex flex-col items-center gap-5 pt-16'>
      <div className='w-[100px] h-[100px] rounded-full flex items-center justify-center bg-gray-400'>
        <ShoppingCart className='text-gray-600' size={32} />
      </div>
      <h3>Your cart is empty!</h3>
      <Link
        href="/products"
        className='max-w-96 mx-auto flex justify-center font-medium text-white bg-blue-900 hover:bg-blue-950 py-[13px] px-6 rounded-full ease-out duration-200 hover:bg-opacity-95'
      >
        Continue Shopping
      </Link>
    </div>
  );
}