import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-8">
            {/* Заголовок */}
            <h1 className="text-5xl font-extrabold text-white mb-6 text-center drop-shadow-lg">
                Welcome to Your Todo App
            </h1>

            {/* Подзаголовок */}
            <p className="text-lg text-white/90 mb-10 text-center max-w-md">
                Keep track of your tasks, stay organized, and boost your productivity.
            </p>

            {/* Пример карточек задач */}
            <div className="relative w-full max-w-4xl h-[400px] mx-auto">
                <Image
                    src="/hero.webp"
                    alt="hero"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <Link href={'/auth/signin'} className="mt-10 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition-colors duration-300">
                Getting Start
            </Link>
        </div>
    );
}