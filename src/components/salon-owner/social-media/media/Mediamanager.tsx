"use client";

import { useState } from "react";
import { MediaCard } from "./MediaCard";
import { SearchIcon, UploadIcon, X, ChevronRight, Zap, Users, Calendar } from "lucide-react";

type UsageFilter = "All Media" | "Used" | "Unused";

interface MediaItem {
    id: string;
    fileName: string;
    type: "photo" | "video";
    uploadedBy: string;
    uploadedAt: string;
    published: boolean;
    src: string;
}

const MOCK_MEDIA: MediaItem[] = [
    {
        id: "1",
        fileName: "FileName.jpeg",
        type: "photo",
        uploadedBy: "Maria Rodriguez",
        uploadedAt: "08/08/2025 5:06 PM",
        published: true,
        src: "/images/thumbline.jpg",
    },
    {
        id: "2",
        fileName: "FileName.jpeg",
        type: "video",
        uploadedBy: "John Smith",
        uploadedAt: "08/08/2025 5:06 PM",
        published: false,
        src: "/images/bannerProfile.jpg",
    },
];

const Checkbox = ({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: () => void;
}) => (
    <div
        onClick={(e) => { e.stopPropagation(); onChange(); }}
        className={`flex items-center justify-center min-w-[18px] w-[18px] h-[18px] rounded-[5px] transition-all duration-150 cursor-pointer
      ${checked
                ? "bg-[#635BFF] border-0"
                : "bg-white border-[1.5px] border-gray-300"
            }`}
    >
        {checked && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <polyline
                    points="1.5,6 4.5,9 10.5,3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
    </div>
);

export default function MediaManager() {
    // Existing States
    const [mediaType, setMediaType] = useState<string>("All Type");
    const [usageFilter, setUsageFilter] = useState<UsageFilter>("All Media");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [media, setMedia] = useState<MediaItem[]>(MOCK_MEDIA);

    // Modal & Wizard States
    const [activeModal, setActiveModal] = useState<"clients" | "services" | "date" | "upload" | null>(null);
    const [uploadStep, setUploadStep] = useState(1);

    // --- NEW SELECTION STATES ---
    const [selectedClients, setSelectedClients] = useState<string[]>(["Maria Rodriguez", "John Smith"]);
    const [selectedServices, setSelectedServices] = useState<string[]>(["Hair Treatment", "Facial Care"]);

    // Handlers for selection
    const toggleClient = (client: string) => {
        setSelectedClients(prev =>
            prev.includes(client) ? prev.filter(c => c !== client) : [...prev, client]
        );
    };

    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
        );
    };

    const clearFilters = () => {
        setSelectedClients([]);
        setSelectedServices([]);
        setSearch("");
    };

    // Updated Filtering Logic to include Clients
    const filtered = media.filter((m) => {
        const matchType =
            mediaType === "All Type" ||
            (mediaType === "Photo" && m.type === "photo") ||
            (mediaType === "Video" && m.type === "video");
        const matchUsage =
            usageFilter === "All Media" ||
            (usageFilter === "Used" && m.published) ||
            (usageFilter === "Unused" && !m.published);
        const matchSearch = m.fileName.toLowerCase().includes(search.toLowerCase());

        // Filter by selected clients if any are selected
        const matchClient = selectedClients.length === 0 || selectedClients.includes(m.uploadedBy);

        return matchType && matchUsage && matchSearch && matchClient;
    });

    const allSelected =
        filtered.length > 0 && filtered.every((m) => selected.includes(m.id));

    // Handlers (Unchanged logic)
    const toggleSelect = (id: string) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelected((prev) =>
                prev.filter((id) => !filtered.find((m) => m.id === id))
            );
        } else {
            const newIds = filtered.map((m) => m.id);
            setSelected((prev) => Array.from(new Set([...prev, ...newIds])));
        }
    };

    const handleDelete = (id: string) => {
        setMedia((prev) => prev.filter((m) => m.id !== id));
        setSelected((prev) => prev.filter((i) => i !== id));
    };

    const handleMassDeletion = () => {
        setMedia((prev) => prev.filter((m) => !selected.includes(m.id)));
        setSelected([]);
    };

    return (
        <div className="min-h-screen bg-[#F4F6FA] font-manrope">
            <div className="space-y-4 p-6">

                {/* ── Filter Bar ── */}
                <div className="bg-white rounded-xl">
                    <h4 className="px-6 pt-6 pb-3 text-lg font-bold text-[#29343D] font-manrope">
                        Media Library
                    </h4>

                    <div className="px-6 pb-4">
                        <div className="flex items-center gap-2 rounded-lg w-full p-3 border border-[#E0E6EB] bg-white">
                            <SearchIcon size={18} className="text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, ID, files, service, date, or description..."
                                className="outline-none bg-transparent w-full text-sm font-normal text-[#29343D]"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-6 pb-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => setActiveModal("clients")}
                                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white"
                            >
                                <Users size={16} className="text-gray-400" /> {selectedClients.length} Clients
                            </button>
                            <button
                                onClick={() => setActiveModal("services")}
                                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white"
                            >
                                <Zap size={16} className="text-gray-400" /> {selectedServices.length} Services
                            </button>
                            <button
                                onClick={() => setActiveModal("date")}
                                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white"
                            >
                                <Calendar size={16} className="text-[#635BFF]" /> Select Date Range
                            </button>
                            <button
                                onClick={clearFilters}
                                className="text-[#FF6692] text-sm font-bold ml-4"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Upload Button */}
                <button
                    onClick={() => { setUploadStep(1); setActiveModal("upload"); }}
                    className="flex flex-col items-start gap-4 justify-center rounded-lg w-[180px] p-[20px] bg-[#635BFF] cursor-pointer mb-6 mt-6 shadow-lg shadow-indigo-100"
                >
                    <UploadIcon color="white" />
                    <span className="text-start text-white font-manrope font-bold text-lg">
                        Add Media
                    </span>
                </button>

                {/* Media Grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div
                            onClick={toggleSelectAll}
                            className="flex items-center gap-2 font-manrope font-semibold text-[13.5px] text-[#635BFF] hover:opacity-75 transition-opacity cursor-pointer"
                        >
                            <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                            {allSelected ? "Unselect All Items" : "Select All Items"}
                            {!allSelected && selected.length > 0 && (
                                <span className="ml-1 text-[11px] font-medium font-manrope px-2 py-0.5 rounded-full bg-[#EBFAF0] text-[#36C76C]">
                                    {selected.length} selected
                                </span>
                            )}
                        </div>

                        {selected.length > 0 && (
                            <div className="flex items-center gap-6">
                                <button onClick={handleMassDeletion} className="font-manrope font-medium cursor-pointer text-[14px] px-4 py-2.5 rounded-lg bg-[#FFE5ED] text-[#FF6692]">
                                    Mass Deletion
                                </button>
                                <button className="font-manrope font-medium cursor-pointer text-[14px] px-4 py-2.5 rounded-lg bg-[#16CDC7] text-white">
                                    Use Media ({selected.length})
                                </button>
                            </div>
                        )}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                            <span className="text-sm font-manrope">No media found</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-[30px]">
                            {filtered.map((item) => (
                                <MediaCard
                                    key={item.id}
                                    item={item}
                                    selected={selected.includes(item.id)}
                                    onSelect={toggleSelect}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── MODALS ── */}

            {/* Select Client Modal */}
            {activeModal === "clients" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                        <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
                        <h3 className="text-xl font-bold text-[#0A2540] mb-6">Select Client</h3>
                        <div className="relative mb-4">
                            <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
                            <input type="text" placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-3 border border-[#E0E6EB] rounded-xl outline-none" />
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                            {["Maria Rodriguez", "John Smith", "Sarah Johnson", "Emma Davis"].map((name, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleClient(name)}
                                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${selectedClients.includes(name) ? 'border-[#635BFF] bg-indigo-50/30' : 'border-[#E0E6EB] hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div>
                                            <p className="text-sm font-bold text-[#0A2540]">{name}</p>
                                            <p className="text-xs text-gray-400">email@example.com</p>
                                        </div>
                                    </div>
                                    <Checkbox checked={selectedClients.includes(name)} onChange={() => toggleClient(name)} />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setActiveModal(null)} className="w-full mt-6 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg">Done</button>
                    </div>
                </div>
            )}

            {/* Select Services Modal */}
            {activeModal === "services" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                        <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
                        <h3 className="text-xl font-bold text-[#0A2540] mb-6">Select Services</h3>
                        <div className="relative mb-4">
                            <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
                            <input type="text" placeholder="Search services..." className="w-full pl-10 pr-4 py-3 border border-[#E0E6EB] rounded-xl outline-none" />
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                            {["Hair Treatment", "Facial Care", "Massage Therapy", "Nail Art"].map((name, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleService(name)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedServices.includes(name) ? 'border-[#635BFF] bg-indigo-50/30' : 'border-[#E0E6EB] hover:bg-gray-50'}`}
                                >
                                    <Checkbox checked={selectedServices.includes(name)} onChange={() => toggleService(name)} />
                                    <div>
                                        <p className="text-sm font-bold text-[#0A2540]">{name}</p>
                                        <p className="text-xs text-gray-400">Beauty</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-indigo-50 text-[#635BFF] font-bold text-sm text-center rounded-xl">{selectedServices.length} services selected</div>
                        <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg">Done</button>
                    </div>
                </div>
            )}

            {/* Date Range Modal (Keep existing) */}
            {activeModal === "date" && (
                <div className="absolute top-[280px] left-[650px] z-[60] bg-white rounded-2xl p-6 shadow-2xl border border-[#E8EEFF] w-[350px]">
                    <div className="flex gap-4 mb-6">
                        <div>
                            <label className="text-xs font-bold text-[#0A2540] block mb-2">From Date</label>
                            <input type="date" className="w-full p-2 border border-[#E0E6EB] rounded-xl outline-none text-xs" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-[#0A2540] block mb-2">To Date</label>
                            <input type="date" className="w-full p-2 border border-[#E0E6EB] rounded-xl outline-none text-xs" />
                        </div>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="w-full py-3 bg-[#635BFF] text-white font-bold rounded-xl">Done</button>
                </div>
            )}

            {/* Upload Wizard (Keep existing) */}
            {activeModal === "upload" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative">
                        <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
                        <h3 className="text-2xl font-bold text-[#0A2540] mb-8">Add Media Upload</h3>

                        <div className="flex items-center justify-center mb-10">
                            <div className="flex items-center w-full max-w-xs relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 1 ? 'bg-[#635BFF] text-white shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-400'}`}>1</div>
                                <div className={`flex-1 h-1 transition-all ${uploadStep >= 2 ? 'bg-[#635BFF]' : 'bg-gray-100'}`} />
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 2 ? 'bg-[#635BFF] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>2</div>
                                <div className={`flex-1 h-1 transition-all ${uploadStep >= 3 ? 'bg-[#635BFF]' : 'bg-gray-100'}`} />
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 3 ? 'bg-[#635BFF] text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>3</div>
                            </div>
                        </div>

                        <div className="min-h-[300px]">
                            {uploadStep === 1 && (
                                <div className="space-y-4">
                                    <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest text-center mb-6">Step 1: Select Client</p>
                                    <div className="relative mb-6">
                                        <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
                                        <input type="text" placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-4 border border-[#E0E6EB] rounded-xl outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        {["Maria Rodriguez", "John Smith"].map((name, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 border border-[#E0E6EB] rounded-xl hover:bg-gray-50 cursor-pointer">
                                                <div className="w-12 h-12 rounded-full bg-gray-200" />
                                                <div>
                                                    <p className="font-bold text-[#0A2540]">{name}</p>
                                                    <p className="text-xs text-gray-400">maria@beauty.com</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {uploadStep === 2 && (
                                <div className="space-y-6">
                                    <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest text-center">Step 2: Services & Details</p>
                                    <div>
                                        <label className="text-sm font-bold text-[#0A2540] block mb-2">Services Provided</label>
                                        <select className="w-full p-4 border border-[#E0E6EB] rounded-xl outline-none bg-white text-gray-400">
                                            <option>Select services...</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-[#0A2540] block mb-2">Additional Information *</label>
                                        <textarea className="w-full p-4 border border-[#E0E6EB] rounded-xl h-32 outline-none" placeholder="Add required notes about this media set..." />
                                    </div>
                                </div>
                            )}

                            {uploadStep === 3 && (
                                <div className="space-y-6 text-center">
                                    <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest">Step 3: Upload Media</p>
                                    <div className="border-2 border-dashed border-indigo-100 rounded-3xl p-12 bg-indigo-50/20">
                                        <UploadIcon className="mx-auto text-[#635BFF] mb-4" size={40} />
                                        <h4 className="text-lg font-bold text-[#0A2540] mb-2">Drop your magic here ✨</h4>
                                        <p className="text-sm text-gray-400 mb-8">Drag and drop images or videos</p>
                                        <button className="px-8 py-4 bg-[#635BFF] text-white font-bold rounded-2xl shadow-lg">Choose Files</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mt-10">
                            {uploadStep > 1 && (
                                <button onClick={() => setUploadStep(prev => prev - 1)} className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-[#0A2540]">Back</button>
                            )}
                            <button
                                onClick={() => uploadStep === 3 ? setActiveModal(null) : setUploadStep(prev => prev + 1)}
                                className="flex-[2] py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                            >
                                {uploadStep === 3 ? "Complete" : "Next"}
                                {uploadStep < 3 && <ChevronRight size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}