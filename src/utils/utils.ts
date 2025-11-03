import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

 export function formatTimeRange(start: Date | string, end: Date | string) {
    const s = new Date(start);
    const e = new Date(end);
    
    const pad = (n: number) => n.toString().padStart(2, "0");
  
    return `${pad(s.getHours())}:${pad(s.getMinutes())} - ${pad(e.getHours())}:${pad(e.getMinutes())}`;
  }

  export function formatTimeForForm(date: Date) {
    const h = String(date.getHours()).padStart(2, "0");
    const m = String(date.getMinutes()).padStart(2, "0");
    return `${h}:${m}`;
}

export function parseFormTimeToDate(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date(); 
    date.setHours(hours, minutes, 0, 0);
    return date;
}