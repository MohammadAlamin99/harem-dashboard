
"use client";

import { useState, useRef, useEffect } from "react";
import FolderIcon from "./FolderIcon";
import { EllipsisVertical, Pencil, Download, FolderOpen, Users, Trash2 } from "lucide-react";
import ManagePermissionsModal from "./ManagePermissionsModal";

interface FileCardProps {
    title?: string;
    createdBy?: string;
    Icon?: React.ComponentType;
}

export default function FileCard({
    title = "Employees",
    createdBy = "Maria Rodriguez",
    Icon = FolderIcon,
}: FileCardProps) {
    const [open, setOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleManagePermission = () => {
        setOpen(false);
        setIsManageModalOpen(true);
    };

    return (
        <>
            <div className="relative flex flex-col justify-center bg-[#F4F7FB] p-6 rounded-xl w-full">

                {/* Icon */}
                <div className="px-[55px] py-[25px] bg-[#F0F4F8] rounded-lg flex justify-center">
                    <Icon />
                </div>

                {/* Title + Menu */}
                <div className="flex items-center justify-between mt-3">
                    <h1 className="text-[14px] font-manrope font-semibold text-[#29343D]">
                        {title}
                    </h1>

                    {/* wrapperRef wraps both the button and the dropdown */}
                    <div ref={wrapperRef} className="relative">
                        <button
                            className="cursor-pointer p-1 rounded-md hover:bg-gray-200 transition-colors"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <EllipsisVertical size={18} />
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-lg p-2 z-30" style={{ width: "200px" }}>
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
                                    <li
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                        onClick={handleManagePermission}
                                    >
                                        <Users size={16} color="#FFD648" /> Manage Permission
                                    </li>
                                    <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer">
                                        <Trash2 size={16} /> Delete
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Created By */}
                <p className="text-[14px] font-manrope font-normal text-[#98A4AE] mt-1">
                    Created by {createdBy}
                </p>
            </div>

            {/* Modal lives outside the card div */}
            <ManagePermissionsModal
                isOpen={isManageModalOpen}
                onClose={() => setIsManageModalOpen(false)}
            />
        </>
    );
}