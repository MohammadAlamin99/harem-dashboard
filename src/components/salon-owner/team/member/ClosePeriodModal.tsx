import ICalaender from "@/app/account-protal/svg/ICalaender"
import { X } from "lucide-react"

export default function ClosedPeriodModal({ onClose, startDate, setStartDate, endDate, setEndDate, description, setDescription }:
    { onClose: () => void, handleOptionClick: (option: string) => void, addOpen: boolean, setAddOpen: (addOpen: boolean) => void, startDate: string, setStartDate: (startDate: string) => void, endDate: string, setEndDate: (endDate: string) => void, description: string, setDescription: (description: string) => void }) {


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-[12px] shadow-2xl w-full max-w-[619px] mx-4 p-6 relative animate-fadeIn border border-[#E0E6EB]">

                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                    <h2 className="text-[#29343D] font-bold text-lg">Add Closed Period</h2>
                    <button
                        onClick={onClose}
                        className="text-[#29343D] hover:text-[#1A1A2E] transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Date Row */}
                <div className="flex gap-5 mb-6">
                    {/* Start Date */}
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#29343D] text-sm font-semibold">
                            Start Date <span className="text-[#6366F1]">*</span>
                        </label>
                        <div className="relative border border-[#E0E6EB] rounded-[4px] px-3 py-2.5 flex items-center gap-2 focus-within:border-[#6366F1] transition-colors">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                id="start-date-input"
                            />
                            <span className="flex-1 text-sm text-[#9CA3AF] pointer-events-none select-none">
                                {startDate || "mm/dd/yyyy"}
                            </span>
                            <ICalaender size={24} color="#29343D" />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="flex-1 flex flex-col gap-2">
                        <label className="text-[#29343D] text-sm font-semibold">
                            End Date <span className="text-[#6366F1]">*</span>
                        </label>
                        <div className="relative border border-[#E0E6EB] rounded-[4px] px-3 py-2.5 flex items-center gap-2 focus-within:border-[#6366F1] transition-colors">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                id="end-date-input"
                            />
                            <span className="flex-1 text-sm text-[#9CA3AF] pointer-events-none select-none">
                                {endDate || "mm/dd/yyyy"}
                            </span>
                            <ICalaender size={24} color="#29343D" />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 mb-6">
                    <label className="text-[#29343D] text-sm font-semibold">
                        Description <span className="text-[#9CA3AF] font-normal">(Optional)</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add description or note"
                        rows={4}
                        className="border border-[#E0E6EB] rounded-[4px] px-4 py-3 text-sm text-[#29343D] placeholder-[#9CA3AF] resize-y outline-none focus:border-[#6366F1] transition-colors"
                    />
                </div>

                {/* Warning */}
                <div className="relative bg-[#FFF9E5] border border-[#FFD648] rounded-[12px] p-4 mb-7">
                    <p className="text-[#29343D] text-sm font-bold mb-1">Warning</p>
                    <p className="text-[#98A4AE] text-sm opacity-70">Online bookings cannot be placed during time off.</p>
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[28px] rounded-full bg-[#FFD648]" />
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="cursor-pointer bg-[#635BFF] hover:bg-[#4F46E5] text-white text-sm font-semibold px-4 py-2.5 rounded-[12px] transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}