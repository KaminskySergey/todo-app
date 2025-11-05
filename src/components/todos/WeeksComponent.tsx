'use client';

import { cn } from '@/utils/utils';
import { addDays, format, subDays } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'


function getWeekDays(date: string) {
    const weekDays = [];
    const centerDate = new Date(date)
    for (let i = -3; i <= 3; i++) {
        const currentDate = addDays(centerDate, i);
        const date = addDays(centerDate, i);
        weekDays.push({
            date: format(currentDate, "yyyy-MM-dd"),
            day: format(date, "d"),
            month: format(date, "LLLL"),
            weekday: format(date, "EEEE"),
            isToday: i === 0,
        });
    }

    return weekDays;
}


export default function WeeksComponent() {
    const { date }: { date: string } = useParams()
    const currentDay = new Date(date)
    const days = getWeekDays(date);
    const router = useRouter()


    const handlePrevDate = () => {
        const newDate = subDays(currentDay, 1)
        router.push(`/dashboard/todos/${format(newDate, "yyyy-MM-dd")}`)
    }

    const handleNextDate = () => {
        const newDate = addDays(currentDay, 1)
        router.push(`/dashboard/todos/${format(newDate, "yyyy-MM-dd")}`)
    }

    return (
        <div className='flex items-center justify-center gap-3'>
            <button type="button" onClick={handlePrevDate} className='w-8 h-8 bg-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.03] hover:text-blue-500 rounded-full flex items-center justify-center  text-black dark:text-white dark:bg-[#101828]'>
                <ChevronLeft />
            </button>
            <ul className="flex justify-center gap-3">
                {days.map((d, index) => (
                    <li key={index}>
                        <button type='button' onClick={() => router.push(`/dashboard/todos/${d.date}`)} className=''>

                            <div
                                className={cn(
                                    "flex flex-col items-center justify-center text-sm bg-white text-black dark:text-white dark:bg-[#101828] transition-all duration-200 rounded-xl w-32 py-3 shadow-sm hover:shadow-md hover:scale-[1.03]",
                                    {
                                        "bg-blue-500 text-white dark:text-white dark:bg-blue-600 scale-[1.07]":
                                            d.isToday,
                                    }
                                )}
                            >
                                {/* месяц */}
                                <p className="font-medium text-gray-600 dark:text-gray-400">
                                    {d.month}
                                </p>

                                {/* число */}
                                <p className="font-bold text-2xl text-gray-900 dark:text-gray-100">
                                    {d.day}
                                </p>

                                {/* день недели */}
                                <p
                                    className={cn("font-medium", {
                                        "text-red-400 dark:text-red-400":
                                            d.weekday === "Saturday" || d.weekday === "Sunday",
                                        "text-emerald-400 dark:text-emerald-400":
                                            d.weekday !== "Saturday" && d.weekday !== "Sunday",
                                    })}
                                >
                                    {d.weekday}
                                </p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={handleNextDate} className='w-8 h-8 bg-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.03] hover:text-blue-500 rounded-full flex items-center justify-center  text-black dark:text-white dark:bg-[#101828]'>
                <ChevronRight />
            </button>
        </div>
    );
}