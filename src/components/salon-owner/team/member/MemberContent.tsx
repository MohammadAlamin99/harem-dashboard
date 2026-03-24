import { useEffect, useRef, useState } from 'react'
import TeamHead from '../TeamHead'
import PaginationClient from '../../clients/PaginationClient';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import MemberActionDropdown from './MemberActionDropdown';
import ClosedPeriodModal from './ClosePeriodModal';
import AddEmployeePopup from './AddEmployeePopup';

interface Client {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    roleColor: "green" | "yellow";
    status: "Active" | "Pending" | "Inactive";
    employmentStatus: string;
    contractType: string;
    contractColor: "green" | "yellow" | "pink";
    lastActive: string;
}

const CLIENTS: Client[] = Array.from({ length: 9 }, (_, i) => ({
    id: `c${i + 1}`,
    name: "Maria Rodriguez",
    email: "maria@beautywellness.com",
    avatar: "/images/avator.png",
    role: i === 0 ? "Manager" : "Staff",
    roleColor: i === 0 ? "green" : "yellow",
    status: (["Active", "Pending", "Pending", "Active", "Active", "Active", "Pending", "Inactive", "Inactive"] as const)[i],
    employmentStatus: i >= 7 ? "Out of Team: 02/02/2025" : "Currently Hired",
    contractType: (["Full Time", "Part Time", "Full Time", "Stage", "Vat collaboration", "Part Time", "Part Time", "Full Time", "Full Time"] as const)[i],
    contractColor: (["green", "yellow", "green", "yellow", "pink", "yellow", "yellow", "green", "green"] as const)[i],
    lastActive: "1h ago",
}));

const STATUS_STYLES: Record<string, string> = {
    Active: "bg-[#36C76C] text-white",
    Pending: "bg-[#FFD648] text-white",
    Inactive: "bg-[#FF6692] text-white",
};

const ROLE_STYLES: Record<string, string> = {
    green: "bg-[#ECFDFD] text-[#16CDC7]",
    yellow: "bg-[#FFF9E5] text-[#FF9837]",
};

const CONTRACT_STYLES: Record<string, string> = {
    green: "border border-[#22C55E] text-[#22C55E]",
    yellow: "border border-[#FFD648] text-[#FFD648]",
    pink: "border border-[#FF6692] text-[#FF6692]",
};

const EMPLOYMENT_STYLES = (val: string) =>
    val.startsWith("Out") ? "bg-[#FFE5ED] text-[#FF6692]" : "bg-[#EFF4FA] text-[#29343D]";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

export default function MemberContent() {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [ippOpen, setIppOpen] = useState(false);
    const ippRef = useRef<HTMLDivElement | null>(null);
    const [addOpen, setAddOpen] = useState(false)
    const [showClosedPeriodModal, setShowClosedPeriodModal] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [description, setDescription] = useState("")
    const [showEmployeePopup, setShowEmployeePopup] = useState(false)

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (ippRef.current && !ippRef.current.contains(e.target as Node))
                setIppOpen(false);
        };
        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    const filtered = CLIENTS;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);



    function handleOptionClick(option: string) {
        setAddOpen(false)
        if (option === "Business Closed Period") {
            setShowClosedPeriodModal(true)
        }
        if (option === "Employee") {
            setShowEmployeePopup(true)
        }
    }

    return (
        <>
            <div className='flex flex-col gap-6 font-manrope'>
                <TeamHead handleOptionClick={handleOptionClick} />
                {/* Table */}
                <div className='bg-white rounded-xl pt-6 overflow-hidden'>
                    <div className="overflow-x-auto mx-[15px] md:mx-[30px] rounded-[12px_12px_0px_0px] border border-[#E0E6EB]">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[#F3F3FF]">
                                    {/* Name column */}
                                    <th className="px-5 py-7 text-left">
                                        <span className="text-sm font-semibold text-[#29343D]">Name</span>
                                    </th>

                                    {["Role", "Status", "Employment Status", "Contract Type", "Last Active", "Actions"].map((h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-4 text-left text-sm font-semibold text-[#29343D] whitespace-nowrap border-l border-[#E0E6EB]"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {paginated.map((client) => (
                                    <tr
                                        key={client.id}
                                        className="border-t border-[#E0E6EB] transition-colors hover:bg-[#FAFAFE]"
                                    >
                                        {/* Name */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#F0F2F5]">
                                                    <Image src={client.avatar} alt={client.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#29343D]">{client.name}</p>
                                                    <p className="text-xs text-[#98A4AE] mt-0.5">{client.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-4 py-5 border-l border-[#E0E6EB]">
                                            <span className={`text-sm rounded-full px-2.5 py-1.5 font-semibold ${ROLE_STYLES[client.roleColor]}`}>
                                                {client.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-5 border-l border-[#E0E6EB]">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[client.status]}`}>
                                                {client.status}
                                            </span>
                                        </td>

                                        {/* Employment Status */}
                                        <td className="px-4 py-5 border-l border-[#E0E6EB]">
                                            <span className={`text-sm font-medium px-2.5 py-1.5 rounded-full ${EMPLOYMENT_STYLES(client.employmentStatus)}`}>
                                                {client.employmentStatus}
                                            </span>
                                        </td>

                                        {/* Contract Type */}
                                        <td className="px-4 py-5 border-l border-[#E0E6EB]">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CONTRACT_STYLES[client.contractColor]}`}>
                                                {client.contractType}
                                            </span>
                                        </td>

                                        {/* Last Active */}
                                        <td className="px-4 py-5 text-sm text-[#29343D] border-l border-[#E0E6EB]">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} className="text-[#98A4AE]" />
                                                {client.lastActive}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-4 border-l border-[#E0E6EB]">
                                            <MemberActionDropdown clientId={client.id} />
                                        </td>
                                    </tr>
                                ))}

                                {paginated.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center text-sm text-[#98A4AE]">
                                            No members found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <PaginationClient
                        margin={true}
                        ippRef={ippRef}
                        setIppOpen={setIppOpen}
                        itemsPerPage={itemsPerPage}
                        ippOpen={ippOpen}
                        ITEMS_PER_PAGE_OPTIONS={ITEMS_PER_PAGE_OPTIONS}
                        setItemsPerPage={setItemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        start={start}
                        filtered={filtered}
                    />
                </div>

                {/* Modal */}
                {showClosedPeriodModal && (
                    <ClosedPeriodModal onClose={() => setShowClosedPeriodModal(false)}
                        handleOptionClick={handleOptionClick}
                        addOpen={addOpen}
                        setAddOpen={setAddOpen}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        description={description}
                        setDescription={setDescription}
                    />
                )}
                {showEmployeePopup && (
                    <AddEmployeePopup onClose={() => setShowEmployeePopup(false)} />
                )}
            </div>
        </>
    )
}