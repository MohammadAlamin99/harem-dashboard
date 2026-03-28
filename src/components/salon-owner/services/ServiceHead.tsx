import { useState } from "react"
import { Download, Filter, Plus } from "lucide-react"
import Link from "next/link"

export default function ServiceHead({ handleOptionClick }: { handleOptionClick: (option: string) => void }) {
    const [employmentStatus, setEmploymentStatus] = useState<"currently-hired" | "others">("currently-hired")

    return (
        <div className="font-manrope">
            <div className="bg-white rounded-[8px] px-4 sm:px-6 py-5">

                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                    <h1 className="text-[#1A1A2E] font-bold text-base">Services</h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">

                        <Link href="/salon-owner/team/member/import">
                            <button className="cursor-pointer border border-[#6366F1] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] hover:bg-[#EEF2FF] transition-colors w-full sm:w-auto">
                                Import Services
                            </button>
                        </Link>

                        <button className="cursor-pointer bg-[#DDDBFF] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center sm:justify-start gap-2 hover:bg-[#E0E7FF] transition-colors w-full sm:w-auto">
                            <Download size={15} strokeWidth={2.5} />
                            Export Data
                        </button>

                        {/* Add + Dropdown */}
                        <div className="relative w-full sm:w-auto">
                            <button
                                className="cursor-pointer w-full sm:w-auto bg-[#6366F1] text-white text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#4F46E5] transition-colors"
                            >
                                <Plus
                                    size={15}
                                    strokeWidth={2.5}
                                />
                                Add Service

                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Row */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">

                    <div className="flex flex-col gap-2">
                        <div className="text-[#98A4AE] text-xs font-semibold flex items-center gap-2">
                            Categories
                            <Filter size={11} className="text-[#9CA3AF]" />
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <button
                                onClick={() => setEmploymentStatus("currently-hired")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "currently-hired" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setEmploymentStatus("others")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "others" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 1
                            </button>
                            <button
                                onClick={() => setEmploymentStatus("others")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "others" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 2
                            </button>
                            <button
                                onClick={() => setEmploymentStatus("others")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "others" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 3
                            </button>
                            <button
                                onClick={() => setEmploymentStatus("others")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${employmentStatus === "others" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 4
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}