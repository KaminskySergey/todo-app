import AccountDetails from "@/components/account/AccountDetails";
import { getProfile } from "../../../../../actions/profile";
import { auth } from "../../../../../lib/auth";


export default async function AddressPage() {
    const profile = await getProfile()
    const session = await auth()
console.log(session, 'wwwwwww')
    return (
        <AccountDetails profile={profile}/>
    );
}
