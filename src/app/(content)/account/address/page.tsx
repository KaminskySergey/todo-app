import AddressComponent from "@/components/account/AddressComponent";
import { getAddressAction } from "../../../../../actions/createAddress";

export default async function AddressPage() {
 const address = await getAddressAction()
     return (
         <AddressComponent initialAddress={address}/>
     );
 }
 