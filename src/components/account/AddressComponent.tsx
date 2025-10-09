'use client';

import { Building2, Flag, MapPinHouse, MapPinPlus, SquarePen } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import AddressForm from './AddressForm';
import { createAddressAction } from '../../../actions/createAddress';
import { IAddress } from '@/types/address';

interface IAddressComponent {
    initialAddress: IAddress | null;
}


export default function AddressComponent({ initialAddress }: IAddressComponent) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        street: initialAddress?.street || "",
        city: initialAddress?.city || "",
        country: initialAddress?.country || "",
        zip: initialAddress?.zip || ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (formData: FormData) => {
        try {
            setLoading(true);
            const newAddress = await createAddressAction(formData);
            console.log("Created address:", newAddress);
            setIsOpen(false);
        } catch (err) {
            console.error(err);
            alert((err as Error).message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex flex-col h-[270px] ">
                <div className="border-b border-gray-100 flex items-center justify-between dark:border-gray-700 pb-3">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Shipping Address
                    </h2>
                    {initialAddress && (
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="p-2 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300"
                        >
                            <SquarePen className="text-blue-600 dark:text-blue-400" size={24} />
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-center flex-1">
                    {initialAddress ? <div className="flex flex-col gap-3 text-lg text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                            <MapPinHouse className="text-blue-600 dark:text-blue-400" />
                            <span>{initialAddress.street}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building2 className="text-blue-600 dark:text-blue-400" />
                            <span>{initialAddress.zip} {initialAddress.city}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Flag className="text-blue-600 dark:text-blue-400" />
                            <span>{initialAddress.country}</span>
                        </div>
                    </div>

                        :
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-blue-500 max-w-[256px] transition-colors duration-300 hover:bg-blue-700 cursor-pointer flex items-center justify-center text-white font-medium text-lg border-none rounded-4xl py-2 px-4"
                            type="button"
                        >
                            Add Address
                            <MapPinPlus className='pl-1' size={32} />
                        </button>}
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0  flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Add Address</h3>
                        <AddressForm form={form} handleChange={handleChange} action={onSubmit} loading={loading} onCancel={() => (setIsOpen(false))} />
                    </div>
                </div>
            )}
        </>
    );
}