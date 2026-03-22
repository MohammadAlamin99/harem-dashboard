"use client";

import { useState, useRef } from "react";
import {
    ChevronDown
} from "lucide-react";
import PaginationClient from "../../PaginationClient";
import { LogRow } from "./LogRow";
import { logRow, LogStatus } from "@/@types/salon-owner/logRow.type";

type Channel = "All" | "Email" | "SMS" | "WhatsApp";
type DateRange = "All Time" | "Last 7 days" | "Last 14 days" | "Last Month";
type StatusFilter = "All Status" | LogStatus;



const logs: logRow[] = [
    { id: 1, channel: "WhatsApp", message: "New appointment scheduled for tomorrow at 3 PM", employee: "Employee Name", date: "02/09/2025", time: "11:44", status: "Delivered", sender: "Staff Member" },
    { id: 2, channel: "Email", message: "New appointment scheduled for tomorrow at 3 PM", employee: null, date: "07/08/2025", time: "11:44", status: "Delivered", sender: "System" },
    { id: 3, channel: "SMS", message: "New appointment scheduled for tomorrow at 3 PM", employee: null, date: "07/08/2025", time: "11:44", status: "Sent", sender: "System" },
    { id: 4, channel: "WhatsApp", message: "New appointment scheduled for tomorrow at 3 PM", employee: "Employee Name", date: "07/08/2025", time: "11:44", status: "Read", sender: "Staff Member" },
    { id: 5, channel: "WhatsApp", message: "New appointment scheduled for tomorrow at 3 PM", employee: "Employee Name", date: "07/08/2025", time: "11:44", status: "Failed", sender: "Staff Member" },
    { id: 6, channel: "Email", message: "New appointment scheduled for tomorrow at 3 PM", employee: "Employee Name", date: "07/08/2025", time: "11:44", status: "Failed", sender: "Staff Member" },
    { id: 7, channel: "Email", message: "New appointment scheduled for tomorrow at 3 PM", employee: "Employee Name", date: "07/08/2025", time: "11:44", status: "Failed", sender: "Staff Member" },
];

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20];
const dateRanges: DateRange[] = ["All Time", "Last 7 days", "Last 14 days", "Last Month"];
const statusOptions: StatusFilter[] = ["All Status", "Delivered", "Sent", "Read", "Failed"];


export default function CommunicationLog() {
    const [channel, setChannel] = useState<Channel>("All");
    const [status, setStatus] = useState<StatusFilter>("All Status");
    const [dateRange, setDateRange] = useState<DateRange>("All Time");
    const [showStatusDrop, setShowStatusDrop] = useState<boolean>(false);
    const [showDateDrop, setShowDateDrop] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [ippOpen, setIppOpen] = useState<boolean>(false);
    const ippRef = useRef<HTMLDivElement | null>(null);

    const channels: Channel[] = ["All", "Email", "SMS", "WhatsApp"];

    const filtered = logs.filter((l) => {
        const matchChannel = channel === "All" || l.channel === channel;
        const matchStatus = status === "All Status" || l.status === status;
        return matchChannel && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    return (
        <div className="bg-white font-manrope p-[15px] md:p-[30px] border border-[#E0E6EB] rounded-xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-[#29343D] font-semibold text-xl font-manrope">
                    Communication Log
                </h2>
                <div className="flex items-center gap-2 text-sm text-[#526B7A] font-manrope flex-wrap">
                    <span>Last time contacted:</span>
                    <span className="bg-[#EBEAFF] text-[#635BFF] px-3 py-1 rounded-lg text-xs font-medium">
                        02/09/2025 (via WhatsApp, by Maria)
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-end gap-8 mb-6 flex-wrap">

                {/* Channel */}
                <div>
                    <p className="text-[#9CA3AF] text-xs font-manrope mb-2">Channel</p>
                    <div className="flex items-center gap-2">
                        {channels.map((c) => (
                            <button
                                key={c}
                                onClick={() => { setChannel(c); setCurrentPage(1); }}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium font-manrope border transition-colors
                  ${channel === c
                                        ? "bg-white border-[#635BFF] text-[#635BFF]"
                                        : "bg-white border-[#E0E6EB] text-[#526B7A] hover:border-[#635BFF] hover:text-[#635BFF]"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div>
                    <p className="text-[#9CA3AF] text-xs font-manrope mb-2">Status</p>
                    <div className="relative">
                        <button
                            onClick={() => { setShowStatusDrop((p) => !p); setShowDateDrop(false); }}
                            className="flex items-center gap-2 border border-[#E0E6EB] rounded-lg px-3 py-1.5 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white min-w-[120px]"
                        >
                            {status}
                            <ChevronDown className="w-4 h-4 text-[#9CA3AF] ml-auto" />
                        </button>
                        {showStatusDrop && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[140px]">
                                {statusOptions.map((o) => (
                                    <button
                                        key={o}
                                        onClick={() => { setStatus(o); setShowStatusDrop(false); setCurrentPage(1); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors font-manrope
                      ${status === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                                    >
                                        {o}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Data Range */}
                <div>
                    <p className="text-[#9CA3AF] text-xs font-manrope mb-2">Data Range</p>
                    <div className="relative">
                        <button
                            onClick={() => { setShowDateDrop((p) => !p); setShowStatusDrop(false); }}
                            className="flex items-center gap-2 border border-[#E0E6EB] rounded-lg px-3 py-1.5 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white min-w-[120px]"
                        >
                            {dateRange}
                            <ChevronDown className="w-4 h-4 text-[#9CA3AF] ml-auto" />
                        </button>
                        {showDateDrop && (
                            <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[150px]">
                                {dateRanges.map((o) => (
                                    <button
                                        key={o}
                                        onClick={() => { setDateRange(o); setShowDateDrop(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors font-manrope
                      ${dateRange === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                                    >
                                        {o}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Log List */}
            <div className="border border-[#E0E6EB] rounded-[12px_12px_0_0] overflow-hidden">
                {paginated.length > 0 ? (
                    paginated.map((entry) => <LogRow key={entry.id} entry={entry} />)
                ) : (
                    <div className="py-12 text-center text-[#9CA3AF] text-sm font-manrope">
                        No communication logs found.
                    </div>
                )}
            </div>

            {/* PaginationClient */}
            <PaginationClient
                ippRef={ippRef}
                setIppOpen={setIppOpen}
                itemsPerPage={itemsPerPage}
                ippOpen={ippOpen}
                ITEMS_PER_PAGE_OPTIONS={ITEMS_PER_PAGE_OPTIONS}
                setItemsPerPage={(n) => { setItemsPerPage(n); setCurrentPage(1); }}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                start={start}
                filtered={filtered}
                margin={false}
            />

        </div>
    );
}