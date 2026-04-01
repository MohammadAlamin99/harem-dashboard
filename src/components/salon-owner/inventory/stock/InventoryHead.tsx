import { useState } from "react"
import { Download, Filter, Plus } from "lucide-react"
import ICalaender from "@/app/account-protal/svg/ICalaender"

export default function InventoryHead({ setShowModal, handleOptionClick }: { setShowModal: (value: boolean) => void, handleOptionClick: (option: string) => void }) {
    const [dateFilter, setDateFilter] = useState<"all" | string>("all")
    const [movementFilter, setMovementFilter] = useState<"all" | "stock-in" | "stock-out">("all")
    const [categoryFilter, setCategoryFilter] = useState<"all" | "cat1" | "cat2" | "cat3">("all")
    const [statusFilter, setStatusFilter] = useState<"all" | "in-stock" | "out-of-stock">("all")

    return (
        <div className="font-manrope">
            <div className="bg-white rounded-[8px] px-4 sm:px-6 py-5">

                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
                    <h1 className="text-[#1A1A2E] font-bold text-base">Stock In / Stock Out</h1>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">
                        <button className="cursor-pointer bg-[#DDDBFF] text-[#6366F1] text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center sm:justify-start gap-2 hover:bg-[#E0E7FF] transition-colors w-full sm:w-auto">
                            <Download size={15} strokeWidth={2.5} />
                            Export Data
                        </button>

                        <button onClick={() => setShowModal(true)} className="cursor-pointer bg-[#6366F1] text-white text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#4F46E5] transition-colors w-full sm:w-auto">
                            <Plus size={15} strokeWidth={2.5} />
                            Add Movement
                        </button>
                    </div>
                </div>

                {/* Filter Row */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-6">

                    {/* Date Filter */}
                    <div className="flex flex-col gap-2">
                        <div className="text-[#98A4AE] text-xs font-semibold">
                            Date
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setDateFilter("all")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors flex items-center gap-8 ${dateFilter === "all" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                All
                                <ICalaender size={16} color="#29343D" />
                            </button>
                        </div>
                    </div>

                    {/* Movement Filter */}
                    <div className="flex flex-col gap-2">
                        <div className="text-[#98A4AE] text-xs font-semibold">
                            Movement
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <button
                                onClick={() => setMovementFilter("all")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${movementFilter === "all" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setMovementFilter("stock-in")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${movementFilter === "stock-in" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Stock In
                            </button>
                            <button
                                onClick={() => setMovementFilter("stock-out")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${movementFilter === "stock-out" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Stock Out
                            </button>
                        </div>
                    </div>

                    {/* Categories Filter */}
                    <div className="flex flex-col gap-2">
                        <div className="text-[#98A4AE] text-xs font-semibold flex items-center gap-2">
                            Categories
                            <Filter size={11} className="text-[#9CA3AF]" />
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <button
                                onClick={() => setCategoryFilter("all")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${categoryFilter === "all" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setCategoryFilter("cat1")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${categoryFilter === "cat1" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 1
                            </button>
                            <button
                                onClick={() => setCategoryFilter("cat2")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${categoryFilter === "cat2" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 2
                            </button>
                            <button
                                onClick={() => setCategoryFilter("cat3")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${categoryFilter === "cat3" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Category 3
                            </button>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex flex-col gap-2">
                        <div className="text-[#98A4AE] text-xs font-semibold">
                            Status
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${statusFilter === "all" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setStatusFilter("in-stock")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${statusFilter === "in-stock" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                In Stock
                            </button>
                            <button
                                onClick={() => setStatusFilter("out-of-stock")}
                                className={`cursor-pointer text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-colors w-full sm:w-auto ${statusFilter === "out-of-stock" ? "border-[#6366F1] text-[#6366F1]" : "border-[#EFF4FA] text-[#0A2540]"}`}
                            >
                                Out of Stock
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}