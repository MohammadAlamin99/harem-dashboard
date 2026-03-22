"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
    ChevronDown,
    Eye,
    Check,
} from "lucide-react";
import PaginationClient from "../../PaginationClient";

type Channel = "All" | "Email" | "SMS" | "WhatsApp";
type LogStatus = "Delivered" | "Sent" | "Read" | "Failed";
type SenderType = "Staff Member" | "System";
type DateRange = "All Time" | "Last 7 days" | "Last 14 days" | "Last Month";
type StatusFilter = "All Status" | LogStatus;

interface LogEntry {
    id: number;
    channel: "Email" | "SMS" | "WhatsApp";
    message: string;
    employee: string | null;
    date: string;
    time: string;
    status: LogStatus;
    sender: SenderType;
}

const logs: LogEntry[] = [
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

//  Channel Icon

function ChannelIcon({ channel }: { channel: "Email" | "SMS" | "WhatsApp" }) {
    if (channel === "WhatsApp") {
        return (
            <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </div>
        );
    }
    if (channel === "Email") {
        return (
            <div className="w-11 h-11 rounded-full bg-[#635BFF] flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 7 10-7" />
                </svg>
            </div>
        );
    }
    // SMS
    return (
        <div className="w-11 h-11 rounded-full bg-[#FFD648] flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        </div>
    );
}

//  Status Badge

const statusStyles: Record<LogStatus, string> = {
    Delivered: "bg-[#DDDBFF] text-[#635BFF]",
    Sent: "bg-[#ECFDFD] text-[#16CDC7]",
    Read: "bg-[#EBFAF0] text-[#36C76C]",
    Failed: "bg-[#FFE5ED] text-[#FF6692]",
};

function StatusBadge({ status }: { status: LogStatus }) {
    return (
        <span className={`text-xs font-medium px-3 py-1 rounded-lg font-manrope ${statusStyles[status]}`}>
            {status}
        </span>
    );
}

//  Sender Badge

const senderStyles: Record<SenderType, string> = {
    "Staff Member": "border border-[#29343D] text-[#29343D]",
    "System": "border border-[#16CDC7] text-[#16CDC7]",
};

function SenderBadge({ sender }: { sender: SenderType }) {
    return (
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full font-manrope ${senderStyles[sender]}`}>
            {sender}
        </span>
    );
}

function LogRow({ entry }: { entry: LogEntry }) {
    return (
        <div className="flex items-center gap-4 p-6 border-b border-[#E0E6EB] last:border-b-0">

            {/* Channel icon */}
            <ChannelIcon channel={entry.channel} />

            {/* Message + meta */}
            <div className="flex-1 min-w-0">
                <p className="text-[#29343D] font-semibold font-manrope text-sm truncate">
                    {entry.message}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    {entry.employee && (
                        <>
                            <Image
                                src="/images/avator.png"
                                alt={entry.employee}
                                width={18}
                                height={18}
                                className="rounded-full object-cover"
                            />
                            <span className="text-[#9CA3AF] text-xs font-manrope">{entry.employee}</span>
                        </>
                    )}
                    <span className="text-[#9CA3AF] text-xs font-manrope">{entry.date}</span>
                    <span className="text-[#9CA3AF] text-xs font-manrope">{entry.time}</span>
                </div>
            </div>

            {/* Status */}
            <div className="w-24 flex justify-center">
                <StatusBadge status={entry.status} />
            </div>

            {/* Sender */}
            <div className="w-32 flex justify-center">
                <SenderBadge sender={entry.sender} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-9 h-9 rounded-xl bg-[#EBEAFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                </button>
                {entry.status === "Sent" && (
                    <button className="w-9 h-9 rounded-xl border border-[#635BFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
                        <Check className="w-4 h-4" />
                    </button>
                )}
            </div>

        </div>
    );
}

export default function CommunicationLog() {
    const [channel, setChannel] = useState<Channel>("All");
    const [status, setStatus] = useState<StatusFilter>("All Status");
    const [dateRange, setDateRange] = useState<DateRange>("All Time");
    const [showStatusDrop, setShowStatusDrop] = useState<boolean>(false);
    const [showDateDrop, setShowDateDrop] = useState<boolean>(false);

    // ── Pagination state (wired to PaginationClient) ──
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
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#29343D] font-semibold text-xl font-manrope">
                    Communication Log
                </h2>
                <div className="flex items-center gap-2 text-sm text-[#526B7A] font-manrope">
                    <span>Last time contacted:</span>
                    <span className="bg-[#EBEAFF] text-[#635BFF] px-3 py-1 rounded-lg text-xs font-medium">
                        02/09/2025 (via WhatsApp, by Maria)
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-end gap-8 mb-6">

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

            {/* ── PaginationClient ── */}
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