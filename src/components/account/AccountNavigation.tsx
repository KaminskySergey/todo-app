'use client';

import React from 'react';
import { BaggageClaim, LayoutGrid, LogOut, LogOutIcon, MapPinHouse, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
const accountMenu = [
    {
        name: "Dashboard",
        icon: <LayoutGrid />,
        link: "/account"
    },
    {
        name: "Orders",
        icon: <BaggageClaim />,
        link: "/account/orders"
    },
    {
        name: "Address",
        icon: <MapPinHouse />,
        link: "/account/address"
    },
    {
        name: "Account Details",
        icon: <User />,
        link: "/account/account-details"
    },

]
export default function AccountNavigation() {
    const pathname = usePathname()
    return (
        <div className='w-full max-w-[280px]'>
            <ul className="flex flex-col gap-2  px-5 py-4 rounded-lg shadow-xl bg-white dark:bg-gray-800 ">
                {accountMenu.map((el, idx) => {
                    const isActive = pathname === el.link;
                    return (
                        <li key={idx}>
                            <Link href={el.link}>
                                <div
                                    className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${isActive
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    <div>{el.icon}</div>
                                    <p className="font-medium">{el.name}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
                <li key={"logout"}>
                    <div
                    >
                        <button type="button" onClick={() => signOut()} className="flex cursor-pointer w-full items-center gap-3 px-3 py-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <div><LogOutIcon /></div>
                            <p className="font-medium">Logout</p>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}