import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import AccountNavigation from "@/components/account/AccountNavigation";
import { auth } from "../../../../lib/auth";
import { redirect } from "next/navigation";



export default async function AccountLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) redirect("/");
    return (
        <>
            <Breadcrumb title="My Account" />
            <section className="py-16 bg-gray-200 text-black dark:text-white dark:bg-[#101828]">
                <Container className="flex flex-col md:flex-row gap-6 max-w-[1280px]">
                    {/* Sidebar */}
                    <AccountNavigation />

                    {/* Content */}
                    <div className="px-5 py-4 flex-1 rounded-lg shadow-xl bg-white dark:bg-gray-800">
                        {children}
                    </div>
                </Container>
            </section>
        </>
    );
}