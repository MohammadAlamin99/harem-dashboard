"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AddCategoryModalProps {
    isOpen: boolean
    onClose: () => void
    onSave?: (data: { name: string; description: string }) => void
}

export default function AddServiceCategoryMoal({ isOpen, onClose, onSave }: AddCategoryModalProps) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    if (!isOpen) return null

    const handleSave = () => {
        onSave?.({ name, description })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope">
            <div className="bg-white w-full max-w-[746px] mx-4 shadow-xl" style={{ borderRadius: "12px" }}>

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-7 pb-6">
                    <h2 className="text-[#29343D] text-lg font-bold">Add Category</h2>
                    <button
                        onClick={onClose}
                        className="text-[#29343D] hover:text-[#6366F1] transition-colors cursor-pointer"
                    >
                        <X size={20} strokeWidth={2} />
                    </button>
                </div>

                {/* Form */}
                <div className="px-8 pb-8 flex flex-col gap-5">

                    {/* Category Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#29343D]">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter category name"
                            className="w-full border border-[#E2E8F0] rounded-[4px] px-4 py-3.5 text-[14px] text-[#29343D] placeholder:text-[#29343D] focus:outline-none focus:border-[#6366F1] hover:border-[#6366F1] transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#29343D]">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a description"
                            rows={6}
                            className="w-full border border-[#E2E8F0] rounded-[4px] px-4 py-3.5 text-[14px] text-[#29343D] placeholder:text-[#29343D] focus:outline-none focus:border-[#6366F1] hover:border-[#6366F1] transition-colors resize-none"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer"
                        >
                            Save
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}