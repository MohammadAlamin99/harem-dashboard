"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function AddAllergieModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState("");
  const [note, setNote] = useState("");
  const [severityOpen, setSeverityOpen] = useState(false);

  const severityOptions = ["Mild", "Moderate", "Severe"];

  const handleSave = () => {
    console.log({ name, severity, note });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-[620px] mx-4 bg-white rounded-2xl shadow-2xl overflow-visible">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="text-[20px] font-semibold font-manrope text-[#29343D]">
            Add Allergie
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F4F7] transition cursor-pointer"
          >
            <X size={20} color="#29343D" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-6 space-y-5">

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-[15px] font-medium font-manrope text-[#29343D]">
              Name <span className="text-[#29343D]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="rounded-[4px] w-full px-4 py-3 font-manrope text-[15px] text-[#29343D] placeholder:text-[#29343D]
                border border-[#E5E7EB] outline-none
                focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10
                transition"
            />
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <label className="block text-[15px] font-medium font-manrope text-[#29343D]">
              Severity{" "}
              <span className="font-normal text-[#29343D]">(optional)</span>
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setSeverityOpen((p) => !p)}
                className="rounded-[4px] w-full flex items-center justify-between px-4 py-3
                  border border-[#E5E7EB] bg-white
                  font-manrope text-[15px] text-[#98A4AE]
                  focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10
                  outline-none transition cursor-pointer"
              >
                <span className="text-[#98A4AE]">
                  {severity || "Mild"}
                </span>
                <ChevronDown
                  size={20}
                  color="#98A4AE"
                  className={`transition-transform duration-200 ${severityOpen ? "rotate-180" : ""}`}
                />
              </button>

              {severityOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 bg-white border 
                  border-[#E5E7EB] shadow-lg z-10 overflow-hidden rounded-[4px]"
                >
                  {severityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSeverity(opt);
                        setSeverityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 font-manrope text-[15px] hover:bg-[#F3F4F7] transition cursor-pointer
                        ${severity === opt ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <label className="block text-[15px] font-medium font-manrope text-[#29343D]">
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter note"
              rows={6}
              className="rounded-[4px] w-full px-4 py-3 font-manrope text-[15px] text-[#29343D] placeholder:text-[#29343D]
                border border-[#E5E7EB] outline-none resize-y
                focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10
                transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-8 pb-8">
          <button
            onClick={handleSave}
            className="bg-[#635BFF] text-white font-manrope text-[15px] font-medium
              px-6 py-2.5 rounded-lg cursor-pointer
              hover:opacity-90 active:scale-[0.97] transition-all
              shadow-[0_8px_24px_-6px_rgba(99,91,255,0.5)]"
          >
            Save Allergie
          </button>
        </div>
      </div>
    </div>
  );
}