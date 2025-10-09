'use client'
import { IProduct } from "@/types/products"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from 'lucide-react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import { useAppDispatch } from "@/redux/hooks"
import { useAppSelector } from "@/redux/store"
import { selectCartItems } from "@/redux/cart/selectors"
import { cn } from "@/utils/utils"
import { addToWishlist, removeFromWishlist } from "@/redux/wishlist/wishlistSlice"
import { selectWishlistItems } from "@/redux/wishlist/selectors"
import ToggleCartButton from "../ui/ToggleCartButtom"
interface IProductItem {
    item: IProduct
    isGrid: boolean
}

export function ProductItem({ item, isGrid = false }: IProductItem) {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems)
    const wishlistItems = useAppSelector(selectWishlistItems)
    const isCart = cartItems.some(el => el.id === item.id)
    const isWishlist = wishlistItems.some(el => el.id === item.id)

    return (
        <li
            className={cn(
                "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-2xl",
                {
                    "flex flex-col md:flex-row": !isGrid,
                }
            )}
        >
            <Link
                href={`/products/${item.id}`}
                className={cn("relative w-full", {
                    "flex flex-col md:flex-row w-full": !isGrid,
                })}
            >
                <div
                    className={cn(
                        "relative overflow-hidden flex-shrink-0",
                        isGrid ? "h-72 w-full" : "w-full h-64 md:w-64"
                    )}
                >
                    <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 28rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {item.discount && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            -{item.discount}%
                        </span>
                    )}
                    <div
                        className="absolute top-5 left-5 w-auto flex justify-center pb-4 transform -translate-y-full opacity-0
             transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (isWishlist) {
                                    dispatch(removeFromWishlist(item.id));
                                } else {
                                    dispatch(addToWishlist(item));
                                }
                            }}
                        >
                            <Heart
                                className={`stroke-current transition-all duration-300 cursor-pointer fill-current ${isWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                            />
                        </button>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 w-full flex justify-center pb-4 transform translate-y-full opacity-0
               transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        <ToggleCartButton item={item}/>
                    </div>
                </div>

                <div className={cn("p-4 flex flex-col gap-2", {
                    "justify-center": !isGrid
                })}>
                    <span className="text-gray-400 dark:text-gray-400 uppercase text-xs font-medium">
                        {item.brand.name}
                    </span>

                    <div className={cn("flex items-start justify-between gap-2", {
                        "flex-col": !isGrid,
                        "flex-row": isGrid,
                    })}>
                        <h3 className="text-lg font-semibold text-black dark:text-white truncate">
                            {item.name}
                        </h3>
                        <ReactRating value={item.rating} style={{ maxWidth: 90 }} readOnly />
                    </div>

                    <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.category.name}</span>
                        <span>({item.subcategory})</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        {item.discount ? (
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold text-red-600">
                                    ${item.finalPrice}
                                </p>
                                <p className="text-sm text-gray-400 line-through">
                                    ${item.price}
                                </p>
                            </div>
                        ) : (
                            <p className="text-xl font-bold text-black dark:text-gray-200">
                                ${item.price}
                            </p>
                        )}


                    </div>
                </div>
                {
                    isCart && <div className="absolute bottom-5 right-5 z-10">
                        <ShoppingCart className="text-green-500" />
                    </div>
                }
            </Link>
        </li>
    );
}