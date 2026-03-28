import { useState, useRef, useEffect } from "react"
import { ChevronDown, Download } from "lucide-react"

const ADD_OPTIONS = [
    "Add Time Off",
    "Add Blocked Time",
    "Business Closed Period",
]

export default function ScheduleShiftHead({ handleOptionClick }: { handleOptionClick: (option: string) => void }) {
    const [addOpen, setAddOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setAddOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="font-manrope">
            <div className="bg-white rounded-[8px] px-4 sm:px-6 py-5">

                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h1 className="text-[#1A1A2E] font-bold text-base">Scheduled Shifts</h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button className="cursor-pointer bg-[#DDDBFF] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center sm:justify-start gap-2 hover:bg-[#E0E7FF] transition-colors w-full sm:w-auto">
                            <Download size={15} strokeWidth={2.5} />
                            Export Data
                        </button>

                        {/* Add + Dropdown */}
                        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                            <button
                                onClick={() => setAddOpen((prev) => !prev)}
                                className="cursor-pointer w-full sm:w-auto bg-[#6366F1] text-white text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#4F46E5] transition-colors"
                            >
                                Add
                                <ChevronDown
                                    size={15}
                                    strokeWidth={2.5}
                                    className={`transition-transform duration-200 ${addOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {addOpen && (
                                <div className="absolute right-0 top-[calc(100%+8px)] w-full sm:w-[220px] bg-white rounded-[8px] shadow-xl border border-[#F3F4F6] py-2 z-50">
                                    {ADD_OPTIONS.map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionClick(option)}
                                            className="cursor-pointer w-full text-left px-5 py-3 text-[#1A1A2E] text-sm font-medium hover:bg-[#F5F5FF] transition-colors"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}