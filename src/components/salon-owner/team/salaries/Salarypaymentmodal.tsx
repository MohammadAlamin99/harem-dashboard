"use client"
import { useState, useRef, useEffect } from "react"
import { X, DollarSign, RefreshCw, Check, AlertCircle } from "lucide-react"
import Image from "next/image"

type Step = "confirm" | "otp" | "processing" | "complete"

interface SalaryPaymentModalProps {
    isOpen: boolean
    onClose: () => void
    member?: {
        name: string
        role: string
        avatar: string
        amount: string
        month: string
        iban: string
        grossSalary: string
    }
}

const DEFAULT_MEMBER = {
    name: "Maria Rodriguez",
    role: "Staff",
    avatar: "/images/avator.png",
    amount: "€ 3,200.00",
    month: "December 2024",
    iban: "IT60 X054 ******** 123",
    grossSalary: "€ 3,200.00",
}

export default function SalaryPaymentModal({
    isOpen,
    onClose,
    member = DEFAULT_MEMBER,
}: SalaryPaymentModalProps) {
    const [step, setStep] = useState<Step>("confirm")
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [otpError, setOtpError] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    // Adjust state while rendering to reset on open (avoids cascading renders)
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen)
        if (isOpen) {
            setStep("confirm")
            setOtp(Array(6).fill(""))
            setOtpError(false)
        }
    }

    // Auto-focus first OTP input when step changes
    useEffect(() => {
        if (step === "otp") {
            setTimeout(() => inputRefs.current[0]?.focus(), 100)
        }
    }, [step])

    function handleOtpChange(index: number, value: string) {
        if (!/^\d*$/.test(value)) return
        const next = [...otp]
        next[index] = value.slice(-1)
        setOtp(next)
        setOtpError(false)
        if (value && index < 5) inputRefs.current[index + 1]?.focus()
    }

    function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    function handleConfirmPayment() {
        setStep("otp")
    }

    function handleVerify() {
        const code = otp.join("")
        if (code.length < 6) { setOtpError(true); return }
        // Simulate: "123456" is correct
        if (code !== "123456") { setOtpError(true); return }
        setStep("processing")
        setTimeout(() => setStep("complete"), 2500)
    }

    function handleClose() {
        onClose()
        setTimeout(() => {
            setStep("confirm")
            setOtp(Array(6).fill(""))
            setOtpError(false)
        }, 300)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-manrope">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[520px] mx-4 overflow-hidden">

                {/* ── STEP 1: Confirm ── */}
                {step === "confirm" && (
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#1A1A2E] font-bold text-base">Salary Payment</h2>
                            <button onClick={handleClose} className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors">
                                <X size={16} className="text-[#98A4AE]" />
                            </button>
                        </div>

                        {/* Icon */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-3">
                                <DollarSign size={28} className="text-[#6366F1]" />
                            </div>
                            <h3 className="text-[#1A1A2E] font-bold text-base">Confim Payment Details</h3>
                            <p className="text-[#98A4AE] text-xs mt-1 text-center">Please review the payment information before proceeding.</p>
                        </div>

                        {/* Payment Summary */}
                        <div className="border border-[#E0E6EB] rounded-xl p-4 mb-3">
                            <p className="text-[#1A1A2E] font-bold text-sm mb-4">Payment Summary</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-[#98A4AE] mb-0.5">Number of Employees</p>
                                    <p className="text-sm font-semibold text-[#1A1A2E]">1</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#98A4AE] mb-0.5">Total Amount</p>
                                    <p className="text-sm font-semibold text-[#1A1A2E]">{member.amount}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#98A4AE] mb-0.5">Payment Method</p>
                                    <p className="text-sm font-bold text-[#1A1A2E]">Revolut Business</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-[#98A4AE] mb-0.5">Processing Time</p>
                                    <p className="text-sm font-bold text-[#1A1A2E]">Instant</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Recipients */}
                        <div className="border border-[#E0E6EB] rounded-xl p-4 mb-3">
                            <p className="text-[#1A1A2E] font-bold text-sm mb-4">Payment Recipients</p>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#F0F2F5] shrink-0">
                                        <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#1A1A2E]">{member.name}</p>
                                        <p className="text-xs text-[#98A4AE]">{member.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-[#1A1A2E]">{member.amount}</p>
                                    <p className="text-xs text-[#98A4AE]">{member.month}</p>
                                </div>
                            </div>
                            <div className="border-t border-[#E0E6EB] pt-3 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-[#98A4AE]">IBAN</p>
                                    <p className="text-xs font-semibold text-[#1A1A2E]">{member.iban}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-[#98A4AE]">Gross Salary</p>
                                    <p className="text-xs font-semibold text-[#1A1A2E]">{member.grossSalary}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-[#98A4AE]">Gross Salary</p>
                                    <p className="text-xs font-semibold text-[#1A1A2E]">{member.grossSalary}</p>
                                </div>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 mb-5 flex gap-3">
                            <AlertCircle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                            <p className="text-xs text-[#92400E] leading-relaxed">
                                Payment Confirmation - Once confirmed, payments will be processed immediately and cannot be reversed. Please verify all recipients are correct.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">
                            <button onClick={handleClose} className="cursor-pointer px-6 py-2.5 text-sm font-medium text-[#29343D] border border-[#E0E6EB] rounded-xl hover:bg-[#F4F6FA] transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleConfirmPayment} className="cursor-pointer px-6 py-2.5 text-sm font-semibold text-white bg-[#6366F1] rounded-xl hover:bg-[#4F46E5] transition-colors">
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: OTP ── */}
                {step === "otp" && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#1A1A2E] font-bold text-base">Salary Payment</h2>
                            <button onClick={handleClose} className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors">
                                <X size={16} className="text-[#98A4AE]" />
                            </button>
                        </div>

                        <p className="text-xs text-[#98A4AE] mb-1">Weve sent a verification code to the owners phone. Please enter it below to continue.</p>
                        <p className="text-sm font-bold text-[#1A1A2E] mb-5">+39 335 345 678</p>

                        <p className="text-sm font-semibold text-[#1A1A2E] mb-3">Type your 6 digits security code</p>

                        {/* OTP Inputs */}
                        <div className="flex gap-2 mb-2">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => { inputRefs.current[i] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(i, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                    className={`w-full h-12 text-center text-sm font-bold border rounded-xl outline-none transition-colors ${otpError
                                        ? "border-[#FF6692] bg-[#FFF1F5]"
                                        : digit
                                            ? "border-[#6366F1] bg-[#EEF2FF]"
                                            : "border-[#E0E6EB] bg-white"
                                        } text-[#1A1A2E]`}
                                />
                            ))}
                        </div>

                        {otpError && (
                            <p className="text-xs text-[#FF6692] mb-4">Invalid code, please try again</p>
                        )}

                        <button
                            onClick={handleVerify}
                            className="cursor-pointer w-full py-3 text-sm font-semibold text-white bg-[#6366F1] rounded-xl hover:bg-[#4F46E5] transition-colors mt-3 mb-4"
                        >
                            Verify and Process Payment
                        </button>

                        <p className="text-xs text-[#98A4AE] text-center">
                            Didnt get the code?{" "}
                            <button
                                onClick={() => { setOtp(Array(6).fill("")); setOtpError(false) }}
                                className="cursor-pointer text-[#6366F1] font-semibold hover:underline"
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                )}

                {/* ── STEP 3: Processing ── */}
                {step === "processing" && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#1A1A2E] font-bold text-base">Salary Payment</h2>
                        </div>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-3 animate-spin">
                                <RefreshCw size={28} className="text-[#6366F1]" />
                            </div>
                            <h3 className="text-[#1A1A2E] font-bold text-base">Processing Payments</h3>
                            <p className="text-[#98A4AE] text-xs mt-1">Processing payments through Revolut Business API. Please wait...</p>
                        </div>

                        {/* Active payment */}
                        <div className="border border-[#6366F1] bg-[#F5F4FF] rounded-xl p-4 mb-3">
                            <p className="text-xs font-bold text-[#6366F1] mb-1">Processing payment for {member.name}</p>
                            <p className="text-[10px] text-[#98A4AE]">{member.amount} via Revolut Business API</p>
                        </div>

                        {/* Member row */}
                        <div className="border border-[#E0E6EB] rounded-xl p-4 mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#F0F2F5] shrink-0">
                                    <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[#1A1A2E]">{member.name}</p>
                                    <p className="text-[10px] text-[#98A4AE]">{member.amount}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#6366F1]">
                                <RefreshCw size={12} className="animate-spin" />
                                <span className="text-xs font-semibold">Elaborazione...</span>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex gap-3">
                            <AlertCircle size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                            <p className="text-xs text-[#92400E]">Processing payments via Revolut Business API - Do not close this window.</p>
                        </div>
                    </div>
                )}

                {/* ── STEP 4: Complete ── */}
                {step === "complete" && (
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#1A1A2E] font-bold text-base">Salary Payment</h2>
                        </div>

                        <div className="flex flex-col items-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-3">
                                <Check size={28} className="text-[#22C55E]" />
                            </div>
                            <h3 className="text-[#1A1A2E] font-bold text-base">Payment Processing Complete</h3>
                            <p className="text-[#98A4AE] text-xs mt-1">All payments are processed securely. Review the results below:</p>
                        </div>

                        {/* Success / Failed cards */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-[#22C55E] flex items-center justify-center">
                                        <Check size={12} className="text-white" />
                                    </div>
                                    <p className="text-xs font-semibold text-[#1A1A2E]">Successful Payments</p>
                                </div>
                                <p className="text-2xl font-bold text-[#1A1A2E]">1</p>
                                <p className="text-xs text-[#98A4AE]">{member.amount}</p>
                            </div>
                            <div className="bg-[#FFF1F5] border border-[#FECDD3] rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-[#FF6692] flex items-center justify-center">
                                        <X size={12} className="text-white" />
                                    </div>
                                    <p className="text-xs font-semibold text-[#1A1A2E]">Failed Payments</p>
                                </div>
                                <p className="text-2xl font-bold text-[#1A1A2E]">0</p>
                                <p className="text-xs text-[#98A4AE]">€ 0.00</p>
                            </div>
                        </div>

                        {/* Member result */}
                        <div className="border border-[#E0E6EB] rounded-xl p-4 mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#F0F2F5] shrink-0">
                                        <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#1A1A2E]">{member.name}</p>
                                        <p className="text-[10px] text-[#98A4AE]">{member.amount}</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-[#98A4AE]">Transaction ID: 92837465</p>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Check size={11} className="text-[#22C55E]" />
                                <p className="text-[10px] text-[#98A4AE]">Payment successful through Revolut Business API</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button onClick={handleClose} className="cursor-pointer px-6 py-2.5 text-sm font-semibold text-[#6366F1] border border-[#6366F1] rounded-xl hover:bg-[#EEF2FF] transition-colors">
                                Ok, complete
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}