"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AllergyNote, Severity } from "@/@types/salon-owner/allergyNote.type";
import { AllergyCard } from "./AllergyCard";




// Severity Config 

const severityConfig: Record<Severity, { card: string; border: string; badge: string }> = {
    Mild: { card: "bg-[#F1F2FE]", border: "border-[#635BFF]", badge: "bg-[#635BFF] text-white" },
    Moderate: { card: "bg-[#FFF9E5]", border: "border-[#FFD648]", badge: "bg-[#FFD648] text-white" },
    Severe: { card: "bg-[#FFE5ED]", border: "border-[#FF6692]", badge: "bg-[#FF6692] text-white" },
};

// Data

const initialNotes: AllergyNote[] = [
    { id: 1, title: "Fragrances Allergie", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", severity: "Mild" },
    { id: 2, title: "Fragrances Allergie", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", severity: "Moderate" },
    { id: 3, title: "Fragrances Allergie", body: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", severity: "Severe" },
];

// Allergy Card 


export default function MedicalPersonalNotes() {
    const [notes, setNotes] = useState<AllergyNote[]>(initialNotes);

    const handleDelete = (id: number) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="bg-white font-manrope border border-[#E0E6EB] p-[15px] md:p-[30px] rounded-xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#29343D] font-semibold text-[22px] font-manrope">
                    Medical / Personal Notes
                </h2>
                <button className="flex items-center gap-2.5 bg-[#EBEAFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Allergie
                </button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-4">
                {notes.map((note) => (
                    <AllergyCard key={note.id} note={note} onDelete={handleDelete} severityConfig={severityConfig} />
                ))}
                {notes.length === 0 && (
                    <div className="py-12 text-center text-[#9CA3AF] text-sm font-manrope border border-[#E0E6EB] rounded-2xl">
                        No allergy notes found. Click &quot;Add Allergie&quot; to create one.
                    </div>
                )}
            </div>

        </div>
    );
}