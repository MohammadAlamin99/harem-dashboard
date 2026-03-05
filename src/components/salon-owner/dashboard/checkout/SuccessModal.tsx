import { Check } from "lucide-react";

export default function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white w-full max-w-[455px] rounded-2xl shadow-xl p-8 z-10 mx-4 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#ECFDFD] flex items-center justify-center mb-5">
          <Check size={42} strokeWidth={2.5} className="text-[#00BFA5]" />
        </div>
        <h2 className="text-xl font-bold font-manrope text-[#29343D] mb-2">
          Sucess!
        </h2>
        <p className="text-sm font-manrope text-[#98A4AE] mb-6">
          Receipt has been created successfully.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-[8px] text-sm font-medium font-manrope bg-[#DDDBFF] text-[#635BFF] hover:bg-[#ceccfa] transition-colors cursor-pointer"
          >
            Send by Email
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope rounded-[8px] cursor-pointer"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
