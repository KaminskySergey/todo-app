'use client'

import * as yup from "yup"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import { toast } from "react-hot-toast"
import { registerUser } from "../../../../actions/auth"
import { signIn } from "next-auth/react"

const schema = yup.object().shape({
  name: yup.string().min(6, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

type Errors = {
  name?: string
  email?: string
  password?: string
}

export function SignUpForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrors({}) 

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    }

    try {
      await schema.validate(data, { abortEarly: false })

      const result = await registerUser(formData)

      if (result.success) {
        toast.success("Successfully registered!")

        const loginResult = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (!loginResult?.error) {
          toast.success("You are now logged in!")
          router.push("/")
        } else {
          toast.error("Registration succeeded but auto-login failed. Please login manually.")
          router.push("/auth/signin")
        }

        form.reset()
      } else {
        toast.error(result.message)
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
      {/* Name */}
      <div>
        <label htmlFor="name" className="block mb-2.5">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          className={`rounded-full border ${errors.name ? "border-red-500" : "border-blue-500"} 
          bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-hidden duration-200 
          focus:border-transparent focus:shadow-input focus:ring-2 
          ${errors.name ? "focus:ring-red-400" : "focus:ring-green-400"} 
          dark:bg-gray-700 dark:placeholder:text-gray-300`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2.5">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          className={`rounded-full border ${errors.email ? "border-red-500" : "border-blue-500"} 
          bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-hidden duration-200 
          focus:border-transparent focus:shadow-input focus:ring-2 
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
          bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-hidden duration-200 
          focus:border-transparent focus:shadow-input focus:ring-2 
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
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  )
}