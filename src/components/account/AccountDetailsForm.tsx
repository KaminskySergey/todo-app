'use client';

import { IProfile } from '@/types/profile';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { changeInfoDetailsAction } from '../../../actions/profile';

interface IAccountDetailsForm {
    profile: IProfile
}

export default function AccountDetailsForm({ profile }: IAccountDetailsForm) {
    const { name, email, phone } = profile
    const firstName = name.split(" ")[0]
    const lastName = name.split(" ")[1]

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        phone: phone || "",

    })


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onAction = async (formData: FormData) => {
        try {
            setLoading(true);
            const newInfoDetails = await changeInfoDetailsAction(formData);
            console.log("Updated Info:", newInfoDetails);
            setError("")
            setError("");
            toast.success("Profile updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert((err as Error).message);
            toast.error((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form  action={onAction} className="flex flex-col gap-4 items-center w-full md:px-12">
            {/* Top row: First Name & Last Name */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-4 md:w-full">
                <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-sm font-medium text-black dark:text-white" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        name='firstName'
                        placeholder="First Name"
                        className="px-3 py-2 border border-blue-400 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-sm font-medium text-black dark:text-white" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        name='lastName'
                        placeholder="Last Name"
                        className="px-3 py-2 border border-blue-400 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                        value={form.lastName}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Bottom row: Phone & Email */}
            <div className="flex flex-col gap-4 md:flex-row md:gap-4 md:w-full">
                <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-sm font-medium text-black dark:text-white" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        id="phone"
                        type="text"
                        name='phone'
                        placeholder="Phone"
                        className="px-3 py-2 border border-blue-400 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                        value={form.phone}
                        onChange={handleChange}
                        
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="mb-1 text-sm font-medium text-black dark:text-white" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name='email'
                        placeholder="Email"
                        className="px-3 py-2 border border-blue-400 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-300"
                        required
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className={`py-3 px-6 rounded-full font-medium w-[324px] mx-auto shadow-lg 
                        bg-blue-600 text-white hover:bg-blue-700 transition-colors
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Updating...' : 'Update'}
            </button>
        </form>
    );
}