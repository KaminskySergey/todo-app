'use client';

import React, { useState } from 'react';
import { Container } from './Container';
import Avatar from '../header/Avatar';
import { usePathname } from 'next/navigation';
import ModalAvatar from '../header/ModalAvatar';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Menu } from 'lucide-react'
export default function Header() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = () => {
        setIsOpen(pS => !pS)
    }
    const title = pathname.split('/')[2] || "Dashboard";
    const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
        <header className='sticky top-0 left-0 z-10 bg-white dark:bg-[#101828] transition-width duration-300 ease-in-out h-[64px] w-full shadow-md'>
            <Container className='flex items-center justify-between h-[64px] max-w-full'>

                <h1 className='text-xl font-bold'>
                    {formattedTitle}
                </h1>
                <div className='flex relative items-center gap-4'>
                    <div className='block md:hidden'>
                        <Menu className='hover:text-blue-500 transition-colors duration-200' />
                    </div>
                    <ThemeSwitcher />
                    <Avatar handleToggle={handleToggle} />



                    {isOpen && <ModalAvatar setIsOpen={setIsOpen} isOpen={isOpen} />}
                </div>
            </Container>

        </header>
    );
}