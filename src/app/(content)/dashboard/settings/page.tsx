import SettingsComponent from "@/components/settings/SettingsComponent";
import { getProfile } from "../../../../../actions/profile";

export default async function SettingsPage() {
    const profile = await getProfile()
    return (
        <SettingsComponent  currentEmail={profile.email} />
    );
}
