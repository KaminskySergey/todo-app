'use client'
import { Container } from "@/components/ui/Container";
import { ImagesContainer } from "./ImagesContainer";
import { IProduct } from "@/types/products";
import { InfoContainer } from "./InfoContainer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
interface IProductByIdComponent { 
    product: IProduct
}

export function ProductByIdComponent({product }: IProductByIdComponent) {
    

    return (
        <>
        <Breadcrumb title={`Product Details - ${product.name}`} name={product.name}/>
        <section className="pt-16">
            <Container className="max-w-[1280px]">
                <div className="flex flex-col md:flex-row gap-4">
                 <ImagesContainer images={product.images}/>
                    

                    {/* Right: Product Details */}
                    <InfoContainer product={product}/>
                    </div>
            </Container>
        </section>
        </>
    )
}
