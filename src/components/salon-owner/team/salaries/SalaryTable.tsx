import { SalaryMember } from "@/@types/salon-owner/salaryMember.type"
import { Check, ChevronDown, ChevronUp, Eye, X } from "lucide-react"
import Image from "next/image"
import { Fragment } from "react/jsx-runtime"

export default function SalaryTable({
    members,
    expandedId,
    toggleExpand,
    showActions = true,
    onPayClick,
    STATUS_STYLES,
}: {
    members: SalaryMember[]
    expandedId: string | null
    toggleExpand: (id: string) => void
    showActions?: boolean
    onPayClick?: (member: SalaryMember) => void
    STATUS_STYLES: Record<string, string>
}) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-[#E0E6EB]">
            <table className="w-full border-collapse min-w-[900px] md:min-w-full">
                <thead>
                    <tr className="bg-[#F3F3FF]">
                        <th className="px-3 py-4 md:py-7 text-left text-xs md:text-base font-bold text-[#29343D] whitespace-nowrap">
                            Team Member
                        </th>
                        <th className="px-3 py-4 md:py-7 text-left text-xs md:text-base font-bold text-[#29343D] whitespace-nowrap">
                            Role
                        </th>
                        <th className="px-3 py-4 md:py-7 text-left text-xs md:text-base font-bold text-[#29343D] whitespace-nowrap">
                            Net Amount
                        </th>
                        <th className="hidden md:table-cell px-3 py-7 text-left text-base font-bold text-[#29343D]">
                            Month
                        </th>
                        <th className="hidden md:table-cell px-3 py-7 text-left text-base font-bold text-[#29343D]">
                            Date
                        </th>
                        <th className="px-3 py-4 md:py-7 text-left text-xs md:text-base font-bold text-[#29343D] whitespace-nowrap">
                            Status
                        </th>
                        <th className="px-3 py-4 md:py-7 text-left text-xs md:text-base font-bold text-[#29343D] whitespace-nowrap">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {members.map((member) => (
                        <Fragment key={member.id}>
                            <tr className="border-t border-[#E0E6EB] hover:bg-[#FAFAFE] transition-colors">

                                {/* Team Member */}
                                <td className="p-3 md:p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-xl overflow-hidden shrink-0 bg-[#F0F2F5]">
                                            <Image
                                                src={member.avatar}
                                                alt={member.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm font-semibold text-[#29343D]">
                                                {member.name}
                                            </p>
                                            <p className="text-[10px] md:text-[12px] text-[#999]">
                                                Uploaded by: {member.uploadedBy}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-2 md:px-4 py-3">
                                    <span className="bg-[#FFF9E5] px-2 py-[4px] md:px-2.5 md:py-[5px] rounded-full text-[10px] md:text-xs font-medium text-[#FFD648] whitespace-nowrap">
                                        {member.role}
                                    </span>
                                </td>

                                {/* Net Amount */}
                                <td className="px-2 md:px-[14px] py-3 md:py-[30px] text-xs md:text-sm text-[#29343D] whitespace-nowrap">
                                    {member.netAmount}
                                </td>

                                {/* Month */}
                                <td className="hidden md:table-cell px-[14px] py-[30px] text-sm text-[#29343D]">
                                    {member.month}
                                </td>

                                {/* Date */}
                                <td className="hidden md:table-cell px-[14px] py-[30px] text-sm text-[#29343D]">
                                    {member.date}
                                </td>

                                {/* Status */}
                                <td className="px-2 md:px-[14px] py-3 md:py-[30px]">
                                    <span
                                        className={`text-[10px] md:text-[12px] font-semibold px-2 md:px-[10px] py-[4px] md:py-[5px] rounded-full whitespace-nowrap ${STATUS_STYLES[member.status]}`}
                                    >
                                        {member.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-2 md:px-4 py-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <button
                                            onClick={() => toggleExpand(member.id)}
                                            className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg"
                                        >
                                            {expandedId === member.id ? (
                                                <ChevronUp size={20} className="text-[#635BFF]" />
                                            ) : (
                                                <ChevronDown size={20} className="text-[#635BFF]" />
                                            )}
                                        </button>

                                        {showActions && (
                                            <>
                                                <button
                                                    onClick={() => onPayClick?.(member)}
                                                    className="cursor-pointer px-3 md:px-4 py-2 flex items-center justify-center rounded-lg bg-[#ECFDFD] hover:bg-[#D1FAE5] transition-colors"
                                                >
                                                    <Check size={14} className="text-[#16CDC7]" />
                                                </button>

                                                <button className="cursor-pointer px-3 md:px-4 py-2 flex items-center justify-center rounded-lg bg-[#FFE5ED] hover:bg-[#FFE4EC] transition-colors">
                                                    <X size={14} className="text-[#FF6692]" />
                                                </button>
                                            </>
                                        )}

                                        {!showActions && (
                                            <button className="cursor-pointer flex items-center gap-1 text-[10px] md:text-xs font-medium text-[#6366F1] bg-[#F1F2FE] px-3 md:px-4 py-2 rounded-[8px] hover:bg-[#EEF2FF] transition-colors whitespace-nowrap">
                                                <Eye size={16} fill="#635BFF" stroke="#F1F2FE" />
                                                View Payslip
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>

                            {/* Expanded Row */}
                            {expandedId === member.id && (
                                <tr className="bg-[#FAFAFE] border-t border-[#E0E6EB]">
                                    <td colSpan={7} className="px-4 md:px-[30px] py-[20px]">
                                        <div className="flex flex-col gap-[16px]">

                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 md:gap-x-[40px] gap-y-3">
                                                {[
                                                    { label: "Gross Salary", value: member.grossSalary },
                                                    { label: "Net Salary", value: member.netSalary },
                                                    { label: "TRF (Monthly)", value: member.trf },
                                                    { label: "Cumulative TRF", value: member.cumulativeTrf },
                                                    { label: "IBAN", value: member.iban },
                                                ].map((item) => (
                                                    <div key={item.label} className="flex flex-col gap-[4px]">
                                                        <p className="text-[10px] md:text-[12px] text-[#98A2B3] leading-none">
                                                            {item.label}
                                                        </p>
                                                        <p className="text-xs md:text-[14px] text-[#29343D] leading-none">
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            <button className="w-fit cursor-pointer flex items-center gap-1 text-[10px] md:text-xs font-medium text-[#6366F1] bg-[#F1F2FE] px-3 md:px-4 py-2 rounded-[8px] hover:bg-[#EEF2FF] transition-colors">
                                                <Eye size={16} fill="#635BFF" stroke="#F1F2FE" />
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
    )
}