'use server'
import TodosComponent from "@/components/todos/TodosComponent";
import { getTodosByDate } from "../../../../../../actions/todos";

interface ITodoPage {
    params: Promise<{ [key: string]: string }>;
}

export default async function TodoPage({ params }: ITodoPage) {
    const { date } = await params
    const todos = await getTodosByDate(date)
    return (
        <TodosComponent todos={todos} />
    );
}
