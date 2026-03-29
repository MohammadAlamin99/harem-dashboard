"use client"

import { useState } from "react"
import PageHeaderWithButton from "../common-component/PageHeaderWithButton"
import HeaderFilter from "../common-component/HeaderFilter"
import { Eye, RefreshCw, Printer } from "lucide-react"
import Table, { Column } from "../common-component/Table"

interface Payment {
    id: number
    paymentDate: string
    client: { name: string; email: string }
    teamMember: { name: string; email: string }
    method: string | string[]
    status: "Fully Paid" | "Half Paid" | "Not Paid"
    receiptIssue: "Completed" | "Half Printed" | "Not Issued" | null
}

const STATUS_STYLES: Record<string, string> = {
    "Fully Paid": "bg-[#36C76C] text-[#fff]",
    "Half Paid": "bg-[#FFD648] text-[#fff]",
    "Not Paid": "bg-[#FF6692] text-[#fff]",
}

const RECEIPT_STYLES: Record<string, string> = {
    "Completed": "border border-[#36C76C] text-[#36C76C]",
    "Half Printed": "border border-[#FFD648] text-[#FFD648]",
    "Not Issued": "border border-[#FF6692] text-[#FF6692]",
}

const METHOD_STYLES: Record<string, string> = {
    "Cash": "bg-[#EBFAF0] text-[#36C76C]",
    "Card Terminal": "bg-[#DDDBFF] text-[#635BFF]",
    "Online Payment": "bg-[#ECFDFD] text-[#16CDC7]",
    "Gift Card": "bg-[#FFF9E5] text-[#FFD648]",
}

const payments: Payment[] = [
    { id: 1, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Cash", status: "Fully Paid", receiptIssue: "Completed" },
    { id: 2, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptIssue: "Not Issued" },
    { id: 3, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Gift Card", status: "Half Paid", receiptIssue: "Half Printed" },
    { id: 4, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Online Payment", status: "Not Paid", receiptIssue: "Not Issued" },
    { id: 5, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Online Payment", status: "Not Paid", receiptIssue: "Not Issued" },
    { id: 6, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Cash", status: "Half Paid", receiptIssue: "Half Printed" },
    { id: 7, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: ["Gift Card", "Cash"], status: "Fully Paid", receiptIssue: "Completed" },
    { id: 8, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptIssue: "Completed" },
    { id: 9, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptIssue: "Completed" },
    { id: 10, paymentDate: "5 Aug 2025, 12:30", client: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, teamMember: { name: "Maria Rodriguez", email: "maria@beautywellness.com" }, method: "Card Terminal", status: "Fully Paid", receiptIssue: "Completed" },
]

const columns: Column<Payment>[] = [
    {
        key: "id",
        label: "ID",
        render: (item) => (
            <span className="text-[#635BFF] text-[14px] font-semibold">#000</span>
        ),
    },
    {
        key: "paymentDate",
        label: "Payment Date",
        render: (item) => (
            <span className="text-[14px] font-semibold text-[#29343D]">{item.paymentDate}</span>
        ),
    },
    {
        key: "client",
        label: "Client",
        render: (item) => (
            <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#29343D]">{item.client.name}</span>
                <span className="text-[12px] text-[#98A4AE]">{item.client.email}</span>
            </div>
        ),
    },
    {
        key: "teamMember",
        label: "Team Member",
        render: (item) => (
            <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[#29343D]">{item.teamMember.name}</span>
                <span className="text-[12px] text-[#98A4AE]">{item.teamMember.email}</span>
            </div>
        ),
    },
    {
        key: "method",
        label: "Method",
        render: (item) => (
            <div className="flex flex-col gap-1">
                {(Array.isArray(item.method) ? item.method : [item.method]).map((m, i) => (
                    <span key={i} className={`px-2 py-1 text-[12px] font-semibold rounded-lg w-fit ${METHOD_STYLES[m] ?? "bg-[#F6F7F9] text-[#0A2540]"}`}>
                        {m}
                    </span>
                ))}
            </div>
        ),
    },
    {
        key: "status",
        label: "Status",
        render: (item) => (
            <span className={`px-2 py-1 text-[12px] font-semibold rounded-lg ${STATUS_STYLES[item.status]}`}>
                {item.status}
            </span>
        ),
    },
    {
        key: "receiptIssue",
        label: "Receipt Issue",
        render: (item) => item.receiptIssue ? (
            <span className={`px-2 py-1 text-[12px] font-semibold rounded-lg ${RECEIPT_STYLES[item.receiptIssue]}`}>
                {item.receiptIssue}
            </span>
        ) : null,
    },
]

export default function FinancialContent() {
    const [methodFilter, setMethodFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [receiptFilter, setReceiptFilter] = useState("all")

    const filtered = payments.filter((p) => {
        const methods = Array.isArray(p.method) ? p.method : [p.method]
        const matchMethod = methodFilter === "all" || methods.includes(methodFilter)
        const matchStatus = statusFilter === "all" || p.status === statusFilter
        const matchReceipt = receiptFilter === "all" || p.receiptIssue === receiptFilter
        return matchMethod && matchStatus && matchReceipt
    })

    return (
        <>
            <div className="bg-white rounded-xl p-6">
                <PageHeaderWithButton
                    title="Payments"
                    buttons={[
                        { label: "Import Receipts", href: "/salon-owner/financial/add", variant: "outline" },
                        { label: "Set Automations", href: "/salon-owner/financial/add", variant: "secondary" },
                    ]}
                />

                <div className="flex gap-0 md:gap-6 flex-wrap">
                    <HeaderFilter
                        title="Method"
                        categories={[
                            { label: "All", value: "all" },
                            { label: "Cash", value: "Cash" },
                            { label: "Card Terminal", value: "Card Terminal" },
                            { label: "Online Payment", value: "Online Payment" },
                        ]}
                        selected={methodFilter}
                        onChange={(value) => setMethodFilter(value)}
                        showFilterIcon={false}
                    />

                    <HeaderFilter
                        title="Payment Status"
                        categories={[
                            { label: "All", value: "all" },
                            { label: "Fully Paid", value: "Fully Paid" },
                            { label: "Half Paid", value: "Half Paid" },
                            { label: "Not Paid", value: "Not Paid" },
                        ]}
                        selected={statusFilter}
                        onChange={(value) => setStatusFilter(value)}
                        showFilterIcon={false}
                    />

                    <HeaderFilter
                        title="Receipt Status"
                        categories={[
                            { label: "All", value: "all" },
                            { label: "Completed", value: "Completed" },
                            { label: "Half Completed", value: "Half Completed" },
                            { label: "Not Issued", value: "Not Issued" },
                        ]}
                        selected={receiptFilter}
                        onChange={(value) => setReceiptFilter(value)}
                        showFilterIcon={false}
                    />
                </div>
            </div>
            <Table
                data={filtered}
                columns={columns}
                dropdownActions={[
                    { label: "View Details", icon: <Eye size={14} className="text-[#635BFF]" />, onClick: (item) => console.log("View", item) },
                    { label: "Refund", icon: <RefreshCw size={14} className="text-[#FFD648]" />, onClick: (item) => console.log("Refund", item) },
                    { label: "Print Receipt", icon: <Printer size={14} className="text-[#29343D]" />, onClick: (item) => console.log("Print", item) },
                ]}
            />
        </>
    )
}