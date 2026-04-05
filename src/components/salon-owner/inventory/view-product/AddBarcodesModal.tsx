"use client";
import { X } from "lucide-react";

interface AddBarcodesModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddBarcodesModal({
    open,
    onClose,
}: AddBarcodesModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-[746px] rounded-xl shadow-xl flex flex-col font-manrope">

                {/* HEADER */}
                <div className="flex justify-between items-center p-6 pb-2">
                    <h2 className="text-xl font-bold text-[#29343D]">
                        Add Barcodes
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-[#29343D] hover:opacity-70 transition-opacity"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* CONTENT AREA */}
                <div className="p-6 pt-4 flex flex-col gap-4">
                    <div>
                        <h4 className="text-sm font-semibold text-[#29343D] mb-3">
                            Barcodes *
                        </h4>
                        <input
                            type="text"
                            className="w-full border border-[#E0E6EB] rounded-lg p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3] placeholder:font-normal"
                            placeholder="Enter barcodes"
                        />
                    </div>
                </div>

                {/* FOOTER AREA */}
                <div className="p-6 pt-10 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-[#635BFF] text-white px-4 cursor-pointer py-2.5 rounded-lg font-semibold text-sm hover:bg-[#5249e0] transition-colors shadow-sm"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}