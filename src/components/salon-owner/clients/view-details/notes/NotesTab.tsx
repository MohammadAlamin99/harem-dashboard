"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import NoteList from "./NoteList";
import { Note } from "@/@types/salon-owner/note.type";
import AddNoteModal from "./Addnotemodal";

const initialNotes: Note[] = [
    { id: 1, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
    { id: 2, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
    { id: 3, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
    { id: 4, title: "Tile", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", attachments: 1 },
];

export default function NotesTab() {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const handleSave = (data: { title: string; description: string; file: File | null }) => {
        const newNote: Note = {
            id: Date.now(),
            title: data.title || "Untitled",
            body: data.description,
            attachments: data.file ? 1 : 0,
        };
        setNotes((prev) => [...prev, newNote]);
    };

    return (
        <>
            <div className="bg-white font-manrope border border-[#E0E6EB] rounded-xl p-[15px] md:p-[30px] mb-[30px]">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-[#29343D] font-semibold text-[22px] font-manrope">
                        Notes
                    </h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="cursor-pointer flex items-center gap-1.5 bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors"
                    >
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
                            <NoteList key={note.id} note={note} onDelete={handleDelete} />
                        ))
                    ) : (
                        <div className="px-6 py-12 text-center text-[#9CA3AF] text-sm font-manrope">
                            No notes yet. Click &quot;Add Note&quot; to create one.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <AddNoteModal
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}