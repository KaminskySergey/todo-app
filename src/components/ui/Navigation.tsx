'use client'

import { cn } from "@/utils/utils"
import { useEffect, useState } from "react"
import { HeaderMenu } from "./HeaderMenu"
import { X, Menu, UserRound, Heart, ShoppingBag } from "lucide-react";
import { ThemeSwitcher } from "./Themen"
import { useSidebarContext } from "@/app/context/SidebarProvider"
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { selectCartItems } from "@/redux/cart/selectors";
import Image from "next/image";
import { selectWishlistItems } from "@/redux/wishlist/selectors";
import { signOut, useSession } from "next-auth/react";

export const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { openSidebar } = useSidebarContext()
    const cartItems = useAppSelector(selectCartItems)
    const wishlistItems = useAppSelector(selectWishlistItems)
    const quantutyItemsCart = cartItems.length > 0 ? cartItems.length : 0
    const quantutyItemsWishlist = wishlistItems.length > 0 ? wishlistItems.length : 0
    const handleCloseMenu = () => setMenuOpen(false)
    const { data: session, status } = useSession()

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!(event.target instanceof Element)) return;

            if (!event.target.closest(".modal-content")) {
                handleCloseMenu();
            }
        }

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen, openSidebar]);
    return (
        <>

            <div className="flex  items-center w-full justify-between gap-4">

                <div className="hidden md:flex items-center justify-end  w-full">

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div>
                                <ThemeSwitcher />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <Link href={'/account/account-details'} className="flex cursor-pointer items-center justify-center w-9 h-9 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 overflow-hidden">
                                        {session?.user?.avatar ? (
                                            <Image
                                                src={session.user.avatar}
                                                alt="User Avatar"
                                                width={36}
                                                height={36}
                                                className="object-cover w-full h-full rounded-full"
                                            />
                                        ) : (
                                            <UserRound
                                                className="w-6 h-6 text-gray-700 dark:text-gray-200"
                                                style={{ fill: "currentColor", stroke: "none" }}
                                            />
                                        )}
                                    </Link>

                                    <div className="flex flex-col min-w-0">
                                        {status === "authenticated" ?
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</span>
                                            :
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Account</span>}

                                        {status === "authenticated" ?
                                            <button
                                                type="button"
                                                onClick={() => signOut()}
                                                className="cursor-pointer text-sm font-medium text-start text-blue-600 dark:text-blue-400 hover:underline truncate"
                                                aria-label="Sign in or register"
                                            >
                                                Logout
                                            </button>
                                            : <Link
                                                href="/auth/signin"
                                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline truncate"
                                                aria-label="Sign in or register"
                                            >
                                                Sign In / Register
                                            </Link>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Link href={'/wishlist'}>
                                        <Heart />
                                        <span className="absolute -top-1 -right-1 flex items-center justify-center 
                     w-4 h-4 text-xs font-medium text-white 
                     bg-red-500 rounded-full shadow-sm">
                                            {quantutyItemsWishlist}
                                        </span>
                                    </Link>
                                </div>
                                <div className="relative cursor-pointer" onClick={openSidebar}>
                                    <ShoppingBag />
                                    <span className="absolute -top-1 -right-1 flex items-center justify-center 
                     w-4 h-4 text-xs font-medium text-white 
                     bg-red-500 rounded-full shadow-sm">
                                        {quantutyItemsCart}
                                    </span>
                                </div>
                            </div>

                        </div>
                        {/* <HeaderMenu /> */}

                    </div>
                </div>
            </div>

            <div className="block md:hidden">
                <Menu onClick={() => setMenuOpen(true)} />
            </div>


            <div
                className={`fixed inset-0 bg-black/70 z-9998 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            <div
                className={cn(
                    'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300',
                    {
                        'opacity-100 pointer-events-auto': menuOpen,
                        'opacity-0 pointer-events-none': !menuOpen,
                    }
                )}
                onClick={() => setMenuOpen(false)}
            ></div>

            <aside
                className={cn(
                    'fixed top-0 right-0 z-9999 h-screen px-4 py-6 modal-content  w-[300px] bg-white dark:bg-[#101828] shadow-xl transform transition-transform duration-300',
                    {
                        'translate-x-0': menuOpen,
                        'translate-x-full': !menuOpen,
                    }
                )}
            >

                <button
                    onClick={handleCloseMenu}
                    aria-label="Close sidebar"
                    className="w-6 h-6 absolute top-1 right-1 flex cursor-pointer items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                    <X size={18} />
                </button>
                <div className="flex flex-col  gap-5">
                    <div className="flex justify-between items-center  py-2  border-b  border-gray-200 dark:border-gray-700">
                        <div className="relative h-[64px] w-[124px] rounded-2xl md:w-[164px]">
                            <Image
                                src={'/mira-logo.png'}
                                fill
                                alt="logo-menu"
                                sizes="48"
                                className="object-cover"
                            />
                        </div>
                        <ThemeSwitcher />
                    </div>
                    <div>

                        <HeaderMenu vertical onClickItem={handleCloseMenu} />
                    </div>
                </div>

            </aside>
        </>
    )
}