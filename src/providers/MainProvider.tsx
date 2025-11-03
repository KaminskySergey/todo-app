'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth"
import SidebarProvider from '@/app/context/SidebarProvider';
import ToasterProvider from './ToasterProvider';

export default function MainProvider({ children, session }: { children: ReactNode, session?: Session | null }) {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
                <SidebarProvider>
                    <ToasterProvider />
                    {children}
                </SidebarProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}