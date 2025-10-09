import CheckoutComponent from "@/components/checkout/CheckoutComponent";
import { getAddressAction } from "../../../../actions/createAddress";

// interface ICheckout {
//     searchParams: Promise<{ [key: string]: string | undefined }>;
// }

export default async function Checkout() {
    const address = await getAddressAction()
    return (
        <CheckoutComponent savedAddress={address}/>
    );
}   