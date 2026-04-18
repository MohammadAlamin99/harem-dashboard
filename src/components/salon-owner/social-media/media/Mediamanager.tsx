"use client";

import { useState } from "react";
import { MediaCard } from "./MediaCard";
import { SearchIcon, UploadIcon } from "lucide-react";
import HeaderFilter from "../../common-component/HeaderFilter";

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
        uploadedBy: "Maria",
        uploadedAt: "08/08/2025 5:06 PM",
        published: true,
        src: "/images/thumbline.jpg",
    },
    {
        id: "2",
        fileName: "FileName.jpeg",
        type: "video",
        uploadedBy: "Maria",
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
        className={`flex items-center justify-center w-[18px] h-[18px] rounded-[5px] transition-all duration-150
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
    const [mediaType, setMediaType] = useState<string>("All Type");
    const [usageFilter, setUsageFilter] = useState<UsageFilter>("All Media");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string[]>([]);
    const [media, setMedia] = useState<MediaItem[]>(MOCK_MEDIA);

    // Derived
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
        return matchType && matchUsage && matchSearch;
    });

    const allSelected =
        filtered.length > 0 && filtered.every((m) => selected.includes(m.id));

    // Handlers 
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
            <div className="space-y-4">

                {/* ── Filter Bar — unchanged ── */}
                <div className="bg-white rounded-xl">
                    <h4 className="px-6 pt-6 pb-3 text-lg font-bold text-[#29343D] font-manrope">
                        Media
                    </h4>
                    <div className="flex items-center justify-between pr-6">
                        <div className="flex flex-wrap">
                            <HeaderFilter
                                title="Media Type"
                                categories={[
                                    { label: "All Type", value: "All Type" },
                                    { label: "Photo", value: "Photo" },
                                    { label: "Video", value: "Video" },
                                ]}
                                selected={mediaType}
                                onChange={setMediaType}
                                showFilterIcon={false}
                            />
                            <HeaderFilter
                                title="Usage"
                                categories={[
                                    { label: "All Media", value: "All Media" },
                                    { label: "Used", value: "Used" },
                                    { label: "Unused", value: "Unused" },
                                ]}
                                selected={usageFilter}
                                onChange={(val) => setUsageFilter(val as UsageFilter)}
                                showFilterIcon={false}
                            />
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-2 rounded-lg w-[240px] p-3 border border-[#E0E6EB]">
                            <SearchIcon size={20} color="#29343D" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="font-manrope outline-none bg-transparent w-full text-sm font-normal text-[#29343D] placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Upload Button — unchanged  */}
                <button className="flex flex-col items-start gap-4 justify-center rounded-lg w-[180px] p-[20px] bg-[#635BFF] cursor-pointer mb-6 mt-6">
                    <UploadIcon color="white" />
                    <span className="text-start text-white font-manrope font-bold text-lg">
                        Upload
                    </span>
                </button>

                {/* Media Grid */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

                    {/* Action bar */}
                    <div className="flex items-center justify-between mb-5">

                        {/* Left: select-all toggle */}
                        <div
                            onClick={toggleSelectAll}
                            className="flex items-center gap-2 font-manrope font-semibold text-[13.5px] text-[#635BFF] hover:opacity-75 transition-opacity cursor-pointer"
                        >
                            <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                            {allSelected ? "Unselect All Salons" : "Select All Salons"}
                            {!allSelected && selected.length > 0 && (
                                <span className="ml-1 text-[11px] font-medium font-manrope px-2 py-0.5 rounded-full bg-[#EBFAF0] text-[#36C76C]">
                                    {selected.length} selected
                                </span>
                            )}
                        </div>

                        {/* Right: action buttons — visible only when items are selected */}
                        {selected.length > 0 && (
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={handleMassDeletion}
                                    className="font-manrope font-medium cursor-pointer text-[14px] px-4 py-2.5 rounded-lg bg-[#FFE5ED] text-[#FF6692] hover:bg-red-50 transition-colors"
                                >
                                    Mass Deletion
                                </button>
                                <button
                                    className="font-manrope font-medium cursor-pointer text-[14px] px-4 py-2.5 rounded-lg bg-[#16CDC7] text-white hover:opacity-90 transition-opacity"
                                >
                                    Use Media
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Empty state */}
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
        </div>
    );
}