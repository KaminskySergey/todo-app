'use client';

import React, { useState } from 'react';
import AvatarUpdate from './AvatarUpdate';
import { IUser } from '@/types/profile';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { updateProfile } from '../../../actions/profile';


interface IProfileForm {
    profile: IUser
}
export default function ProfileForm({ profile }: IProfileForm) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [isChange, setIsChange] = useState(false)
    const [form, setForm] = useState({
        firstName: profile.profile?.firstName || "",
        lastName: profile.profile?.lastName || "",
        email: profile.email || "",
        phone: profile.profile?.phone || "",
        bio: profile.profile?.bio || "",
        city: profile.profile?.city || "",
        country: profile.profile?.country || "",
        birthDate: profile.profile?.birthDate
            ? format(new Date(profile.profile.birthDate), "yyyy-MM-dd")
            : "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
        setIsChange(true)
    };

    const onAction = async (formData: FormData) => {
        try {
            setError("")
            setError("");
            const res = await updateProfile(formData)
            toast.success(res.message);
            setIsChange(false)
        } catch (err) {
            console.error(err);
            toast.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <form action={onAction} className='flex flex-col gap-8 px-24'>
            <div className='flex  flex-col md:flex-row gap-10'>
                <div className='w-1/3 flex flex-col gap-5'>
                    <div className='flex items-center justify-center'>
                        <AvatarUpdate currentAvatar={profile.profile?.avatarUrl || null} />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="firstName" className="text-blue-500 text-xs dark:text-white font-medium">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-200 `}
                                placeholder='First Name'
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="lastName" className="text-blue-500 text-xs dark:text-white font-medium">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-200 `}
                                placeholder='Last Name'
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="lastName" className="text-blue-500 text-xs dark:text-white font-medium">
                                Email
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937] text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500 transition-colors duration-200 `}
                                placeholder='Email'
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col  gap-4 w-full">


                    {/* Bio */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="bio" className="text-blue-500 text-xs dark:text-white font-medium">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={4}
                            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937]
        text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
        placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500
        transition-colors duration-200 resize-none`}
                        />
                    </div>
                    <div className='flex gap-6'>
                        {/* Phone */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="phone" className="text-blue-500 text-xs dark:text-white font-medium">
                                Phone
                            </label>
                            <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937]
        text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
        placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500
        transition-colors duration-200`}
                            />
                        </div>
                        {/* Birth Date */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="birthDate" className="text-blue-500 text-xs dark:text-white font-medium">
                                Birth Date
                            </label>
                            <input
                                id="birthDate"
                                type="date"
                                name="birthDate"
                                value={form.birthDate}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937]
                text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
                placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500
                transition-colors duration-200`}
                            />
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        {/* City */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="city" className="text-blue-500 text-xs dark:text-white font-medium">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                placeholder="City"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937]
        text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
        placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500
        transition-colors duration-200`}
                            />
                        </div>

                        {/* Country */}
                        <div className="flex flex-col gap-1 w-1/2">
                            <label htmlFor="country" className="text-blue-500 text-xs dark:text-white font-medium">
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="Country"
                                className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-[#1F2937]
        text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600
        placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-500
        transition-colors duration-200`}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <div className='ml-auto'>
                <button
                    type="submit"
                    disabled={loading || !isChange} 
                    className={`py-3 px-6 rounded-full font-medium w-[156px] mx-auto shadow-lg 
    bg-blue-600 text-white hover:bg-blue-700 transition-colors
    ${loading || !isChange ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </div>
        </form>
    );
}