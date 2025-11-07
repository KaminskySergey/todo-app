'use client';

import React from 'react';
import AvatarUpdate from './AvatarUpdate';
import { IProfile, IUser } from '@/types/profile';
import ProfileForm from './ProfileForm';

interface IProfileComponent {
    profile: IUser
}

export default function ProfileComponent({ profile }: IProfileComponent) {
    return (
        <div className="bg-[#EAEAEA] dark:bg-gray-800 min-h-screen ">
            <div className="text-black w-full max-w-[1440px] h-screen p-8">
                <div className="bg-white dark:bg-[#101828] rounded-2xl w-full h-full p-10  overflow-y-hidden relative">
                    <ProfileForm profile={profile} />

                </div>
            </div>
        </div>
    );
}