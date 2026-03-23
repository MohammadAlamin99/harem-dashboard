import { useState } from "react";
import { MoreVertical, Play, Volume2, Maximize2 } from "lucide-react";
import Image from "next/image";
import { MediaItem } from "@/@types/salon-owner/mediaItem.type";


export default function MediaCard({ item }: { item: MediaItem }) {
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