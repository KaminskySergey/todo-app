import { ProductDescription } from "@/components/ui/ProductDescription";
import { addToCart, removeFromCart } from "@/redux/cart/cartSlice";
import { selectCartItems } from "@/redux/cart/selectors";
import { useAppDispatch } from "@/redux/hooks";
import { useAppSelector } from "@/redux/store";
import { IProduct } from "@/types/products"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { ShoppingCart, Tag } from 'lucide-react'
interface IInfoContainer {
    product: IProduct
}


export function InfoContainer({ product }: IInfoContainer) {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(selectCartItems)
    const isCart = cartItems.some(el => el.id === product.id)
    return (
        <div className="flex flex-col w-full md:w-1/2 gap-6">
            <h2 className="text-xl md:text-3xl text-black dark:text-white font-bold">
                {product.name}
                {product.subcategory && (
                    <span className="px-3 py-1 font-medium text-black dark:text-white rounded-full">
                        ({product.subcategory})
                    </span>
                )}
            </h2>

            <div className="flex items-center gap-3">
                {product.discount ? (
                    <>
                        <p className="text-xl md:text-3xl font-bold text-red-600">
                            ${product.finalPrice}
                        </p>
                        <del>
                            <p className="text-2xl text-gray-400 dark:text-gray-300">
                                ${product.price}
                            </p>
                        </del>
                        <span className="text-lg text-green-600 font-semibold">
                            -{product.discount}%
                        </span>
                    </>
                ) : (
                    <p className="text-xl md:text-3xl font-semibold text-black dark:text-gray-200">
                        ${product.price}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3">
                <ReactRating value={product.rating} style={{ maxWidth: 148 }} readOnly />
                <span className="text-lg text-gray-600 font-medium">
                    {product.rating} / 5
                </span>
            </div>

            <ProductDescription description={product.description} />


            {product.tags?.length > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                    {product.tags.map((tag: string, idx: number) => (
                        <span
                            key={idx}
                            className="flex items-center gap-1 px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full"
                        >
                            <Tag size={16} /> {tag}
                        </span>
                    ))}
                </div>
            )}

            <p className="text-base text-gray-600 dark:text-gray-400">
                In stock:{" "}
                <span className="font-semibold text-black dark:text-white">
                    {product.quantity}
                </span>
            </p>

            <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="quantity"
                        className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        defaultValue="1"
                        className="w-20 text-lg text-center rounded-md border-gray-300 shadow-sm 
            focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                {isCart ?
                    <button onClick={() => dispatch(removeFromCart(product.id))} className="bg-red-500 flex gap-2 cursor-pointer w-[300px] items-center justify-center text-lg font-medium text-white px-6 py-3 rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        <ShoppingCart size={22} />
                        Remove From Cart
                    </button>
                    : <button onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))} className="bg-indigo-500 flex gap-2 cursor-pointer w-[300px] items-center justify-center text-lg font-medium text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <ShoppingCart size={22} />
                        Add to Cart
                    </button>}
            </div>
        </div>
    );
}

