"use client"
import { useState } from "react"
import { Download, Search } from "lucide-react"
import SalaryPaymentModal from "./Salarypaymentmodal"
import { SalaryMember } from "@/@types/salon-owner/salaryMember.type"
import SalaryTable from "./SalaryTable"
import SalaryPaymentTable from "./SalaryPaymentTable"



const PENDING: SalaryMember[] = Array.from({ length: 5 }, (_, i) => ({
    id: `p${i + 1}`,
    name: "Maria Rodriguez",
    uploadedBy: "Mario Rossi",
    avatar: "/images/avator.png",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "Under Review",
    grossSalary: "€ 3,200.00",
    netSalary: "€ 2,600.00",
    trf: "€ 600.00",
    cumulativeTrf: "€ 3,800.00",
    iban: "IT60 X054 ******** 123",
}))
const HISTORY: SalaryMember[] = Array.from({ length: 1 }, (_, i) => ({
    id: `p${i + 1}`,
    name: "Maria Rodriguez",
    uploadedBy: "Mario Rossi",
    avatar: "/images/avator.png",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "Under Review",
    grossSalary: "€ 3,200.00",
    netSalary: "€ 2,600.00",
    trf: "€ 600.00",
    cumulativeTrf: "€ 3,800.00",
    iban: "IT60 X054 ******** 123",
}))

interface HistoryGroup {
    month: string
    totalAmount: string
    payments: number
    members: SalaryMember[]
}

const HISTORY_GROUPS: HistoryGroup[] = [
    {
        month: "December 2024",
        totalAmount: "€ 16,000.00",
        payments: 5,
        members: Array.from({ length: 5 }, (_, i) => ({
            id: `dec${i + 1}`,
            name: "Maria Rodriguez",
            uploadedBy: "Mario Rossi",
            avatar: "/images/avator.png",
            role: "Staff",
            netAmount: "€ 3,200.00",
            month: "December 2024",
            date: "Dec 01, 2024",
            status: (["Under Review", "Approved", "Under Review", "Under Review", "Under Review"] as const)[i],
            grossSalary: "€ 3,200.00",
            netSalary: "€ 2,600.00",
            trf: "€ 600.00",
            cumulativeTrf: "€ 3,800.00",
            iban: "IT60 X054 ******** 123",
        })),
    },
    {
        month: "November 2024",
        totalAmount: "€ 16,000.00",
        payments: 5,
        members: Array.from({ length: 5 }, (_, i) => ({
            id: `nov${i + 1}`,
            name: "Maria Rodriguez",
            uploadedBy: "Mario Rossi",
            avatar: "/images/avator.png",
            role: "Staff",
            netAmount: "€ 3,200.00",
            month: "December 2024",
            date: "Dec 01, 2024",
            status: (["Under Review", "Approved", "Under Review", "Under Review", "Under Review"] as const)[i],
            grossSalary: "€ 3,200.00",
            netSalary: "€ 2,600.00",
            trf: "€ 600.00",
            cumulativeTrf: "€ 3,800.00",
            iban: "IT60 X054 ******** 123",
        })),
    },
]

const STATUS_STYLES: Record<string, string> = {
    "Under Review": "bg-[#FFD648] text-white",
    "Approved": "bg-[#22C55E] text-white",
    "Paid": "bg-[#6366F1] text-white",
}


export default function SalariesContent() {
    const [activeTab, setActiveTab] = useState<"pending" | "history">("pending")
    const [search, setSearch] = useState("")
    const [expandedId, setExpandedId] = useState<string | null>("p1")
    const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>("p1")
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState<{
        name: string; role: string; avatar: string; amount: string;
        month: string; iban: string; grossSalary: string;
    } | undefined>(undefined)

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }
    const toggleHistoryExpand = (id: string) => {
        setExpandedHistoryId((prev) => (prev === id ? null : id))
    }

    function handlePayClick(member: SalaryMember) {
        setSelectedMember({
            name: member.name,
            role: member.role,
            avatar: member.avatar,
            amount: member.netAmount,
            month: member.month,
            iban: member.iban,
            grossSalary: member.grossSalary,
        })
        setModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-[#F3F4FA] font-manrope">
            <SalaryPaymentModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                member={selectedMember}
            />

            <div className="bg-white rounded-xl mb-4 py-4">

                {/* Header */}
                <div className="bg-white rounded-xl px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between py-2.5 gap-3 sm:gap-0">
                    <h1 className="text-[#29343D] font-bold text-base">Salaries</h1>
                    <button className="bg-[#DDDBFF] text-[#635BFF] text-sm font-medium px-4 py-2.5 rounded-[8px] flex items-center gap-2 hover:bg-[#E0E7FF] transition-colors cursor-pointer">
                        <Download size={14} strokeWidth={2.5} />
                        Export Data
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl px-4 sm:px-6 mt-4">
                    <div className="flex flex-col gap-6 md:flex-row items-center justify-between">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E0E6EB] w-fit gap-2 sm:gap-0">
                            {/* Tab Buttons */}
                            <div className="flex flex-wrap gap-0 md:gap-2.5">
                                <button
                                    onClick={() => setActiveTab("pending")}
                                    className={`py-3.5 px-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${activeTab === "pending" ? "border-[#6366F1] text-[#6366F1]" : "border-transparent text-[#98A4AE]"
                                        }`}
                                >
                                    Pending Approval (5)
                                </button>
                                <button
                                    onClick={() => setActiveTab("history")}
                                    className={`py-3.5 px-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${activeTab === "history" ? "border-[#6366F1] text-[#6366F1]" : "border-transparent text-[#98A4AE]"
                                        }`}
                                >
                                    Payment History (10)
                                </button>
                            </div>
                        </div>
                        {/* Search bar (only in history tab) */}
                        {activeTab === "history" && (
                            <div className="relative mb-1 w-full sm:w-auto">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#29343D]" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search"
                                    className="pl-9 pr-4 py-2 text-sm border border-[#E0E6EB] rounded-[8px] outline-none focus:border-[#6366F1] w-full sm:w-[240px] text-[#1A1A2E] placeholder:text-[#98A4AE]"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* ── PENDING TAB ── */}
            {activeTab === "pending" && (
                <>
                    <div className="bg-white rounded-xl mb-4 overflow-hidden px-4 sm:px-6 py-6">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                            <h2 className="text-[#29343D] font-bold text-base">Pending Review</h2>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">

                                {/* Search */}
                                <div className="relative w-full sm:w-[240px]">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#29343D]" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search"
                                        className="pl-9 pr-4 py-2 text-sm border border-[#E0E6EB] rounded-[8px] outline-none focus:border-[#6366F1] w-full text-[#29343D] placeholder:text-[#98A4AE]"
                                    />
                                </div>

                                {/* Buttons */}
                                <button className="cursor-pointer bg-[#FFE5ED] text-[#FF6692] text-sm font-medium px-4 py-2.5 rounded-[8px] hover:bg-red-50 transition-colors w-full sm:w-auto">
                                    Reapproval All (5)
                                </button>
                                <button className="cursor-pointer bg-[#16CDC7] text-white text-sm font-medium px-4 py-2.5 rounded-[8px] hover:bg-[#18dfd8] transition-colors w-full sm:w-auto">
                                    Approval All (5)
                                </button>
                            </div>
                        </div>

                        {/* Salary Table */}
                        <div className="my-4 overflow-x-auto">
                            <SalaryTable
                                members={PENDING}
                                expandedId={expandedId}
                                toggleExpand={toggleExpand}
                                showActions={true}
                                onPayClick={handlePayClick}
                                STATUS_STYLES={STATUS_STYLES}
                            />
                        </div>

                        {/* Total Amount */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border rounded-xl p-5 border-[#E0E6EB] bg-[#FAFAFA] gap-2 sm:gap-0">
                            <span className="text-sm font-semibold text-[#29343D]">Total Amount</span>
                            <span className="bg-[#6366F1] text-white text-sm font-semibold px-4 py-1.5 rounded-full">€16,000.00</span>
                        </div>

                        {/* Payment History Table */}
                        <div className="mt-4 overflow-x-auto">
                            <SalaryPaymentTable
                                members={HISTORY}
                                expandedId={expandedHistoryId}
                                toggleExpand={toggleHistoryExpand}
                                totalAmount="€ 3,200.00"
                            />
                        </div>
                    </div>
                </>
            )}

            {/* ── HISTORY TAB ── */}
            {activeTab === "history" && (
                <div className="flex flex-col gap-4">
                    {HISTORY_GROUPS.map((group) => (
                        <div key={group.month} className="bg-white rounded-xl overflow-hidden">
                            {/* Group Header */}
                            <div className="flex items-center justify-between mx-6 py-4 bg-[#F3F3FF] rounded-xl px-4 mt-[30px]">
                                <p className="text-[#6366F1] font-bold text-sm">{group.month}</p>
                                <div className="text-right">
                                    <p className="text-[#1A1A2E] font-bold text-sm">{group.totalAmount}</p>
                                    <p className="text-[10px] text-[#98A4AE]">{group.payments} Payments</p>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="mx-6 my-4">
                                <SalaryTable
                                    members={group.members}
                                    expandedId={expandedId}
                                    toggleExpand={toggleExpand}
                                    showActions={false}
                                    STATUS_STYLES={STATUS_STYLES}
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-6 py-4 border border-[#E0E6EB] rounded-xl mx-6 mb-[30px] bg-[#FAFAFA]">
                                <span className="text-sm font-semibold text-[#29343D]">Month Total</span>
                                <div className="flex items-center gap-6">
                                    <span className="text-sm font-semibold text-[#29343D]">Average Salary</span>
                                    <span className="bg-[#6366F1] text-white text-sm font-semibold px-4 py-1.5 rounded-full">{group.totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}