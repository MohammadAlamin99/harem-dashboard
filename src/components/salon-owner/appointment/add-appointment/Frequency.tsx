"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const FREQUENCY_OPTIONS = [
  "Doesn't repeat",
  "Daily",
  "Weekly",
  "Bi-weekly",
  "Monthly",
  "Custom",
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Frequency({ onNext }: { onNext?: () => void }) {
  const [selected, setSelected] = useState("Doesn't repeat");
  const [open, setOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="font-manrope flex flex-col gap-5">
      {/* ── Frequency card ── */}
      <div className="bg-white rounded-2xl border border-[#EBEBEB] px-8 py-6">
        {/* Label */}
        <label className="block text-sm font-bold text-[#1A1A2E] mb-3">
          Frequency <span className="text-[#635BFF]">*</span>
        </label>

        {/* Custom dropdown */}
        <div ref={dropRef} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center justify-between px-4 py-3.5 border rounded-[10px] bg-white transition-colors cursor-pointer text-left ${
              open
                ? "border-[#635BFF]"
                : "border-[#E0E6EB] hover:border-[#B0BAC5]"
            }`}
          >
            <span
              className={`text-sm ${selected === "Doesn't repeat" ? "text-[#AFAFAF]" : "text-[#29343D] font-medium"}`}
            >
              {selected}
            </span>
            <ChevronDown
              size={18}
              className={`text-[#AFAFAF] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown list */}
          {open && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E0E6EB] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.09)] z-20 py-1.5 overflow-hidden">
              {FREQUENCY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer font-manrope ${
                    selected === opt
                      ? "bg-[#F0EEFF] text-[#635BFF] font-semibold"
                      : "text-[#29343D] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Set up frequency link */}
        <button className="mt-3 text-sm font-semibold text-[#635BFF] hover:underline cursor-pointer">
          Set up frequency
        </button>
      </div>

      {/* ── Next button ── */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-bold rounded-[10px] transition-colors cursor-pointer shadow-[0_2px_10px_rgba(99,91,255,0.35)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
