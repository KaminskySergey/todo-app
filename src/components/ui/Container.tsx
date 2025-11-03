import { cn } from "@/utils/utils"
import { ReactNode } from "react"

interface IContainer {
    children: ReactNode
    className?: string
}


export const Container = ({ children, className }: IContainer) => {
    return <div className={cn("max-w-[1440px]  ml-auto mr-auto px-[20px] md:px-[32px]", className)}>
        {children}
    </div>
}