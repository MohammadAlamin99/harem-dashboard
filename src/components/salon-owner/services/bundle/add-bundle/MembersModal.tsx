import { useState } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
interface Member { id: number; name: string; phone: string; avatar: string }
function Checkbox({ checked }: { checked: boolean }) {
    return (
        <div className={`w-5 h-5 rounded-[4px] border-2 flex items-center justify-center transition-colors ${checked ? "bg-[#6366F1] border-[#6366F1]" : "border-[#C8D0D8] bg-white"}`}>
            {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </div>
    )
}

export default function MembersModal({ onClose, onSave, initial, ALL_MEMBERS }: { onClose: () => void; onSave: (m: Member[]) => void; initial: Member[]; ALL_MEMBERS: Member[] }) {
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState<number[]>(initial.map((m) => m.id))
    const filtered = ALL_MEMBERS.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    const toggle = (id: number) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope">
            <div className="bg-white rounded-2xl w-full max-w-[760px] mx-4 shadow-2xl">
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <h2 className="text-[#29343D] text-lg font-bold">Services</h2>
                    <button onClick={onClose} className="text-[#29343D] hover:text-[#6366F1] transition-colors cursor-pointer"><X size={20} strokeWidth={2} /></button>
                </div>
                <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-[10px] px-4 py-3 focus-within:border-[#6366F1] transition-colors">
                        <Search size={15} className="text-[#29343D]" />
                        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 text-[14px] text-[#29343D] placeholder:text-[#98A4AE] bg-transparent focus:outline-none" />
                    </div>
                </div>
                <div className="px-6 pb-4 grid grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                    {filtered.map((member) => (
                        <button
                            key={member.id}
                            onClick={() => toggle(member.id)}
                            className={`relative flex flex-col items-center gap-2 p-5 rounded-[10px] border transition-colors cursor-pointer ${selected.includes(member.id) ? "border-[#6366F1] bg-[#F5F5FF]" : "border-[#E2E8F0] bg-white hover:border-[#6366F1]"}`}
                        >
                            <div className="absolute top-3 left-3">
                                <Checkbox checked={selected.includes(member.id)} />
                            </div>
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-[#F3F4F6]">
                                <Image src={member.avatar} alt={member.name} width={56} height={56} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[14px] font-semibold text-[#29343D] text-center">{member.name}</p>
                            <p className="text-[12px] text-[#98A4AE] text-center">{member.phone}</p>
                        </button>
                    ))}
                </div>
                <div className="flex justify-end px-6 py-4 border-t border-[#F3F4F6]">
                    <button onClick={() => onSave(ALL_MEMBERS.filter((m) => selected.includes(m.id)))} className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
                        Save List
                    </button>
                </div>
            </div>
        </div>
    )
}
