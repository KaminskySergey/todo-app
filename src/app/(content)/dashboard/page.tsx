import { redirect } from "next/navigation";

export default function DashboardPage() {
    const today = new Date().toISOString().slice(0, 10);
    redirect(`/dashboard/todos/${today}`);
}