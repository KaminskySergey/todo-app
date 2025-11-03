'use client';

import { cn } from '@/utils/utils';
import React from 'react';

interface IAvatar {
    handleToggle?: () => void
    isModal?: boolean
}

function stringToHslColor(str: string, s = 70, l = 60) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function Avatar({handleToggle, isModal}: IAvatar) {
    
    const name = 'Serhii Kaminskyi'
    const bgColor = stringToHslColor(name);
    return (
        <>
            {/* <div className='flex relative items-center gap-2'> */}
                {/* <div>
        <Image 
        width={32}
        height={32}
        alt='avatar'
        src={''}
        />
    </div> */}
                <div
                    className={cn("w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-white font-medium", {
                        "w-20 h-20 text-4xl": isModal
                    })}
                    style={{ backgroundColor: bgColor }}
                    onClick={handleToggle}
                >
                    {name[0].toUpperCase()}{name.split(' ')[1].charAt(0).toUpperCase()}
                </div>

            {/* </div> */}
        </>
    );
}