'use client';

import { IOrder } from '@/types/order';
import { formatDate } from '@/utils/utils';
import React from 'react';


interface IOrdersComponent {
    orders: IOrder[]
}


export default function OrdersComponent({ orders }: IOrdersComponent) {
    if (!orders || orders.length === 0) {
        return (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Order #{order.id}
                        </h3>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                                    : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-gray-700 dark:text-gray-300">
                        <p><span className="font-medium">Name:</span> {order.name}</p>
                        <p><span className="font-medium">Email:</span> {order.email}</p>
                        <p><span className="font-medium">Phone:</span> {order.phone}</p>
                        <p><span className="font-medium">Address:</span> {order.shippingAddress}</p>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        Created at: {formatDate(order.createdAt)}
                    </p>

                    {order.items && order.items.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Items:
                            </h4>
                            <ul className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                {order.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span>
                                            {item.quantity} x {item.product?.name || "Unknown product"}
                                        </span>
                                        <span className="font-medium">${item.product.finalPrice}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}