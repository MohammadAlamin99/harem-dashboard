"use client";

import { X, Download, Eye } from "lucide-react";
import { Note } from "@/@types/salon-owner/note.type";
import NoteFileIcon from "./NoteFileIcon";

interface Props {
    note: Note;
    onClose: () => void;
}

export default function ViewNoteModal({ note, onClose }: Props) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative w-full max-w-[638px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-4">
                    <h2 className="text-[20px] font-semibold font-manrope text-[#29343D]">
                        View Note
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F4F7] transition cursor-pointer"
                    >
                        <X size={20} color="#29343D" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 pb-8 space-y-6">

                    {/* Title */}
                    <div className="space-y-1">
                        <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                            Title
                        </p>
                        <p className="text-[15px] font-manrope text-[#98A4AE]">
                            {note.title || "Title here"}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                            Description
                        </p>
                        <p className="text-[14px] font-manrope text-[#98A4AE] leading-relaxed">
                            {note.body}
                        </p>
                    </div>

                    {/* Attachments */}
                    {note.attachments > 0 && (
                        <div className="space-y-3">
                            <p className="text-[15px] font-semibold font-manrope text-[#29343D]">
                                Attachments
                            </p>

                            {/* Attachment row */}
                            <div className="flex items-center justify-between border border-[#E5E7EB] rounded-xl p-4">
                                {/* File icon + info */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                        <NoteFileIcon />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-medium font-manrope text-[#635BFF]">
                                            originalname.pdf
                                        </p>
                                        <p className="text-[12px] font-manrope text-[#98A4AE]">
                                            4.2 MB
                                        </p>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-4">
                                    <button className="px-4 py-2.5 rounded-lg bg-[#F1F2FE] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors cursor-pointer">
                                        <Eye size={16} />
                                    </button>
                                    <button className="px-4 py-2.5 rounded-lg bg-[#F1F2FE] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors cursor-pointer">
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}