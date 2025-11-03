'use server'
import { redirect } from 'next/navigation';

export default async function CalendarDefaultPage() {
    const today = new Date().toISOString().slice(0, 10); 
    redirect(`/dashboard/calendar/${today}`);
}