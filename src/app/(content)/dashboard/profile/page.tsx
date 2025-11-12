import ProfileComponent from "@/components/profile/ProfileComponent";
import { getProfile } from "../../../../../actions/profile";

export default async function ProfilePage() {
    const profile = await getProfile()
    return (
        <ProfileComponent profile={profile} />
    );
}
