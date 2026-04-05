"use client";

import React, { useEffect } from "react";

interface CancelReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function CancelReceiptModal({
    isOpen,
    onClose,
    onConfirm,
}: CancelReceiptModalProps) {

    // Prevent scrolling when modal is open
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
                className="bg-white w-full max-w-[521px] p-6 rounded-[12px] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title */}
                <h2 className="text-lg font-semibold text-[#29343D] font-manrope mb-6">
                    Cancel the receipt
                </h2>

                {/* Content Description */}
                <p className="text-[14px] font-normal text-[#29343D] leading-relaxed mb-6">
                    Do you want to cancel the receipt that was issued after payment?
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2.5">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 bg-[#F4F6FA] text-[#29343D] font-medium cursor-pointer rounded-[8px] text-[12px] transition-all hover:bg-[#ebedf3] active:scale-95"
                    >
                        No
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2.5 bg-[#E3E0FF] text-[#635BFF] font-medium cursor-pointer rounded-[8px] text-[12px] transition-all hover:bg-[#d5d0ff] active:scale-95"
                    >
                        Yes, cancel now
                    </button>
                </div>
            </div>
        </div>
    );
}