'use client';

import { useSidebarContext } from '@/app/context/SidebarProvider';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement } from 'react';

interface IItemNavigation {
    href: string
    link: string
    icon: ReactElement

}

export default function ItemNavigation({ href, link, icon }: IItemNavigation) {
    const pathname = usePathname()
    const { isSidebarOpen } = useSidebarContext()
    const isActive = pathname.split('/')[2] === link.toLowerCase();
    console.log(isActive)
    return (
        <li key={link}>
            <Link href={`/dashboard/${href}`} key={link} className={cn(
                "flex items-center font-medium text-[14px] justify-between px-2 py-2 rounded-2xl dark:hover:bg-gray-700  hover:bg-gray-200",
                {
                    "bg-blue-500 hover:bg-blue-600 text-white rounded-full dark:hover:bg-blue-600": isActive
                }
            )}>
                <p className={cn("transition-opacity duration-300", {
                    "opacity-0 w-0": !isSidebarOpen,
                    "opacity-100 w-auto": isSidebarOpen,
                })}>
                    {link}
                </p>
                <p>{icon}</p>
            </Link>
        </li>
    );
}