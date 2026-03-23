"use client";

import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import MediaCard from "./MediaCard";
import { MediaItem } from "@/@types/salon-owner/mediaItem.type";
import UploadMediaModal from "./Uploadmediamodal";

type FileType = "All Type" | "Photo" | "Video";
type DateOption = "Last 7 days" | "Last 14 days" | "Last Month" | "Last 3 Months";

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

export default function MediaTab() {
    const [fileType, setFileType] = useState<FileType>("All Type");
    const [dateFilter, setDateFilter] = useState<DateOption>("Last 7 days");
    const [showDateDrop, setShowDateDrop] = useState<boolean>(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const fileTypes: FileType[] = ["All Type", "Photo", "Video"];

    const filtered = mediaItems.filter((item) => {
        if (fileType === "All Type") return true;
        if (fileType === "Photo") return item.type === "photo";
        if (fileType === "Video") return item.type === "video";
        return true;
    });

    return (
        <>
            <div className="bg-white font-manrope border border-[#E0E6EB] rounded-xl p-[15px] md:p-[30px]">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[#29343D] font-semibold text-[22px] font-manrope">Media</h2>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="cursor-pointer flex items-center gap-2.5 bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Upload Media
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-end gap-6 mb-6 flex-wrap">

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
                                className="flex items-center gap-2 border border-[#E0E6EB] rounded-lg px-3 py-1.5 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white cursor-pointer"
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
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors font-manrope cursor-pointer
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
                <div className="flex gap-5 flex-wrap flex-col md:flex-row">
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

            {/* Upload Modal */}
            {showUploadModal && (
                <UploadMediaModal onClose={() => setShowUploadModal(false)} />
            )}
        </>
    );
}