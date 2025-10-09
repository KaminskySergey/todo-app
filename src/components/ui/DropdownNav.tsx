'use client'

import { navigation } from "@/app/const/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";


export const DropdownNav = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLUListElement>(null);
    useClickOutside(dropdownRef as React.RefObject<HTMLUListElement>, () => setOpen(false), open);
    const { data: session } = useSession()



    const filteredNav = navigation.filter((el) => {
        if (el.authOnly && !session) return false
        if (el.guestOnly && session) return false
        return true
    })
    return (
        <div className="relative ">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center cursor-pointer gap-1.5 text-sm font-bold rounded-md px-4 py-2 bg-gray-900 text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
                Pages
                <ChevronDown className="w-4 h-4" />
            </button>

            <ul ref={dropdownRef}
                className={`absolute dropdown-content left-0 mt-2 min-w-[180px] rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all z-50
          ${open ? "flex flex-col opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-2"}
        `}
            >
                {filteredNav.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`block px-4 py-2 text-sm font-bold  transition-colors
                  ${isActive
                                        ? "bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"}
                `}
                                onClick={() => setOpen(false)}
                            >
                                {item.link}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

