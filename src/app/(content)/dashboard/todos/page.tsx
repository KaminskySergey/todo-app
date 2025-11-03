'use server'

import { redirect } from "next/navigation";



export default async function TodosPageDefault() {
    const today = new Date().toISOString().slice(0, 10);
    redirect(`/dashboard/todos/${today}`)
}
