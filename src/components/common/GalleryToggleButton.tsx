'use client';

import { LayoutGrid, LayoutList } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
interface IGalleryToggleButton {
    isToggleGrid: boolean
    setIsToggleGrid: Dispatch<SetStateAction<boolean>>;

}



export function GalleryToggleButton({ isToggleGrid, setIsToggleGrid }: IGalleryToggleButton) {

   
    useEffect(() => {
        localStorage.setItem("gallery-view", String(isToggleGrid))
    }, [isToggleGrid])

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={() => setIsToggleGrid(true)}
                className={`p-2 cursor-pointer rounded-lg ${isToggleGrid ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    }`}
            >
                <LayoutGrid />
            </button>

            <button
                type="button"
                onClick={() => setIsToggleGrid(false)}
                className={`p-2 cursor-pointer rounded-lg ${!isToggleGrid ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    }`}
            >
                <LayoutList />
            </button>
        </div>
    );
}