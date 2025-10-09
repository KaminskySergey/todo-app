'use client';

import React, { ChangeEvent } from 'react';

interface IAddressForm {
    action: (formData: FormData) => Promise<void>
    onCancel: () => void
    loading: boolean
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    form: { street: string, city: string, country: string, zip: string,}
}

export default function AddressForm({ action, onCancel, loading, handleChange, form }: IAddressForm) {
    const {street, city, country, zip} = form
    return (
        <form
            action={action}
            className="flex flex-col gap-4"
            suppressHydrationWarning
        >
            <input
                name="street"
                placeholder="Street"
                className="border border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={street}
                onChange={handleChange}
            />
            <input
                name="city"
                placeholder="City"
                className="border border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={city}
                onChange={handleChange}
            />
            <input
                name="country"
                placeholder="Country"
                className="border border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={country}
                onChange={handleChange}
            />
            <input
                name="zip"
                placeholder="ZIP Code"
                className="border border-blue-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={zip}
                onChange={handleChange}
            />

            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 cursor-pointer rounded-xl border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 cursor-pointer rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
}