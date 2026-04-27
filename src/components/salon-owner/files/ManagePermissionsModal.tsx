"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search, ChevronDown, Check } from "lucide-react";
import Image from "next/image";

type Permission = "View Only" | "Edit Content" | "Add Folder";

const PERMISSION_OPTIONS: Permission[] = ["View Only", "Edit Content", "Add Folder"];

interface Member {
    id: number;
    name: string;
    email: string;
    avatar: string;
    permission: Permission;
}

const INITIAL_MEMBERS: Member[] = [
    {
        id: 1,
        name: "Maria Rodriguez",
        email: "maria@beautywellness.com",
        avatar: "/images/avator.png",
        permission: "View Only",
    },
    {
        id: 2,
        name: "Maria Rodriguez",
        email: "maria@beautywellness.com",
        avatar: "/images/avator.png",
        permission: "Edit Content",
    },
    {
        id: 3,
        name: "Maria Rodriguez",
        email: "maria@beautywellness.com",
        avatar: "/images/avator.png",
        permission: "Add Folder",
    },
    {
        id: 4,
        name: "Maria Rodriguez",
        email: "maria@beautywellness.com",
        avatar: "/images/avator.png",
        permission: "Add Folder",
    },
];

function PermissionDropdown({
    value,
    onChange,
}: {
    value: Permission;
    onChange: (p: Permission) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="font-manrope flex items-center gap-2 rounded-sm border border-[#E0E6EB] bg-white px-4 py-2.5 text-sm font-medium text-[#98A4AE] justify-between"
            >
                <span>{value}</span>
                <ChevronDown
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-1.5 w-44 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
                    {PERMISSION_OPTIONS.map((option) => (
                        <button
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="font-manrope flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                        >
                            <span>{option}</span>
                            {value === option && <Check size={14} className="text-indigo-500" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function MemberRow({
    member,
    onPermissionChange,
}: {
    member: Member;
    onPermissionChange: (id: number, permission: Permission) => void;
}) {
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                <div className="relative shrink-0 overflow-hidden rounded-xl">
                    <Image
                        src={member.avatar}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-manrope text-sm font-semibold text-gray-800">{member.name}</span>
                    <span className="font-manrope text-xs text-gray-400">{member.email}</span>
                </div>
            </div>
            <PermissionDropdown
                value={member.permission}
                onChange={(p) => onPermissionChange(member.id, p)}
            />
        </div>
    );
}

interface ManagePermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (members: Member[]) => void;
}

export default function ManagePermissionsModal({
    isOpen,
    onClose,
}: ManagePermissionsModalProps) {
    const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
    const [search, setSearch] = useState("");
    const [saved, setSaved] = useState(false);
    console.log(saved)
    if (!isOpen) return null;

    const handlePermissionChange = (id: number, permission: Permission) => {
        setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, permission } : m)));
        setSaved(false);
    };

    return (
        <div
            className="font-manrope fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="relative w-full max-w-[746px] rounded-3xl bg-white shadow-2xl shadow-indigo-200/40 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5">
                    <h2 className="font-manrope text-lg font-bold text-[#29343D] tracking-tight">
                        Manage Permissions
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-[#29343D]"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* <div className="h-px bg-gray-100 mx-7" /> */}

                {/* Body */}
                <div className="px-7 pt-5 pb-7">
                    {/* Search */}
                    <div className="mb-5">
                        <label className="font-manrope mb-2 block text-sm font-semibold text-gray-700">
                            Add Member <span className="text-indigo-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search a member"
                                className="font-manrope w-full rounded-sm border border-[#E0E6EB] bg-white py-3 px-4 pr-11 text-sm text-gray-800 placeholder-gray-400 transition-all focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                            />
                            <Search
                                size={17}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                        </div>
                    </div>

                    {/* People with Access */}
                    <div>
                        <p className="font-manrope mb-1 text-sm font-semibold text-[#29343D]">
                            People with Access
                        </p>
                        <div className="divide-y divide-gray-100">
                            {members.map((member) => (
                                <MemberRow
                                    key={member.id}
                                    member={member}
                                    onPermissionChange={handlePermissionChange}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                        <button className="font-manrope rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-[#635BFF] cursor-pointer">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}