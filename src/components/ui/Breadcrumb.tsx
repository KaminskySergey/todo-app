'use client';

import React from 'react';
import { usePathname } from 'next/navigation'
import { Container } from './Container';
import Link from 'next/link'
import { House } from 'lucide-react';

interface IBreadcrumb {
    title: string;
    name?: string
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function Breadcrumb({ title, name }: IBreadcrumb) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");

    return (
        <section className="dark:bg-[#1B253D] bg-white shadow-xl/20 py-8 border-b border-gray-200 dark:border-gray-700">
            <Container className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                <h1 className="font-bold text-black dark:text-white text-4xl">
                    {title}
                </h1>

                {segments.length > 0 && (
                    <ul className="flex items-center gap-2 text-sm">
                        <li>
                            <Link
                                href="/"
                                className="text-gray-600 flex items-center dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                            >
                               <span className='pr-2'><House size={12}/></span> Home
                            </Link>
                        </li>

                        {segments.map((segment, index) => {
                            const url = "/" + segments.slice(0, index + 1).join("/");
                            const isLast = index === segments.length - 1;

                            return (
                                <li key={url} className="flex items-center gap-2">
                                    <span className="text-gray-400 dark:text-gray-500">/</span>
                                    {isLast && name ? (
                                        <span className="text-gray-900 dark:text-white font-medium">{name}</span>
                                    ) : isLast ? (
                                        <span className="text-gray-900 dark:text-white font-medium">{capitalize(segment)}</span>
                                    ) : (
                                        <Link
                                            href={url}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {capitalize(segment)}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}

            </Container>
        </section>
    );
}