'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react';

interface IPagination {
    currentPage: number
    totalPages: number
}

export function Pagination({ currentPage, totalPages }: IPagination) {
    const [page, setPage] = useState(currentPage)
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return
        router.push(pathname + "?" + createQueryString("page", pageNumber.toString()))
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )
    return (
        <div className="flex justify-center mt-4">
            <ul className="flex items-center gap-1">
                <li>
                    <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ChevronLeft />
                    </button>
                </li>

                {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNum = index + 1;
                    const isActive = currentPage === pageNum;
                    return (
                        <li key={index}>
                            <button
                                onClick={() => handlePageChange(pageNum)}
                                className={`mx-1 px-3 py-2 rounded-md font-medium transition-colors
                      ${isActive
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        </li>
                    );
                })}

                <li>
                    <button
                        type="button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ChevronRight />
                    </button>
                </li>
            </ul>
        </div>
    );
}