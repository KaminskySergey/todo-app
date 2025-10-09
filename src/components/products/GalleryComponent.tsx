'use client'
import { useState } from "react";
import { Container } from "../ui/Container";
import { SideBar } from "../ui/sidebar/SideBar";
import { ProductItem } from "./ProductItem";
import { IProduct } from "@/types/products";
import { IFilters } from "@/types/filters";
import { Funnel } from "lucide-react"
import { Breadcrumb } from "../ui/Breadcrumb";
import { cn } from "@/utils/utils";
import { GalleryToggleButton } from "../common/GalleryToggleButton";
import { Pagination } from "../ui/Pagination";
interface IGalleryComponent {
    products: IProduct[]
    filters: IFilters
    currentPage: number,
    totalPages: number,
   

}

export function GalleryComponent({ products, filters, currentPage, totalPages }: IGalleryComponent) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isToggleGrid, setIsToggleGrid] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("gallery-view");
            return saved ? saved === "true" : true;
        }
        return true;
    });
   
    return (
        <>
            <Breadcrumb title="Products" />
            <section className="py-16">

                <Container className="flex  pt-8 px-2 md:px-4 gap-6 relative">
                    <SideBar
                        filters={filters}
                        isSidebarOpen={isSidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <div className="flex-1 flex flex-col gap-3 md:gap-6">

                        <div className="flex items-center justify-between md:hidden mb-4">
                            <div>

                                <p className="text-[20px] text-gray-500">Showing {products.length} Products</p>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <Funnel size={20} />
                                Filters
                            </button>
                        </div>

                        <div className="hidden md:flex items-center justify-between px-5 py-3 rounded-md bg-white dark:bg-gray-800 shadow-lg">
                            <div>

                                <p className="text-[20px] text-gray-500">Showing {products.length} Products</p>
                            </div>
                            <GalleryToggleButton isToggleGrid={isToggleGrid} setIsToggleGrid={setIsToggleGrid} />
                        </div>

                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-center">
                                <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                    No products found
                                </p>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Try adjusting your filters or search query.
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-8">
                                <div className={cn("gap-4", {
                                    "grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 ": isToggleGrid,
                                    "flex flex-col": !isToggleGrid
                                })}>
                                    {products.map((el) => (
                                        <ProductItem isGrid={isToggleGrid} key={el.id} item={el} />
                                    ))}
                                </div>
                                <div>
                                    <Pagination currentPage={currentPage}  totalPages={totalPages} />
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </section>
        </>
    );
}
