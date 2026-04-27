"use client";

import { useState, useRef, useEffect } from "react";
import { MediaCard } from "./MediaCard";
import { SearchIcon, UploadIcon, X, ChevronRight, ChevronLeft, Zap, Users, Calendar } from "lucide-react";

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

const ALL_CLIENTS = [
    { name: "Maria Rodriguez", email: "maria@beauty.com" },
    { name: "John Smith", email: "john@beauty.com" },
    { name: "Sarah Johnson", email: "sarah@beauty.com" },
    { name: "Emma Davis", email: "emma@beauty.com" },
];

const ALL_SERVICES = [
    "Hair Treatment",
    "Facial Care",
    "Massage Therapy",
    "Nail Art",
    "Eyebrow Shaping",
    "Waxing",
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ── Calendar Date Range Picker ────────────────────────────────────────
interface CalendarPickerProps {
    fromDate: string;
    toDate: string;
    onFromChange: (v: string) => void;
    onToChange: (v: string) => void;
    onDone: () => void;
    onClear: () => void;
}

function CalendarPicker({ fromDate, toDate, onFromChange, onToChange, onDone, onClear }: CalendarPickerProps) {
    const today = new Date();
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [hovered, setHovered] = useState<string | null>(null);

    const toYMD = (d: Date) => d.toISOString().split("T")[0];

    const prevMonth = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const handleDayClick = (ymd: string) => {
        if (!fromDate || (fromDate && toDate)) {
            onFromChange(ymd);
            onToChange("");
        } else {
            if (ymd < fromDate) {
                onToChange(fromDate);
                onFromChange(ymd);
            } else {
                onToChange(ymd);
            }
        }
    };

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (string | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) =>
            toYMD(new Date(viewYear, viewMonth, i + 1))
        ),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const activeEnd = toDate || hovered || null;

    const isRangeEdge = (ymd: string) => {
        if (!fromDate || !activeEnd) return false;
        const lo = fromDate <= activeEnd ? fromDate : activeEnd;
        const hi = fromDate <= activeEnd ? activeEnd : fromDate;
        return ymd === lo || ymd === hi;
    };
    const isInRange = (ymd: string) => {
        if (!fromDate || !activeEnd) return false;
        const lo = fromDate <= activeEnd ? fromDate : activeEnd;
        const hi = fromDate <= activeEnd ? activeEnd : fromDate;
        return ymd > lo && ymd < hi;
    };
    const isLoEdge = (ymd: string) => {
        if (!fromDate || !activeEnd) return false;
        return ymd === (fromDate <= activeEnd ? fromDate : activeEnd);
    };
    const isHiEdge = (ymd: string) => {
        if (!fromDate || !activeEnd) return false;
        return ymd === (fromDate <= activeEnd ? activeEnd : fromDate);
    };

    const fmt = (ymd: string) => {
        if (!ymd) return "—";
        const [y, m, d] = ymd.split("-");
        return `${MONTHS[parseInt(m) - 1].slice(0, 3)} ${parseInt(d)}, ${y}`;
    };

    return (
        // FIX 1: Changed left-0 → right-0 so the calendar never overflows off the right edge
        <div
            className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-[#E0E6EB]"
            style={{ width: 320 }}
        >
            {/* Month navigation */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <button
                    onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={15} className="text-[#29343D]" />
                </button>
                <span className="text-sm font-bold text-[#0A2540]">
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                    onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <ChevronRight size={15} className="text-[#29343D]" />
                </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 px-4 pb-1">
                {DAY_LABELS.map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
                ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 px-4 pb-3">
                {cells.map((ymd, idx) => {
                    if (!ymd) return <div key={`empty-${idx}`} style={{ height: 36 }} />;

                    const edge = isRangeEdge(ymd);
                    const inRange = isInRange(ymd);
                    const loEdge = isLoEdge(ymd);
                    const hiEdge = isHiEdge(ymd);
                    const singleSelected = fromDate === ymd && !activeEnd;

                    return (
                        <div
                            key={ymd}
                            onClick={() => handleDayClick(ymd)}
                            onMouseEnter={() => { if (fromDate && !toDate) setHovered(ymd); }}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex items-center justify-center cursor-pointer"
                            style={{ height: 36 }}
                        >
                            {inRange && <div className="absolute inset-0 bg-[#635BFF]/10" />}
                            {loEdge && activeEnd && fromDate !== activeEnd && (
                                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#635BFF]/10" />
                            )}
                            {hiEdge && activeEnd && fromDate !== activeEnd && (
                                <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#635BFF]/10" />
                            )}
                            <div
                                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-[13px] font-semibold transition-all select-none
                                    ${edge || singleSelected
                                        ? "bg-[#635BFF] text-white"
                                        : inRange
                                            ? "text-[#635BFF]"
                                            : "text-[#29343D] hover:bg-gray-100"
                                    }`}
                            >
                                {parseInt(ymd.split("-")[2])}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selected range summary */}
            {(fromDate || toDate) && (
                <div className="mx-4 mb-3 flex items-center gap-2 px-3 py-2.5 bg-[#F4F4FF] rounded-xl">
                    <div className="flex-1 text-center">
                        <p className="text-[9px] font-bold text-[#635BFF] uppercase tracking-wider mb-0.5">From</p>
                        <p className="text-[11px] font-semibold text-[#0A2540]">{fmt(fromDate)}</p>
                    </div>
                    <ChevronRight size={12} className="text-[#635BFF] shrink-0" />
                    <div className="flex-1 text-center">
                        <p className="text-[9px] font-bold text-[#635BFF] uppercase tracking-wider mb-0.5">To</p>
                        <p className="text-[11px] font-semibold text-[#0A2540]">{fmt(toDate)}</p>
                    </div>
                </div>
            )}

            {/* FIX 2: Replaced flex-[2] with w-full split using explicit widths */}
            <div className="flex gap-2 px-4 pb-4">
                <button
                    onClick={onClear}
                    style={{ width: "35%" }}
                    className="py-2.5 text-sm font-bold text-[#FF6692] border border-[#FFD0DD] rounded-xl hover:bg-[#FFF0F4] transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={onDone}
                    style={{ width: "65%" }}
                    className="py-2.5 text-sm font-bold text-white bg-[#635BFF] rounded-xl hover:opacity-90 transition-opacity"
                >
                    Done
                </button>
            </div>
        </div>
    );
}

// ── Checkbox ──────────────────────────────────────────────────────────
const Checkbox = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div
        onClick={(e) => { e.stopPropagation(); onChange(); }}
        className={`flex items-center justify-center min-w-[18px] w-[18px] h-[18px] rounded-[5px] transition-all duration-150 cursor-pointer
            ${checked ? "bg-[#635BFF] border-0" : "bg-white border-[1.5px] border-gray-300"}`}
    >
        {checked && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <polyline points="1.5,6 4.5,9 10.5,3" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )}
    </div>
);

// ── Main Component ────────────────────────────────────────────────────
export default function MediaManager() {
    const [mediaType] = useState<string>("All Type");
    const [usageFilter] = useState<UsageFilter>("All Media");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [media, setMedia] = useState<MediaItem[]>(MOCK_MEDIA);

    // Date range
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    // Modals
    const [activeModal, setActiveModal] = useState<"clients" | "services" | "upload" | null>(null);
    const [uploadStep, setUploadStep] = useState(1);

    // Filter selections
    const [selectedClients, setSelectedClients] = useState<string[]>(["Maria Rodriguez", "John Smith"]);
    const [selectedServices, setSelectedServices] = useState<string[]>(["Hair Treatment", "Facial Care"]);
    const [clientSearch, setClientSearch] = useState("");
    const [serviceSearch, setServiceSearch] = useState("");

    // Upload wizard
    const [wizardClient, setWizardClient] = useState<string | null>(null);
    const [wizardServices, setWizardServices] = useState<string[]>([]);
    const [wizardNotes, setWizardNotes] = useState("");

    // Close date picker on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
                setShowDatePicker(false);
            }
        };
        if (showDatePicker) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [showDatePicker]);

    const toggleClient = (client: string) =>
        setSelectedClients(prev => prev.includes(client) ? prev.filter(c => c !== client) : [...prev, client]);

    const toggleService = (service: string) =>
        setSelectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);

    const clearFilters = () => {
        setSelectedClients([]);
        setSelectedServices([]);
        setSearch("");
        setFromDate("");
        setToDate("");
    };

    const filteredClientList = ALL_CLIENTS.filter(c =>
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(clientSearch.toLowerCase())
    );
    const filteredServiceList = ALL_SERVICES.filter(s =>
        s.toLowerCase().includes(serviceSearch.toLowerCase())
    );

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
        const matchClient = selectedClients.length === 0 || selectedClients.includes(m.uploadedBy);
        const itemDate = new Date(m.uploadedAt);
        const matchFrom = !fromDate || itemDate >= new Date(fromDate);
        const matchTo = !toDate || itemDate <= new Date(toDate + "T23:59:59");
        return matchType && matchUsage && matchSearch && matchClient && matchFrom && matchTo;
    });

    const allSelected = filtered.length > 0 && filtered.every((m) => selected.includes(m.id));

    const toggleSelect = (id: string) =>
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelected(prev => prev.filter(id => !filtered.find(m => m.id === id)));
        } else {
            setSelected(prev => Array.from(new Set([...prev, ...filtered.map(m => m.id)])));
        }
    };

    const handleDelete = (id: string) => {
        setMedia(prev => prev.filter(m => m.id !== id));
        setSelected(prev => prev.filter(i => i !== id));
    };

    const handleMassDeletion = () => {
        setMedia(prev => prev.filter(m => !selected.includes(m.id)));
        setSelected([]);
    };

    const dateLabel = fromDate || toDate
        ? `${fromDate || "..."} → ${toDate || "..."}`
        : "Select Date Range";

    return (
        <div className="min-h-screen bg-[#F4F6FA] font-manrope">
            <div className="">

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

                            {/* Clients */}
                            <button
                                onClick={() => { setClientSearch(""); setActiveModal("clients"); }}
                                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white cursor-pointer"
                            >
                                <Users size={16} className="text-gray-400" /> {selectedClients.length} Clients
                            </button>

                            {/* Services */}
                            <button
                                onClick={() => { setServiceSearch(""); setActiveModal("services"); }}
                                className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg text-sm font-semibold text-[#29343D] bg-white cursor-pointer"
                            >
                                <Zap size={16} className="text-gray-400" /> {selectedServices.length} Services
                            </button>

                            {/* Date Range — relative wrapper so dropdown anchors here */}
                            <div className="relative" ref={datePickerRef}>
                                <button
                                    onClick={() => setShowDatePicker(v => !v)}
                                    className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-semibold bg-white transition-colors cursor-pointer
                                        ${showDatePicker || fromDate || toDate
                                            ? "border-[#635BFF] text-[#635BFF]"
                                            : "border-[#E0E6EB] text-[#29343D]"
                                        }`}
                                >
                                    <Calendar size={16} className="text-[#635BFF]" />
                                    {dateLabel}
                                </button>

                                {showDatePicker && (
                                    <CalendarPicker
                                        fromDate={fromDate}
                                        toDate={toDate}
                                        onFromChange={setFromDate}
                                        onToChange={setToDate}
                                        onDone={() => setShowDatePicker(false)}
                                        onClear={() => { setFromDate(""); setToDate(""); }}
                                    />
                                )}
                            </div>

                            <button onClick={clearFilters} className="text-[#FF6692] text-sm font-bold ml-4 border border-[#E0E6EB] px-4 py-2.5 rounded-lg cursor-pointer">
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Upload Button ── */}
                <button
                    onClick={() => {
                        setUploadStep(1);
                        setWizardClient(null);
                        setWizardServices([]);
                        setWizardNotes("");
                        setActiveModal("upload");
                    }}
                    className="flex flex-col items-start gap-4 justify-center rounded-lg w-[180px] p-[20px] bg-[#635BFF] cursor-pointer mb-6 mt-6 shadow-lg shadow-indigo-100"
                >
                    <UploadIcon color="white" />
                    <span className="text-start text-white font-manrope font-bold text-lg">Add Media</span>
                </button>

                {/* ── Media Grid ── */}
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
                                <button onClick={handleMassDeletion}
                                    className="font-manrope font-medium cursor-pointer text-[14px] px-4 py-2.5 rounded-lg bg-[#FFE5ED] text-[#FF6692]">
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

            {/* Clients Modal */}
            {activeModal === "clients" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                        <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
                        <h3 className="text-xl font-bold text-[#0A2540] mb-6">Select Client</h3>
                        <div className="relative mb-4">
                            <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
                            <input
                                type="text"
                                value={clientSearch}
                                onChange={(e) => setClientSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full pl-10 pr-4 py-3 border border-[#E0E6EB] rounded-xl outline-none"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                            {filteredClientList.map((client, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleClient(client.name)}
                                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors
                                        ${selectedClients.includes(client.name) ? "border-[#635BFF] bg-indigo-50/30" : "border-[#E0E6EB] hover:bg-gray-50"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                                        <div>
                                            <p className="text-sm font-bold text-[#0A2540]">{client.name}</p>
                                            <p className="text-xs text-gray-400">{client.email}</p>
                                        </div>
                                    </div>
                                    <Checkbox checked={selectedClients.includes(client.name)} onChange={() => toggleClient(client.name)} />
                                </div>
                            ))}
                            {filteredClientList.length === 0 && (
                                <p className="text-center text-sm text-gray-400 py-6">No clients found</p>
                            )}
                        </div>
                        <button onClick={() => setActiveModal(null)} className="w-full mt-6 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg">Done</button>
                    </div>
                </div>
            )}

            {/* Services Modal */}
            {activeModal === "services" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                        <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
                        <h3 className="text-xl font-bold text-[#0A2540] mb-6">Select Services</h3>
                        <div className="relative mb-4">
                            <SearchIcon className="absolute left-3 top-3 text-gray-300" size={18} />
                            <input
                                type="text"
                                value={serviceSearch}
                                onChange={(e) => setServiceSearch(e.target.value)}
                                placeholder="Search services..."
                                className="w-full pl-10 pr-4 py-3 border border-[#E0E6EB] rounded-xl outline-none"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                            {filteredServiceList.map((name, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleService(name)}
                                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors
                                        ${selectedServices.includes(name) ? "border-[#635BFF] bg-indigo-50/30" : "border-[#E0E6EB] hover:bg-gray-50"}`}
                                >
                                    <Checkbox checked={selectedServices.includes(name)} onChange={() => toggleService(name)} />
                                    <div>
                                        <p className="text-sm font-bold text-[#0A2540]">{name}</p>
                                        <p className="text-xs text-gray-400">Beauty</p>
                                    </div>
                                </div>
                            ))}
                            {filteredServiceList.length === 0 && (
                                <p className="text-center text-sm text-gray-400 py-6">No services found</p>
                            )}
                        </div>
                        <div className="mt-4 p-3 bg-indigo-50 text-[#635BFF] font-bold text-sm text-center rounded-xl">
                            {selectedServices.length} services selected
                        </div>
                        <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg">Done</button>
                    </div>
                </div>
            )}

            {/* Upload Wizard */}
            {activeModal === "upload" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl relative">
                        <button onClick={() => setActiveModal(null)} className="absolute right-4 top-4 text-gray-400"><X size={20} /></button>
                        <h3 className="text-2xl font-bold text-[#0A2540] mb-8">Add Media Upload</h3>

                        {/* Step indicators */}
                        <div className="flex items-center justify-center mb-10">
                            <div className="flex items-center w-full max-w-xs">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 1 ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"}`}>1</div>
                                <div className={`flex-1 h-1 transition-all ${uploadStep >= 2 ? "bg-[#635BFF]" : "bg-gray-100"}`} />
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 2 ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"}`}>2</div>
                                <div className={`flex-1 h-1 transition-all ${uploadStep >= 3 ? "bg-[#635BFF]" : "bg-gray-100"}`} />
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${uploadStep >= 3 ? "bg-[#635BFF] text-white" : "bg-gray-100 text-gray-400"}`}>3</div>
                            </div>
                        </div>

                        <div className="min-h-[300px]">
                            {uploadStep === 1 && (
                                <div className="space-y-4">
                                    <p className="text-[11px] font-bold text-[#635BFF] uppercase tracking-widest text-center mb-6">Step 1: Select Client</p>
                                    <div className="relative mb-6">
                                        <SearchIcon className="absolute left-3 top-5 text-gray-300" size={18} />
                                        <input type="text" placeholder="Search by name or email..."
                                            className="w-full pl-10 pr-4 py-4 border border-[#E0E6EB] rounded-xl outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        {ALL_CLIENTS.map((client, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setWizardClient(client.name)}
                                                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors
                                                    ${wizardClient === client.name ? "border-[#635BFF] bg-indigo-50/30" : "border-[#E0E6EB] hover:bg-gray-50"}`}
                                            >
                                                <div className="w-12 h-12 rounded-full bg-gray-200" />
                                                <div>
                                                    <p className="font-bold text-[#0A2540]">{client.name}</p>
                                                    <p className="text-xs text-gray-400">{client.email}</p>
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
                                        <select
                                            value=""
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val && !wizardServices.includes(val))
                                                    setWizardServices(prev => [...prev, val]);
                                            }}
                                            className="w-full p-4 border border-[#E0E6EB] rounded-xl outline-none bg-white text-gray-400"
                                        >
                                            <option value="" disabled>Select services...</option>
                                            {ALL_SERVICES.filter(s => !wizardServices.includes(s)).map((s, i) => (
                                                <option key={i} value={s}>{s}</option>
                                            ))}
                                        </select>
                                        {wizardServices.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {wizardServices.map(s => (
                                                    <span key={s} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-indigo-50 text-[#635BFF] rounded-full">
                                                        {s}
                                                        <button onClick={() => setWizardServices(prev => prev.filter(n => n !== s))}><X size={11} /></button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-sm font-bold text-[#0A2540] block mb-2">Additional Information *</label>
                                        <textarea
                                            value={wizardNotes}
                                            onChange={(e) => setWizardNotes(e.target.value)}
                                            className="w-full p-4 border border-[#E0E6EB] rounded-xl h-32 outline-none"
                                            placeholder="Add required notes about this media set..."
                                        />
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

                        {/* FIX 3: Replaced flex-[2] with explicit style widths so buttons never get cut off */}
                        <div className="flex gap-4 mt-10 w-full">
                            {uploadStep > 1 && (
                                <button
                                    onClick={() => setUploadStep(prev => prev - 1)}
                                    style={{ width: "35%" }}
                                    className="py-4 border border-gray-200 rounded-xl font-bold text-[#0A2540] hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={() => uploadStep === 3 ? setActiveModal(null) : setUploadStep(prev => prev + 1)}
                                style={{ width: uploadStep > 1 ? "65%" : "100%" }}
                                className="py-4 bg-[#635BFF] text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
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