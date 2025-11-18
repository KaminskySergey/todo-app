'use client';

import { cn } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface IAvatar {
    handleToggle?: () => void
    isModal?: boolean
    className?: string
}

function stringToHslColor(str: string, s = 70, l = 60) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function Avatar({ handleToggle, isModal, className }: IAvatar) {
    const { data: session, status } = useSession()

    if (status === "loading" || !session?.user) return null

    const fullName = session.user.name || "User"
    const nameParts = fullName.trim().split(/\s+/)
    const initials =
        nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
            : nameParts[0][0].toUpperCase()

    const bgColor = stringToHslColor(fullName)

    return (
        <>
            {
                session.user.image ? <div onClick={handleToggle} className={cn('w-10 h-10 rounded-full overflow-hidden relative cursor-pointer flex items-center justify-center  font-medium', {
                    "w-20 h-20 ": isModal
                })}>
                    <Image alt='avatar' fill src={session.user.image} priority sizes='48' className='object-cover' />
                </div> : <div
                    className={cn(
                        "w-10 h-10 rounded-full cursor-pointer flex items-center justify-center text-white font-medium",
                        { "w-20 h-20 text-4xl": isModal },
                        className
                    )}
                    style={{ backgroundColor: bgColor }}
                    onClick={handleToggle}
                >
                    {initials}
                </div>
            }

        </>
    )
}