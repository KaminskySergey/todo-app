'use server'

import { IFilters } from "@/types/filters";

export async function getFilters(): Promise<IFilters> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filters`, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json() as Promise<IFilters>;
}