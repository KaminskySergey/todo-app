'use client';

import { cn } from '@/utils/utils';
import { addDays, format, subDays } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'


function getWeekDays(date: string, visibleDays: number) {
    const weekDays = [];
    const centerDate = new Date(date);
  
    const offset = Math.floor(visibleDays / 2);
  
    for (let i = -offset; i <= offset; i++) {
      const currentDate = addDays(centerDate, i);
  
      weekDays.push({
        date: format(currentDate, "yyyy-MM-dd"),
        day: format(currentDate, "d"),
        month: format(currentDate, "LLLL"),
        weekday: format(currentDate, "EEEE"),
        isToday: i === 0,
      });
    }
  
    return weekDays;
  }

export default function WeeksComponent() {
    const { date }: { date: string } = useParams()
    const currentDay = new Date(date)
    const router = useRouter()
    const [visibleDays, setVisibleDays] = useState<number | null>(null);

  
  useEffect(() => {
    const calc = () => {
      const width = window.innerWidth;

      if (width < 640) return setVisibleDays(1);
      if (width < 1280) return setVisibleDays(3);

      return setVisibleDays(7);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

 
  if (visibleDays === null) return null;
  const days = getWeekDays(date, visibleDays);
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
                                    "flex flex-col items-center justify-center text-sm bg-white text-black dark:text-white dark:bg-[#101828] transition-all duration-200 rounded-xl w-16 sm:w-[164px] md:w-[100px] py-2 shadow-sm hover:shadow-md hover:scale-[1.03]",
                                    {
                                        "bg-blue-500 text-white dark:text-white dark:bg-blue-600 scale-[1.07]":
                                            d.isToday,
                                            "w-[200px] mx-4": visibleDays === 1,
                                            "w-[164px]": visibleDays === 3
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