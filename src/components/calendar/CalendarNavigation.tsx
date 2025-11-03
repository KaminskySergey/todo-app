'use client';

import { addMonths, format, startOfMonth, subMonths } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'
interface ICalendarNavigation {
    currentMonth: Date
}

export default function CalendarNavigation({ currentMonth }: ICalendarNavigation) {

    const formatDateParam = (date: Date) => format(date, "yyyy-MM-dd");

    const prevMonth = startOfMonth(subMonths(currentMonth, 1));
    const nextMonth = startOfMonth(addMonths(currentMonth, 1));

    const todayMonth = startOfMonth(new Date());
    return (
        <div className="flex items-center justify-between pb-4">
            <div className='flex items-center justify-center'>
                <Link
                    href={`/dashboard/calendar/${formatDateParam(prevMonth)}`}
                    className="px-4 py-2 flex items-center justify-center rounded-l-lg text-white bg-blue-500  hover:bg-blue-600 transition-colors duration-200"
                >
                    <ChevronLeft />
                </Link>


                <Link
                    href={`/dashboard/calendar/${formatDateParam(nextMonth)}`}
                    className="px-4 py-2 flex items-center justify-center rounded-r-lg text-white bg-blue-500  hover:bg-blue-600 transition-colors duration-200"
                >
                    <ChevronRight />
                </Link>
            </div>
            <div>
                <h2 className="text-2xl font-medium text-black dark:text-white">{format(currentMonth, "MMMM yyyy")}</h2>
            </div>

            <div>
                <Link className='px-4 py-2 flex items-center justify-center rounded-lg text-white bg-blue-500  hover:bg-blue-600 transition-colors duration-200' href={`/dashboard/calendar/${formatDateParam(todayMonth)}`}>
                    today
                </Link>
            </div>
        </div>
    );
}