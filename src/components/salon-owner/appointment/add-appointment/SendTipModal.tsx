"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";

const TIP_OPTIONS = [
  { label: "No Tip", pct: 0, amount: null },
  { label: "10%", pct: 10, amount: "€ 13,20" },
  { label: "18%", pct: 18, amount: "€ 23,76" },
  { label: "25%", pct: 25, amount: "€ 33" },
  { label: "35%", pct: 35, amount: "€ 46,20" },
  { label: "45%", pct: 45, amount: "€ 59,40" },
  { label: "Custom Tip", pct: -1, amount: null },
];

export default function SendTipModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedTip, setSelectedTip] = useState(0);
  const [employee, setEmployee] = useState("Maria Rodriguez");
  const [empOpen, setEmpOpen] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[560px] px-7 py-6 font-manrope">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-[#29343D]">Send a Tip</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F4F6FA]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Employee */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            Employee <span className="text-red-400">*</span>
          </label>

          <div className="relative">
            <button
              onClick={() => setEmpOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#E0E6EB] rounded-[10px]"
            >
              {employee}
              <ChevronDown size={16} />
            </button>

            {empOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow">
                {["Maria Rodriguez", "John Smith", "Sarah Lee"].map((emp) => (
                  <button
                    key={emp}
                    onClick={() => {
                      setEmployee(emp);
                      setEmpOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {emp}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tip options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {TIP_OPTIONS.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedTip(i)}
              className={`py-5 rounded-xl border-2 ${
                selectedTip === i
                  ? "border-[#635BFF] bg-[#F0EEFF]"
                  : "border-[#E8ECF0]"
              }`}
            >
              <div className="font-bold">{opt.label}</div>

              {opt.amount && (
                <div className="text-xs text-gray-500">{opt.amount}</div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#635BFF] text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
