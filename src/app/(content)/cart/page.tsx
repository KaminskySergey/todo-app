import { Container } from '@/components/ui/Container';
import React from 'react';
import Image from "next/image"
import { Trash } from 'lucide-react';
import { CartComponent } from '@/components/cart/CartComponent';
export default function Cart() {
    return (
        <CartComponent />
    );
}