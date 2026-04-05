"use client"

import { useState, useRef } from "react"
import { MoreVertical } from "lucide-react"
import PaginationClient from "../clients/PaginationClient"
import BottomStatusBar from "./BottomStatusBar"
import { useRouter } from "next/navigation"

export interface DropdownAction<T> {
    label: string
    icon?: React.ReactNode
    onClick: (item: T) => void
}

export interface Column<T> {
    key: keyof T | (string & {})
    label: string
    render?: (item: T) => React.ReactNode
    className?: string
}

interface TableProps<T> {
    data: T[]
    columns: Column<T>[]
    perPageOptions?: number[]
    defaultPerPage?: number
    dropdownActions?: DropdownAction<T>[]
    tableTitle?: string
    showPagination?: boolean
    showBottomStatusBar?: boolean
    onRoute?: string
}

export const CATEGORY_STYLES: Record<string, string> = {
    "Category 1": "bg-[#DDDBFF] text-[#635BFF]",
    "Category 2": "bg-[#ECFDFD] text-[#16CDC7]",
    "Category 3": "bg-[#EBFAF0] text-[#36C76C]",
    "Category 4": "bg-[#FFF9E5] text-[#FFD648]",
    "Category 5": "bg-[#FFE5ED] text-[#FF6692]",
    "Category 6": "bg-[#F6F7F9] text-[#0A2540]",
}

export default function Table<T extends { id: number | string }>({
    data,
    columns,
    defaultPerPage = 5,
    perPageOptions = [5, 10, 20],
    dropdownActions,
    tableTitle,
    showPagination = true,
    showBottomStatusBar = false,
    onRoute,
}: TableProps<T>) {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(defaultPerPage)
    const ippRef = useRef<HTMLDivElement | null>(null)
    const [ippOpen, setIppOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<number | string | null>(null)
    const router = useRouter()

    const totalPages = Math.ceil(data.length / perPage)
    const paginatedData = data.slice((page - 1) * perPage, page * perPage)
    const start = (page - 1) * perPage

    return (
        <div className="relative w-full bg-white rounded-xl p-[15px] md:p-[30px] mt-6 font-manrope">
            {tableTitle && <h3 className="text-base font-bold text-[#29343D] font-manrope mb-4">{tableTitle}</h3>}
            <div className="overflow-x-auto border rounded-[12px_12px_0px_0px] border-[#E0E6EB] border-b-0">
                <table className="w-full min-w-[900px] border-collapse">

                    <thead>
                        <tr className="bg-[#F3F3FF]">
                            {columns.map((col, colIdx) => (
                                <th
                                    key={String(col.key)}
                                    className={`px-4 py-7 text-left font-bold text-[#29343D] border-b border-[#E0E6EB] ${colIdx !== 0 ? "border-l" : ""} ${col.className ?? ""}`}
                                >
                                    {col.label}
                                </th>
                            ))}
                            {dropdownActions && (
                                <th className="px-4 py-7 text-left font-bold text-[#29343D] border-b border-l border-[#E0E6EB]">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="hover:bg-[#FAFBFF]">
                                {columns.map((col, colIdx) => (
                                    <td
                                        key={String(col.key)}
                                        className={`px-4 py-5 border-b border-[#E0E6EB] ${colIdx !== 0 ? "border-l" : ""} ${col.className ?? ""}`}
                                    >
                                        {col.render ? col.render(item) : (item[col.key as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                                {dropdownActions && (
                                    <td className="w-[80px] px-4 py-5 border-b border-l border-[#E0E6EB]">
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                                                className="px-2 py-1 rounded-lg hover:bg-[#F3F3FF] transition-colors"
                                            >
                                                <MoreVertical size={16} className="text-[#29343D]" />
                                            </button>

                                            {openDropdown === item.id && (
                                                <div className="absolute right-0 top-8 z-10 bg-white border border-[#E0E6EB] rounded-[8px] shadow-2xl py-1 min-w-[150px]">
                                                    {dropdownActions.map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => {
                                                                action.onClick(item)
                                                                if (onRoute) {
                                                                    router.push(`${onRoute}/${item.id}`)
                                                                }
                                                                setOpenDropdown(null)
                                                            }}
                                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-[#29343D] hover:bg-[#FAFBFF] transition-colors cursor-pointer"
                                                        >
                                                            {action.icon}
                                                            {action.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {showPagination && (
                <PaginationClient
                    ippRef={ippRef}
                    setIppOpen={setIppOpen}
                    itemsPerPage={perPage}
                    ippOpen={ippOpen}
                    ITEMS_PER_PAGE_OPTIONS={perPageOptions}
                    setItemsPerPage={setPerPage}
                    currentPage={page}
                    setCurrentPage={setPage}
                    totalPages={totalPages}
                    start={start}
                    filtered={data}
                    margin={false}
                />
            )}

            {
                showBottomStatusBar && (
                    <div className="mt-4">
                        <BottomStatusBar stats={[
                            {
                                label: "Total Days Worked",
                                value: "21 Days",
                            },
                            {
                                label: "Total Shifts",
                                value: 2,
                            },
                            {
                                label: "Total Revenue",
                                value: "165h",
                            },
                        ]} />
                    </div>
                )
            }
        </div>
    )
}