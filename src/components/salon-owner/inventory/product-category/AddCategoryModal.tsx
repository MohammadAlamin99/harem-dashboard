"use client";
import { X } from "lucide-react";

interface AddCategoryModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddCategoryModal({
    open,
    onClose,
}: AddCategoryModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-[746px] rounded-xl shadow-xl flex flex-col font-manrope">

                {/* HEADER */}
                <div className="flex justify-between items-center p-6">
                    <h2 className="text-xl font-bold text-[#29343D]">
                        Add Category
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-[#29343D] hover:opacity-70 transition-opacity"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* CONTENT AREA */}
                <div className="px-6 pb-6 flex flex-col gap-6">

                    {/* Category Name */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#29343D] mb-2">
                            Category Name *
                        </h4>
                        <input
                            type="text"
                            className="w-full border border-[#E0E6EB] rounded-lg p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]"
                            placeholder="Enter category name"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#29343D] mb-2">
                            Description (Optional)
                        </h4>
                        <textarea
                            rows={5}
                            className="w-full border border-[#E0E6EB] rounded-lg p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3] resize-y min-h-[120px]"
                            placeholder="Enter a description"
                        />
                    </div>

                </div>

                {/* FOOTER */}
                <div className="p-6 pt-2 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-[#635BFF] text-white px-4 py-2.5 cursor-pointer rounded-lg font-semibold text-sm hover:bg-[#5249e0] transition-colors shadow-sm"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}