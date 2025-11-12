'use client';

import React, { FormEvent, useState } from 'react';
import Input from '../ui/Input';
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/utils/utils';
import { changeEmailSchema } from '@/utils/zod';
import toast from 'react-hot-toast';
import z from 'zod';
import { useRouter } from 'next/navigation';
export default function ChangeEmailForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('password')
    const router = useRouter()
    const handleToggleType = () => {
        if (type === "password") {
            setType("text")
        }
        if (type === 'text') {
            setType("password")
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            // валидация
            changeEmailSchema.parse(form);

            setLoading(true);

            const res = await fetch("/api/changeEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                }),
            });

            const result = await res.json();
            setLoading(false);

            if (result?.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success("Email successfully changed!");
                router.push("/dashboard/settings");
                router.refresh();
            }
        } catch (err) {
            setLoading(false);
            if (err instanceof z.ZodError) {
                const messages = err.issues.map((issue) => issue.message).join(", ");
                setError(messages);
                toast.error(messages);
            } else {
                setError("Something went wrong");
                toast.error("Something went wrong");
            }
        }
    };
    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="bg-white text-black px-4 py-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center px-12">
                <h1 className="mb-4 text-4xl font-extrabold text-black">Change Email</h1>
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="font-medium text-black">
                            New Email<span className="text-red-500 pl-1">*</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="mail@loopple.com"
                            className="w-full h-12 px-5 text-sm font-medium outline-none bg-transparent placeholder-gray-500 border border-grey-200 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            onChange={(value) => handleChange("email", value)}
                            name="email"
                            value={form.email}
                        />
                    </div>

                    {["password", "confirmPassword"].map((field) => (
                        <div key={field} className="flex flex-col gap-2 w-full">
                            <label htmlFor={field} className="font-medium text-black">
                                {field === "password" ? "Password" : "Confirm Password"}
                                <span className="text-red-500 pl-1">*</span>
                            </label>
                            <div className="relative">
                                <Input
                                    id={field}
                                    type={type}
                                    placeholder="*************"
                                    className="w-full h-12 px-5 text-sm font-medium outline-none bg-transparent placeholder-gray-500 border border-grey-200 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                    onChange={(value) => handleChange(field, value)}
                                    name={field}
                                    value={form[field as keyof typeof form]}
                                />
                                <span
                                    className={cn(
                                        "absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-300",
                                        { "text-blue-600": type === "text" }
                                    )}
                                    onClick={handleToggleType}
                                >
                                    {type === "password" ? <Eye /> : <EyeOff />}
                                </span>
                            </div>
                        </div>
                    ))}

                    <div className="w-full min-h-[16px]">
                        {error && (
                            <p className="text-red-500 text-[10px] w-full text-start break-words">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-xl font-medium hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Changing..." : "Change Email"}
                    </button>
                </div>
            </form>
        </div>
    );
}