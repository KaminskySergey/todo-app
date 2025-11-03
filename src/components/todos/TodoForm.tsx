'use client';

import { ITodo, ITodoCreate } from '@/types/todos';
import { cn, formatTimeForForm, parseFormTimeToDate } from '@/utils/utils';
import { todoFormSchema } from '@/utils/zod';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import z from 'zod';
import { Priority, Status } from '@prisma/client';
import { useParams } from 'next/navigation';
import { parse, setHours, setMinutes } from 'date-fns';
interface ITodoForm {
    status: Status
    onCreate?: (todo: ITodoCreate) => void
    onEdit?: (id: string, todo: ITodoCreate) => void
    handleToggle: () => void
    initialState?: ITodoCreate
    id?: string
}


interface ITodoFormState {
    title: string;
    status: Status;
    priority: Priority;
    startTime: string;
    endTime: string;
}




export default function TodoForm({ initialState, status, onCreate, handleToggle, onEdit, id }: ITodoForm) {
    const { date } = useParams() as { date: string };
    const [form, setForm] = useState<ITodoFormState>({
        title: initialState?.title ?? "",
        status: initialState?.status ?? status,
        priority: initialState?.priority ?? Priority.MEDIUM,
        startTime: initialState?.startTime
            ? formatTimeForForm(new Date(initialState.startTime.toString()))
            : "",
        endTime: initialState?.endTime
            ? formatTimeForForm(new Date(initialState.endTime.toString()))
            : "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (field: keyof ITodoFormState) => {
        try {
            todoFormSchema.pick({ [field]: true }).parse({ [field]: form[field] });
            setErrors((prev) => ({ ...prev, [field]: "" }));
        } catch (err) {
            if (err instanceof z.ZodError) {
                const message = err.issues[0]?.message || "";
                setErrors((prev) => ({ ...prev, [field]: message }));
            }
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrors({});
        // hier//////////////////////////////////////////////

        try {
            const validatedData = todoFormSchema.parse(form);

            
            const [startHour, startMinute] = validatedData.startTime.split(":").map(Number);
            const [endHour, endMinute] = validatedData.endTime.split(":").map(Number);
            let baseDate = parse(date, "yyyy-MM-dd", new Date());
            const formattedStart = setHours(setMinutes(baseDate, startMinute), startHour);
            const formattedEnd = setHours(setMinutes(baseDate, endMinute), endHour);
            const todo = {
                ...form,
                priority: validatedData.priority,
                status: validatedData.status,
                startTime: formattedStart,
                endTime: formattedEnd,
            };
            if (onCreate && !initialState) onCreate(todo);
            if (onEdit && initialState && id) onEdit(id, todo);


            handleToggle();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors: { [key: string]: string } = {};
                err.issues.forEach((issue) => {
                    if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message;
                });
                setErrors(fieldErrors);
            } else {
                console.error("Unexpected error: ", err);
            }
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-5 pt-3 w-[500px] max-w-md bg-white dark:bg-gray-900 "
        >
            <h2 className="text-black dark:text-white text-2xl font-bold text-center uppercase">
                {onCreate ? "Create" : "Edit"}
            </h2>

            {/* Title */}
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-medium">
                    Title
                </label>
                <textarea
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    onBlur={() => handleBlur("title")}
                    placeholder="Enter task title"
                    className={`w-full px-4 py-2 border rounded-lg resize-none ${errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                        } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2`}
                    rows={3}
                />
                {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title}</span>}
            </div>

            {/* Time */}
            <div className="flex flex-col gap-1">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="startTime" className="text-gray-700 dark:text-gray-300 font-medium">
                            Start Time
                        </label>
                        <input
                            id="startTime"
                            type="time"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleChange}
                            onBlur={() => handleBlur("startTime")}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.startTime ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                                } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2`}
                        />
                        {errors.startTime && <span className="text-red-500 text-sm mt-1">{errors.startTime}</span>}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="endTime" className="text-gray-700 dark:text-gray-300 font-medium">
                            End Time
                        </label>
                        <input
                            id="endTime"
                            type="time"
                            name="endTime"
                            value={form.endTime}
                            onChange={handleChange}
                            onBlur={() => handleBlur("endTime")}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.endTime ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                                } bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2`}
                        />
                        {errors.endTime && <span className="text-red-500 text-sm mt-1">{errors.endTime}</span>}
                    </div>
                </div>
            </div>

            {/* Priority */}
            <div className="flex gap-4 items-center">
                {Object.values(Priority).map((el) => (
                    <label key={el} className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-gray-100">
                        <div className={cn("relative w-4 h-4 border-2 border-gray-300 dark:border-gray-300 bg-gray-300 dark:bg-transparent rounded-full flex items-center justify-center", {
                            "border-blue-500 dark:border-blue-500 ": form.priority === el && form.priority === Priority.LOW,
                            "border-yellow-500 dark:border-yellow-500 ": form.priority === el && form.priority === Priority.MEDIUM,
                            "border-red-500 dark:border-red-500 ": form.priority === el && form.priority === Priority.HIGH,
                        })}>
                            <input
                                type="radio"
                                name="priority"
                                value={el}
                                checked={form.priority === el}
                                onChange={handleChange}
                                className="absolute w-full h-full opacity-0 cursor-pointer"
                            />

                            <div
                                className={cn("w-3.5 h-3.5 rounded-full  transition-all duration-200 scale-0", {
                                    "scale-100": form.priority === el,
                                    "bg-blue-500": form.priority === Priority.LOW,
                                    "bg-yellow-500": form.priority === Priority.MEDIUM,
                                    "bg-red-500": form.priority === Priority.HIGH,
                                })}
                            />
                        </div>
                        <span className={cn("text-sm font-medium", {
                            "text-blue-500": form.priority === el && form.priority === Priority.LOW,
                            "text-yellow-500": form.priority === el && form.priority === Priority.MEDIUM,
                            "text-red-500": form.priority === el && form.priority === Priority.HIGH,
                        })}>{el}</span>
                    </label>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={handleToggle}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
                >
                    {onCreate ? "Create" : "Save"}
                </button>
            </div>
        </form>
    );
}