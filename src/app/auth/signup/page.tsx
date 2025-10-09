import { SignUpComponent } from "@/components/auth/signup/SigUpComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await getServerSession()
    if(session){
        redirect('/')
    }
    return <SignUpComponent />
}