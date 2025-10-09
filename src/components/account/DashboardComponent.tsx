'use client'
import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';





export default function DashboardComponent() {
    const { data: session } = useSession()
    return (
        <div className=" mx-auto   p-8 ">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Welcome, <span className="text-blue-600 dark:text-blue-400">{session?.user?.name}</span> 👋
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Here you can manage your account:{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                    view your orders, update personal details, manage your delivery address, and change your password.
                </span>
            </p>

            <div className="flex justify-end">
                <button
                    onClick={() => signOut()}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
            </div>
        </div>
    );
}