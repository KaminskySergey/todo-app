import { ProductByIdComponent } from "@/components/products/productById/ProductByIdComponent";
import { getProductById } from "../../../../../actions/products";

interface IProductById {
    params: Promise<{ [key: string]: string }>;
}



export default async function ProductById({ params }: IProductById) {
    const { id } = await params
    const currentProduct = await getProductById(id)
    
    return (
        <ProductByIdComponent product={currentProduct}/>
    );
}
