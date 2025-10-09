'use client';

import React, { useEffect } from 'react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Container } from '../ui/Container';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { removeAllCart } from '@/redux/cart/cartSlice';

interface ISuccessComponent {
    orderId: string
}

export default function SuccessComponent({ orderId }: ISuccessComponent) {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(removeAllCart())
    }, [removeAllCart])
    return (
        <>
            <Breadcrumb title="Success" />
            <section className="py-16 bg-gray-200 dark:bg-[#101828]">
                <Container className="flex flex-col items-center gap-5">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                    <h2 className="text-3xl font-bold text-black dark:text-white">
                        Thank you for your order!
                    </h2>
                    {orderId && (
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            Your order number: <span className="text-blue-600">{orderId}</span>
                        </p>
                    )}
                    <p className="text-gray-700 text-center dark:text-gray-300 max-w-md">
                        Your order has been successfully placed. We are processing it and
                        you will receive an email confirmation shortly.
                    </p>
                    <Link
                        href="/products"
                        className="mt-4 inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        Go To Shopping
                    </Link>
                </Container>
            </section>
        </>
    );
}