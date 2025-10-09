'use client'
import React from 'react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Container } from '../ui/Container';
import { useAppSelector } from '@/redux/store';
import { selectWishlistItems } from '@/redux/wishlist/selectors';
import NoWishlistItem from './NoWishlistItem';
import { useAppDispatch } from '@/redux/hooks';
import { removeAllWishlist } from '@/redux/wishlist/wishlistSlice';
import ItemSingleTable from './ItemSingleTable';

export default function WishlistComponet() {
    const wishListItems = useAppSelector(selectWishlistItems)
    const dispatch = useAppDispatch()
    const handleClearWishlist = () => {
        dispatch(removeAllWishlist())
    }
    
    return (
        <>
            <Breadcrumb title="Wishlist" />
            <section className="py-16 bg-gray-200 dark:bg-[#101828]">
                <Container>
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="font-medium text-black dark:text-white text-2xl">Your Wishlist</h1>
                        {wishListItems.length > 0 && <button onClick={handleClearWishlist} className="text-blue-500 cursor-pointer hover:underline transition-colors duration-300">Clear Wishlist</button>}
                    </div>
                    {
                        wishListItems.length === 0 ? <NoWishlistItem /> :
                            <div className='w-full overflow-x-auto overflow-hidden rounded-xl shadow-md'>
                                <table className="w-full min-w-[1100px] rounded-lg border-collapse">
                                    <thead className="bg-gray-300 dark:bg-gray-700">
                                        <tr>
                                            <th className='text-left py-4 px-6 w-12 whitespace-nowrap'></th>
                                            <th className="min-w-[400px] text-start py-4 px-6">Product</th>
                                            <th className="min-w-[180px] text-start py-4 px-6">Unit Price</th>
                                            <th className="min-w-[275px] text-start py-4 px-6">Stock Status</th>
                                            <th className="min-w-[50px] text-start py-4 px-6">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            wishListItems.map(el => (
                                                <ItemSingleTable item={el} key={el.id} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </Container>
            </section>
        </>
    );
}