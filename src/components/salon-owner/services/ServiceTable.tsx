"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Pencil, Trash2, Eye, Clock } from "lucide-react"
import PaginationClient from "../clients/PaginationClient"

interface Service {
    id: number
    name: string
    category: string
    duration: string
    postBreak: string
    price: string
    vat: string
}

const SERVICES: Service[] = [
    { id: 1, name: "Haircut", category: "Category 1", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 2, name: "Haircut", category: "Category 2", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 3, name: "Haircut", category: "Category 3", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 4, name: "Haircut", category: "Category 4", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 5, name: "Haircut", category: "Category 5", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 6, name: "Haircut", category: "Category 6", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 7, name: "Haircut", category: "Category 1", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 8, name: "Haircut", category: "Category 3", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 9, name: "Haircut", category: "Category 5", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
    { id: 10, name: "Haircut", category: "Category 2", duration: "45 min", postBreak: "45 min", price: "€ 270", vat: "€ 70" },
]

const CATEGORY_STYLES: Record<string, string> = {
    "Category 1": "bg-[#DDDBFF] text-[#635BFF]",
    "Category 2": "bg-[#ECFDFD] text-[#16CDC7]",
    "Category 3": "bg-[#EBFAF0] text-[#36C76C]",
    "Category 4": "bg-[#FFF9E5] text-[#FFD648]",
    "Category 5": "bg-[#FFE5ED] text-[#FF6692]",
    "Category 6": "bg-[#F6F7F9] text-[#0A2540]",
}

export default function ServiceTable() {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const ippRef = useRef<HTMLDivElement | null>(null)
    const [ippOpen, setIppOpen] = useState(false)

    const totalPages = Math.ceil(SERVICES.length / perPage)
    const paginatedServices = SERVICES.slice((page - 1) * perPage, page * perPage)
    const start = (page - 1) * perPage

    return (
        <div className="relative w-full bg-white rounded-xl p-[15px] md:p-[30px] mt-6 font-manrope">

            <div className="overflow-x-auto border rounded-[12px_12px_0px_0px] border-[#E0E6EB] border-b-0">
                <table className="w-full min-w-[900px] border-collapse">

                    <thead>
                        <tr className="bg-[#F3F3FF]">
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">Name</th>
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">Category</th>
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">Default Duration</th>
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">Post-break Min</th>
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">Price</th>
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">VAT</th>
                            <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-r border-[#E0E6EB]">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedServices.map((service) => (
                            <tr key={service.id} className="hover:bg-[#FAFBFF]">

                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <div className="flex items-center gap-2.5">
                                        <Image src="/images/avator.png" alt="" width={40} height={40} />
                                        <span className="text-[14px] font-semibold text-[#29343D]">
                                            {service.name}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <span className={`px-2 py-1 text-[12px] font-semibold rounded-lg ${CATEGORY_STYLES[service.category]}`}>
                                        {service.category}
                                    </span>
                                </td>

                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} /> {service.duration}
                                    </div>
                                </td>

                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} /> {service.postBreak}
                                    </div>
                                </td>

                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">
                                    {service.price}
                                </td>

                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">
                                    {service.vat}
                                </td>

                                <td className="px-4 py-5 border-b border-l border-r border-[#E0E6EB]">
                                    <div className="flex items-center justify-start gap-4">
                                        <button className="px-4 py-2.5 rounded-lg bg-[#EEEEFF]">
                                            <Eye size={16} className="text-[#6366F1]" />
                                        </button>
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
                filtered={SERVICES}
                margin={false}
            />
        </div>
    )
}