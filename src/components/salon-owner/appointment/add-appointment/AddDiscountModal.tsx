"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DISCOUNT_TYPES = ["Percentage", "Fixed Amount"];

export default function AddDiscountModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [discountType, setDiscountType] = useState("Percentage");
  const [typeOpen, setTypeOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.25)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-[560px] px-7 py-6">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-[#29343D]">Add Cart Discount</h3>

          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          Taxes will be recalculated after discount applied.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Discount Type */}
          <div ref={typeRef} className="relative">
            <label className="text-sm font-semibold block mb-2">Type</label>

            <button
              onClick={() => setTypeOpen((o) => !o)}
              className="w-full flex justify-between px-4 py-3 border rounded-lg"
            >
              {discountType}
              <ChevronDown size={16} />
            </button>

            {typeOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow">
                {DISCOUNT_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setDiscountType(t);
                      setTypeOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-semibold block mb-2">Amount</label>

            <input
              type="text"
              placeholder="Enter value"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border px-4 py-3 rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#635BFF] text-white rounded-lg"
          >
            Add Discount
          </button>
        </div>
      </div>
    </div>
  );
}
