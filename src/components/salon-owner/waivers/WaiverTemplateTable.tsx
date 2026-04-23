"use client";
import React, { useState, useRef, useEffect } from "react";
import {
    MoreVertical,
    Eye,
    Pencil,
    CheckCircle2,
    Store,
    Users,
    Download,
    Trash2,
    Clock,
} from "lucide-react";
import PaginationClient from "../clients/PaginationClient";
import IFile from "../clients/view-details/IFile";
import Link from "next/link";

interface WaiverTemplate {
    id: string;
    name: string;
    signers: number;
    signedCount: number;
    lastUpdate: string;
}

const MOCK_DATA: WaiverTemplate[] = Array.from({ length: 25 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Waiver ${i + 1}`,
    signers: 2,
    signedCount: 30,
    lastUpdate: "1h ago",
}));

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function WaiverTemplateTable() {
    const [activeTab, setActiveTab] = useState("templates");
    const [data] = useState<WaiverTemplate[]>(MOCK_DATA);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [dropdownPos, setDropdownPos] = useState<{ top?: number; bottom?: number; right: number } | null>(null);
    const ippRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [ippOpen, setIppOpen] = useState(false);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(start, start + itemsPerPage);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ippRef.current && !ippRef.current.contains(event.target as Node)) {
                setIppOpen(false);
            }
            if (openDropdownId && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
                setDropdownPos(null);
            }
        };

        const handleScroll = () => {
            setOpenDropdownId(null);
            setDropdownPos(null);
        };

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll, true);
        };
    }, [openDropdownId]);

    const handleToggleDropdown = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        if (openDropdownId === id) {
            setOpenDropdownId(null);
            setDropdownPos(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            const DROPDOWN_HEIGHT = 292;
            const spaceBelow = window.innerHeight - rect.bottom;
            const pos =
                spaceBelow < DROPDOWN_HEIGHT
                    ? { bottom: window.innerHeight - rect.top + 8, right: window.innerWidth - rect.right }
                    : { top: rect.bottom + 8, right: window.innerWidth - rect.right };
            setDropdownPos(pos);
            setOpenDropdownId(id);
        }
    };

    return (
        <div className="font-manrope p-[15px] md:p-[30px] bg-white min-h-screen rounded-2xl">
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("templates")}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === "templates"
                        ? "bg-white text-[#635BFF] border border-[#635BFF]"
                        : "bg-white text-[#526B7A] border border-[#E0E6EB]"
                        }`}
                >
                    Waiver Templates
                </button>
                <button
                    onClick={() => setActiveTab("signed")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === "signed"
                        ? "bg-white text-[#635BFF] border border-[#635BFF]"
                        : "bg-white text-[#526B7A] border border-[#E0E6EB]"
                        }`}
                >
                    Waiver Signed
                </button>
            </div>

            {/* Table Container Wrapper */}
            <div className="rounded-xl border border-[#E0E6EB] overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-[800px] w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F8F9FD] border-b border-[#E0E6EB]">
                                <th className="px-6 py-7 text-sm font-semibold text-[#29343D] border-r border-[#E0E6EB]">Name</th>
                                <th className="px-6 py-7 text-sm font-semibold text-[#29343D] border-r border-[#E0E6EB]">Signers</th>
                                <th className="px-6 py-7 text-sm font-semibold text-[#29343D] border-r border-[#E0E6EB]">Signed</th>
                                <th className="px-6 py-7 text-sm font-semibold text-[#29343D] border-r border-[#E0E6EB]">Last Update</th>
                                <th className="px-6 py-7 text-sm font-semibold text-[#29343D] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.id} className="border-b border-[#E0E6EB] hover:bg-[#FBFBFF] transition-colors">
                                    <td className="px-6 py-4 border-r border-[#E0E6EB]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#EFF4FA] rounded-xl flex items-center justify-center">
                                                <IFile className="text-[#635BFF]" size={18} />
                                            </div>
                                            <span className="font-semibold text-[#29343D] text-sm">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-r border-[#E0E6EB] text-sm text-[#526B7A]">{item.signers}</td>
                                    <td className="px-6 py-4 border-r border-[#E0E6EB] text-sm text-[#526B7A]">{item.signedCount} times</td>
                                    <td className="px-6 py-4 border-r border-[#E0E6EB]">
                                        <div className="flex items-center gap-2 text-sm text-[#526B7A]">
                                            <Clock size={16} className="text-[#29343D]" />
                                            {item.lastUpdate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => handleToggleDropdown(e, item.id)}
                                            className="p-2 hover:bg-[#F3F4F7] rounded-lg transition-colors cursor-pointer"
                                        >
                                            <MoreVertical size={20} className="text-[#29343D]" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PaginationClient
                    ippRef={ippRef}
                    setIppOpen={setIppOpen}
                    itemsPerPage={itemsPerPage}
                    ippOpen={ippOpen}
                    ITEMS_PER_PAGE_OPTIONS={ITEMS_PER_PAGE_OPTIONS}
                    setItemsPerPage={setItemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    start={start}
                    filtered={data}
                    border={false}
                />
            </div>

            {/* Dropdown UI */}
            {openDropdownId && dropdownPos && (
                <div
                    ref={dropdownRef} // Attach ref here
                    className="font-manrope fixed w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-[#E0E6EB] z-50 p-3.5"
                    style={{ top: dropdownPos.top, bottom: dropdownPos.bottom, right: dropdownPos.right }}
                >
                    <DropdownItem icon={<Eye size={16} />} label="View" iconColor="#635BFF" href={`/salon-owner/waivers/view-waiver/${openDropdownId}`} />
                    <DropdownItem icon={<Pencil size={16} />} label="Edit" iconColor="#A78BFA" />
                    <DropdownItem icon={<CheckCircle2 size={16} />} label="Sign Now/Send To" iconColor="#10B981" />
                    <DropdownItem icon={<Store size={16} />} label="Assign to Client's Profiles" iconColor="#10B981" />
                    <DropdownItem icon={<Users size={16} />} label="Assign to Employees" iconColor="#10B981" />
                    <DropdownItem icon={<Download size={16} />} label="Download" iconColor="#29343D" />
                    <DropdownItem icon={<Trash2 size={16} />} label="Delete" variant="danger" iconColor="#FF4D4F" />
                </div>
            )}
        </div>
    );
}

function DropdownItem({
    icon,
    label,
    iconColor,
    variant = "default",
    href,
}: {
    icon: React.ReactNode;
    label: string;
    iconColor?: string;
    variant?: "default" | "danger";
    href?: string;
}) {
    const className = `cursor-pointer w-full text-start flex items-center gap-3 text-sm transition-colors ${variant === "danger" ? "text-[#FF4D4F]" : "text-[#526B7A] mb-3"
        }`;

    const innerContent = (
        <>
            <span style={{ color: iconColor ?? (variant === "danger" ? "#FF4D4F" : "#635BFF") }}>
                {icon}
            </span>
            {label}
        </>
    );
    if (href) {
        return (
            <Link href={href} className={className}>
                {innerContent}
            </Link>
        );
    }

    return (
        <button className={className}>
            {innerContent}
        </button>
    );
}