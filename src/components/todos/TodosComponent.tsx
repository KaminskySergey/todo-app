'use client';

import React, { useState } from 'react';
import ColumnContainer from './ColumnContainer';
import { ITodo, ITodoCreate, } from '@/types/todos';
import { Status } from '@prisma/client';
import { changeStatusTodo, createTodo, deleteTodo, editTodo } from '../../../actions/todos';
import toast from 'react-hot-toast';
import { addDays, format } from 'date-fns';
import { useParams } from 'next/navigation';
import WeeksComponent from './WeeksComponent';
// export const data: ITodo[] = [
//     {
//         id: "todo_1",
//         title: "Buy groceries",
//         description: "Milk, eggs, bread, coffee",
//         priority: Priority.LOW,
//         status: Status.TODO,
//         startTime: new Date("2025-11-01T09:00:00"),
//         endTime: new Date("2025-11-02T18:00:00"),
//         completed: false,
//         userId: "user_1",
//         createdAt: new Date("2025-10-27"),
//         updatedAt: new Date("2025-10-27"),
//     },
//     {
//         id: "todo_2",
//         title: "Finish Todos page",
//         description: "Complete layout, make responsive, test display",
//         priority: Priority.HIGH,
//         status: Status.IN_PROGRESS,
//         startTime: new Date("2025-10-28T10:00:00"),
//         endTime: new Date("2025-10-30T17:00:00"),
//         completed: false,
//         userId: "user_1",
//         createdAt: new Date("2025-10-25"),
//         updatedAt: new Date("2025-10-28"),
//     },
//     {
//         id: "todo_3",
//         title: "Read Prisma documentation",
//         description: "Understand relations and enum types",
//         priority: Priority.MEDIUM,
//         status: Status.TODO,
//         startTime: new Date("2025-11-03T09:00:00"),
//         endTime: new Date("2025-11-05T18:00:00"),
//         completed: false,
//         userId: "user_1",
//         createdAt: new Date("2025-10-22"),
//         updatedAt: new Date("2025-10-22"),
//     },
//     {
//         id: "todo_4",
//         title: "Setup project deployment",
//         description: "Check .env, build project, deploy to Vercel",
//         priority: Priority.HIGH,
//         status: Status.IN_PROGRESS,
//         startTime: new Date("2025-10-29T10:00:00"),
//         endTime: new Date("2025-10-31T18:00:00"),
//         completed: false,
//         userId: "user_1",
//         createdAt: new Date("2025-10-25"),
//         updatedAt: new Date("2025-10-28"),
//     },
//     {
//         id: "todo_5",
//         title: "Clean the room thoroughly",
//         description: "Vacuum and wipe the desk",
//         priority: Priority.LOW,
//         status: Status.DONE,
//         startTime: new Date("2025-10-27T10:00:00"),
//         endTime: new Date("2025-10-28T12:00:00"),
//         completed: true,
//         userId: "user_1",
//         createdAt: new Date("2025-10-20"),
//         updatedAt: new Date("2025-10-28"),
//     },
// ];

interface ITodosComponent {
    todos: ITodo[]
}

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
export default function TodosComponent({ todos }: ITodosComponent) {
    const [todoList, setTodoList] = useState(todos)
    const { date }: { date: string } = useParams()
    const todosTodo = todoList.filter(el => el.status === Status.TODO)
    const todosInProgress = todoList.filter(el => el.status === Status.IN_PROGRESS)
    const todosDone = todoList.filter(el => el.status === Status.DONE)


    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodoList(pS => pS.filter(el => el.id !== id));
            toast.success("Task deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete task");
        }
    }

    const handleChangeStatus = async (id: string, status: Status) => {
        try {
            const updatedTodo = await changeStatusTodo(id, status);
            if (!updatedTodo) return;
            setTodoList(pS => pS.map(el => el.id === id ? { ...el, status: updatedTodo.status } : el));
            toast.success("Status updated");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update status");
        }
    }

    const handleEditTodo = async (id: string, todo: ITodoCreate) => {
        try {
            const updatedTodo = await editTodo(id, todo);
            if (!updatedTodo) return;
            setTodoList(pS => pS.map(el => el.id === updatedTodo.id ? updatedTodo : el));
            toast.success("Task updated");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update task");
        }
    }

    const handleCreateTodo = async (newTodo: ITodoCreate) => {
        try {
            const createdTodo = await createTodo(newTodo);
            setTodoList(prev => [...prev, createdTodo]);
            toast.success("Task created");
        } catch (error) {
            console.log(error);
            toast.error("Failed to create task");
        }
    }
    const days = getWeekDays(date);
    return (
        <div className="text-black p-6 max-w-[1440px]  w-full flex flex-col gap-5 gradient">
            <WeeksComponent />
            <div className='flex gap-5 flex-1 justify-stretch items-start'>
                <ColumnContainer status={Status.TODO} onCreate={handleCreateTodo} onEdit={handleEditTodo} onDelete={handleDelete} onChange={handleChangeStatus} title="To Do" todos={todosTodo} />
                <ColumnContainer status={Status.IN_PROGRESS} onCreate={handleCreateTodo} onEdit={handleEditTodo} onDelete={handleDelete} onChange={handleChangeStatus} title="In Progress" todos={todosInProgress} />
                <ColumnContainer status={Status.DONE} onCreate={handleCreateTodo} onEdit={handleEditTodo} onDelete={handleDelete} onChange={handleChangeStatus} title="Done" todos={todosDone} />
            </div>
        </div>
    );
}