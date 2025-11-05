'use client';

import React, { useState } from 'react';
import AddIcon from '../icons/AddIcons';
import TodoItem from './TodoItem';
import { ITodo, ITodoCreate } from '@/types/todos';
import { Plus } from 'lucide-react'
import Modal from '../ui/Modal';
import TodoForm from './TodoForm';
import { Status } from '@prisma/client';

interface IColumnContainer {
    title: string
    status: Status
    todos: ITodo[]
    onDelete: (id: string) => void
    onChange: (id: string, status: Status) => void
    onEdit: (id: string, todo: ITodoCreate) => void
    onCreate: (todo: ITodoCreate) => void
}

export default function ColumnContainer({ title, todos, onDelete, onChange, onEdit, onCreate, status }: IColumnContainer) {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(pS => !pS)
    }



    return (
        <>
            <div className='flex-1 min-w-[300px] bg-white  dark:bg-[#101828] shadow-xl/20  rounded-2xl p-3 flex flex-col gap-3'>
                <div className='flex text-black dark:text-white items-center justify-between '>
                    <h2 className='  text-xl font-bold uppercase'>{title}</h2>
                    <button className='transition-colors duration-200 p-1 hover:text-blue-500' type="button" onClick={handleToggle}><AddIcon /></button>
                </div>
                <div>
                    <ul className='flex flex-col gap-4 overflow-y-auto max-h-[50vh] custom-scroll'>
                        {
                            todos.map(el => (
                                <li key={el.id}>
                                    <TodoItem onEdit={onEdit} item={el} onDelete={onDelete} onChange={onChange} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='mt-4'>
                    <button type="button" onClick={handleToggle} className='rounded-xl border-2  border-blue-500 border-dashed transition-colors duration-200 hover:bg-blue-500 dark:bg-blue-500 hover:dark:bg-blue-700 dark:border-none dark:text-white hover:text-white bg-blue-200 flex items-center gap-2 justify-center w-full p-3 font-medium'>
                        <Plus />Add Task
                    </button>
                </div>
            </div>
            {
                isOpen && <Modal onClose={handleToggle}>
                    <TodoForm  status={status} handleToggle={handleToggle}  onCreate={onCreate}/>
                </Modal>
            }
        </>
    );
}