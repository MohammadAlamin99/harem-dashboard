"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowUp, ArrowDown, Eye, Pencil, Trash2, MoreVertical } from "lucide-react"
import PaginationClient from "../../clients/PaginationClient"
import Image from "next/image"
import { createPortal } from "react-dom"

interface StockMovement {
    id: number
    date: string
    type: "In" | "Out"
    sku: string
    productName: string
    productImage: string
    quantity: number
    status: "In Stock" | "Out of Stock"
    price: string
}

const MOVEMENTS: StockMovement[] = [
    { id: 1, date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 10, status: "In Stock", price: "€ 270" },
    { id: 2, date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Body Lotion", productImage: "/images/product.svg", quantity: 1, status: "Out of Stock", price: "€ 270" },
    { id: 3, date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 1, status: "In Stock", price: "€ 270" },
    { id: 4, date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 4, status: "In Stock", price: "€ 270" },
    { id: 5, date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 0, status: "Out of Stock", price: "€ 270" },
    { id: 6, date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 6, status: "In Stock", price: "€ 270" },
    { id: 7, date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 7, status: "In Stock", price: "€ 270" },
    { id: 8, date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Body Lotion", productImage: "/images/product.svg", quantity: 2, status: "In Stock", price: "€ 270" },
    { id: 9, date: "02/01/2025 12:00", type: "Out", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 1, status: "In Stock", price: "€ 270" },
    { id: 10, date: "02/01/2025 12:00", type: "In", sku: "PROD-2025-001", productName: "Curology Face wash", productImage: "/images/product.svg", quantity: 3, status: "In Stock", price: "€ 270" },
]

const DROPDOWN_HEIGHT = 3 * 44 + 16

function RowDropdown({ id }: { id: number }) {
    const [open, setOpen] = useState(false)
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const btnRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                btnRef.current &&
                !btnRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    // Close on any scroll
    useEffect(() => {
        const handleScroll = () => setOpen(false)
        window.addEventListener("scroll", handleScroll, true)
        return () => window.removeEventListener("scroll", handleScroll, true)
    }, [])

    const handleOpen = () => {
        if (btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPos({
                top: spaceBelow < DROPDOWN_HEIGHT
                    ? rect.top - DROPDOWN_HEIGHT - 6  // flip upward
                    : rect.bottom + 6,               // show below
                left: rect.right - 176,
            })
        }
        setOpen((p) => !p)
    }

    const dropdown = open ? (
        <div
            ref={dropdownRef}
            style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
            className="bg-white border border-[#E0E6EB] rounded-[8px] shadow-lg py-1 w-44 overflow-hidden"
        >
            <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-[#29343D] hover:bg-[#FAFBFF] transition-colors cursor-pointer"
            >
                <Eye size={14} className="text-[#635BFF]" />
                View Details
            </button>
            <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-[#29343D] hover:bg-[#FAFBFF] transition-colors cursor-pointer"
            >
                <Pencil size={14} className="text-[#46CAEB]" />
                Edit
            </button>
            <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-[#29343D] hover:bg-[#FAFBFF] transition-colors cursor-pointer"
            >
                <Trash2 size={14} className="text-[#FF6692]" />
                Delete
            </button>
        </div>
    ) : null

    return (
        <>
            <button
                ref={btnRef}
                onClick={handleOpen}
                className="px-2 py-1 rounded-lg hover:bg-[#F3F3FF] transition-colors cursor-pointer"
            >
                <MoreVertical size={16} className="text-[#29343D]" />
            </button>
            {typeof window !== "undefined" && createPortal(dropdown, document.body)}
        </>
    )
}

export default function InventoryStockTable() {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const ippRef = useRef<HTMLDivElement | null>(null)
    const [ippOpen, setIppOpen] = useState(false)

    const totalPages = Math.ceil(MOVEMENTS.length / perPage)
    const paginated = MOVEMENTS.slice((page - 1) * perPage, page * perPage)
    const start = (page - 1) * perPage

    return (
        <div className="relative w-full bg-white rounded-xl p-[15px] md:p-[30px] mt-6 font-manrope">
            <div className="overflow-x-auto border rounded-[12px_12px_0px_0px] border-[#E0E6EB] border-b-0">
                <table className="w-full min-w-[600px] border-collapse">

                    {/* HEADER */}
                    <thead>
                        <tr className="bg-[#F3F3FF]">
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-[#E0E6EB]">Date</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">Type</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">SKU</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">Product Name</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">Quantity</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">Status</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">Price</th>
                            <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-l border-[#E0E6EB]">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {paginated.map((row) => (
                            <tr key={row.id} className="hover:bg-[#FAFBFF]">
                                <td className="px-4 py-5 border-b border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">{row.date}</td>
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <div className="flex items-center gap-1.5">
                                        {row.type === "Out" ? (
                                            <ArrowUp width={18} height={18} className="text-[#FF6692]" />
                                        ) : (
                                            <ArrowDown width={18} height={18} className="text-[#36C76C]" />
                                        )}
                                        <span className="text-[14px] font-semibold text-[#29343D]">{row.type}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">{row.sku}</td>
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-[#F3F3FF] overflow-hidden flex-shrink-0">
                                            <Image
                                                src={row.productImage}
                                                alt={row.productName}
                                                className="w-full h-full object-cover"
                                                width={56}
                                                height={56}
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                                            />
                                        </div>
                                        <span className="text-[14px] font-semibold text-[#29343D]">{row.productName}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">{row.quantity}</td>
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <span className={`px-2 py-1 text-[12px] font-semibold rounded-lg ${row.status === "In Stock" ? "bg-[#EBFAF0] text-[#36C76C]" : "bg-[#FFE5ED] text-[#FF6692]"}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-5 border-b border-l border-[#E0E6EB] text-[14px] font-semibold text-[#29343D]">{row.price}</td>
                                <td className="w-[80px] px-4 py-5 border-b border-l border-[#E0E6EB]">
                                    <RowDropdown id={row.id} />
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
                filtered={MOVEMENTS}
                margin={false}
            />
        </div>
    )
}