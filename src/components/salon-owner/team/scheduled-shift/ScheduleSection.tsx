"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2,
} from "lucide-react"
import PaginationClient from "../../clients/PaginationClient"
import EditShiftModal from "./Editshiftmodal"

interface Member {
    id: number
    name: string
    hours: string
    avatar: string
}

interface Shift {
    memberId: number
    day: string
    time: string
    type: "normal" | "blocked" | "off"
}


const MEMBERS: Member[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: "Maria Rodriguez",
    hours: "52h",
    avatar: `/images/avator.png`,
}))

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DAYS_FULL = ["Mon, 11 Aug", "Tue, 12 Aug", "Wed, 13 Aug", "Thu, 14 Aug", "Fri, 15 Aug", "Sat, 16 Aug", "Sun, 17 Aug"]
const DAYS_SHORT = ["11", "12", "13", "14", "15", "16", "17"]

function buildShifts(): Shift[] {
    const shifts: Shift[] = []
    MEMBERS.forEach((m) => {
        DAYS.forEach((d) => {
            shifts.push({ memberId: m.id, day: d, time: "10:00 - 19:00", type: "normal" })
        })
    })
    return shifts
}

const ALL_SHIFTS = buildShifts()

interface ContextMenu {
    x: number
    y: number
    memberId: number
    day: string
}


function ShiftPill({
    shift,
    onContextMenu,
}: {
    shift: Shift | undefined
    onContextMenu: (e: React.MouseEvent) => void
}) {
    if (!shift) return <div className="w-full h-[34px]" />

    const colors = {
        normal: "bg-[#EEEEFF] text-[#6366F1] border border-[#DDDDFB]",
        blocked: "bg-[#FFF4E5] text-[#F59E0B] border border-[#FDDFA5]",
        off: "bg-[#F5F5F5] text-[#98A4AE] border border-[#E0E6EB] line-through",
    }

    return (
        <button
            onContextMenu={onContextMenu}
            onClick={onContextMenu}
            className={`w-full px-4 py-2.5 rounded-lg text-[12px] font-semibold flex items-center justify-center transition-all hover:brightness-95 active:scale-95 ${colors[shift.type]}`}
        >
            {shift.time}
        </button>
    )
}

export default function ScheduleSection() {
    const [weekOffset, setWeekOffset] = useState(0)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null)
    // const [addMenu, setAddMenu] = useState<AddMenuState>({ open: false, x: 0, y: 0 })
    const [editShiftOpen, setEditShiftOpen] = useState(false)
    const [editShiftMember, setEditShiftMember] = useState("")
    const [editShiftDay, setEditShiftDay] = useState("")
    const [perPageOpen, setPerPageOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const ippRef = useRef<HTMLDivElement | null>(null)
    const [ippOpen, setIppOpen] = useState(false)

    const totalPages = Math.ceil(MEMBERS.length / perPage)
    const paginatedMembers = MEMBERS.slice((page - 1) * perPage, page * perPage)
    const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20]
    const start = (page - 1) * perPage

    // Week label
    const weekStart = 11 + weekOffset * 7
    const weekEnd = 17 + weekOffset * 7
    const weekLabel = `August ${weekStart} – August ${weekEnd}`

    // Close menus on outside click
    useEffect(() => {
        function handleClick() {
            setContextMenu(null)
            // setAddMenu((prev) => ({ ...prev, open: false }))
            setPerPageOpen(false)
        }
        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [])

    function handleShiftContextMenu(e: React.MouseEvent, memberId: number, day: string) {
        e.preventDefault()
        e.stopPropagation()
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const containerRect = containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 }
        setContextMenu({
            x: rect.left - containerRect.left,
            y: rect.bottom - containerRect.top + 4,
            memberId,
            day,
        })
        // setAddMenu((prev) => ({ ...prev, open: false }))
    }
    return (
        <div
            ref={containerRef}
            className="relative w-full bg-white rounded-xl p-[15px] md:p-[30px] mt-6 font-manrope"
        >

            <div className="w-fit mb-[16px]">
                <div className="flex items-center border border-[#E8EEFF] rounded-[8px] overflow-hidden">
                    <button
                        className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                        onClick={() => setWeekOffset((p) => p - 1)}
                    >
                        <ChevronLeft size={18} className="text-[#635BFF]" />
                    </button>
                    <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap">
                        {weekLabel}
                    </span>
                    <button
                        className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                        onClick={() => setWeekOffset((p) => p + 1)}
                    >
                        <ChevronRight size={18} className="text-[#635BFF]" />
                    </button>
                </div>
            </div>

            {/* Table wrapper*/}
            <div className="overflow-x-auto border rounded-[12px_12px_0px_0px] border-[#E0E6EB] border-b-0">
                <table className="w-full min-w-[700px] border-collapse">
                    <thead className="bg-[#F3F3FF]">
                        <tr className="border-b border-[#E0E6EB]">
                            {/* Member column header */}
                            <th className="w-[160px] min-w-[140px] text-left px-4 py-3">
                                <span className="text-[16px] font-bold text-[#29343D]">Member</span>
                            </th>
                            {/* Day headers */}
                            {DAYS_FULL.map((d, i) => (
                                <th key={d} className="px-3.5 py-7 border-l border-[#E0E6EB] text-center">
                                    <span className="hidden sm:inline text-[16px] font-bold text-[#29343D]">{d}</span>
                                    <span className="inline sm:hidden text-[16px] font-bold text-[#29343D]">{DAYS[i]}<br />
                                        <span className="text-[16px] text-[#98A4AE] font-normal">{DAYS_SHORT[i]}</span></span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedMembers.map((member, rowIdx) => (
                            <tr
                                key={member.id}
                                className="border-b border-[#F8F9FB] hover:bg-[#FAFBFF] transition-colors"
                            >
                                {/* Member info */}
                                <td className="px-3.5 py-4 min-w-[196px] border-r border-[#E0E6EB] border-b">
                                    <div className="flex items-center gap-2.5">
                                        <Image src="/images/avator.png" alt="" width={48} height={48} />
                                        <div className="min-w-0">
                                            <p className="text-[14px] font-semibold text-[#29343D] truncate">{member.name}</p>
                                            <p className="text-[12px] text-[#98A4AE]">{member.hours}</p>
                                        </div>
                                    </div>
                                </td>
                                {/* Shift cells */}
                                {DAYS.map((day) => {
                                    const shift = ALL_SHIFTS.find(
                                        (s) => s.memberId === member.id && s.day === day
                                    )
                                    return (
                                        <td key={day} className="p-3.5 border border-[#E0E6EB] border-r-0">
                                            <ShiftPill
                                                shift={shift}
                                                onContextMenu={(e) =>
                                                    handleShiftContextMenu(e, member.id, day)
                                                }
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <PaginationClient
                ippRef={ippRef}
                setIppOpen={setIppOpen}
                itemsPerPage={perPage}
                ippOpen={ippOpen}
                ITEMS_PER_PAGE_OPTIONS={ITEMS_PER_PAGE_OPTIONS}
                setItemsPerPage={setPerPage}
                currentPage={page}
                setCurrentPage={setPage}
                totalPages={totalPages}
                start={start}
                filtered={MEMBERS}
                margin={false}
            />



            {/*Shift context menu*/}
            {contextMenu && (
                <div
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    className="absolute z-40 bg-white border border-[#E0E6EB] rounded-xl shadow-xl overflow-hidden min-w-[160px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[14px] cursor-pointer text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
                        onClick={() => {
                            setEditShiftDay(contextMenu.day)
                            setContextMenu(null)
                            setEditShiftOpen(true)
                        }}
                    >
                        <Pencil size={16} className="text-[#46CAEB]" />
                        Edit Shift
                    </button>
                    <button
                        className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[14px] cursor-pointer text-[#29343D] hover:bg-[#FFF1F5] transition-colors"
                        onClick={() => setContextMenu(null)}
                    >
                        <Trash2 size={16} className="text-[#FF6692]" />
                        Delete Shift
                    </button>
                </div>
            )}

            <EditShiftModal
                isOpen={editShiftOpen}
                onClose={() => setEditShiftOpen(false)}
                memberName={editShiftMember}
                dayLabel={editShiftDay}
            />
        </div>
    )
}