import { Container } from "@/components/ui/Container";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/Sidebar";
import { ReactNode } from "react";
import { auth } from "../../../../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
    // if (!session) redirect("/auth/signin");
  return (
    <div className="flex h-screen relative bg-gray-200">
      <SideBar />

      <div className="flex flex-1 flex-col relative transition-all duration-300 ease-in-out">
        <Header />
        <main className="flex-1  max-w-none mx-0 bg-[#EAEAEA] dark:bg-gray-800">
          {children}
        </main>
      </div>
    </div >

  )
}