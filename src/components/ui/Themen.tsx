'use client'

import { cn } from "@/utils/utils";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-14 h-7 rounded-full bg-gray-300 animate-pulse" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300",
                isDark
                    ? "bg-gray-400 hover:bg-gray-500"
                    : "bg-yellow-400 hover:bg-yellow-500"
            )}
        >
            <div
                className={cn(
                    "absolute w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300",
                    isDark ? "translate-x-5" : "translate-x-0"
                )}
            >
                {isDark ? (
                    <Moon className="text-gray-800" size={16} />
                ) : (
                    <Sun className="text-yellow-400" size={16} />
                )}
            </div>
        </button>
    );
}