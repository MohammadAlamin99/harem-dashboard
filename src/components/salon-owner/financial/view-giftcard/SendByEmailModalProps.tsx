"use client";

import { X } from "lucide-react";

interface SendByEmailModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SendByEmailModal({
  open,
  onClose,
}: SendByEmailModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-manrope">
      <div className="bg-white w-full max-w-[746px] rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h2 className="text-lg font-semibold text-[#29343D]">Send by Email</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-[#29343D]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-4">
          <label className="block text-sm font-semibold text-[#29343D] mb-3">
            Email *
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-[#E0E6EB] rounded-[4px] p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#29343D]"
          />
        </div>

        {/* Footer */}
        <div className="p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#635BFF] text-white px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-[#5249e0] transition-colors shadow-sm cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
