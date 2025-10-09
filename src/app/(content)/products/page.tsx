import { GalleryComponent } from "@/components/products/GalleryComponent";

import { getFilters } from "../../../../actions/filters";
import { getProducts } from "../../../../actions/products";




interface IHome {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Home({ searchParams }: IHome) {
    const { query, category, brand, subcategory, minPrice, maxPrice, minRating, maxRating, page } = await searchParams
    const products = await getProducts(query, category, brand, subcategory, minPrice, maxPrice, minRating, maxRating, page)
    const filters = await getFilters()
    return (
        <GalleryComponent filters={filters} products={products.results} currentPage={products.currentPage} totalPages={products.totalPages}/>
    );
}   