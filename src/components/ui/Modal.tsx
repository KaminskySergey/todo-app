'use client';







import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react'

interface IModal {
    children: ReactNode
    onClose: () => void
    modalType?: string
}

export default function Modal({ children, onClose, modalType }: IModal) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if(modalType === "edit"){
            return
        }
        const handleEscape = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onClose()
            }
        }

        addEventListener("keydown", handleEscape)

        return () => {
            removeEventListener("keydown", handleEscape);
        };
    }, [onClose])


    useEffect(() => {
        if (mounted) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mounted]);

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }
    if (!mounted) return null;

    return createPortal(
        <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/30 z-50"
        >
            <div
                // onClick={(e) => e.stopPropagation()}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black dark:text-white dark:bg-[#101828]  rounded-xl shadow-lg p-6  max-w-[90%]"
            >
                {children}
                <button type="button" onClick={onClose} className='absolute top-1 right-1 p-1 text-black dark:text-white transition-colors duration-200 hover:text-blue-500'>
                    <X className='w-4 h-4'/>
                </button>
            </div>
        </div>,
        document.body
    );
}