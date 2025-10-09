'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import { InputBasic } from "./InputBasik"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import debounce from "lodash/debounce";
import Link from 'next/link'
import Image from 'next/image'
import { IProduct } from "@/types/products";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/utils";
import { getProducts } from "../../../actions/products";
interface ISearch { isMobile?: boolean }

export function Search({ isMobile }: ISearch) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [focused, setFocused] = useState(false);
    const [results, setResults] = useState<IProduct[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside(containerRef as React.RefObject<HTMLDivElement>, () => setFocused(false), focused);
    const [query, setQuery] = useState(searchParams.get("query") ?? "");

    const fetchSuggestions = useCallback(
        debounce(async (value: string) => {
            if (value.trim().length >= 1) {
                const products = await getProducts(value);
                setResults(products.results);
            } else {
                setResults([]);
            }
        }, 300),
        []
    );

    const handleInputChange = (value: string) => {
        setQuery(value);
        fetchSuggestions(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
            params.set("query", query);
        } else {
            params.delete("query");
        }
        router.push(`${pathname}?${params.toString()}`);
        setFocused(false);
        setResults([]);
    };

    useEffect(() => {
        setFocused(false);
        setResults([]);
      }, [pathname]);

    const clearSearch = () => {
        setQuery("");
        setFocused(false);
        setResults([]);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("query");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            {focused && isMobile && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden pointer-events-auto"
                    onClick={() => setFocused(false)}
                />
            )}

            <div ref={containerRef}
                className={`transition-all w-full ${focused && isMobile
                    ? "w-[100%] max-w-[400px] absolute  top-8 z-50 left-1/2 -translate-x-1/2 "
                    : "relative w-auto"
                    }`}
            >
                <form onSubmit={handleSubmit} className="relative">
                    <InputBasic
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => setFocused(true)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {query && (
                        <button
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                clearSearch();
                            }}
                            className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    )}
                </form>

                {focused && results.length > 0 && (
                    <ul  className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-md max-h-[320px] overflow-y-auto rounded z-50 mt-1">
                        {results.map((p) => (
                            <li key={p.id}>
                                <Link
                                    href={`/products/${p.id}`}
                                    className={cn("flex items-center gap-2 px-3 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" , {
                                        "py-5": isMobile
                                    })}
                                    onClick={() => setResults([])}
                                >
                                    {p.images[0] && (
                                        <div className="relative w-6 h-6">
                                            <Image
                                                src={p.images[0]}
                                                alt={p.name}
                                                fill
                                                className=" object-cover rounded"
                                            />
                                        </div>
                                    )}
                                    <span>{p.name}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href={'/products'}
                                onClick={handleSubmit}
                                className=" block w-full text-left cursor-pointer px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                See all results for "{query}"
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}