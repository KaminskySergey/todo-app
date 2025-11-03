'use client';

import React, { useState } from 'react';
import { CircleArrowRight } from 'lucide-react'
import { Status } from '@prisma/client';

interface IDropdownChangeStatus {
    status: Status
    onChange: (status: Status) => void
}

// function filterStatusForDropdown(currentStatus: string) {
//     let newArr = []
//     const statusArr = Object.values(Status)
//     for (const el of statusArr) {
//         if (el !== currentStatus) {
//             newArr.push(el)
//         }
//     }
//     return newArr
// }
function filterStatusForDropdown(currentStatus: string) {
    const statusArr = Object.values(Status)
    return statusArr.filter(el => el !== currentStatus)
}

export default function DropdownChangeStatus({ status, onChange }: IDropdownChangeStatus) {
    const [isOpen, setIsOpen] = useState(false)

    const currentDropdown = filterStatusForDropdown(status)

    return (
        <div onMouseLeave={() => setIsOpen(false)} className='relative'>
            <button type="button" className='transition-colors duration-200 p-1 hover:text-blue-600'>
                <CircleArrowRight onClick={() => setIsOpen(true)} className='w-4 h-4' />
            </button>
            {
                isOpen && <div className={`absolute rounded-xl top-3 mt-2 right-0 w-48 bg-white dark:bg-[#101828] dark:text-white  shadow-lg  p-2 z-50 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}>
                    <ul>
                        {
                            currentDropdown.map((el, idx) => (
                                <li key={idx} onClick={() => onChange(el)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs font-medium rounded cursor-pointer">{el}</li>
                            ))
                        }


                    </ul>
                </div>
            }
        </div>
    );
}