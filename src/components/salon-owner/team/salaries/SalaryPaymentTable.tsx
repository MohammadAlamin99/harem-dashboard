import { SalaryMember } from "@/@types/salon-owner/salaryMember.type"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { Fragment } from "react"

type Props = {
    members: SalaryMember[]
    expandedId: string | null
    toggleExpand: (id: string) => void
    totalAmount: string
}

export default function SalaryPaymentTable({
    members,
    expandedId,
    toggleExpand,
    totalAmount,
}: Props) {
    return (
        <div className="mt-6 rounded-[16px]">

            {/* TABLE CARD */}
            <div className="bg-white border border-[#E6E8EC] rounded-[14px] overflow-hidden">
                <table className="w-full border-collapse">

                    {/* HEADER */}
                    <thead>
                        <tr className="bg-[#EDEFF5]">
                            {["Team Member", "Role", "Net Amount", "Date", "Status", "Actions"].map((h) => (
                                <th
                                    key={h}
                                    className="px-6 py-[18px] text-left text-[14px] font-semibold text-[#344054]"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {members.map((member) => (
                            <Fragment key={member.id}>

                                {/* MAIN ROW */}
                                <tr className="border-t border-[#E6E8EC] hover:bg-[#FAFAFE] transition">
                                    {/* USER */}
                                    <td className="px-6 py-[18px]">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-[44px] h-[44px] rounded-xl overflow-hidden bg-[#F0F2F5]">
                                                <Image
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-[14px] font-semibold text-[#29343D]">
                                                    {member.name}
                                                </p>
                                                <p className="text-[12px] text-[#98A2B3]">
                                                    Uploaded by: {member.uploadedBy}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* ROLE */}
                                    <td className="px-6 py-[18px]">
                                        <span className="bg-[#FFF4CC] text-[#E6B800] px-3 py-[4px] rounded-full text-[12px] font-medium">
                                            {member.role}
                                        </span>
                                    </td>

                                    {/* NET */}
                                    <td className="px-6 py-[18px] text-[14px] text-[#29343D]">
                                        {member.netAmount}
                                    </td>

                                    {/* DATE */}
                                    <td className="px-6 py-[18px] text-[14px] text-[#29343D]">
                                        {member.date}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-[18px]">
                                        <span className="px-[10px] py-[4px] text-[12px] font-medium rounded-full bg-[#E7F6EC] text-[#27AE60]">
                                            {member.status}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-[18px]">
                                        <div className="flex items-center gap-3">

                                            {/* Expand */}
                                            <button
                                                onClick={() => toggleExpand(member.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#EEF2FF]"
                                            >
                                                {expandedId === member.id
                                                    ? <ChevronUp size={18} className="text-[#635BFF]" />
                                                    : <ChevronDown size={18} className="text-[#635BFF]" />
                                                }
                                            </button>

                                            {/* Pay Now */}
                                            <button className="px-4 h-[36px] rounded-[8px] bg-[#2BB7A9] text-white text-[13px] font-medium hover:opacity-90">
                                                Pay Now
                                            </button>

                                            {/* Mask as Paid */}
                                            <button className="px-4 h-[36px] rounded-[8px] bg-[#6C63FF] text-white text-[13px] font-medium hover:opacity-90">
                                                Mask as Paid
                                            </button>

                                        </div>
                                    </td>
                                </tr>

                                {/* EXPANDED ROW */}
                                {expandedId === member.id && (
                                    <tr className="bg-[#FAFAFE] border-t border-[#E6E8EC]">
                                        <td colSpan={6} className="px-6 py-[20px]">

                                            <div className="flex flex-col gap-[16px]">

                                                {/* GRID */}
                                                <div className="grid grid-cols-5 gap-x-[40px]">
                                                    {[
                                                        { label: "Gross Salary", value: member.grossSalary },
                                                        { label: "Net Salary", value: member.netSalary },
                                                        { label: "TRF (Monthly)", value: member.trf },
                                                        { label: "Cumulative TRF", value: member.cumulativeTrf },
                                                        { label: "IBAN", value: member.iban },
                                                    ].map((item) => (
                                                        <div key={item.label} className="flex flex-col gap-[4px]">
                                                            <p className="text-[12px] text-[#98A2B3] leading-none">
                                                                {item.label}
                                                            </p>
                                                            <p className="text-[14px] text-[#29343D] leading-none truncate">
                                                                {item.value}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* BUTTON */}
                                                <button className="w-fit flex items-center gap-2 px-[14px] py-[10px] rounded-[8px] bg-[#F1F2FE] text-[#635BFF] text-[14px] font-medium hover:bg-[#EEF2FF] transition">
                                                    View Payslip
                                                </button>

                                            </div>

                                        </td>
                                    </tr>
                                )}

                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TOTAL */}
            <div className="mt-4 bg-white border border-[#E6E8EC] rounded-[14px] px-6 py-5 flex items-center justify-between">
                <p className="text-[16px] font-semibold text-[#344054]">
                    Total Amount
                </p>

                <span className="bg-[#6C63FF] text-white text-[14px] font-semibold px-4 py-2 rounded-full">
                    {totalAmount}
                </span>
            </div>

        </div>
    )
}