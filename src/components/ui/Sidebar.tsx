'use client';

import { useSidebarContext } from '@/app/context/SidebarProvider';
import { cn } from '@/utils/utils';
import React  from 'react';
import { ListTodo, CalendarCheck2, Settings, UserRound, Menu, ChevronRight, LogOut } from 'lucide-react'
import ItemNavigation from './ItemNavigation';
import { signOut } from 'next-auth/react';
import LogoIcon from '../icons/LogoIcon';
import Link from 'next/link';


// const navigation = [
//     {
//         href: '/dashboard/todos',
//         link: 'Todos',
//         icon: <ListTodo />
//     },
//     {
//         href: '/dashboard/calendar',
//         link: 'Calendar',
//         icon: <CalendarCheck2 />
//     },
//     {
//         href: '/dashboard/settings',
//         link: 'Settings',
//         icon: <Settings />
//     },
//     {
//         href: '/dashboard/profile',
//         link: 'Profile',
//         icon: <UserRound />
//     },
// ]

export default function SideBar() {
    const { isSidebarOpen, openSidebar, closeSidebar } = useSidebarContext()
    const today = new Date().toISOString().slice(0, 10); 
    
    return (
        <aside className={cn("bg-white dark:bg-[#101828] dark:shadow-[6px_6px_12px_#0a0a0a,_-6px_-6px_12px_#1f2937] shadow-md rounded-br-2xl  flex flex-col justify-between  text-black dark:text-white h-full overflow-hidden transition-width duration-300 ease-in-out px-4 pb-6 pt-3", {
            "w-64": isSidebarOpen,
            "w-[72px]": !isSidebarOpen
        })}>
            <div className='flex flex-col gap-5'>
                <div className='flex items-center justify-between'>
                    {/* <Image src={'../logo.svg'} alt='logo' width={40} height={40} /> */}
                    <Link href={'/'}>
                        <LogoIcon />
                    </Link>
                    {isSidebarOpen && <button type="button" onClick={closeSidebar} className='transition-transform hover:text-blue-600 cursor-pointer duration-300 hover:rotate-90'>
                        <Menu />
                    </button>}
                </div>
                <nav>
                    <ul className='flex flex-col '>

                        <ItemNavigation href={`/dashboard/todos/${today}`} link="Todos"  icon={<ListTodo />} />
                        <ItemNavigation href={`/dashboard/calendar/${today}`} link="Calendar" icon={<CalendarCheck2 />} />
                        <ItemNavigation href="/dashboard/settings" link="Settings" icon={<Settings />} />
                        <ItemNavigation href="/dashboard/profile" link="Profile" icon={<UserRound />} />
                    </ul>

                </nav>


                <div
                    onClick={openSidebar}
                    className={cn(
                        "absolute top-3 left-[62px] z-50 h-10 w-6 bg-white dark:bg-gray-800 flex items-center justify-center rounded-r-lg hover:text-blue-600 cursor-pointer transition-all duration-500 ease-in-out",
                        {
                            "opacity-0 pointer-events-none -translate-x-2": isSidebarOpen,
                            "opacity-100 translate-x-0": !isSidebarOpen,
                        }
                    )}
                >
                    <ChevronRight />
                </div>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                    className={cn(
                        "flex items-center font-medium text-[14px]  px-2 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition-width duration-300 overflow-hidden",
                        {
                            "w-auto": !isSidebarOpen,
                            "w-[120px]": isSidebarOpen,
                        }
                    )}
                >
                    <LogOut width={24} height={24} />
                    <p
                        className={cn(
                            "ml-2 transition-opacity duration-300 opacity-100 w-auto",
                            {
                                "opacity-0 w-0 ml-0": !isSidebarOpen,
                                "opacity-100 w-auto": isSidebarOpen,
                            }
                        )}
                    >
                        LogOut
                    </p>
                </button>
            </div>
        </aside>
    );
}
