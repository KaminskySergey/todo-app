import SignInComponent from "@/components/auth/SignInComponent";
import { auth } from "../../../../../lib/auth";



export default async function SignInPage() {
    const session = await auth()
    return <SignInComponent />
}