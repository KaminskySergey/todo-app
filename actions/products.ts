'use server'
import { IProduct, IProductPage } from "@/types/products";

export async function getProducts(
    query?: string,
    category?: string,
    brand?: string,
    subcategory?: string,
    minPrice?: string, 
    maxPrice?: string,
    minRating?: string, 
    maxRating?: string,
    page?: string
  ): Promise<IProductPage> {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  
      const filters: Record<string, string | undefined> = { query, category, brand, subcategory, minPrice, maxPrice, minRating, maxRating, page };
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          url.searchParams.set(key, value);
        }
      });
  
      const res = await fetch(url.toString(), { cache: "no-store" });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch products: ${text}`);
      }
  
      const data = (await res.json()) as IProductPage;
      return data;
    } catch (error) {
      console.error("getProducts error:", error);
      return {
        currentPage: 1,
        totalPages: 0,
        totalRecords: 0,
        limit: 0,
        results: []
      }; 
    }
  }

export async function getProductById(id: string): Promise<IProduct> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json() as Promise<IProduct>;
}