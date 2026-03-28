"use client"
import { useState, useEffect, useRef } from "react"
import { X, ChevronDown, Trash2, Plus } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface ShiftRow {
    id: number
    startTime: string
    endTime: string
}

interface EditShiftModalProps {
    isOpen: boolean
    onClose: () => void
    memberName?: string
    dayLabel?: string // e.g. "Mon, 11 Aug"
}

// ─── Time options ─────────────────────────────────────────────────────────────

const TIME_OPTIONS: string[] = []
for (let h = 0; h < 24; h++) {
    for (const m of ["00", "30"]) {
        const hour = h.toString().padStart(2, "0")
        TIME_OPTIONS.push(`${hour}:${m}`)
    }
}

// ─── Calculate total hours ────────────────────────────────────────────────────

function calcTotalHours(rows: ShiftRow[]): string {
    let total = 0
    for (const row of rows) {
        if (!row.startTime || !row.endTime) continue
        const [sh, sm] = row.startTime.split(":").map(Number)
        const [eh, em] = row.endTime.split(":").map(Number)
        const diff = eh * 60 + em - (sh * 60 + sm)
        if (diff > 0) total += diff
    }
    if (total === 0) return "0h"
    const h = Math.floor(total / 60)
    const m = total % 60
    return m === 0 ? `${h}h` : `${h}h ${m}m`
}

// ─── Time Select Dropdown ─────────────────────────────────────────────────────

function TimeSelect({
    value,
    placeholder,
    onChange,
}: {
    value: string
    placeholder: string
    onChange: (val: string) => void
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    return (
        <div ref={ref} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className={`
                    w-full h-[44px] px-3.5 flex items-center justify-between
                    border rounded-lg text-[13px] transition-colors
                    ${open
                        ? "border-[#6366F1] ring-2 ring-[#6366F1]/15"
                        : "border-[#E0E6EB] hover:border-[#C4CAD6]"
                    }
                    bg-white
                `}
            >
                <span className={value ? "text-[#1A1A2E] font-medium" : "text-[#B0BAC4]"}>
                    {value || placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={`text-[#B0BAC4] transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="
                    absolute top-full mt-1 left-0 right-0 z-50
                    bg-white border border-[#E0E6EB] rounded-xl
                    shadow-[0_8px_24px_rgba(0,0,0,0.10)]
                    max-h-[200px] overflow-y-auto
                ">
                    {TIME_OPTIONS.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => { onChange(t); setOpen(false) }}
                            className={`
                                block w-full text-left px-4 py-2 text-[13px] transition-colors
                                ${value === t
                                    ? "bg-[#EEF2FF] text-[#6366F1] font-semibold"
                                    : "text-[#1A1A2E] hover:bg-[#F4F6FA]"
                                }
                            `}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

let nextId = 1
function makeRow(): ShiftRow {
    return { id: nextId++, startTime: "", endTime: "" }
}

export default function EditShiftModal({
    isOpen,
    onClose,
    memberName = "Maria Rodriguez",
    dayLabel = "Mon, 11 Aug",
}: EditShiftModalProps) {
    const [rows, setRows] = useState<ShiftRow[]>([makeRow()])

    // Reset when opened
    const [prevOpen, setPrevOpen] = useState(isOpen)
    if (isOpen !== prevOpen) {
        setPrevOpen(isOpen)
        if (isOpen) setRows([makeRow()])
    }

    function setStart(id: number, val: string) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, startTime: val } : r)))
    }
    function setEnd(id: number, val: string) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, endTime: val } : r)))
    }
    function deleteRow(id: number) {
        setRows((prev) => prev.filter((r) => r.id !== id))
    }
    function addRow() {
        setRows((prev) => [...prev, makeRow()])
    }

    function handleSave() {
        // TODO: wire up real save logic
        onClose()
    }

    if (!isOpen) return null

    const totalLabel = calcTotalHours(rows)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-manrope">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal card */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[696px] mx-4 overflow-hidden">
                <div className="px-7 pt-6 pb-7">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[#1A1A2E] font-bold text-[16px]">
                            Edit {memberName}&apos;s Shift
                        </h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors"
                        >
                            <X size={16} className="text-[#98A4AE]" />
                        </button>
                    </div>

                    {/* Inner card */}
                    <div className="border border-[#E8ECF0] rounded-xl p-5">

                        {/* Day + Total badge */}
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-[15px] font-bold text-[#1A1A2E]">{dayLabel}</p>
                            <span className="
                                px-3 py-1 rounded-full
                                bg-[#ECEEFF] text-[#6366F1]
                                text-[12px] font-semibold
                            ">
                                Total: {totalLabel}
                            </span>
                        </div>

                        {/* Shift rows */}
                        <div className="flex flex-col gap-4">
                            {rows.map((row) => (
                                <div key={row.id}>
                                    {/* Labels */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex-1">
                                            <label className="text-[12px] font-semibold text-[#1A1A2E]">
                                                Start Time <span className="text-[#1A1A2E]">*</span>
                                            </label>
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[12px] font-semibold text-[#1A1A2E]">
                                                End Time <span className="text-[#1A1A2E]">*</span>
                                            </label>
                                        </div>
                                        {/* Spacer for trash icon */}
                                        <div className="w-9 shrink-0" />
                                    </div>

                                    {/* Inputs row */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <TimeSelect
                                                value={row.startTime}
                                                placeholder="Select time"
                                                onChange={(v) => setStart(row.id, v)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TimeSelect
                                                value={row.endTime}
                                                placeholder="Select time"
                                                onChange={(v) => setEnd(row.id, v)}
                                            />
                                        </div>
                                        {/* Trash button */}
                                        <button
                                            type="button"
                                            onClick={() => deleteRow(row.id)}
                                            className="
                                                w-9 h-[44px] cursor-pointer
                                            "
                                        >
                                            <Trash2 size={15} className="text-[#FF6692]" strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add a Shift */}
                        <button
                            type="button"
                            onClick={addRow}
                            className="
                                mt-4 flex items-center gap-1.5
                                text-[13px] font-semibold text-[#6366F1]
                                hover:underline transition-colors
                            "
                        >
                            Add a Shift
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end mt-5">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="
                                px-4 py-2.5
                                bg-[#6366F1] hover:bg-[#4F46E5]
                                text-white text-[14px] font-semibold
                                rounded-lg transition-colors cursor-pointer
                            "
                        >
                            Save
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}