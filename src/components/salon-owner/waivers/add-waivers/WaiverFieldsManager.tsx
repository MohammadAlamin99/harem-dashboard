"use client";
import { useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    ChevronDown,
    Type,
    Hash,
    Calendar,
    Mail,
    Phone,
    MapPin,
    AlignLeft,
    Users, // Added for Signers empty state
} from "lucide-react";
import Toggle from "../../appointment/Toggle";

const FIELD_TYPES = [
    { label: "Text", icon: <Type size={16} /> },
    { label: "Number", icon: <Hash size={16} /> },
    { label: "Date", icon: <Calendar size={16} /> },
    { label: "Email", icon: <Mail size={16} /> },
    { label: "Telephone", icon: <Phone size={16} /> },
    { label: "Address", icon: <MapPin size={16} /> },
    { label: "Text Area", icon: <AlignLeft size={16} /> },
];

export default function WaiverFieldsManager() {
    const [activeTab, setActiveTab] = useState("Signers"); // Set to Signers to see the new UI
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSignerDropdownOpen, setIsSignerDropdownOpen] = useState(false); // State for Add Signer dropdown
    const [selectedType, setSelectedType] = useState("Text");
    const [isRequired, setIsRequired] = useState(true);

    const tabs = [
        "Required Fields For Signer",
        "Signers",
        "Contract Attachments",
        "Attachment Requirement",
    ];

    return (
        <div className="font-manrope mt-6 relative">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E0E6EB]">

                {/* 1. Tabs Navigation */}
                <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                    <div className="flex gap-4 md:gap-8 border-b border-[#E0E6EB] mb-8 w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-semibold transition-all relative whitespace-nowrap cursor-pointer ${activeTab === tab ? "text-[#635BFF]" : "text-[#526B7A]"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#635BFF]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- TAB CONTENT: Required Fields For Signer --- */}
                {activeTab === "Required Fields For Signer" && (
                    <>
                        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                            <h2 className="text-[#29343D] text-md md:text-lg font-semibold">Required Fields For Signer</h2>
                            <button className="flex items-center gap-2 bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg cursor-pointer text-sm font-semibold">
                                <Plus size={18} /> Add Field
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="border border-[#E0E6EB] rounded-xl p-6 relative group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-[#F3F4F7] rounded-xl flex items-center justify-center text-[#526B7A]">
                                                <Type size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#29343D]">Client Name</h4>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-[10px] bg-[#F3F4F7] text-[#526B7A] px-2 py-0.5 rounded font-bold">Text</span>
                                                    <span className="text-[10px] bg-[#FFF1F2] text-[#FF4D4F] px-2 py-0.5 rounded font-bold">Required</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-[#EEF2FF] text-[#635BFF] rounded-lg hover:bg-[#635BFF] hover:text-white transition-all cursor-pointer"><Pencil size={16} /></button>
                                            <button className="p-2 bg-[#FFF1F2] text-[#FF4D4F] rounded-lg hover:bg-[#FF4D4F] hover:text-white transition-all cursor-pointer"><Trash2 size={16} /></button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div>
                                            <p className="text-[11px] text-[#A3B1BB] font-bold uppercase">Field Name</p>
                                            <p className="text-sm text-[#29343D] font-medium mt-1">client_name</p>
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-[#A3B1BB] font-bold uppercase">Placeholder</p>
                                            <p className="text-sm text-[#29343D] font-medium mt-1">Enter client name</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-[11px] text-[#A3B1BB] font-bold uppercase">Description</p>
                                            <p className="text-sm text-[#29343D] font-medium mt-1">Client complete name</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="border border-[#E0E6EB] rounded-2xl p-6 bg-white">
                                <h3 className="font-bold text-[#29343D] mb-6">Add New Field</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#29343D] mb-2">Field Name *</label>
                                        <input type="text" placeholder="Enter field name" className="w-full px-4 py-3 rounded-sm border border-[#E0E6EB] focus:outline-none focus:border-[#635BFF] text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#29343D] mb-2">Label *</label>
                                        <input type="text" placeholder="Enter label" className="w-full px-4 py-3 rounded-sm border border-[#E0E6EB] focus:outline-none focus:border-[#635BFF] text-sm" />
                                    </div>
                                    <div className="relative">
                                        <label className="block text-xs font-bold text-[#29343D] mb-2">Field Type *</label>
                                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full flex items-center justify-between px-4 py-3 rounded-sm border border-[#E0E6EB] bg-white text-sm text-[#526B7A] cursor-pointer">
                                            {selectedType}
                                            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#E0E6EB] rounded-xl shadow-xl z-10 py-2">
                                                {FIELD_TYPES.map((type) => (
                                                    <button key={type.label} onClick={() => { setSelectedType(type.label); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#526B7A] hover:bg-[#F8F9FD] transition-colors cursor-pointer">
                                                        {type.icon} {type.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#29343D] mb-2">Placeholder *</label>
                                        <input type="text" placeholder="Enter placeholder" className="w-full px-4 py-3 rounded-sm border border-[#E0E6EB] focus:outline-none focus:border-[#635BFF] text-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-8">
                                    <Toggle checked={isRequired} onChange={() => setIsRequired(!isRequired)} />
                                    <span className="text-sm font-semibold text-[#526B7A]">Required Field</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-6 py-2.5 rounded-xl bg-[#F6F7F9] text-[#0A2540] text-sm font-medium cursor-pointer">Cancel</button>
                                    <button className="px-6 py-2.5 rounded-xl bg-[#ECFDFD] text-[#16CDC7] text-sm font-medium cursor-pointer">Save Field</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* --- TAB CONTENT: Signers --- */}
                {activeTab === "Signers" && (
                    <>
                        <h2 className="text-[#29343D] text-md md:text-lg font-semibold mb-6">Signers</h2>

                        <div className="border border-[#E0E6EB] rounded-xl min-h-[400px] flex flex-col items-center justify-center p-8">
                            <div className="mb-4 text-[#526B7A]">
                                <Users size={60} strokeWidth={1.5} />
                            </div>
                            <p className="text-[#29343D] font-semibold text-sm mb-6">No signers</p>

                            <div className="relative">
                                <button
                                    onClick={() => setIsSignerDropdownOpen(!isSignerDropdownOpen)}
                                    className="flex items-center gap-2 bg-[#DDDBFF] text-[#635BFF] px-5 py-2.5 rounded-lg cursor-pointer text-sm font-semibold transition-all hover:bg-[#D1CFFF]"
                                >
                                    Add Signer <ChevronDown size={16} className={`transition-transform ${isSignerDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isSignerDropdownOpen && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-[#E0E6EB] rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-20 py-2">
                                        <button className="w-full text-left px-5 py-2.5 text-sm text-[#526B7A] hover:bg-[#F8F9FD] transition-colors cursor-pointer">
                                            Pre-signed
                                        </button>
                                        <button className="w-full text-left px-5 py-2.5 text-sm text-[#526B7A] hover:bg-[#F8F9FD] transition-colors cursor-pointer">
                                            Recipient
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}