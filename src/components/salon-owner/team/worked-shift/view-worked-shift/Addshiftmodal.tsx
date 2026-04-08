"use client";
import { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import ICalaender from "@/app/account-protal/svg/ICalaender";

interface AddShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { date: string; startTime: string; endTime: string }) => void;
}

export default function AddShiftModal({
  isOpen,
  onClose,
  onSave,
}: AddShiftModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.({ date, startTime, endTime });
  };

  // Shared input styling
  // Added pr-12 to make room for the icon
  // Added [&::-webkit-calendar-picker-indicator]:opacity-0 to hide default browser icons
  const inputClass =
    "w-full border border-[#E2E8F0] rounded-[4px] px-4 py-4 pr-12 text-[14px] font-normal text-[#98A4AE] cursor-pointer hover:border-[#6366F1] focus:border-[#6366F1] transition-colors bg-white focus:outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope">
      <div className="bg-white rounded-xl w-full max-w-[619px] mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <h2 className="text-[#29343D] text-lg font-bold">Add Shift</h2>
          <button
            onClick={onClose}
            className="text-[#29343D] hover:text-[#6366F1] transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Form */}
        <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Date Picker */}
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-[14px] font-semibold text-[#29343D]">
              Date *
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A4AE] pointer-events-none">
                <ICalaender size={20} />
              </div>
            </div>
          </div>

          {/* Start Time */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#29343D]">
              Start Time *
            </label>
            <div className="relative">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputClass}
              />
              <Clock
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A4AE] pointer-events-none"
              />
            </div>
          </div>

          {/* End Time */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#29343D]">
              End Time *
            </label>
            <div className="relative">
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputClass}
              />
              <Clock
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#98A4AE] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-8 pb-8">
          <button
            onClick={handleSave}
            className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
