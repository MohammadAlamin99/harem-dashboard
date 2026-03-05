import { Banknote, CreditCard, X } from "lucide-react";
import { useState } from "react";

export default function DividePaymentModal({
  total,
  onClose,
  onConfirm,
}: {
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const half = Math.floor(total / 2);
  const [cashAmount, setCashAmount] = useState(String(half));
  const [cardAmount, setCardAmount] = useState(String(total - half));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[746px] rounded-2xl shadow-xl p-6 z-10 mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold font-manrope text-[#29343D]">
            Divide Payment
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <X size={18} className="text-[#29343D]" />
          </button>
        </div>
        <p className="text-sm font-semibold font-manrope text-[#29343D] mb-2">
          Total Amount
        </p>
        <div className="bg-[#F4F6FA] border border-[#EFF4FA] rounded-[4px] px-4 py-3 mb-5">
          <span className="text-sm font-manrope text-[#98A4AE]">€ {total}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-[#EFF4FA] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#EBFAF0] flex items-center justify-center">
                <Banknote size={24} className="text-[#36C76C]" />
              </div>
              <span className="text-sm font-semibold font-manrope text-[#29343D]">
                Cash
              </span>
            </div>
            <div className="border border-[#E0E6EB] rounded-[4px] px-3 py-2">
              <input
                type="text"
                value={`€ ${cashAmount}`}
                onChange={(e) =>
                  setCashAmount(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="w-full text-sm font-manrope text-[#29343D] outline-none bg-transparent"
              />
            </div>
          </div>
          <div className="border border-[#EFF4FA] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#EBFAF0] flex items-center justify-center">
                <CreditCard size={24} className="text-[#36C76C]" />
              </div>
              <span className="text-sm font-semibold font-manrope text-[#29343D]">
                Card Terminal
              </span>
            </div>
            <div className="border border-[#E0E6EB] rounded-[4px] px-3 py-2">
              <input
                type="text"
                value={`€ ${cardAmount}`}
                onChange={(e) =>
                  setCardAmount(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="w-full text-sm font-manrope text-[#29343D] outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm font-medium font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope rounded-[8px] cursor-pointer"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
