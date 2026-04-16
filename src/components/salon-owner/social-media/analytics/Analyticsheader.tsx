"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Tab = "Account" | "Posts" | "Reels" | "Story";

const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#635BFF" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="#635BFF" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" fill="#635BFF" />
    </svg>
);

export default function AnalyticsHeader() {
    const [activeTab, setActiveTab] = useState<Tab>("Account");

    const tabs: Tab[] = ["Account", "Posts", "Reels", "Story"];

    return (
        <div className="bg-white rounded-xl font-manrope">

            {/* ── Top Row ── */}
            <div className="flex items-center justify-between px-6 pt-5 pb-5">
                <h2 className="text-[15px] font-bold text-[#29343D] font-manrope">
                    Analytics
                </h2>

                <div className="flex items-center gap-3">
                    {/* Account selector */}
                    <button className="flex items-center gap-2 px-3 py-[7px] rounded-lg border border-[#E0E6EB] hover:border-[#635BFF]/40 transition-colors">
                        <InstagramIcon />
                        <span className="text-[13px] font-medium text-[#29343D] font-manrope">
                            Maria Rodriguez
                        </span>
                        <ChevronDown size={14} className="text-[#29343D]" />
                    </button>

                    {/* Date range selector */}
                    <button className="flex items-center gap-2 px-3 py-[7px] rounded-lg border border-[#E0E6EB] hover:border-[#635BFF]/40 transition-colors">
                        <span className="text-[13px] font-medium text-[#29343D] font-manrope">
                            Last 7 days
                        </span>
                        <ChevronDown size={14} className="text-[#29343D]" />
                    </button>
                </div>
            </div>
            <div className="relative px-6 pb-4">
                <div className="flex items-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-4 py-3 text-[14px] font-manrope transition-colors whitespace-nowrap cursor-pointer w-[165px] max-w-full text-start
                                ${activeTab === tab
                                    ? "text-[#635BFF] font-semibold"
                                    : "text-[#29343D] font-medium hover:text-[#635BFF]/70"
                                }`}
                        >
                            {tab}

                            {activeTab === tab && (
                                <span className="absolute -bottom-px left-0 right-0 h-px bg-[#635BFF]" />
                            )}
                            {activeTab !== tab && (
                                <span className="absolute -bottom-px left-0 right-0 h-px bg-[#E0E6EB]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}