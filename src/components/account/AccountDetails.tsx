'use client';

import { IProfile } from "@/types/profile";
import AvatarUpdate from "./AvatarUpdate";
import AccountDetailsForm from "./AccountDetailsForm";


interface IAccountDetails {
    profile: IProfile
}

export default function AccountDetails({ profile }: IAccountDetails) {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col gap-8 items-center justify-center w-full'>
                <div >
                    <AvatarUpdate currentAvatar={profile.avatar} />
                </div>
                <div className="w-full">
                    <AccountDetailsForm profile={profile}/>
                </div>
            </div>

        </div>
    );
}