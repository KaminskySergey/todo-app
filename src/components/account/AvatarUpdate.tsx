'use client';

import React from 'react';

import { useState } from "react";
import Image from "next/image";
import { Camera } from 'lucide-react';
import toast from 'react-hot-toast';

interface IAvatarUpdate {
    currentAvatar: string | null;
}

export default function AvatarUpdate({ currentAvatar }: IAvatarUpdate) {
    const [_, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState(currentAvatar || "/avatar-default.svg");
    const [uploading, setUploading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        const previewUrl = URL.createObjectURL(selectedFile);
        setUrl(previewUrl);

        await uploadFile(selectedFile);
    };

    const uploadFile = async (fileToUpload: File) => {
        try {
            setUploading(true);
            const data = new FormData();
            data.set("file", fileToUpload);

            const res = await fetch("/api/files", {
                method: "POST",
                body: data,
            });

            if (!res.ok) throw new Error("Failed to upload file");

            const json = await res.json();
            setUrl(json.url || json); 

            toast.success("Avatar updated successfully!");
        } catch (e) {
            console.error(e);
            toast.error("Failed to upload avatar");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="relative w-48 h-48 group rounded-full overflow-hidden border-2 border-blue-500">
            {/* Аватар */}
            <Image
                src={url}
                alt="Avatar"
                fill
                className="object-cover"
            />

            <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 left-0 right-0 h-14 flex flex-col items-center justify-center
                     bg-black/50 text-white text-sm font-medium opacity-0 group-hover:opacity-100
                     transition-opacity duration-300 cursor-pointer"
            >
                <Camera size={16} className="mb-1" />
                {uploading ? "Uploading..." : "Change photo"}
            </label>

            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
}