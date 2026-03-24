import { useState, useRef, useEffect } from "react"
import { ChevronDown, Download, Filter } from "lucide-react"

const ADD_OPTIONS = [
    "Business Closed Period",
    "Employee",
    "Vat Collaborator",
    "Owner",
    "Guest Profile",
]

export default function TeamHead() {
    const [employmentStatus, setEmploymentStatus] = useState<"currently-hired" | "others">("currently-hired")
    const [platformProfile] = useState("All")
    const [role] = useState("All")
    const [contractType, setContractType] = useState("All")
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">

                    <h1 className="text-[#1A1A2E] font-bold text-base">
                        Team Members
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">

                        {/* Import Members */}
                        <button className="cursor-pointer border border-[#6366F1] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] hover:bg-[#EEF2FF] transition-colors w-full sm:w-auto">
                            Import Members
                        </button>

                        {/* Export Data */}
                        <button className="cursor-pointer bg-[#EEF2FF] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center sm:justify-start gap-2 hover:bg-[#E0E7FF] transition-colors w-full sm:w-auto">
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
                                            onClick={() => setAddOpen(false)}
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

                {/* Filter Row */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">

                    {/* Employment Status */}
                    <div className="flex flex-col gap-2">
                        <span className="text-[#98A4AE] text-xs font-semibold">
                            Employment Status
                        </span>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <button
                                onClick={() => setEmploymentStatus("currently-hired")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "currently-hired"
                                        ? "border-[#6366F1] text-[#6366F1]"
                                        : "border-[#EFF4FA] text-[#0A2540]"
                                    }`}
                            >
                                Currently Hired
                            </button>

                            <button
                                onClick={() => setEmploymentStatus("others")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "others"
                                        ? "border-[#6366F1] text-[#6366F1]"
                                        : "border-[#EFF4FA] text-[#0A2540]"
                                    }`}
                            >
                                Others
                            </button>
                        </div>
                    </div>

                    {/* Platform Profile Status */}
                    <div className="flex flex-col gap-2.5">
                        <span className="text-[#98A4AE] text-xs flex items-center gap-1 font-semibold">
                            Platform Profile Status
                            <Filter size={11} className="text-[#9CA3AF]" />
                        </span>

                        <button className="cursor-pointer border border-[#6366F1] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] w-full sm:w-fit hover:bg-[#EEF2FF] transition-colors">
                            {platformProfile}
                        </button>
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-2.5">
                        <span className="text-[#98A4AE] text-xs flex items-center gap-1 font-semibold">
                            Role
                            <Filter size={11} className="text-[#9CA3AF]" />
                        </span>

                        <button className="cursor-pointer border border-[#6366F1] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] w-full sm:w-fit hover:bg-[#EEF2FF] transition-colors">
                            {role}
                        </button>
                    </div>

                    {/* Contract Type */}
                    <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                        <span className="text-[#98A4AE] text-xs font-semibold">
                            Contract Type
                        </span>

                        <div className="relative border border-gray-200 rounded-[8px] px-3 w-full sm:w-auto">
                            <select
                                value={contractType}
                                onChange={(e) => setContractType(e.target.value)}
                                className="appearance-none text-sm font-medium text-[#1A1A2E] pr-6 py-2.5 bg-transparent border-none outline-none cursor-pointer w-full"
                            >
                                <option>All</option>
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Freelance</option>
                            </select>

                            <ChevronDown
                                size={14}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1A1A2E] pointer-events-none"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}