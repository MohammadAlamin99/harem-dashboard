import { X } from "lucide-react";

export default function ExportModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-[#29343D] font-manrope">
            Export Report
          </h3>
          <button onClick={onClose} className="cursor-pointer">
            <X size={18} color="#29343D" />
          </button>
        </div>

        {/* Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#29343D] font-manrope mb-2">
            Range *
          </label>
          <select className="w-full font-manrope text-[#98A4AE] border border-[#E0E6EB] rounded-[4px] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button className="px-4 py-2.5 bg-[#635BFF] text-white text-sm rounded-[8px] cursor-pointer">
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
