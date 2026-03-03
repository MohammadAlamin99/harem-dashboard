"use client";

import { EllipsisVertical, Settings2, Download, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SummeyBox from "./SummeyBox";
import ReceptSummer from "./ReceptSummer";

export default function SalonSummery() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const summaryData = [
    {
      id: 1,
      text: "Total received",
      value: "€ 2,300",
      color: "text-[#635BFF]",
    },
    { id: 2, text: "Receipts issued", value: "12", color: "text-[#36C76C]" },
    {
      id: 3,
      text: "Last receipt",
      value: "#R-2025-0098",
      color: "text-[#16CDC7]",
    },
  ];

  return (
    <>
      <div className="p-6 bg-white rounded-[12px]">
        <div className="flex justify-between items-center max-[992px]:flex-col max-[992px]:items-start">
          <h2 className="text-[16px] text-[#29343D] font-manrope font-semibold">
            Daily Summary
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 font-manrope text-[#FF6692] bg-[#FFE5ED] w-fit px-2.5 py-1.5 rounded-2xl">
              <div className="w-2 h-2 bg-[#FF6692] rounded-full"></div>
              Cash Register Closed
            </div>

            {/* Dropdown wrapper */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="px-4 py-2.5 bg-[#EFF4FA] rounded-[8px] hover:bg-[#e2eaf4] transition cursor-pointer"
              >
                <EllipsisVertical size={18} />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 top-12 z-50 bg-white rounded-2xl shadow-xl border border-[#F0F0F0] py-2 w-56">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-manrope text-[#29343D] hover:bg-[#F8F9FA] transition cursor-pointer"
                  >
                    <Settings size={18} />
                    Cash register settings
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false); /* handle export */
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-manrope text-[#29343D] hover:bg-[#F8F9FA] transition cursor-pointer"
                  >
                    <Download size={18} className="text-[#635BFF]" />
                    Export Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary box */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {summaryData.map((item) => (
            <SummeyBox
              key={item.id}
              text={item.text}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        {/* Receipt summary */}
        <div className="bg-[#635BFF] p-6 mt-5 rounded-xl">
          <ReceptSummer />
        </div>
      </div>
    </>
  );
}
