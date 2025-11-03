'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SidebarContextType {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export const useSidebarContext = () => {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebarContext must be used within a SidebarProvider");
    }
    return context;
}

export default function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, openSidebar, closeSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
}