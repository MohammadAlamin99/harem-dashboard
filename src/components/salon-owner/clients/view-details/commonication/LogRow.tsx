import { logRow, LogStatus, SenderType } from "@/@types/salon-owner/logRow.type";
import Image from "next/image";
import { Check, Eye } from "lucide-react";

/* =========================
   CHANNEL ICON (unchanged)
========================= */

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

/* =========================
   STATUS BADGE (unchanged)
========================= */
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

/* =========================
   SENDER BADGE (unchanged)
========================= */
const senderStyles: Record<SenderType, string> = {
    "Staff Member": "border border-[#635BFF] text-[#635BFF]",
    System: "border border-[#16CDC7] text-[#16CDC7]",
};

function SenderBadge({ sender }: { sender: SenderType }) {
    return (
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full font-manrope ${senderStyles[sender]}`}>
            {sender}
        </span>
    );
}

/* =========================
   ✅ RESPONSIVE ROW (FIXED)
========================= */
export function LogRow({ entry }: { entry: logRow }) {
    return (
        <div className="
            flex items-center gap-4 p-6 border-b border-[#E0E6EB] last:border-b-0
            flex-col justify-between
            lg:flex-row lg:items-center
        ">

            {/* LEFT */}
            <div className="flex items-start gap-3 w-full lg:w-auto">
                <ChannelIcon channel={entry.channel} />

                <div className="flex-1 min-w-0">
                    <p className="text-[#29343D] font-semibold text-sm truncate">
                        {entry.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        {entry.employee && (
                            <>
                                <Image
                                    src="/images/avator.png"
                                    alt={entry.employee}
                                    width={18}
                                    height={18}
                                    className="rounded-full object-cover"
                                />
                                <span className="text-[#9CA3AF] text-xs">
                                    {entry.employee}
                                </span>
                            </>
                        )}

                        <span className="text-[#9CA3AF] text-xs">{entry.date}</span>
                        <span className="text-[#9CA3AF] text-xs">{entry.time}</span>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="
                flex flex-wrap items-center gap-2 w-full mt-2
                lg:w-auto lg:flex-nowrap lg:items-center lg:mt-0
            ">

                <div className="w-auto lg:w-24 flex justify-start lg:justify-center">
                    <StatusBadge status={entry.status} />
                </div>

                <div className="w-auto lg:w-32 flex justify-start lg:justify-center">
                    <SenderBadge sender={entry.sender} />
                </div>

                <div className="flex items-center gap-2 ml-auto lg:ml-0 flex-shrink-0">
                    <button className="px-4 py-2.5 rounded-lg bg-[#EBEAFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>

                    {entry.status === "Sent" && (
                        <button className="px-4 py-2.5 rounded-lg border border-[#635BFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
                            <Check className="w-4 h-4" />
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}