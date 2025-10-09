'use client';

// import { GoogleIcon } from '@/components/icons/GoogleIcon';npm run 
import * as yup from "yup"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

type Errors = {
    email?: string
    password?: string
}

export default function SignInForm() {
    const router = useRouter()
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Errors>({})


    // const handleGoogleSignIn = async () => {
    //     try {
    //         await signIn("google", { callbackUrl: "/" })
    //     } catch (err) {
    //         console.error("Google sign-in error:", err)
    //     }
    // }

    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})

        const formData = new FormData(e.currentTarget)
        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }

        try {
            // yup validation
            await schema.validate(data, { abortEarly: false })

            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (response?.error) {
                toast.error(response.error)
                setErrors({ password: response.error })
            } else {
                toast.success("Successfully signed in!")
                router.push("/")
                router.refresh()
            }
        } catch (err: any) {
            if (err.name === "ValidationError") {
                const newErrors: Errors = {}
                err.inner.forEach((e: any) => {
                    if (e.path) newErrors[e.path as keyof Errors] = e.message
                })
                setErrors(newErrors)
            } else {
                console.error(err)
                toast.error("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Email */}
            <div>
                <label htmlFor="email" className="block mb-2.5">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className={`rounded-full border ${errors.email ? "border-red-500" : "border-blue-500"} 
          bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 
          outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 
          ${errors.email ? "focus:ring-red-400" : "focus:ring-green-400"} 
          dark:bg-gray-700 dark:placeholder:text-gray-300`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block mb-2.5">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`rounded-full border ${errors.password ? "border-red-500" : "border-blue-500"} 
          bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 
          outline-hidden duration-200 focus:border-transparent focus:shadow-input focus:ring-2 
          ${errors.password ? "focus:ring-red-400" : "focus:ring-green-400"} 
          dark:bg-gray-700 dark:placeholder:text-gray-300`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center font-medium text-white bg-blue-500 py-3 px-6 rounded-full 
        transition-colors cursor-pointer duration-300 hover:bg-blue-700 mt-7.5 items-center gap-2 
        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {loading ? "Signing in..." : "Sign in"}
            </button>

            <span className="relative block font-medium text-center mt-4.5">
                <span className="absolute left-0 top-1/2 h-px w-full bg-gray-300 dark:bg-gray-600 -translate-y-1/2"></span>
                <span className="relative px-3 bg-white dark:bg-gray-800 z-10">Or</span>
            </span>

            {/* <div className="flex flex-col gap-4.5 mt-4.5">
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="flex cursor-pointer justify-center items-center gap-3.5 rounded-full bg-[#141c38] text-white p-3 duration-200 hover:bg-[#1C274C] disabled:pointer-events-none disabled:opacity-60"
                >
                    <GoogleIcon />
                    Sign In with Google
                </button>
            </div> */}
        </form>
    )
}