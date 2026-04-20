"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { logRow } from "@/@types/salon-owner/logRow.type";

/* ── reuse status badge styles ── */
const badgeStyles: Record<string, string> = {
    Delivered: "bg-[#DDDBFF] text-[#635BFF]",
    Sent: "bg-[#ECFDFD] text-[#16CDC7]",
    Read: "bg-[#EBFAF0] text-[#36C76C]",
    Failed: "bg-[#FFE5ED] text-[#FF6692]",
};

/* ── channel icon (same logic as LogRow) ── */
function ChannelIcon({ channel }: { channel: "Email" | "SMS" | "WhatsApp" }) {
    if (channel === "WhatsApp") {
        return (
            <Image src="/images/whatsupIcon.svg" alt="WhatsApp" width={48} height={48} />
        );
    }
    if (channel === "Email") {
        return (
            <div className="w-12 h-12 bg-[#635BFF] rounded-full flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" />
                    <path d="M3 7l9 6 9-6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
        );
    }
    // SMS
    return (
        <div className="w-12 h-12 bg-[#FFD648] rounded-full flex items-center justify-center">
            <Image src="/images/messageicon.svg" alt="SMS" width={22} height={22} />
        </div>
    );
}

/* ── chat bubbles for WhatsApp / SMS ── */
interface ChatMessage {
    sender: string;
    avatar: string;
    time: string;
    text: string;
    isRight?: boolean;
}

const mockChat: ChatMessage[] = [
    {
        sender: "Maria",
        avatar: "/images/avator.png",
        time: "2 hours ago",
        text: "If I don't like something, I'll stay away from it.",
        isRight: true,
    },
    {
        sender: "Maria",
        avatar: "/images/avator.png",
        time: "2 hours ago",
        text: "I want more detailed information.",
        isRight: false,
    },
];

function ChatContent() {
    return (
        <div className="flex flex-col gap-4 px-2 py-2">
            {mockChat.map((msg, i) =>
                msg.isRight ? (
                    /* Right bubble */
                    <div key={i} className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[#9CA3AF] text-xs font-manrope">
                                {msg.sender}, {msg.time}
                            </span>
                            <Image
                                src={msg.avatar}
                                alt={msg.sender}
                                width={28}
                                height={28}
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="bg-[#ECFDFD] text-[#29343D] text-sm font-manrope px-4 py-2.5 rounded-sm">
                            {msg.text}
                        </div>
                    </div>
                ) : (
                    /* Left bubble */
                    <div key={i} className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <Image
                                src={msg.avatar}
                                alt={msg.sender}
                                width={28}
                                height={28}
                                className="rounded-full object-cover"
                            />
                            <span className="text-[#9CA3AF] text-xs font-manrope">
                                {msg.sender}, {msg.time}
                            </span>
                        </div>
                        <div className="bg-[#EFF4FA] text-[#29343D] text-sm font-manrope px-4 py-2.5 rounded-sm">
                            {msg.text}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

/* ── email card content ── */
function EmailContent({ message }: { message: string }) {
    return (
        <div className="bg-[#F3F3FF] rounded-xl p-5">
            <p className="text-[#29343D] font-semibold font-manrope text-[15px] mb-2">
                Title
            </p>
            <p className="text-[#526B7A] font-manrope text-sm leading-relaxed">
                {message}
            </p>
        </div>
    );
}

/* ══════════════════════════════════════
   MAIN MODAL
══════════════════════════════════════ */
interface Props {
    entry: logRow;
    onClose: () => void;
}

export default function CommunicationLogModal({ entry, onClose }: Props) {
    const isChat = entry.channel === "WhatsApp" || entry.channel === "SMS";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="relative w-full max-w-[638px] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* ── Header ── */}
                <div className="flex items-center justify-between px-7 pt-7 pb-4">
                    <h2 className="text-[18px] font-semibold font-manrope text-[#29343D]">
                        Communication Log
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F4F7] transition cursor-pointer"
                    >
                        <X size={20} color="#29343D" />
                    </button>
                </div>

                {/* ── Body ── */}
                <div className="m-6 p-6 rounded-xl space-y-5 max-h-[75vh] overflow-y-auto border border-[#E5E7EB]">

                    <div className="">
                        {/* Message preview card */}
                        <div className="shadow-[0_2px_4px_-1px_rgba(175,182,201,0.20)] mb-6">

                            {/* Channel icon + message */}
                            <div className="flex items-center gap-3 mb-5">
                                <ChannelIcon channel={entry.channel} />
                                <p className="text-[#29343D] font-semibold font-manrope text-[15px] leading-snug">
                                    {entry.message}
                                </p>
                            </div>

                            {/* <hr className="border-[#F0F2F5] mb-5" /> */}

                            {/* Informations */}
                            <div className="space-y-4 p-6">
                                <p className="text-[#29343D] font-semibold font-manrope text-[15px]">
                                    Informations
                                </p>

                                {/* Sent by */}
                                <div>
                                    <p className="text-[#9CA3AF] text-xs font-manrope mb-1">Sent by</p>
                                    <div className="flex items-center gap-2">
                                        {entry.employee && (
                                            <Image
                                                src="/images/avator.png"
                                                alt={entry.employee}
                                                width={22}
                                                height={22}
                                                className="rounded-full object-cover"
                                            />
                                        )}
                                        <span className="text-[#29343D] text-sm font-manrope font-medium">
                                            {entry.employee || "Employee Name"}
                                        </span>
                                        <span className="border border-[#635BFF] text-[#635BFF] text-xs font-manrope px-3 py-0.5 rounded-full">
                                            {entry.sender}
                                        </span>
                                    </div>
                                </div>

                                {/* Date + Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[#9CA3AF] text-xs font-manrope mb-1">Date</p>
                                        <p className="text-[#29343D] text-sm font-manrope font-medium">
                                            {entry.date}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[#9CA3AF] text-xs font-manrope mb-1">Time</p>
                                        <p className="text-[#29343D] text-sm font-manrope font-medium">
                                            {entry.time}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <p className="text-[#9CA3AF] text-xs font-manrope mb-1">Status</p>
                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-lg font-manrope ${badgeStyles[entry.status]}`}
                                    >
                                        {entry.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Content section */}
                        <div className="p-6 shadow-[0_2px_4px_-1px_rgba(175,182,201,0.20)]">
                            <p className="text-[#29343D] font-semibold font-manrope text-[15px] mb-4">
                                Content
                            </p>

                            {/* Conditional: chat bubbles vs email card */}
                            {isChat ? (
                                <ChatContent />
                            ) : (
                                <EmailContent message={entry.message} />
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Footer ── */}
                <div className="flex justify-end px-7 pb-7">
                    <button className="bg-[#DDDBFF] text-[#635BFF] font-manrope text-[15px] font-medium
            px-4 py-2.5 rounded-lg cursor-pointer
            hover:bg-[#635BFF] hover:text-white transition-all">
                        Archive
                    </button>
                </div>

            </div>
        </div>
    );
}