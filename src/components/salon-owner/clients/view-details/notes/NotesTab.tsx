"use client";

import { useState } from "react";
import { Plus, Eye, Pencil, Trash2, Paperclip } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Note {
    id: number;
    title: string;
    body: string;
    attachments: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialNotes: Note[] = [
    { id: 1, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
    { id: 2, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
    { id: 3, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
    { id: 4, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
];

// ─── Note Row ─────────────────────────────────────────────────────────────────

function NoteRow({ note, onDelete }: { note: Note; onDelete: (id: number) => void }) {
    return (
        <div className="flex items-start justify-between p-6 border-b border-[#E0E6EB] last:border-b-0">
            {/* Left: content */}
            <div className="flex-1 pr-8">
                <p className="text-[#29343D] font-semibold font-manrope text-sm mb-2">
                    {note.title}
                </p>
                <p className="text-[#98A4AE] text-sm font-manrope leading-relaxed">
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
                <button className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#F1F2FE] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
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
    );
}


export default function NotesTab() {
    const [notes, setNotes] = useState<Note[]>(initialNotes);

    const handleDelete = (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="bg-white font-manrope border border-[#E0E6EB] rounded-xl p-[15px] md:p-[30px] mb-[30px]">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#29343D] font-semibold text-[22px] font-manrope">
                    Notes
                </h2>
                <button className="cursor-pointer flex items-center gap-1.5 bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Note
                </button>
            </div>

            {/* Table */}
            <div className="border border-[#E0E6EB] rounded-2xl overflow-hidden">

                {/* Table head */}
                <div className="flex items-center justify-between bg-[#F3F3FF] px-6 py-[14px] border-b border-[#E0E6EB]">
                    <span className="text-[#29343D] font-bold font-manrope text-base">Notes</span>
                    <span className="text-[#29343D] font-bold font-manrope text-base">Actions</span>
                </div>

                {/* Rows */}
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteRow key={note.id} note={note} onDelete={handleDelete} />
                    ))
                ) : (
                    <div className="px-6 py-12 text-center text-[#9CA3AF] text-sm font-manrope">
                        No notes yet. Click &quot;Add Note&quot; to create one.
                    </div>
                )}

            </div>
        </div>
    );
}