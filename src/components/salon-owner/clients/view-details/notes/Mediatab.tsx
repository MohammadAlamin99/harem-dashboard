"use client";

import { useState } from "react";
import { Plus, MoreVertical, ChevronDown, Play, Volume2, Maximize2 } from "lucide-react";
import Image from "next/image";

type FileType = "All Type" | "Photo" | "Video";
type DateOption = "Last 7 days" | "Last 14 days" | "Last Month" | "Last 3 Months";

interface MediaItem {
    id: number;
    fileName: string;
    uploadedAt: string;
    type: "photo" | "video";
    thumbnail: string;
}
const mediaItems: MediaItem[] = [
    {
        id: 1,
        fileName: "FileName.jpeg",
        uploadedAt: "08/08/2025 5:06 PM",
        type: "photo",
        thumbnail: "/images/media01.jpg",
    },
    {
        id: 2,
        fileName: "FileName.mp4",
        uploadedAt: "08/08/2025 5:06 PM",
        type: "video",
        thumbnail: "/images/media02.jpg",
    },
];

const dateOptions: DateOption[] = ["Last 7 days", "Last 14 days", "Last Month", "Last 3 Months"];

function MediaCard({ item }: { item: MediaItem }) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);

    return (
        <div className="flex-1 min-w-0 border border-[#E0E6EB] rounded-xl p-4 md:p-7 bg-white">

            {/* Top row */}
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className="text-[#29343D] font-semibold font-manrope text-sm">{item.fileName}</p>
                    <p className="text-[#9CA3AF] text-xs font-manrope mt-0.5">Uploaded at {item.uploadedAt}</p>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu((p) => !p)}
                        className="text-[#29343D] hover:text-[#29343D] transition-colors p-1 cursor-pointer"
                    >
                        <MoreVertical className="w-6 h-6" />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[120px]">
                            {["View", "Download", "Delete"].map((action) => (
                                <button
                                    key={action}
                                    onClick={() => setShowMenu(false)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors font-manrope
                    ${action === "Delete" ? "text-[#FF6692]" : "text-[#29343D]"}`}
                                >
                                    {action}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Media preview */}
            {item.type === "photo" ? (
                <div className="relative w-full h-[210px] rounded-xl overflow-hidden">
                    <Image
                        src={item.thumbnail}
                        alt={item.fileName}
                        width={474}
                        height={210}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="relative w-full h-[210px] rounded-xl overflow-hidden bg-black">
                    <Image
                        src={item.thumbnail}
                        alt={item.fileName}
                        width={474}
                        height={210}
                        className="w-full h-full object-cover"
                    />
                    {/* Video overlay controls */}
                    <div className="absolute inset-0 flex flex-col justify-end">
                        {/* Progress bar */}
                        <div className="px-3 pb-1">
                            <div className="w-full h-1 bg-white/40 rounded-full">
                                <div className="h-1 bg-white rounded-full w-1/4" />
                            </div>
                        </div>
                        {/* Controls bar */}
                        <div className="flex items-center justify-between px-3 py-2">
                            <button
                                onClick={() => setPlaying((p) => !p)}
                                className="text-white hover:text-white/80 transition-colors"
                            >
                                <Play className="w-4 h-4 fill-white" />
                            </button>
                            <div className="flex items-center gap-3">
                                <button className="text-white hover:text-white/80 transition-colors">
                                    <Volume2 className="w-4 h-4" />
                                </button>
                                <button className="text-white hover:text-white/80 transition-colors">
                                    <Maximize2 className="w-4 h-4" />
                                </button>
                                <button className="text-white hover:text-white/80 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MediaTab() {
    const [fileType, setFileType] = useState<FileType>("All Type");
    const [dateFilter, setDateFilter] = useState<DateOption>("Last 7 days");
    const [showDateDrop, setShowDateDrop] = useState<boolean>(false);

    const fileTypes: FileType[] = ["All Type", "Photo", "Video"];

    const filtered = mediaItems.filter((item) => {
        if (fileType === "All Type") return true;
        if (fileType === "Photo") return item.type === "photo";
        if (fileType === "Video") return item.type === "video";
        return true;
    });

    return (
        <div className="bg-white font-manrope border border-[#E0E6EB] rounded-xl p-[15px] md:p-[30px]">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#29343D] font-semibold text-[22px] font-manrope">Media</h2>
                <button className="flex items-center gap-2.5 bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                    Upload Media
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-end gap-6 mb-6">
                {/* File Type */}
                <div>
                    <p className="text-[#9CA3AF] text-xs font-manrope mb-2">File Type</p>
                    <div className="flex items-center gap-2">
                        {fileTypes.map((ft) => (
                            <button
                                key={ft}
                                onClick={() => setFileType(ft)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium font-manrope border transition-colors
                  ${fileType === ft
                                        ? "bg-white border-[#635BFF] text-[#635BFF]"
                                        : "bg-white border-[#E0E6EB] text-[#526B7A] hover:border-[#635BFF] hover:text-[#635BFF]"
                                    }`}
                            >
                                {ft}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date */}
                <div>
                    <p className="text-[#9CA3AF] text-xs font-manrope mb-2">Date</p>
                    <div className="relative">
                        <button
                            onClick={() => setShowDateDrop((p) => !p)}
                            className="flex items-center gap-2 border border-[#E0E6EB] rounded-lg px-3 py-1.5 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
                        >
                            {dateFilter}
                            <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
                        </button>
                        {showDateDrop && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[160px]">
                                {dateOptions.map((o) => (
                                    <button
                                        key={o}
                                        onClick={() => { setDateFilter(o); setShowDateDrop(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors font-manrope
                      ${dateFilter === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                                    >
                                        {o}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Media Grid */}
            <div className="flex gap-5">
                {filtered.map((item) => (
                    <MediaCard key={item.id} item={item} />
                ))}
                {filtered.length === 0 && (
                    <div className="w-full py-12 text-center text-[#9CA3AF] text-sm font-manrope border border-[#E0E6EB] rounded-2xl">
                        No media found for the selected filters.
                    </div>
                )}
            </div>

        </div>
    );
}