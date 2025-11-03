'use client';

import { ITodo } from '@/types/todos';
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSidebarContext } from '@/app/context/SidebarProvider';
import { Priority } from '@prisma/client';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useParams, useRouter } from 'next/navigation';
import { addMonths, subMonths, format, startOfMonth } from "date-fns";
import Link from 'next/link';
import CalendarNavigation from './CalendarNavigation';
// import '@fullcalendar/common';
// import '@fullcalendar/daygrid';
// import '@fullcalendar/react';
interface ICalendarComponent {
    todos: ITodo[]
}



export default function CalendarComponent({ todos, }: ICalendarComponent) {
    const { isSidebarOpen } = useSidebarContext();
    const calendarRef = useRef<FullCalendar | null>(null);
    const { date } = useParams();
    const urlDate = date as string | undefined;

    const currentMonth = urlDate
        ? startOfMonth(new Date(urlDate + "T00:00:00"))
        : startOfMonth(new Date());



    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => {
            calendarRef.current?.getApi().updateSize();
        }, 300);
        return () => clearTimeout(timeout);
    }, [isSidebarOpen]);

    const groupedEvents = Object.values(
        todos.reduce((acc, todo) => {
            const startDate = todo.startTime instanceof Date ? todo.startTime : new Date(todo.startTime);
            const dateKey = startDate.toISOString().split('T')[0];
            const priority = todo.priority;

            const key = `${dateKey}-${priority}`;

            if (!acc[key]) {
                acc[key] = {
                    title: `${priority} tasks`,
                    start: startDate.toISOString(),
                    extendedProps: {
                        priority,
                        count: 1
                    }
                };
            } else {
                acc[key].extendedProps.count += 1;
            }

            return acc;
        }, {} as Record<string, any>)
    );

    const handleDayClick = (dateStr: string) => {
        router.push(`/dashboard/todos/${dateStr}`);
    };


    return (
        <div className="text-black w-full h-screen p-6">
            <CalendarNavigation currentMonth={currentMonth} />
            
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                initialDate={currentMonth}
                headerToolbar={false}
                events={groupedEvents}
                eventClick={(arg: EventClickArg) => {
                    handleDayClick(arg.event.startStr);
                }}

                dateClick={(arg: DateClickArg) => {
                    handleDayClick(arg.dateStr);
                }}

                eventContent={(arg) => {
                    const color =
                        arg.event.extendedProps.priority === Priority.HIGH
                            ? 'bg-red-500'
                            : arg.event.extendedProps.priority === Priority.MEDIUM
                                ? 'bg-yellow-500'
                                : 'bg-green-500';

                    return (
                        <div className="flex space-x-1 justify-center items-center w-full h-full">
                            <div className={`w-5 h-5 flex items-center font-medium justify-center rounded-full ${color}`} title={arg.event.title}>
                                {arg.event.extendedProps.count || 1}
                            </div>
                        </div>
                    );
                }}
                height="100%"
                contentHeight="auto"
            />
        </div>
    );
}