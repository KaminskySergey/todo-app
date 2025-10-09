
import { SignInComponent } from "@/components/auth/signin/SignInComponent"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SignInPage() {
    const session = await getServerSession()
    console.log(session)
    if(session){
        redirect('/')
    }
    return <SignInComponent />
}