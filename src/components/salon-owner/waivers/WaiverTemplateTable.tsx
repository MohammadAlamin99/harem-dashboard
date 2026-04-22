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
    FileText,
    Clock,
} from "lucide-react";
import PaginationClient from "../clients/PaginationClient";

// Types for our data
interface WaiverTemplate {
    id: string;
    name: string;
    signers: number;
    signedCount: number;
    lastUpdate: string;
}

const MOCK_DATA: WaiverTemplate[] = Array.from({ length: 25 }, (_, i) => ({
    id: `waiver-${i + 1}`,
    name: `Waiver ${i + 1}`,
    signers: 2,
    signedCount: 30,
    lastUpdate: "1h ago",
}));

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function WaiverTemplateTable() {
    // Tabs State
    const [activeTab, setActiveTab] = useState("templates");

    // Table State
    const [data] = useState<WaiverTemplate[]>(MOCK_DATA);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    // Pagination Refs & States
    const ippRef = useRef<HTMLDivElement>(null);
    const [ippOpen, setIppOpen] = useState(false);

    // Calculation for pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(start, start + itemsPerPage);

    // Close dropdowns/popovers on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ippRef.current && !ippRef.current.contains(event.target as Node)) {
                setIppOpen(false);
            }
            if (openDropdownId) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdownId]);

    return (
        <div className="p-[15px] md:p-[30px] bg-white min-h-screen rounded-2xl">
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab("templates")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "templates"
                        ? "bg-[#635BFF] text-white"
                        : "bg-white text-[#526B7A] border border-[#E0E6EB]"
                        }`}
                >
                    Waiver Templates
                </button>
                <button
                    onClick={() => setActiveTab("signed")}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "signed"
                        ? "bg-[#635BFF] text-white"
                        : "bg-white text-[#526B7A] border border-[#E0E6EB]"
                        }`}
                >
                    Waiver Signed
                </button>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-xl border border-[#E0E6EB] overflow-visible">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#F8F9FD] border-b border-[#E0E6EB]">
                            <th className="px-6 py-4 text-sm font-semibold text-[#29343D]">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-[#29343D]">Signers</th>
                            <th className="px-6 py-4 text-sm font-semibold text-[#29343D]">Signed</th>
                            <th className="px-6 py-4 text-sm font-semibold text-[#29343D]">Last Update</th>
                            <th className="px-6 py-4 text-sm font-semibold text-[#29343D] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="border-b border-[#E0E6EB] hover:bg-[#FBFBFF] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#EEF2FF] rounded-lg flex items-center justify-center">
                                            <FileText className="text-[#635BFF]" size={20} />
                                        </div>
                                        <span className="font-semibold text-[#29343D] text-sm">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#526B7A]">{item.signers}</td>
                                <td className="px-6 py-4 text-sm text-[#526B7A]">{item.signedCount} times</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-[#526B7A]">
                                        <Clock size={16} className="text-[#98A4AE]" />
                                        {item.lastUpdate}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDropdownId(openDropdownId === item.id ? null : item.id);
                                        }}
                                        className="p-2 hover:bg-[#F3F4F7] rounded-lg transition-colors cursor-pointer"
                                    >
                                        <MoreVertical size={20} className="text-[#29343D]" />
                                    </button>

                                    {/* Actions Dropdown */}
                                    {openDropdownId === item.id && (
                                        <div className="absolute right-6 top-14 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-[#E0E6EB] z-50 py-2">
                                            <DropdownItem icon={<Eye size={16} />} label="View" />
                                            <DropdownItem icon={<Pencil size={16} />} label="Edit" />
                                            <DropdownItem icon={<CheckCircle2 size={16} />} label="Sign Now/Send To" />
                                            <DropdownItem icon={<Store size={16} />} label="Assign to Client's Profiles" />
                                            <DropdownItem icon={<Users size={16} />} label="Assign to Employees" />
                                            <DropdownItem icon={<Download size={16} />} label="Download" />
                                            <div className="border-t border-[#E0E6EB] my-1" />
                                            <DropdownItem icon={<Trash2 size={16} />} label="Delete" variant="danger" />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Reusable Pagination Component */}
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
        </div>
    );
}

// Sub-component for Dropdown Items
function DropdownItem({
    icon,
    label,
    variant = "default"
}: {
    icon: React.ReactNode;
    label: string;
    variant?: "default" | "danger"
}) {
    return (
        <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[#F4F6FA] ${variant === "danger" ? "text-[#FF4D4F]" : "text-[#526B7A]"
            }`}>
            <span className={variant === "danger" ? "text-[#FF4D4F]" : "text-[#635BFF]"}>
                {icon}
            </span>
            {label}
        </button>
    );
}