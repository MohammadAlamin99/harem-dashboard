"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown, AlertCircle } from "lucide-react";

interface RefundModalProps {
    isOpen: boolean;
    onClose: () => void;
    onIssueRefund: (data: { amount: number; reason: string; givenBy: string }) => void;
    id?: string;
    date?: string;
    maxAmount?: number;
}

export default function RefundModal({
    isOpen,
    onClose,
    onIssueRefund,
    id = "#000",
    date = "5 Aug 2025, 12:30",
    maxAmount = 170,
}: RefundModalProps) {
    const [amount, setAmount] = useState<number>(maxAmount);
    const [reason, setReason] = useState("");
    const [givenBy, setGivenBy] = useState("Maria Rodriguez");
    const [isGivenByDropdownOpen, setIsGivenByDropdownOpen] = useState(false);
    const [isReasonDropdownOpen, setIsReasonDropdownOpen] = useState(false);
    const isError = amount > maxAmount;
    const reasons = [
        "Client cancelled service related to payment",
        "Incorrect amount",
        "Duplicate transaction",
        "Client's request",
        "Other"
    ];

    const staffMembers = ["Maria Rodriguez", "John Doe"];
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-manrope">
            {/* Modal Container */}
            <div
                className="bg-white w-full max-w-[746px] p-6 rounded-xl relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 md:right-8 md:top-8 text-[#29343D] cursor-pointer"
                >
                    <X size={24} strokeWidth={1.5} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-manrope font-semibold text-[#29343D] mb-1">Refund</h2>
                    <p className="text-[14px] font-medium text-[#29343D]">
                        ID: <span className="text-[#635BFF]">{id}</span>
                        <span className="text-[#98A4AE] mx-2">•</span>
                        <span className="text-[#29343D]">{date}</span>
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Row 1: Payment Method & Amount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                        <div className="font-manrope">
                            <label className="text-[14px] font-semibold text-[#29343D] font-manrope mb-2">
                                Refund Method *
                            </label>
                            <div className="w-full h-[52px] font-manrope px-4 bg-[#F4F6FA] border border-[#E0E6EB] rounded-[4px] flex items-center text-[#98A4AE] text-[14px] mt-2">
                                Cash
                            </div>
                        </div>

                        <div className="space-y-2 font-manrope">
                            <label className="text-[14px] font-semibold text-[#29343D]">
                                Refund Amount (Max € {maxAmount}) *
                            </label>
                            <div className={`mt-2 relative w-full h-[52px] px-4 border border-[#E0E6EB] rounded-[4px] flex items-center transition-all ${isError ? 'border-[#FF6692] bg-[#FFF5F8]' : 'border-[#EFF4FA] bg-white'
                                }`}>
                                <span className="text-[#29343D] font-medium mr-1">€</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full bg-transparent focus:outline-none text-[#29343D] font-medium text-[14px] placeholder-[#98A4AE]"
                                />
                            </div>
                            {isError && (
                                <div className="flex items-center gap-1 text-[#FF6692] text-[12px] mt-1 font-medium">
                                    <AlertCircle size={14} />
                                    <span>The value exceeds the maximum</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Row 2: Given By - UPDATED */}
                    <div className="space-y-2">
                        <label className="text-[14px] font-semibold text-[#29343D] font-manrope">
                            Cash Refund Given By *
                        </label>
                        <div className="relative mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsGivenByDropdownOpen(!isGivenByDropdownOpen);
                                    setIsReasonDropdownOpen(false); 
                                }}
                                className="w-full h-[52px] font-manrope px-4 border border-[#E0E6EB] rounded-[4px] flex items-center justify-between focus:outline-none bg-white cursor-pointer"
                            >
                                <span className="text-[14px] text-[#29343D]">{givenBy}</span>
                                <ChevronDown className={`text-[#98A4AE] transition-transform ${isGivenByDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                            </button>

                            {isGivenByDropdownOpen && (
                                <div className="absolute z-[60] left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.1)] overflow-hidden">
                                    <div className="py-1">
                                        {staffMembers.map((staff) => (
                                            <button
                                                key={staff}
                                                type="button"
                                                className="w-full text-left px-4 py-3 text-[14px] text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
                                                onClick={() => {
                                                    setGivenBy(staff);
                                                    setIsGivenByDropdownOpen(false);
                                                }}
                                            >
                                                {staff}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Row 3: Reason */}
                    <div className="space-y-2">
                        <label className="text-[14px] font-semibold text-[#29343D] font-manrope">
                            Reason for Refund *
                        </label>
                        <div className="relative mt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsReasonDropdownOpen(!isReasonDropdownOpen);
                                    setIsGivenByDropdownOpen(false);
                                }}
                                className="w-full h-[52px] px-4 border border-[#E0E6EB] rounded-[4px] flex items-center justify-between focus:outline-none bg-white cursor-pointer"
                            >
                                <span className={`text-[14px] ${reason ? 'text-[#29343D]' : 'text-[#98A4AE]'}`}>
                                    {reason || "Choose a reason for refund"}
                                </span>
                                <ChevronDown className={`text-[#98A4AE] transition-transform ${isReasonDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                            </button>

                            {isReasonDropdownOpen && (
                                <div className="absolute z-[60] left-0 right-0 mt-1 bg-white border border-[#E0E6EB] rounded-xl shadow-[0px_10px_30px_rgba(0,0,0,0.1)] overflow-hidden">
                                    <div className="py-1">
                                        {reasons.map((item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                className="w-full text-left px-4 py-3 text-[14px] text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
                                                onClick={() => {
                                                    setReason(item);
                                                    setIsReasonDropdownOpen(false);
                                                }}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 flex justify-end">
                    <button
                        disabled={isError || !reason}
                        onClick={() => onIssueRefund({ amount, reason, givenBy })}
                        className={`px-4 py-2.5 cursor-pointer font-manrope rounded-[12px] font-bold text-[14px] transition-all ${isError || !reason
                            ? 'bg-[#F4F6FA] text-[#98A4AE] cursor-not-allowed'
                            : 'bg-[#635BFF] text-white hover:bg-[#5249e0] active:scale-95 shadow-lg shadow-indigo-100'
                            }`}
                    >
                        Issue Refund
                    </button>
                </div>
            </div>
        </div>
    );
}