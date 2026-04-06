"use client";

interface PrintReceiptModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

export default function PrintReceiptModal({
    open,
    onClose,
    onConfirm,
}: PrintReceiptModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 font-manrope">
            <div className="bg-white w-full max-w-[540px] rounded-[12px] shadow-[0px_20px_50px_rgba(0,0,0,0.15)] p-6">

                {/* Title */}
                <h2 className="text-lg font-semibold text-[#29343D] mb-6">
                    Print Receipt
                </h2>

                {/* Description */}
                <p className="text-sm text-[#29343D] mb-6">
                    The online payment has been correctly received, do you want to proceed
                    printing and sending the copy to the client?
                </p>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-lg bg-[#F6F7F9] text-[#29343D] text-sm font-medium hover:bg-[#ebedf2] transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2.5 rounded-lg bg-[#DDDBFF] text-[#635BFF] text-sm font-medium hover:bg-[#e5e2ff] transition-colors cursor-pointer"
                    >
                        Print and Send Copy
                    </button>
                </div>

            </div>
        </div>
    );
}