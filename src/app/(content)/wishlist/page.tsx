import WishlistComponet from "@/components/wishlist/WishlistComponent";

interface IWishlist {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Wishlist({ searchParams }: IWishlist) {

    return (
        <WishlistComponet />
    );
}   