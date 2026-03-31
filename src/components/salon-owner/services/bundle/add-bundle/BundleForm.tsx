"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Option = {
    label: string
    value: string
}

export default function BundleForm() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    const [selected, setSelected] = useState<Record<string, Option | null>>({
        category: null,
        duration: null,
        postBreak: null,
        priceType: null,
    })

    const handleSelect = (key: string, option: Option) => {
        setSelected((prev) => ({ ...prev, [key]: option }))
        setOpenDropdown(null)
    }

    const renderSelect = (
        key: string,
        label: string,
        options: Option[],
        placeholder: string,
        required?: boolean,
        extra?: React.ReactNode
    ) => (
        <div className="relative">
            <label className="text-sm font-medium text-[#29343D] mb-1 block">
                {label} {required && "*"}
            </label>

            <button
                onClick={() =>
                    setOpenDropdown(openDropdown === key ? null : key)
                }
                className="w-full flex items-center justify-between px-4 py-2.5 border border-[#E0E6EB] rounded-[4px] text-sm text-[#29343D]"
            >
                {selected[key]?.label || (
                    <span className="text-[#98A4AE]">{placeholder}</span>
                )}
                <ChevronDown size={16} className="text-[#98A4AE]" />
            </button>

            {openDropdown === key && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-[#E0E6EB] rounded-[4px] shadow-md">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => handleSelect(key, opt)}
                            className="px-4 py-2 text-sm text-[#29343D] hover:bg-[#F3F3FF] cursor-pointer"
                        >
                            {opt.label}
                        </div>
                    ))}

                    {extra && (
                        <div className="px-4 py-2 border-t border-[#E0E6EB]">
                            {extra}
                        </div>
                    )}
                </div>
            )}
        </div>
    )

    return (
        <div className="font-manrope bg-white p-[15px] md:p-[30px] rounded-xl mt-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base md:text-[18px] font-semibold text-[#29343D]">
                    Basic Details
                </h2>

                <label className="flex items-center gap-2 text-sm text-[#29343D]">
                    <input type="checkbox" className="accent-[#635BFF]" />
                    Add it to online bookings
                </label>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-7">

                <div>
                    <label className="text-sm font-medium text-[#29343D] mb-1 block">
                        Bundle Name *
                    </label>
                    <input
                        placeholder="Enter bundle name"
                        className="w-full px-4 py-2.5 text-sm text-[#29343D] border border-[#E0E6EB] rounded-[4px] placeholder:text-[#29343D] focus:outline-none"
                    />
                </div>


                {renderSelect(
                    "category",
                    "Category",
                    [
                        { label: "Regular", value: "Regular" },
                        { label: "Promotion", value: "Promotion" },
                    ],
                    "Select Category",
                    true,
                )}
            </div>
            <div className="mb-7">
                <label className="text-sm font-medium text-[#29343D] mb-1 block">
                    Description (Optional)
                </label>
                <textarea
                    rows={4}
                    placeholder="Enter a description"
                    className="w-full px-4 py-2.5 text-sm text-[#29343D] border border-[#E0E6EB] rounded-[4px] placeholder:text-[#29343D] focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {renderSelect(
                    "priceType",
                    "Price Type",
                    [
                        { label: "Fixed", value: "fixed" },
                        { label: "% Discount", value: "% Discount" },
                    ],
                    "Fixed",
                    true
                )}

                <div>
                    <label className="text-sm font-medium text-[#29343D] mb-1 block">
                        Price *
                    </label>
                    <input
                        placeholder="Enter price"
                        className="w-full px-4 py-2.5 text-sm text-[#29343D] border border-[#E0E6EB] rounded-[4px] placeholder:text-[#29343D] focus:outline-none"
                    />
                </div>

                {renderSelect(
                    "duration",
                    "duration",
                    [
                        { label: "15 min", value: "15" },
                        { label: "30 min", value: "30" },
                    ],
                    "15 min",
                    true
                )}
            </div>
        </div>
    )
}