'use client'


import { checkoutAction } from "../../../actions/checkoutAction"
import { FormEvent, useState } from "react"
import { IAddress } from "@/types/address"
import { MapPin, XCircle } from "lucide-react"
import { useAppSelector } from "@/redux/store"
import { selectCartItems } from "@/redux/cart/selectors"
import toast from "react-hot-toast"

interface ICheckoutForm {
    savedAddress: IAddress | null
}

export function CheckoutForm({ savedAddress }: ICheckoutForm) {
    const cartItems = useAppSelector(selectCartItems)

    const [loading, setLoading] = useState(false)
    const [isToggle, setIsToggle] = useState(false)
    const [error, setError] = useState('')


    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zip: '',
        country: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleToggleAddress = () => {
        setIsToggle((prev) => {
            const newValue = !prev
            if (newValue && savedAddress) {
                setForm({
                    ...form,
                    street: savedAddress.street,
                    city: savedAddress.city,
                    zip: savedAddress.zip,
                    country: savedAddress.country,
                })
            } else {
                setForm({
                    ...form,
                    street: "",
                    city: "",
                    zip: "",
                    country: "",
                })
            }
            return newValue
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        try {
            const checkoutUrl = await checkoutAction(formData)
            toast.success("Order created successfully!");
            window.location.href = checkoutUrl
        } catch (err) {
            toast.error("Something went wrong");
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {savedAddress && (
                <button
                    type="button"
                    onClick={handleToggleAddress}
                    className={`self-end mb-2 flex cursor-pointer items-center gap-2 text-sm font-medium 
                  transition-all duration-300 
                  ${isToggle
                            ? "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            : "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        }`}
                >
                    {isToggle ? (
                        <>
                            <XCircle size={18} />
                            Clear address
                        </>
                    ) : (
                        <>
                            <MapPin size={18} />
                            Use saved address
                        </>
                    )}
                </button>
            )}

            {/* Name */}
            <input
                name="name"
                placeholder="Name"
                required
                value={form.name}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <input
                name="email"
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Phone */}
            <input
                name="phone"
                type="tel"
                placeholder="Phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Address fields */}
            <input
                name="street"
                placeholder="Street"
                required
                value={form.street}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                name="city"
                placeholder="City"
                required
                value={form.city}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                name="zip"
                placeholder="ZIP"
                required
                value={form.zip}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                name="country"
                placeholder="Country"
                required
                value={form.country}
                onChange={handleChange}
                className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-3 bg-gray-50 dark:bg-gray-700 
                       text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input type="hidden" name="items" value={JSON.stringify(cartItems)} />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className={`py-3 px-6 rounded-full font-medium w-[324px] mx-auto shadow-lg 
                        bg-blue-600 text-white hover:bg-blue-700 transition-colors
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    )
}