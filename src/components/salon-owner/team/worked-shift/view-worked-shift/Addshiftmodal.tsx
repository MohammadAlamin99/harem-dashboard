"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

const SCHEDULE_TYPES = ["Fixed", "Flexible", "On-Call", "Split"]

const DATES = Array.from({ length: 31 }, (_, i) => {
    const d = new Date(2024, 11, i + 1)
    return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
})

const TIMES = [
    "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
]

interface AddShiftModalProps {
    isOpen: boolean
    onClose: () => void
    onSave?: (data: {
        scheduleType: string
        date: string
        startTime: string
        endTime: string
    }) => void
}

export default function AddShiftModal({ isOpen, onClose, onSave }: AddShiftModalProps) {
    const [scheduleType, setScheduleType] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    if (!isOpen) return null

    const handleSave = () => {
        onSave?.({ scheduleType, date, startTime, endTime })
    }

    const selectClass = "appearance-none w-full border border-[#E2E8F0] rounded-[10px] px-4 py-4 pr-10 text-[14px] font-normal text-[#98A4AE] cursor-pointer hover:border-[#6366F1] focus:border-[#6366F1] transition-colors bg-white focus:outline-none"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-manrope">
            <div className="bg-white rounded-3xl w-full max-w-[619px] mx-4 overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-8 pt-8 pb-6">
                    <h2 className="text-[#29343D] text-2xl font-bold">Add Shift</h2>
                    <button
                        onClick={onClose}
                        className="text-[#29343D] hover:text-[#6366F1] transition-colors cursor-pointer"
                    >
                        <X size={20} strokeWidth={2} />
                    </button>
                </div>

                {/* Form */}
                <div className="px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Schedule Type */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#29343D]">
                            Schedule Type *
                        </label>
                        <div className="relative">
                            <select value={scheduleType} onChange={(e) => setScheduleType(e.target.value)} className={selectClass}>
                                <option value="" disabled>Select time</option>
                                {SCHEDULE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown size={16} className="text-[#98A4AE] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#29343D]">
                            Date *
                        </label>
                        <div className="relative">
                            <select value={date} onChange={(e) => setDate(e.target.value)} className={selectClass}>
                                <option value="" disabled>Select date</option>
                                {DATES.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <ChevronDown size={16} className="text-[#98A4AE] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#29343D]">
                            Start Time *
                        </label>
                        <div className="relative">
                            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className={selectClass}>
                                <option value="" disabled>Select time</option>
                                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown size={16} className="text-[#98A4AE] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-semibold text-[#29343D]">
                            End Time *
                        </label>
                        <div className="relative">
                            <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className={selectClass}>
                                <option value="" disabled>Select time</option>
                                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown size={16} className="text-[#98A4AE] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
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
    )
}