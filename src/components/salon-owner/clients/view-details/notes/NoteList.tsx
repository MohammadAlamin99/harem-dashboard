"use client";

import { useState } from "react";
import { Eye, Paperclip, Pencil, Trash2 } from "lucide-react";
import { Note } from "@/@types/salon-owner/note.type";
import ViewNoteModal from "./Viewnotemodal";

export default function NoteList({ note, onDelete }: { note: Note; onDelete: (id: number) => void }) {
    const [showView, setShowView] = useState(false);

    return (
        <>
            <div className="flex flex-col md:flex-row items-start justify-between p-4 md:p-6 border-b border-[#E0E6EB] last:border-b-0 flex-wrap gap-2">

                {/* Left: content */}
                <div className="flex-1 pr-0 md:pr-8">
                    <p className="text-[#29343D] font-semibold font-manrope text-sm mb-2">
                        {note.title}
                    </p>
                    <p className="text-[#98A4AE] text-sm font-manrope leading-relaxed max-w-[596px]">
                        {note.body}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-[#9CA3AF] text-xs font-manrope">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>{note.attachments}</span>
                    </div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-3 flex-shrink-0 mt-1">

                    {/* View */}
                    <button
                        onClick={() => setShowView(true)}
                        className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#F1F2FE] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                    </button>

                    {/* Edit */}
                    <button className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#F1F2FE] flex items-center justify-center text-[#46CAEB] hover:bg-[#41bedd] hover:text-white transition-colors">
                        <Pencil className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                        onClick={() => onDelete(note.id)}
                        className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#FFE5ED] flex items-center justify-center text-[#FF6692] hover:bg-[#FF6692] hover:text-white transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* View Modal */}
            {showView && (
                <ViewNoteModal note={note} onClose={() => setShowView(false)} />
            )}
        </>
    );
}