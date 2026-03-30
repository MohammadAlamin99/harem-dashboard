"use client"

import { useState, useRef } from "react"
import { Pencil, Trash2 } from "lucide-react"
import PaginationClient from "../../clients/PaginationClient"

interface Category {
    id: number
    name: string
    totalServices: number
}

const CATEGORIES: Category[] = [
    { id: 1, name: "Category 1", totalServices: 1 },
    { id: 2, name: "Category 2", totalServices: 1 },
    { id: 3, name: "Category 3", totalServices: 1 },
    { id: 4, name: "Category 4", totalServices: 1 },
    { id: 5, name: "Category 5", totalServices: 1 },
    { id: 6, name: "Category 6", totalServices: 1 },
]

const CATEGORY_STYLES: Record<string, string> = {
    "Category 1": "bg-[#DDDBFF] text-[#635BFF]",
    "Category 2": "bg-[#ECFDFD] text-[#16CDC7]",
    "Category 3": "bg-[#EBFAF0] text-[#36C76C]",
    "Category 4": "bg-[#FFF9E5] text-[#FFD648]",
    "Category 5": "bg-[#FFE5ED] text-[#FF6692]",
    "Category 6": "bg-[#F6F7F9] text-[#0A2540]",
}

export default function CategoryTable() {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const ippRef = useRef<HTMLDivElement | null>(null)
    const [ippOpen, setIppOpen] = useState(false)

    const totalPages = Math.ceil(CATEGORIES.length / perPage)
    const paginated = CATEGORIES.slice((page - 1) * perPage, page * perPage)
    const start = (page - 1) * perPage

    return (
        <div className="relative w-full bg-white rounded-xl p-[15px] md:p-[30px] mt-6 font-manrope">

            <div className="overflow-x-auto border rounded-[12px_12px_0px_0px] border-[#E0E6EB] border-b-0">
                <table className="w-full min-w-[600px] border-collapse">

                    {/* HEADER */}
                    <thead>
                        <tr className="bg-[#F3F3FF]">
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b  border-[#E0E6EB]">
                                Category
                            </th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">
                                Related Services
                            </th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {paginated.map((cat) => (
                            <tr key={cat.id} className="hover:bg-[#FAFBFF]">

                                {/* CATEGORY */}
                                <td className="px-4 py-5 border-b border-[#E0E6EB]">
                                    <span className={`px-2 py-1 text-[12px] font-semibold rounded-lg ${CATEGORY_STYLES[cat.name]}`}>
                                        {cat.name}
                                    </span>
                                </td>

                                {/* RELATED SERVICES */}
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">
                                    {cat.totalServices}
                                </td>

                                {/* ACTIONS */}
                                <td className="w-[120px] px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <div className="flex items-center gap-4">
                                        <button className="px-4 py-2.5 rounded-lg bg-[#E6FAFF]">
                                            <Pencil size={16} className="text-[#46CAEB]" />
                                        </button>

                                        <button className="px-4 py-2.5 rounded-lg bg-[#FFF1F5]">
                                            <Trash2 size={16} className="text-[#FF6692]" />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* PAGINATION */}
            <PaginationClient
                ippRef={ippRef}
                setIppOpen={setIppOpen}
                itemsPerPage={perPage}
                ippOpen={ippOpen}
                ITEMS_PER_PAGE_OPTIONS={[5, 10, 20]}
                setItemsPerPage={setPerPage}
                currentPage={page}
                setCurrentPage={setPage}
                totalPages={totalPages}
                start={start}
                filtered={CATEGORIES}
                margin={false}
            />
        </div>
    )
}