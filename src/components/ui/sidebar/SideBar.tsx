'use client'

import { Dispatch, SetStateAction, useEffect } from "react";
import { X, Funnel, BrushCleaning } from "lucide-react";
import { IFilters } from "@/types/filters";
import { CategoryFilter } from "./CategoryFilter";
import { RangeSlider } from "../slider/RangeSlider";
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { filterKeys } from "@/app/const/filters";
import { cn } from "@/utils/utils";
interface ISideBar {
    isSidebarOpen: boolean
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
    filters: IFilters
}

export function SideBar({ isSidebarOpen, setSidebarOpen, filters }: ISideBar) {
    const { category, brand, subcategory } = filters.filters;
    console.log(filters)
    const { maxPrice } = filters.price
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    console.log(filters.filters)

    const hasFilters = filterKeys.some((key) => searchParams.has(key));

    const handleClear = () => {
        const params = new URLSearchParams(searchParams.toString());

        filterKeys.forEach((key) => {
            console.log(key)
            params.delete(key);
        });

        router.push(`${pathname}?${params.toString()}`);
    };
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isSidebarOpen) {
                setSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [isSidebarOpen, setSidebarOpen]);

    return (
        <>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={cn(
                    "w-full max-w-[280px] bg-white dark:bg-gray-900  transform transition-transform duration-300 ease-in-out z-50",
                    {
                        "fixed top-0 left-0 translate-x-0 z-9999 max-h-screen overflow-y-auto py-2 px-5": isSidebarOpen,
                        "fixed top-0 left-0 -translate-x-full py-0 px-0": !isSidebarOpen,
                    },
                    "md:static md:translate-x-0 md:pt-0 md:right-0 md:left-auto md:h-auto md:max-h-none md:overflow-visible md:bg-gray-200 dark:md:bg-[#101828]"
                )}
            >
                <button
                    className="absolute top-4 right-4 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <X size={24} />
                </button>

                <div className={cn("flex flex-col gap-6 ", {
                    "pt-16": isSidebarOpen,
                    "pt-0": !isSidebarOpen
                })}>
                    <div className={cn("flex items-center px-5 py-3 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-xl justify-between")}>
                        <button
                            type="button"
                            className="font-medium  text-[20px] flex items-center gap-2"
                        >
                            <Funnel size={16} />
                            Filters
                        </button>
                        {hasFilters && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-2 py-1 cursor-pointer border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium text-[20px] flex items-center gap-2"
                            >
                                <BrushCleaning size={16} />
                                All Clear
                            </button>
                        )}
                    </div>

                    <CategoryFilter items={category} title="Category" keyParams="category" />
                    <CategoryFilter items={brand} title="Brand" keyParams="brand" />
                    <CategoryFilter items={subcategory} title="Subcategory" keyParams="subcategory" />
                    <RangeSlider title="Price" min={0} max={maxPrice} step={10} minGap={10} keyMin="minPrice" keyMax="maxPrice" />
                    <RangeSlider title="Rating" min={0} max={5} step={0.5} minGap={0.5} keyMin="minRating" keyMax="maxRating" />
                </div>
            </aside>
        </>
    );
}

