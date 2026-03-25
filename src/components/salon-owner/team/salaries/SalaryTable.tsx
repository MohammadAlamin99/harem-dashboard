
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
        <div className="overflow-x-auto rounded-xl border border-[#E0E6EB]">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#F3F3FF]">
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Team Member</th>
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Role</th>
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Net Amount</th>
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Month</th>
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Date</th>
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Status</th>
                        <th className="px-3.5 py-7 text-left text-base font-bold text-[#29343D]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <Fragment key={member.id}>
                            <tr className="border-t border-[#E0E6EB] hover:bg-[#FAFAFE] transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-[48px] h-[48px] rounded-xl overflow-hidden shrink-0 bg-[#F0F2F5]">
                                            <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#29343D]">{member.name}</p>
                                            <p className="text-[12px] text-[#999]">Uploaded by: {member.uploadedBy}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="bg-[#FFF9E5] px-2.5 py-[5px] rounded-full text-xs font-medium text-[#FFD648]">{member.role}</span>
                                </td>
                                <td className="px-[14px] py-[30px] text-sm font-normal text-[#29343D]">{member.netAmount}</td>
                                <td className="px-[14px] py-[30px] text-sm font-normal text-[#29343D]">{member.month}</td>
                                <td className="px-[14px] py-[30px] text-sm font-normal text-[#29343D]">{member.date}</td>
                                <td className="px-[14px] py-[30px]">
                                    <span className={`text-[12px] font-semibold px-[10px] py-[5px] rounded-full ${STATUS_STYLES[member.status]}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleExpand(member.id)}
                                            className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg"
                                        >
                                            {expandedId === member.id
                                                ? <ChevronUp size={24} className="text-[#635BFF]" />
                                                : <ChevronDown size={24} className="text-[#635BFF]" />
                                            }
                                        </button>
                                        {showActions && (
                                            <>
                                                <button
                                                    onClick={() => onPayClick?.(member)}
                                                    className="cursor-pointer px-4 py-2.5 flex items-center justify-center rounded-lg bg-[#ECFDFD] hover:bg-[#D1FAE5] transition-colors">
                                                    <Check size={16} className="text-[#16CDC7]" />
                                                </button>
                                                <button className="cursor-pointer px-4 py-2.5 flex items-center justify-center rounded-lg bg-[#FFE5ED] hover:bg-[#FFE4EC] transition-colors">
                                                    <X size={16} className="text-[#FF6692]" />
                                                </button>
                                            </>
                                        )}
                                        {!showActions && (
                                            <button className="cursor-pointer flex items-center gap-1.5 text-[#6366F1] text-xs font-medium bg-[#F1F2FE] px-4 py-2.5 rounded-[8px] hover:bg-[#EEF2FF] transition-colors">
                                                <Eye size={24} fill="#635BFF" stroke="#F1F2FE" />
                                                View Payslip
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>

                            {/* Expanded Row */}
                            {expandedId === member.id && (
                                <tr className="bg-[#FAFAFE] border-t border-[#E0E6EB]">
                                    <td colSpan={7} className="px-[30px] py-[20px]">
                                        <div className="flex flex-col gap-[16px]">

                                            {/* Info Grid */}
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
                                                        <p className="text-[14px] text-[#29343D] leading-none">
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Button */}
                                            <button className="w-fit cursor-pointer flex items-center gap-1.5 text-[#6366F1] text-xs font-medium bg-[#F1F2FE] px-4 py-2.5 rounded-[8px] hover:bg-[#EEF2FF] transition-colors">
                                                <Eye size={24} fill="#635BFF" stroke="#F1F2FE" />
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