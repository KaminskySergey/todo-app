'use client';

import React from 'react';

import { useState } from "react";
import Image from "next/image";
import { Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import AvatarIcon from '../icons/AvatarIcon';
import Avatar from '../header/Avatar';

interface IAvatarUpdate {
    currentAvatar: string | null;
}

export default function AvatarUpdate({ currentAvatar }: IAvatarUpdate) {
    const [_, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState(currentAvatar || null);
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
        <div className="relative w-48 h-48 group rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            {/* Аватар */}
            {url ?<Image
                src={url}
                alt="Avatar"
                fill
                sizes='48'
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            /> : <Avatar className='absolute w-full h-full top-0 left-0 text-6xl'/>}

            <label
                htmlFor="avatar-upload"
                className="absolute inset-x-0 bottom-0 h-12 flex flex-col items-center justify-center
               bg-black/60 text-white text-sm font-semibold opacity-0 group-hover:opacity-100
               transition-opacity duration-300 cursor-pointer rounded-b-full"
            >
                <Camera size={12} className="" />
                <p className='text-[10px]'>{uploading ? "Uploading..." : "Change photo"}</p>
            </label>

            {/* Инпут */}
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