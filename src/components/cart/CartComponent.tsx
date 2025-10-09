"use client"
import { Container } from "../ui/Container";

import { useAppSelector } from "@/redux/store";
import ItemSingleTable from "./ItemSingleTable";
import { useAppDispatch } from "@/redux/hooks";
import { removeAllCart } from "@/redux/cart/cartSlice";
import { NoItemCart } from "./NoItemCart";
import { selectTotalPrice } from "@/redux/cart/selectors";
import Link from "next/link";
import { Breadcrumb } from "../ui/Breadcrumb";

export function CartComponent() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch()
    const totalPrice = useAppSelector(selectTotalPrice)
    const handleClearCart = () => {
        dispatch(removeAllCart())
    }
    return <>
        <Breadcrumb title="Cart" />
        <section className="py-16 bg-gray-200 dark:bg-[#101828]">
            <Container >
                <div className="flex items-center justify-between mb-12">
                    <h2 className="font-medium text-black dark:text-white text-2xl">Your Cart</h2>
                    {cartItems.length > 0 && <button onClick={handleClearCart} className="text-blue-500 cursor-pointer hover:underline transition-colors duration-300">Clear Shopping Cart</button>}
                </div>
                {
                    cartItems.length === 0 ? <NoItemCart /> :
                        <div className='w-full overflow-x-auto overflow-hidden rounded-xl shadow-md'>
                            <table className="w-full min-w-[1100px] rounded-lg border-collapse">
                                <thead className="bg-gray-300 dark:bg-gray-700">
                                    <tr>
                                        <th className="min-w-[400px] text-start py-4 px-6">Product</th>
                                        <th className="min-w-[180px] text-start py-4 px-6">Price</th>
                                        <th className="min-w-[275px] text-start py-4 px-6">Quantity</th>
                                        <th className="min-w-[200px] text-start py-4 px-6">Subtotal</th>
                                        <th className="min-w-[50px] text-start py-4 px-6">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        cartItems.map(el => (
                                            <ItemSingleTable item={el} key={el.id} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                }

                {cartItems.length > 0 && <div className="bg-white dark:bg-gray-800 w-full md:max-w-2/5 ml-auto mt-8 rounded-xl shadow-md ">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-black dark:text-white text-xl ">Order Summary</h3>
                    </div>
                    <div className="px-4 pt-2 ">
                        <div className="flex items-center justify-between border-b py-5 px-4 border-gray-200 dark:border-gray-700">
                            <p className="font-semibold text-black dark:text-white text-lg">Product</p>
                            <p className="font-semibold text-black dark:text-white text-lg">Subtotal</p>
                        </div>
                        {
                            cartItems.map(el => (
                                <div key={el.id} className="flex items-center justify-between border-b py-5 px-4 border-gray-200 dark:border-gray-700">
                                    <h4 className="font-normal text-black dark:text-white text-base">{el.name} <span className="text-sm font-light">( x{el.quantity} )</span></h4>
                                    <h4 className="font-normal text-black dark:text-white text-base">{el.finalPrice}$</h4>

                                </div>
                            ))
                        }
                        <div className="flex flex-col gap-6 py-5 px-4">
                            <div className="flex items-center justify-between">
                                <p className="font-bold text-black dark:text-white text-lg">Total</p>
                                <p className="font-bold text-black dark:text-white text-lg">{totalPrice.toFixed(2)}$</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <Link href="/checkout" className="bg-blue-500 w-full transition-colors duration-300 hover:bg-blue-700 cursor-pointer flex items-center justify-center text-white font-medium text-lg border-none rounded-4xl py-2 px-4" >Process to Checkout</Link>
                            </div >
                        </div>
                    </div>
                </div>}
            </Container>
        </section>
    </>
}
