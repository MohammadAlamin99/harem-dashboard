"use client"
import { useState, useRef, useEffect } from "react"
import { X, DollarSign, RefreshCw, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import { StatCard } from "../../clients/view-details/finalcial-tab/StatCard"
import Card from "@/components/accountProtal/Card"

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

    const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen)
        if (isOpen) {
            setStep("confirm")
            setOtp(Array(6).fill(""))
            setOtpError(false)
        }
    }

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

            {/* Modal — max-w 638px */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[638px] mx-4 overflow-hidden">

                {/* ── STEP 1: Confirm ── */}
                {step === "confirm" && (
                    <div className="p-7">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-7">
                            <h2 className="text-[#29343D] font-bold text-[18px]">Salary Payment</h2>
                            <button
                                onClick={handleClose}
                                className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors"
                            >
                                <X size={24} className="text-[#29343D]" />
                            </button>
                        </div>

                        {/* Icon + Title */}
                        <div className="flex flex-col items-center mb-7">
                            <div className="w-[68px] h-[68px] rounded-full bg-[#EBEBFF] flex items-center justify-center mb-3">
                                {/* Briefcase-dollar icon to match screenshot */}
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="10" width="22" height="16" rx="3" stroke="#6366F1" strokeWidth="2" fill="none" />
                                    <path d="M10 10V8C10 6.9 10.9 6 12 6H18C19.1 6 20 6.9 20 8V10" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M15 15V19M13 17H17" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="text-[#1A1A2E] font-bold text-[15px]">Confim Payment Details</h3>
                            <p className="text-[#98A4AE] text-xs mt-1 text-center">Please review the payment information before proceeding.</p>
                        </div>

                        {/* Payment Summary */}
                        <div className="border border-[#E8ECF0] rounded-xl p-5 mb-3 bg-[#F1F2FE]">
                            <p className="text-[#1A1A2E] font-bold text-[13px] mb-4">Payment Summary</p>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-[11px] text-[#98A4AE] mb-1">Number of Employees</p>
                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">1</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#98A4AE] mb-1">Total Amount</p>
                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">{member.amount}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#98A4AE] mb-1">Payment Method</p>
                                    <p className="text-[13px] font-bold text-[#1A1A2E]">Revolut Business</p>
                                </div>
                                <div>
                                    <p className="text-[11px] text-[#98A4AE] mb-1">Processing Time</p>
                                    <p className="text-[13px] font-bold text-[#1A1A2E]">Instant</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Recipients */}
                        <div className="border border-[#E8ECF0] rounded-xl p-5 mb-3 bg-[#FAFBFC]">
                            <p className="text-[#1A1A2E] font-bold text-[13px] mb-4">Payment Recipients</p>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#F0F2F5] shrink-0">
                                        <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-[#1A1A2E]">{member.name}</p>
                                        <p className="text-xs text-[#98A4AE]">{member.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">{member.amount}</p>
                                    <p className="text-xs text-[#98A4AE]">{member.month}</p>
                                </div>
                            </div>
                            <div className="border-t border-[#E8ECF0] pt-3 flex flex-col gap-2.5">
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
                        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 mb-6 flex gap-3">
                            <AlertCircle size={15} className="text-[#F59E0B] shrink-0 mt-0.5" />
                            <p className="text-[11px] text-[#92400E] leading-relaxed">
                                Payment Confirmation - Once confirmed, payments will be processed immediately and cannot be reversed. Please verify all recipients are correct.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={handleClose}
                                className="cursor-pointer px-4 py-2.5 text-[13px] font-medium text-[#29343D] border border-[#E0E6EB] rounded-lg hover:bg-[#F4F6FA] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                className="cursor-pointer px-4 py-2.5 text-[13px] font-semibold text-white bg-[#6366F1] rounded-lg hover:bg-[#4F46E5] transition-colors"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                )}

                {/* ── STEP 2: OTP ── */}
                {step === "otp" && (
                    <div className="p-7">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#29343D] font-bold text-[18px]">Salary Payment</h2>
                            <button
                                onClick={handleClose}
                                className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors"
                            >
                                <X size={24} className="text-[#29343D]" />
                            </button>
                        </div>

                        <p className="text-[13px] text-[#98A4AE] mb-1.5 leading-relaxed">
                            We&apos;ve sent a verification code to the owner&apos;s phone. Please enter it below to continue.
                        </p>
                        <p className="text-[14px] font-bold text-[#1A1A2E] mb-7">+39 335 345 678</p>

                        <p className="text-[14px] font-bold text-[#1A1A2E] mb-4">Type your 6 digits security code</p>

                        {/* OTP Inputs */}
                        <div className="flex gap-2.5 mb-2">
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
                                    className={`w-full h-[56px] text-center text-[15px] font-bold border rounded-lg outline-none transition-colors ${otpError
                                        ? "border-[#FF6692] bg-[#FFF1F5] text-[#FF6692]"
                                        : digit
                                            ? "border-[#6366F1] bg-[#EEF2FF] text-[#1A1A2E]"
                                            : "border-[#E0E6EB] bg-white text-[#1A1A2E]"
                                        }`}
                                />
                            ))}
                        </div>

                        {otpError && (
                            <p className="text-[12px] text-[#FF6692] mb-2 mt-1">Invalid code, please try again</p>
                        )}

                        <button
                            onClick={handleVerify}
                            className="cursor-pointer w-full py-4 text-[14px] font-semibold text-white bg-[#6366F1] rounded-lg hover:bg-[#4F46E5] transition-colors mt-4 mb-5"
                        >
                            Verify and Process Payment
                        </button>

                        <p className="text-[12px] text-[#98A4AE]">
                            Didn&apos;t get the code?{" "}
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
                    <div className="p-7">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#29343D] font-bold text-[18px]">Salary Payment</h2>
                        </div>

                        {/* Icon + Title */}
                        <div className="flex flex-col items-center mb-7">
                            <div className="w-[68px] h-[68px] rounded-full bg-[#EBEBFF] flex items-center justify-center mb-4">
                                <RefreshCw size={28} className="text-[#6366F1] animate-spin" />
                            </div>
                            <h3 className="text-[#1A1A2E] font-bold text-[17px]">Processing Payments</h3>
                            <p className="text-[#98A4AE] text-[12px] mt-1.5 text-center">
                                Processing payments through Revolut Business API. Please wait..
                            </p>
                        </div>

                        {/* Active payment card */}
                        <div className="border border-[#6366F1] bg-[#F5F4FF] rounded-xl p-4 mb-3">
                            <p className="text-[13px] font-bold text-[#6366F1] mb-1">
                                Processing payment for {member.name}
                            </p>
                            <p className="text-[11px] text-[#98A4AE]">
                                {member.amount} via Revolut Business API
                            </p>
                        </div>

                        {/* Member row */}
                        <div className="border border-[#E0E6EB] rounded-xl p-4 mb-3 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#F0F2F5] shrink-0">
                                    <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">{member.name}</p>
                                    <p className="text-[11px] text-[#98A4AE]">{member.amount}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[#6366F1]">
                                <RefreshCw size={12} className="animate-spin" />
                                <span className="text-[12px] font-semibold">Elaborazione...</span>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex gap-3">
                            <AlertCircle size={15} className="text-[#F59E0B] shrink-0 mt-0.5" />
                            <p className="text-[11px] text-[#92400E]">
                                Processing payments via Revolut Business API... Do not close this window.
                            </p>
                        </div>
                    </div>
                )}

                {/* ── STEP 4: Complete ── */}
                {step === "complete" && (
                    <div className="p-7">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[#29343D] font-bold text-[18px]">Salary Payment</h2>
                        </div>

                        {/* Icon + Title */}
                        <div className="flex flex-col items-center mb-7">
                            <div className="w-[80px] h-[80px] rounded-full bg-[#ECFDFD] flex items-center justify-center mb-4">
                                <Check size={40} className="text-[#16CDC7]" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-[#1A1A2E] font-bold text-[17px]">Payment Processing Complete</h3>
                            <p className="text-[#98A4AE] text-[12px] mt-1.5 text-center">
                                All payments are processed securely. Review the results below:
                            </p>
                        </div>

                        {/* Success / Failed cards */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <Card
                                title="Successful Payments"
                                value="1"
                                lines={[member.amount]}
                                icon={<Check size={13} className="text-white" strokeWidth={2.5} />}
                                iconBg="bg-[#22C55E]"
                                gradientFrom="#F0FDF4"
                                gradientTo="#BBF7D0"
                            />
                            <Card
                                title="Failed Payments"
                                value="0"
                                lines={[member.amount]}
                                icon={<X size={13} className="text-white" strokeWidth={2.5} />}
                                iconBg="bg-[#FF6692]"
                                gradientFrom="#FDE2E7"
                                gradientTo="#F8C7D0"
                            />
                        </div>

                        {/* Member result */}
                        <div className="border border-[#E0E6EB] rounded-xl p-4 mb-6">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-[#F0F2F5] shrink-0">
                                        <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-semibold text-[#1A1A2E]">{member.name}</p>
                                        <p className="text-[12px] text-[#98A4AE]">{member.amount}</p>
                                    </div>
                                </div>
                                <p className="text-[12px] text-[#98A4AE]">Transaction ID: 92837465</p>
                            </div>
                            <div className="flex items-center gap-1.5 mt-2">
                                <Check size={11} className="text-[#22C55E]" strokeWidth={2.5} />
                                <p className="text-[12px] text-[#98A4AE]">Payment successful through Revolut Business API</p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleClose}
                                className="cursor-pointer px-4 py-2.5 text-[14px] font-semibold text-[#6366F1] bg-[#DDDBFF] rounded-xl hover:bg-[#EEF2FF] transition-colors"
                            >
                                Ok, complete
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}