"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import DropIcon from "./DropIcon";

interface Props {
    onClose: () => void;
    onSave?: (data: { title: string; file: File | null }) => void;
}

export default function UploadMediaModal({ onClose, onSave }: Props) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) setFile(dropped);
    };

    const handleSave = () => {
        onSave?.({ title, file });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative w-full max-w-[746px] mx-4 bg-white rounded-2xl shadow-2xl overflow-visible">

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-5">
                    <h2 className="text-[20px] font-semibold font-manrope text-[#29343D]">
                        Upload Media
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F4F7] transition cursor-pointer"
                    >
                        <X size={20} color="#29343D" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 pb-6 space-y-5">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="block text-[15px] font-medium font-manrope text-[#29343D]">
                            Title <span className="text-[#29343D]">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="w-full px-4 py-3 rounded font-manrope text-[15px] text-[#29343D] placeholder:text-[#29343D]
                border border-[#E5E7EB] outline-none
                focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition"
                        />
                    </div>

                    {/* Drop Zone */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={handleDrop}
                        className={`w-full flex flex-col items-center justify-center gap-4 py-12 cursor-pointer transition
              border-2 border-dashed rounded-lg
              ${dragging
                                ? "border-[#635BFF] bg-[#F1F2FE]"
                                : "border-[#635BFF]/40 bg-white hover:bg-[#F8F8FF]"
                            }`}
                    >
                        {/* Icon box */}
                        <div className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center">
                            <DropIcon />
                        </div>

                        {file ? (
                            <span className="text-[15px] font-manrope text-[#635BFF] font-medium">
                                {file.name}
                            </span>
                        ) : (
                            <span className="text-[15px] font-manrope text-[#635BFF] font-medium">
                                Drop here or click to browse
                            </span>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-8 pb-8">
                    <button
                        onClick={handleSave}
                        className="bg-[#635BFF] text-white font-manrope text-[15px] font-medium
              px-4 py-2.5 rounded-lg cursor-pointer
              hover:opacity-90 active:scale-[0.97] transition-all
              shadow-[0_8px_24px_-6px_rgba(99,91,255,0.5)]"
                    >
                        Save Media
                    </button>
                </div>
            </div>
        </div>
    );
}