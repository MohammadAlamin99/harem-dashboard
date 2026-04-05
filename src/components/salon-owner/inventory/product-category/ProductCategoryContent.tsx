import React, { useRef, useState } from 'react'
import PageHeaderWithButton from '../../common-component/PageHeaderWithButton'
import { Download, Pencil, Plus, Trash2 } from 'lucide-react'
import PaginationClient from '../../clients/PaginationClient'
import AddCategoryModal from './AddCategoryModal'
import { useRouter } from 'next/navigation'

export default function ProductCategoryContent() {
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
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const ippRef = useRef<HTMLDivElement | null>(null)
    const [ippOpen, setIppOpen] = useState(false)
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
    const totalPages = Math.ceil(CATEGORIES.length / perPage)
    const paginated = CATEGORIES.slice((page - 1) * perPage, page * perPage)
    const start = (page - 1) * perPage
    const router = useRouter()

    return (
        <div>
            <PageHeaderWithButton
                title="Categores"
                buttons={[
                    // {
                    //     label: "Import Services",
                    //     href: "/salon-owner/team/member/import",
                    //     variant: "outline",
                    // },
                    {
                        label: "Export Data",
                        icon: <Download size={15} strokeWidth={2.5} />,
                        onClick: () => console.log("Export clicked"),
                        variant: "secondary",
                    },
                    {
                        label: "Add Categores",
                        icon: <Plus size={15} strokeWidth={2.5} />,
                        onClick: () => setIsAddCategoryModalOpen(true),
                        variant: "primary",
                    },
                ]}
            />

            {/* table */}
            <div className="relative w-full bg-white rounded-xl p-[15px] md:p-[30px] mt-6 font-manrope">

                <div className="overflow-x-auto border rounded-[12px_12px_0px_0px] border-[#E0E6EB] border-b-0">
                    <table className="w-full min-w-[600px] border-collapse">

                        {/* HEADER */}
                        <thead>
                            <tr className="bg-[#F3F3FF]">
                                <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-[#E0E6EB]">
                                    Category
                                </th>
                                <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-[#E0E6EB]">
                                    Related Products
                                </th>
                                <th className="px-4 py-7 text-left text-[14px] font-semibold text-[#29343D] border-b border-[#E0E6EB]">
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
                                            <button className="px-4 py-2.5 rounded-lg bg-[#F1F2FE] cursor-pointer" onClick={() => router.push(`/salon-owner/inventory/product-category/view-category/${cat.id}`)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M7.99963 3.5C11.0498 3.5 13.6659 5.35472 14.7916 8C13.6659 10.6453 11.0498 12.5 7.99963 12.5C4.94955 12.4999 2.33329 10.6453 1.20764 8C2.33329 5.35469 4.94955 3.50013 7.99963 3.5ZM7.99963 4.16699C6.98324 4.16708 6.00845 4.57045 5.28967 5.28906C4.57078 6.00795 4.16663 6.98334 4.16663 8C4.16663 9.01666 4.57078 9.99205 5.28967 10.7109C6.00845 11.4295 6.98324 11.8329 7.99963 11.833C9.01622 11.833 9.9917 11.4297 10.7106 10.7109C11.4295 9.99205 11.8336 9.01666 11.8336 8C11.8336 6.98334 11.4295 6.00795 10.7106 5.28906C9.9917 4.57027 9.01622 4.16699 7.99963 4.16699ZM7.99963 6.5C8.39738 6.5 8.77889 6.65825 9.06018 6.93945C9.34149 7.22076 9.49963 7.60218 9.49963 8C9.49963 8.39782 9.34149 8.77924 9.06018 9.06055C8.77889 9.34175 8.39738 9.5 7.99963 9.5C7.60193 9.49991 7.22031 9.34177 6.93909 9.06055C6.65788 8.77926 6.49963 8.39775 6.49963 8C6.49963 7.60225 6.65788 7.22074 6.93909 6.93945C7.22031 6.65823 7.60193 6.50009 7.99963 6.5Z" fill="#635BFF" stroke="#635BFF" />
                                                </svg>
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

            {/* add category modal */}
            {
                isAddCategoryModalOpen && (
                    <AddCategoryModal
                        open={isAddCategoryModalOpen}
                        onClose={() => setIsAddCategoryModalOpen(false)}
                    />
                )
            }
        </div>
    )
}
