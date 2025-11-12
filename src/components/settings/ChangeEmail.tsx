'use client';

import React, { useState } from 'react';
import { changeEmail } from '../../../actions/settings';
import toast from 'react-hot-toast';

interface IChangeEmail {
    currentEmail: string | null
}

export default function ChangeEmail({ currentEmail }: IChangeEmail) {
    const [isEdit, setIsEdit] = useState(false);
    const [email, setEmail] = useState(currentEmail);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await changeEmail(email!);
            toast.success("Email successfully changed!");
            setIsEdit(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to change email. Please try again.");
        }
    };

    const handleCancel = () => {
        setEmail(currentEmail);
        setIsEdit(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor="email"
                className="text-blue-500 text-xl dark:text-white font-medium"
            >
                Email:
            </label>

            <form onSubmit={handleSave} className="flex gap-3 items-center">
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email!}
                    readOnly={!isEdit}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-[256px] px-4 py-2 border rounded-lg transition-all duration-300 ${isEdit
                        ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 border-blue-400 focus:ring-2 focus:ring-blue-500"
                        : "bg-gray-100 dark:bg-[#1F2937] text-gray-500 cursor-not-allowed border-gray-300 dark:border-gray-600"
                        }`}
                />

                {!isEdit ? (
                    <button
                        type="button"
                        onClick={() => setIsEdit(true)}
                        className="flex items-center font-medium text-sm px-4 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                        Change
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex items-center font-medium text-sm px-4 py-2 rounded-xl text-white bg-green-500 hover:bg-green-600 transition"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center font-medium text-sm px-4 py-2 rounded-xl text-white bg-gray-400 hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </form>

            {/* {message && (
                <p className="text-sm mt-2 text-green-600 dark:text-green-400">{message}</p>
            )} */}
        </div>
    );
}
