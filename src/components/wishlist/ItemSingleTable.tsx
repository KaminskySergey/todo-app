import { addToCart } from "@/redux/cart/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { removeFromWishlist } from "@/redux/wishlist/wishlistSlice";
import { IProduct } from "@/types/products";
import { Ban, CircleCheckBig, HeartOff } from "lucide-react";
import Image from "next/image";
import ToggleCartButton from "../ui/ToggleCartButtom";

interface IItemSingleTable {
    item: IProduct
}

export default function ItemSingleTable({ item }: IItemSingleTable) {
    const dispatch = useAppDispatch()
    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(item.id))
    }
    console.log(item, 'gbgbgbgbgb')
    return (
        <tr className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600">
            <td className="py-4 px-6">
                <button
                    onClick={handleRemoveFromWishlist}
                    className="flex items-center justify-center rounded-full w-9.5 h-9.5 bg-gray-300 dark:bg-gray-700 border-none ease-out duration-200 cursor-pointer hover:bg-red-500 hover:border-red-500"
                >
                    <HeartOff className="dark:text-white" />
                </button>
            </td>
            <td className="py-4 px-6 ">
                <div className="flex items-center gap-4">
                    <div className="relative  w-20 h-20 flex-shrink-0 rounded-lg bg-gray-2 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                        <Image
                            src={item.images[0]}
                            width={80}
                            height={80}
                            alt={item.name}
                            className="object-cover w-full h-full"
                        />
                        {item.discount && (
                            <span className="absolute top-1 right-1 bg-red-500 text-white text-[12px] z-5 p-1 font-bold  rounded-full ">
                                -{item.discount}%
                            </span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-black dark:text-white text-lg">
                            {item.name}
                        </h3>
                    </div>
                </div>
            </td>
            <td className="py-4 px-6">
                <h3 className="font-semibold text-black dark:text-white text-lg">
                    {item.finalPrice}$
                </h3>
                {item.discount && (

                    <p className="text-gray-500 dark:text-gray-400 line-through text-sm">
                        {item.price}$
                    </p>


                )}
            </td>
            <td className="py-4 px-6">
                {item.quantity && item.quantity > 0 ? (
                    <div className="flex items-center rounded-4xl overflow-hidden w-max text-green-500">
                        <CircleCheckBig /> <span className="pl-2">In Stock</span>
                    </div>
                ) : (
                    <div className="flex items-center rounded-4xl overflow-hidden w-max text-gray-400">
                        <Ban /> <span className="pl-2">Out of Stock</span>
                    </div>
                )}
            </td>
            <td className="py-4 px-6">
                <ToggleCartButton item={item} />
            </td>

        </tr>
    )
}