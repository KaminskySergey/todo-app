'use client';

import React, { FormEvent, useState } from 'react';
import Input from '../ui/Input';
import { GoogleIcon } from '../icons/GoogleIcon';
import { UserLoginSchema, loginUserSchema } from '@/utils/zod';
import { signIn } from 'next-auth/react';
import { EyeOff, Eye } from 'lucide-react'
import * as z from "zod";
import { cn } from '@/utils/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
    const router = useRouter()
    const [form, setForm] = useState<UserLoginSchema>({
        email: "",
        password: ""
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('password')

    const handleToggleType = () => {
        if (type === "password") {
            setType("text")
        }
        if (type === 'text') {
            setType("password")
        }
    }

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        try {
            const res = loginUserSchema.parse(form)

            setLoading(true)
            const result = await signIn('credentials', {
                redirect: false,
                email: res.email,
                password: res.password
            })

            setLoading(false)

            if (result?.error) {
                setError(result.error)
                toast.error(result.error)
            } else {
                toast.success("Successfully signed in!")
                router.push("/dashboard/todos");
                router.refresh()
            }
        } catch (err) {
            if (err instanceof z.ZodError) {

                setError(err.issues.map(issue => issue.message).join(', '))
                toast.error(err.issues.map(issue => issue.message).join(', '))
            } else {
                setError('Something went wrong')
                toast.error('Something went wrong')
            }
            setLoading(false)
        }
    }

    return (
        <div className='bg-white text-black px-2  md:px-4 py-8 rounded-2xl'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 items-center px-6 md:px-12'>
                <div className='flex flex-col items-center'>
                    <h1 className='mb-4 text-4xl font-extrabold text-black'>SignIn</h1>
                    <h2 className=" text-lg font-medium text-gray-700">
                        We missed you! You can be better without us!
                    </h2>
                </div>

                <div className='w-full flex flex-col gap-3'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='email' className='font-medium text-black'>Email<span className='text-red-500 pl-1'>*</span></label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="mail@loopple.com"
                            className="w-full h-12 px-5 text-sm font-medium outline-none bg-transparent placeholder-gray-500 border border-grey-200 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                            onChange={(value) => handleChange('email', value)}
                            name="email"
                            value={form.email}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-full '>
                        <label htmlFor='password' className='font-medium text-black'>Password<span className='text-red-500 pl-1'>*</span></label>
                        <div className='relative'>
                            <Input
                                id="password"
                                type={type}
                                placeholder='*************'
                                className="w-full h-12 px-5 text-sm font-medium outline-none bg-transparent placeholder-gray-500 border border-grey-200 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                onChange={(value) => handleChange('password', value)}
                                name="password"
                                value={form.password}


                            />
                            <span className={cn('absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-300', {
                                "text-blue-600": type === "text"
                            })} onClick={handleToggleType}>
                                {type === "password" ? <Eye /> : <EyeOff />}
                            </span>
                        </div>
                    </div>
                    <div className="w-full min-h-[16px]">
                        {error && (
                            <p className="text-red-500 text-[10px] w-full text-start break-words">
                                {error}
                            </p>
                        )}
                    </div>
                </div>


                <div className='flex flex-col gap-2'>
                    <button
                        type='submit'
                        disabled={loading}
                        className="w-full cursor-pointer px-6 py-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <div className="flex items-center ">
                        <hr className="h-0 border-b border-solid border-gray-500 grow" />
                        <p className="mx-4 text-gray-600">or</p>
                        <hr className="h-0 border-b border-solid border-gray-500 grow" />
                    </div>
                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 cursor-pointer px-6 h-[54px] text-sm font-bold leading-none border border-gray-500 text-black transition duration-300 md:w-96 rounded-2xl bg-transparent hover:bg-gray-200 focus:ring-4 focus:ring-blue-100"
                    >
                        <GoogleIcon /> Sign in with Google
                    </button>
                </div>
                <div>
                    <p>Don`t have you account? <Link href={'/auth/signup'} className='text-blue-500 font-medium transition duration-300  hover:underline hover:text-blue-600'>Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}