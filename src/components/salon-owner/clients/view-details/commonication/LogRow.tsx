"use client";

import { useState } from "react";
import { logRow, LogStatus, SenderType } from "@/@types/salon-owner/logRow.type";
import Image from "next/image";
import { Check, Eye, Mail } from "lucide-react";
import CommunicationLogModal from "./Communicationlogmodal";

function ChannelIcon({ channel }: { channel: "Email" | "SMS" | "WhatsApp" }) {
    if (channel === "WhatsApp") {
        return (
            <Image src="/images/whatsupIcon.svg" alt="WhatsApp" width={40} height={40} />
        );
    }
    if (channel === "Email") {
        return (
            <div className="w-10 h-10 bg-[#635BFF] rounded-full flex items-center justify-center">
                <Mail width={20} height={20} color="white" />
            </div>
        );
    }
    return (
        <div className="w-10 h-10 bg-[#FFD648] rounded-full flex items-center justify-center">
            <Image src="/images/messageicon.svg" alt="SMS" width={20} height={20} />
        </div>
    );
}

/* ── status badge styles (exported so modal can reuse) ── */
export const statusStyles: Record<LogStatus, string> = {
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

export function LogRow({ entry }: { entry: logRow }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
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
                                    <span className="text-[#9CA3AF] text-xs">{entry.employee}</span>
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

                    <div className="flex items-center gap-4 ml-auto lg:ml-0">
                        {/* Eye → opens modal */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#EBEAFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                        </button>

                        {entry.status === "Sent" && (
                            <button className="cursor-pointer px-4 py-2.5 rounded-lg border border-[#635BFF] flex items-center justify-center text-[#635BFF] hover:bg-[#635BFF] hover:text-white transition-colors">
                                <Check className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Conditional modal */}
            {showModal && (
                <CommunicationLogModal
                    entry={entry}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}