'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CircleArrowRight } from 'lucide-react'
import { Status } from '@prisma/client';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/utils';

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
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  
    const buttonRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const currentDropdown = filterStatusForDropdown(status);
  
    useEffect(() => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + window.scrollY + 4,
            left:
              status === "DONE"
                ? rect.right - 192 
                : rect.left + window.scrollX,
          });
      }
    }, [isOpen]);
  
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(e.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    return (
      <>
        <button
          ref={buttonRef}
          type="button"
          className="transition-colors duration-200 p-1 hover:text-blue-600"
          onClick={() => setIsOpen((p) => !p)}
        >
          <CircleArrowRight className="w-4 h-4" />
        </button>
  
        {isOpen &&
          createPortal(
            <div
              ref={dropdownRef}
              className={cn(
                "fixed z-[9999] w-48 bg-white dark:bg-[#101828] dark:text-white shadow-lg p-2 rounded-xl transition-opacity duration-200"
              )}
              style={{
                top: coords.top,
                left: coords.left,
              }}
            >
              <ul>
                {currentDropdown.map((el, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      onChange(el);
                      setIsOpen(false);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs font-medium rounded cursor-pointer"
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )}
      </>
    );
  }