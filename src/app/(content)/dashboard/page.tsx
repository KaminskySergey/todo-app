import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Панель управления</h1>

            <div className="mb-6">
                <p>Сегодня у вас 3 задачи и 2 события в календаре.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Link href="/dashboard/todos" className="p-4 border rounded hover:bg-gray-100">
                    Задачи
                </Link>
                <Link href="/dashboard/calendar" className="p-4 border rounded hover:bg-gray-100">
                    Календарь
                </Link>
            </div>
        </div>
    )
}