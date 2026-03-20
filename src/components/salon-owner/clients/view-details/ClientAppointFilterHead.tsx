"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type DateFilterOption =
  | "Last 7 days"
  | "Last 14 days"
  | "Last Month"
  | "Last 3 Months"
  | "Custom Range";

type StatusFilterOption =
  | "All"
  | "Booked"
  | "Confirmed"
  | "Arrived"
  | "Started"
  | "Completed"
  | "Canceled"
  | "No-show";

const dateOptions: DateFilterOption[] = [
  "Last 7 days",
  "Last 14 days",
  "Last Month",
  "Last 3 Months",
  "Custom Range",
];

const statusOptions: StatusFilterOption[] = [
  "All",
  "Booked",
  "Confirmed",
  "Arrived",
  "Started",
  "Completed",
  "Canceled",
  "No-show",
];

export default function ClientAppointFilterHead() {
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(200);
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("Last 7 days");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [showDateDrop, setShowDateDrop] = useState<boolean>(false);
  const [showStatusDrop, setShowStatusDrop] = useState<boolean>(false);

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinVal(value[0]);
      setMaxVal(value[1]);
    }
  };

  return (
    <div className="bg-white font-manrope mb-[30px] mt-3">
      {/* ── Row 1: Slider centered on top ── */}
      <div className="flex justify-end mb-3 px-60">
        <div className="w-56">
          <Slider
            range
            min={0}
            max={200}
            value={[minVal, maxVal]}
            onChange={handleRangeChange}
            styles={{
              track: {
                backgroundColor: "#635BFF",
                height: 8,
                borderRadius: 999,
              },
              rail: {
                backgroundColor: "#DDD9FF",
                height: 8,
                borderRadius: 999,
              },
              handle: {
                backgroundColor: "#635BFF",
                borderColor: "#635BFF",
                width: 16,
                height: 16,
                marginTop: -5,
                opacity: 1,
                cursor: "grab",
              },
            }}
          />
        </div>
      </div>

      {/* ── Row 2: Title | Amount Spent + labels | Dropdowns ── */}
      <div className="flex justify-between items-center">
        {/* Left: Title */}
        <h2 className="text-[#29343D] font-manrope font-semibold text-lg md:text-[22px] whitespace-nowrap">
          Appointments
        </h2>

        <div className="flex items-center gap-[20px]">
          {/* Center: Amount Spent label + bordered € value boxes */}
          <div className="flex font-manrope items-center gap-2 text-[12px] text-[#9CA3AF]">
            <span className="font-manrope whitespace-nowrap">Amount Spent</span>
            <div className="flex items-center border border-[#DDE1E7] rounded-lg px-3 py-2 bg-white w-24">
              <span className="mr-1">€</span>
              <span>{minVal}</span>
            </div>
            <span>-</span>
            <div className="flex items-center border border-[#DDE1E7] rounded-lg px-3 py-2 bg-white w-24">
              <span className="mr-1">€</span>
              <span>{maxVal}</span>
            </div>
          </div>

          {/* Right: Dropdowns */}
          <div className="flex items-center gap-4">
            {/* Date dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowDateDrop((prev) => !prev);
                  setShowStatusDrop(false);
                }}
                className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
              >
                {dateFilter}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
              {showDateDrop && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 z-30 min-w-[160px]">
                  {dateOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setDateFilter(o);
                        setShowDateDrop(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors
                      ${dateFilter === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDrop((prev) => !prev);
                  setShowDateDrop(false);
                }}
                className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
              >
                {statusFilter}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
              {showStatusDrop && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-1 z-30 min-w-[140px]">
                  {statusOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setStatusFilter(o);
                        setShowStatusDrop(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors
                      ${statusFilter === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
