"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const CATEGORY_STYLES: Record<string, string> = {
    "Category 1": "bg-[#DDDBFF] text-[#635BFF]",
    "Category 2": "bg-[#ECFDFD] text-[#16CDC7]",
    "Category 3": "bg-[#EBFAF0] text-[#36C76C]",
    "Category 4": "bg-[#FFF9E5] text-[#FFD648]",
    "Category 5": "bg-[#FFE5ED] text-[#FF6692]",
    "Category 6": "bg-[#F6F7F9] text-[#0A2540]",
}

interface ServiceDetailCardProps {
    name: string
    category: string
    addToOnlineBookings?: boolean
    defaultDuration: string
    postBreakMin: string
    priceType: string
    price: string
    vat: string
    description: string
    onBookingToggle?: (value: boolean) => void
}

export default function ServiceDetailCard({
    name,
    category,
    addToOnlineBookings = true,
    defaultDuration,
    postBreakMin,
    priceType,
    price,
    vat,
    description,
    onBookingToggle,
}: ServiceDetailCardProps) {
    const [bookingEnabled, setBookingEnabled] = useState(addToOnlineBookings)

    const handleToggle = () => {
        const next = !bookingEnabled
        setBookingEnabled(next)
        onBookingToggle?.(next)
    }

    return (
        <div className="bg-white rounded-xl border border-[#E0E6EB] p-6 font-manrope">

            {/* Top Row: Name + Checkbox */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#29343D] text-lg font-bold">{name}</h2>
                <button
                    onClick={handleToggle}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <div className={`w-5 h-5 rounded-[4px] flex items-center justify-center transition-colors ${bookingEnabled ? "bg-[#6366F1]" : "border-2 border-[#E0E6EB] bg-white"}`}>
                        {bookingEnabled && <Check size={12} strokeWidth={3} className="text-white" />}
                    </div>
                    <span className="text-[14px] font-medium text-[#29343D]">Add it to online bookings</span>
                </button>
            </div>

            {/* Category */}
            <div className="mb-5">
                <p className="text-[12px] font-semibold text-[#98A4AE] mb-2">Category</p>
                <span className={`text-[12px] font-semibold px-3 py-1 rounded-lg ${CATEGORY_STYLES[category] ?? "bg-[#F6F7F9] text-[#0A2540]"}`}>
                    {category}
                </span>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] mb-5" />

            {/* Default Duration + Post-break Min */}
            <div className="grid grid-cols-2 gap-6 mb-5">
                <div>
                    <p className="text-[12px] font-semibold text-[#98A4AE] mb-1">Default Duration</p>
                    <p className="text-[14px] font-bold text-[#29343D]">{defaultDuration}</p>
                </div>
                <div>
                    <p className="text-[12px] font-semibold text-[#98A4AE] mb-1">Post-break Min</p>
                    <p className="text-[14px] font-bold text-[#29343D]">{postBreakMin}</p>
                </div>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] mb-5" />

            {/* Price Type + Price */}
            <div className="grid grid-cols-2 gap-6 mb-5">
                <div>
                    <p className="text-[12px] font-semibold text-[#98A4AE] mb-1">Price Type</p>
                    <p className="text-[14px] font-bold text-[#29343D]">{priceType}</p>
                </div>
                <div>
                    <p className="text-[12px] font-semibold text-[#98A4AE] mb-1">Price</p>
                    <p className="text-[14px] font-bold text-[#29343D]">{price}</p>
                </div>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] mb-5" />

            {/* VAT */}
            <div className="mb-5">
                <p className="text-[12px] font-semibold text-[#98A4AE] mb-1">VAT</p>
                <p className="text-[14px] font-bold text-[#29343D]">{vat}</p>
            </div>

            <div className="w-full h-px bg-[#F3F4F6] mb-5" />

            {/* Description */}
            <div>
                <p className="text-[12px] font-semibold text-[#98A4AE] mb-1">Price Type</p>
                <p className="text-[14px] text-[#29343D] leading-relaxed">{description}</p>
            </div>

        </div>
    )
}