'use client';

import { addDays, format } from 'date-fns';
import { useParams } from 'next/navigation';
import React from 'react';

function getWeekDays(date: string) {
    const weekDays = [];
    const centerDate = new Date(date)
    for (let i = -3; i <= 3; i++) {
        const date = addDays(centerDate, i);
        weekDays.push({
            date,
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
    const days = getWeekDays(date);
    return (
        <div className='flex justify-center'>
            {days.map((d, index) => (
                <div
                    key={index}
                    className='flex flex-col items-center gap-3'
                >
                    <div>{d.month}</div>
                    <div>{d.day} </div>
                    <div>{d.weekday}</div>
                </div>
            ))}
        </div>
    );
}