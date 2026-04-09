"use client";

import { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";

interface SchedulePostProps {
    setView: (view: "post" | "schedule") => void;
    onClose: () => void;
}

export default function SchedulePostModal({ setView, onClose }: SchedulePostProps) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope px-4">
            <div className="bg-white rounded-[12px] w-full max-w-[580px] shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 pt-6 pb-6">
                    <h2 className="text-[#29343D] text-lg font-bold">Schedule Post</h2>
                    <button onClick={onClose} className="text-[#29343D]">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    <div className="grid grid-cols-2 gap-6 mb-10">
                        {/* Date Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-semibold text-[#29343D]">
                                Date *
                            </label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-3.5 border border-[#E2E8F0] rounded-[4px] outline-none focus:border-[#6366F1] text-[14px] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Calendar
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none group-focus-within:text-[#6366F1]"
                                />
                            </div>
                        </div>

                        {/* Time Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-semibold text-[#29343D]">
                                Time *
                            </label>
                            <div className="relative group">
                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="w-full p-3.5 border border-[#E2E8F0] rounded-[4px] outline-none focus:border-[#6366F1] text-[14px] appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                />
                                <Clock
                                    size={18}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none group-focus-within:text-[#6366F1]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setView("post")}
                            className="px-4 cursor-pointer py-2.5 border border-[#E2E8F0] text-[#64748B] rounded-[8px] text-[14px] font-medium hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 cursor-pointer py-2.5 bg-[#6366F1] text-white rounded-[8px] text-[14px] font-bold shadow-lg shadow-indigo-100 hover:bg-[#4F46E5]"
                        >
                            Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}