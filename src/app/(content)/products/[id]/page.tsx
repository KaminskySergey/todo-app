import { ProductByIdComponent } from "@/components/products/productById/ProductByIdComponent";
import { IProduct } from "@/types/products";

interface IProductById {
    params: Promise<{ [key: string]: string }>;
}

export async function getProductById(id: string): Promise<IProduct> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json() as Promise<IProduct>;
}

export default async function ProductById({ params }: IProductById) {
    const { id } = await params
    const currentProduct = await getProductById(id)
    
    return (
        <ProductByIdComponent product={currentProduct}/>
    );
}
