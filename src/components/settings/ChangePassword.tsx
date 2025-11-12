import { useState } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../../actions/settings";



export default function ChangePassword() {
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        try {
            await changePassword({ oldPassword: currentPassword, newPassword });
            toast.success("Password successfully changed!");
            setIsEdit(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message || "Failed to change password.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor="password"
                className="text-blue-500 text-xl dark:text-white font-medium"
            >
                Password:
            </label>

            <div className="flex gap-3 items-center">
                <input
                    id="password"
                    type="password"
                    value="****************"
                    readOnly
                    disabled
                    className="w-[256px] cursor-not-allowed px-4 py-2 border rounded-lg bg-gray-100 dark:bg-[#1F2937] text-gray-500 border-gray-300 dark:border-gray-600"
                />
                {!isEdit && (
                    <button
                        type="button"
                        onClick={() => setIsEdit(true)}
                        className="flex items-center font-medium text-sm px-4 py-2 rounded-xl text-white bg-blue-500 hover:bg-blue-600 transition"
                    >
                        Change
                    </button>
                )}
            </div>

            {isEdit && (
                <form onSubmit={handleSave} className="flex flex-col gap-3 mt-2">
                    <input
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-[256px] px-4 py-2 border rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-[256px] px-4 py-2 border rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-[256px] px-4 py-2 border rounded-lg bg-white dark:bg-[#111827] text-gray-900 dark:text-gray-100 border-blue-400 focus:ring-2 focus:ring-blue-500 transition"
                        required
                    />

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 rounded-xl text-white bg-green-500 hover:bg-green-600 transition disabled:opacity-70"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-xl text-white bg-gray-400 hover:bg-gray-500 transition disabled:opacity-70"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}