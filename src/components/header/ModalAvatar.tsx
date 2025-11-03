'use client';

import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Avatar from './Avatar';
import { useClickOutside } from '@/hooks/useClickOutside';
import { X } from 'lucide-react'
import Link from 'next/link';
import { signOut } from 'next-auth/react';
interface IModalAvatar {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    isOpen: boolean
}

export default function ModalAvatar({ setIsOpen, isOpen }: IModalAvatar) {
    const containerRef = useRef<HTMLDivElement>(null)

    useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => setIsOpen(false), isOpen)

    return (
        <div ref={containerRef} className='absolute w-[300px] h-[196px]  top-[50px] overflow-hidden right-0 rounded-lg bg-white dark:bg-gray-800'>
            <div className='w-full bg-blue-600 h-[40%]' />
            <button type="button" onClick={() => setIsOpen(false)} className='text-black hover:text-blue-900 transition-colors duration-300 ease-in-out cursor-pointer absolute top-1 right-1 '>
                <X className='w-4 h-4' />
            </button>
            <div className='absolute top-5 left-3 flex gap-3 text-white'>
                <Avatar isModal />
                <div>
                    <p className='text-lg font-bold'>Serhii Kaminskyi</p>
                    <p className='text-gray-200 font-medium text-[14px]'>serg@gmail.com</p>
                </div>
            </div>

            <div className='pt-7 px-4 text-[14px] font-medium flex flex-col'>
                <div className=' py-1'>
                    <Link href={'/dashboard/profile'} className='cursor-pointer hover:text-green-500 transition-colors duration-300 '>Change Profile</Link>
                </div>
                <hr className="w-full h-px bg-[#091e4224] dark:bg-[#ffffff33] border-0 my-2 transition-colors" />
                <div className='py-1'>
                    <button onClick={() => signOut({ callbackUrl: "/auth/signin" })} type='button' className='cursor-pointer hover:text-red-500 transition-colors duration-300'>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}