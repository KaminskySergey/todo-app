import { IOrder } from "@/types/order";
import { headers } from "next/headers";

export async function getOrders(): Promise<IOrder[]> {
    const cookieHeader = (await headers()).get("cookie") || "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        cache: "no-store",
        headers: {
            cookie: cookieHeader
        },
    });

    if (!res.ok) throw new Error("Failed to fetch orders");

    return res.json() as unknown as IOrder[];
}