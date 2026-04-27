"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (folderName: string) => void;
}

export default function CreateFolderModal({ isOpen, onClose, onSave }: CreateFolderModalProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSave = () => {
        if (!name.trim()) {
            setError("Folder name is required.");
            return;
        }
        onSave?.(name.trim());
        setName("");
        setError("");
        onClose();
    };

    const handleClose = () => {
        setName("");
        setError("");
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            <div className="w-[480px] rounded-xl bg-white">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                    <h2 className="font-manrope text-[16px] font-bold text-[#29343D]">Create Folder</h2>
                    <button
                        onClick={handleClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <X size={18} color="#29343D" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    <label className="font-manrope block text-sm font-semibold text-[#29343D] mb-2">
                        Name <span className="text-[#635BFF]">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(""); }}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSave(); }}
                        placeholder="Enter name"
                        autoFocus
                        className={`font-manrope w-full rounded-sm border px-4 py-3 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none transition-all
              ${error
                                ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                : "border-gray-200 focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
                            }`}
                    />
                    {error && (
                        <p className="font-manrope mt-1.5 text-xs text-red-500">{error}</p>
                    )}

                    {/* Footer */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleSave}
                            className="font-manrope rounded-lg bg-[#635BFF] px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}