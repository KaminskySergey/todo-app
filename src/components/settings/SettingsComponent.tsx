'use client';

import React from 'react';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';


interface ISettingsComponent {
    currentEmail: string | null
}

export default function SettingsComponent({ currentEmail }: ISettingsComponent) {

    return (
        <div className="bg-[#EAEAEA] dark:bg-gray-800 min-h-screen ">
            <div className="text-black w-full max-w-[1440px] h-screen p-8">
                <div className="bg-white dark:bg-[#101828] rounded-2xl w-full h-full p-10  overflow-y-hidden relative">
                    <div className='flex flex-col gap-5'>
                        <ChangeEmail currentEmail={currentEmail} />
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </div>
    );
}