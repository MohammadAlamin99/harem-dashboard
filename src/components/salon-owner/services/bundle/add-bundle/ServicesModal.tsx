//  Services Modal 

import { Search, X } from "lucide-react";
import { useState } from "react";
interface Service { id: number; name: string; duration: string; price: string }
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

export default function ServicesModal({ onClose, onSave, initial, ALL_SERVICES }: { onClose: () => void; onSave: (s: Service[]) => void; initial: Service[]; ALL_SERVICES: Service[] }) {
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState<number[]>(initial.map((s) => s.id))

    const filtered = ALL_SERVICES.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    const toggle = (id: number) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope">
            <div className="bg-white rounded-xl w-full max-w-[746px] mx-4 shadow-2xl">

                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                    <h2 className="text-[#29343D] text-[18px] font-bold">Services</h2>
                    <button onClick={onClose} className="text-[#29343D] hover:text-[#6366F1] transition-colors cursor-pointer"><X size={20} strokeWidth={2} /></button>
                </div>

                <div className="px-6 pb-4">
                    <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-[8px] px-4 py-3 focus-within:border-[#6366F1] transition-colors">
                        <Search size={15} className="text-[#29343D]" />
                        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 text-[14px] text-[#29343D] placeholder:text-[#98A4AE] bg-transparent focus:outline-none" />
                    </div>
                </div>

                <div className="px-6 pb-4 grid grid-cols-2 gap-6 max-h-[380px] overflow-y-auto">
                    {filtered.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => toggle(service.id)}
                            className={`flex items-center gap-3 p-4 rounded-[12px] border transition-colors text-left cursor-pointer ${selected.includes(service.id) ? "border-[#6366F1] bg-[#F5F5FF]" : "border-[#E2E8F0] bg-[#F6F7F9] hover:border-[#6366F1]"}`}
                        >
                            <Checkbox checked={selected.includes(service.id)} />
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] md:text-[16px] font-semibold text-[#29343D]">{service.name}</p>
                                <p className="text-[14px] text-[#98A4AE]">{service.duration}</p>
                            </div>
                            <span className="text-[16px] md:text-[24px] font-bold text-[#29343D]">{service.price}</span>
                        </button>
                    ))}
                </div>

                <div className="flex justify-end px-6 py-4">
                    <button onClick={() => onSave(ALL_SERVICES.filter((s) => selected.includes(s.id)))} className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer">
                        Save List
                    </button>
                </div>

            </div>
        </div>
    )
}