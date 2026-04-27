"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical, Pencil, Download, FolderOpen, Users, Trash2, Globe } from "lucide-react";
import Image from "next/image";

interface FileCardProps {
    title?: string;
    createdBy?: string;
}

export default function File({
    title = "Employees",
    createdBy = "Maria Rodriguez",
}: FileCardProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown 
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative flex flex-col justify-center bg-white border border-[#E0E6EB] p-6 rounded-xl w-fit">

            {/* Icon */}
            <div className="rounded-lg">
                <div className="relative p-5 bg-[#F4F7FB] rounded-xl">
                    <Image
                        src="/images/file.png"
                        alt="file"
                        width={300}
                        height={150}
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Title*/}
            <div className="flex items-center justify-between mt-3">
                <h1 className="text-[14px] font-manrope font-semibold text-[#29343D]">
                    {title}
                </h1>

                <button className="cursor-pointer" onClick={() => setOpen(!open)}>
                    <EllipsisVertical size={18} />
                </button>
            </div>

            {/* Created By */}
            <p className="text-[14px] font-manrope font-normal text-[#98A4AE] mt-1">
                Created by {createdBy}
            </p>

            {/* Dropdown */}
            {open && (
                <div
                    ref={dropdownRef}
                    className="absolute right-2 top-1/2 w-[200px] bg-white rounded-2xl shadow-lg p-2 z-20"
                >
                    <ul className="flex flex-col text-sm font-manrope text-[#29343D]">

                        <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <Pencil size={16} color="#46CAEB" /> Rename
                        </li>

                        <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <Download size={16} /> Download
                        </li>

                        <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <FolderOpen size={16} color="#635BFF" /> Move
                        </li>
                        <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <Globe size={16} color="#16CDC7" /> Publish social media post
                        </li>

                        <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <Users size={16} color="#FFD648" /> Manage Permission
                        </li>

                        <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-[#FF6692] cursor-pointer">
                            <Trash2 size={16} color="#FF6692" /> Delete
                        </li>

                    </ul>
                </div>
            )}
        </div>
    );
}