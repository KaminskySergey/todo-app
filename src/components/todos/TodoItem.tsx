'use client';

import React, { useState } from 'react';
import Avatar from '../header/Avatar';
import { Pencil, Trash } from 'lucide-react'
import DropdownChangeStatus from './DropdownChangeStatus';
import { ITodo, ITodoCreate, } from '@/types/todos';
import Modal from '../ui/Modal';
import TodoForm from './TodoForm';
import { cn, formatTimeRange } from '@/utils/utils';
import { Priority, Status } from '@prisma/client';

interface ITodoItem {
  item: ITodo
  onDelete: (id: string) => void
  onChange: (id: string, status: Status) => void
  onEdit: (id: string, todo: ITodoCreate) => void
}
export default function TodoItem({ item, onDelete, onChange, onEdit }: ITodoItem) {
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null)
  const handleOpen = (type: "edit" | "delete") => {
    setModalType(type)
  }
  const handleClose = () => {
    setModalType(null)
  }

  const handleDelete = () => {
    onDelete(item.id)
  }
  const handleChangeStatus = (status: Status) => {
    onChange(item.id, status)
  }




  return (
    <>
      <div className='rounded-xl border  flex flex-col gap-5 border-gray-400 dark:border-gray-600 p-3 text-black dark:text-white bg-[#f7f6f9] dark:bg-[#171820]'>
        <h3 className='break-words'>{item.title}</h3>

        <div className='flex items-end justify-between'>
          <div className='flex items-end gap-3'>
            <Avatar />
            <div className={cn("text-xs px-2 py-1 text-gray-200 font-medium  bg-blue-500 rounded", {
              "bg-blue-500": item.priority === Priority.LOW,
              "bg-yellow-500": item.priority === Priority.MEDIUM,
              "bg-red-500": item.priority === Priority.HIGH
            })}>
              <p>{item.priority}</p>
            </div>
            <div className='text-xs text-gray-600 dark:text-gray-400'>
              {formatTimeRange(item.startTime, item.endTime)}
            </div>
          </div>
          <div className='flex gap-1.5'>
            <DropdownChangeStatus onChange={handleChangeStatus} status={item.status} />
            {/* <button type="button" className='transition-colors duration-200 hover:text-blue-600'>
            <CircleArrowRight className='w-4 h-4'/>
          </button> */}
            <button type="button" onClick={() => handleOpen("edit")} className='transition-colors duration-200 p-1 hover:text-yellow-600'>
              <Pencil className='w-4 h-4' />
            </button>
            <button type="button" onClick={() => handleOpen("delete")} className='transition-colors duration-200 p-1 hover:text-red-600'>
              <Trash className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
      {modalType && <Modal modalType={modalType} onClose={handleClose}>
        {
          modalType === 'delete' && <div className='flex flex-col gap-5 '>
            <h3 className='text-black dark:text-white'>
              Are you sure you want to delete this task?
            </h3>
            <div className='flex gap-2'>
              <button type="button" onClick={handleDelete} className='bg-red-500 w-1/2 transition-colors duration-200 p-1 rounded  hover:bg-red-600'>Yes</button>
              <button type="button" onClick={handleClose} className='bg-green-500 w-1/2 transition-colors duration-200 p-1 rounded  hover:bg-green-600'>No</button>
            </div>
          </div>
        }
        {
          modalType === 'edit' && <div>
            <TodoForm id={item.id} status={item.status as Status} handleToggle={handleClose} initialState={item} onEdit={onEdit} />
          </div>
        }
      </Modal>}
    </>
  );
}