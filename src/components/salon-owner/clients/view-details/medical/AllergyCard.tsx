import { AllergyNote, Severity } from "@/@types/salon-owner/allergyNote.type";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export function AllergyCard({ note, onDelete, severityConfig }: { note: AllergyNote; onDelete: (id: number) => void, severityConfig: Record<Severity, { card: string; border: string; badge: string }> }) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const cfg = severityConfig[note.severity as Severity];

    return (
        <div className={`relative rounded-xl border p-5 ${cfg.card} ${cfg.border}`}>

            {/* 3-dot menu */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setShowMenu((p) => !p)}
                    className="text-[#29343D] cursor-pointer hover:text-[#29343D] transition-colors p-1"
                >
                    <MoreVertical className="w-6 h-6" />
                </button>
                {showMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[120px]">
                        <button
                            onClick={() => setShowMenu(false)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors font-manrope"
                        >
                            <Eye className="w-4 h-4 text-[#635BFF]" />
                            View
                        </button>
                        <button
                            onClick={() => setShowMenu(false)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors font-manrope"
                        >
                            <Pencil className="w-4 h-4 text-[#635BFF]" />
                            Edit
                        </button>
                        <button
                            onClick={() => { onDelete(note.id); setShowMenu(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#FF6692] hover:bg-[#FFF0F3] transition-colors font-manrope"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <p className="text-[#29343D] font-semibold font-manrope text-sm mb-2 pr-8">
                {note.title}
            </p>
            <p className="text-[#526B7A] text-sm font-manrope leading-relaxed mb-4 pr-8">
                {note.body}
            </p>

            {/* Severity badge */}
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-full font-manrope ${cfg.badge}`}>
                {note.severity}
            </span>

        </div>
    );
}
