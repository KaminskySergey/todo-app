import CalendarComponent from "@/components/calendar/CalendarComponent";
import { getAllTodos } from "../../../../../../actions/todos";

// interface ICalendarPage {
//     params: Promise<{ [key: string]: string }>;
// }


export default async function CalendarPage() {
    const todos = await getAllTodos(); 
    return <CalendarComponent todos={todos} />;
}