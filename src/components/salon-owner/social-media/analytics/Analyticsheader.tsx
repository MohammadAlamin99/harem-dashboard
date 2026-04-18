"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import InstaIcon from "./InstaIcon";

export type Tab = "Account" | "Posts" | "Reels" | "Story";

type Props = {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
};

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
        <path d="M6.70831 11.1515H9.10419L10.0625 7.27269H6.70831V5.33334C6.70831 4.33455 6.70831 3.39393 8.625 3.39393H10.0625V0.135753C9.75006 0.0940582 8.57037 0 7.32456 0C4.72269 0 2.875 1.60679 2.875 4.55757V7.27269H0V11.1515H2.875V19.3939H6.70831V11.1515Z" fill="#635BFF" />
    </svg>
);


const MessengerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10 22C14.4183 22 18 18.4183 18 14C18 9.58172 14.4183 6 10 6C5.58172 6 2 9.58172 2 14C2 15.2355 2.28008 16.4056 2.7802 17.4502C2.95209 17.8093 3.01245 18.2161 2.90955 18.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L5.39939 21.0904C5.78393 20.9876 6.19071 21.0479 6.54976 21.2198C7.5944 21.7199 8.76449 22 10 22Z" stroke="#635BFF" strokeWidth="1.5" />
        <path d="M18 14.5018C18.0665 14.4741 18.1324 14.4453 18.1977 14.4155C18.5598 14.2501 18.9661 14.1882 19.3506 14.2911L19.8267 14.4185C20.793 14.677 21.677 13.793 21.4185 12.8267L21.2911 12.3506C21.1882 11.9661 21.2501 11.5598 21.4155 11.1977C21.7908 10.376 22 9.46242 22 8.5C22 4.91015 19.0899 2 15.5 2C12.7977 2 10.4806 3.64899 9.5 5.9956" stroke="#635BFF" strokeWidth="1.5" />
        <path d="M6.51779 14H6.52679M10.0085 14H10.0175M13.4995 14H13.5085" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ACCOUNTS = [
    { id: 1, name: "Maria Rodriguez", icon: <InstaIcon /> },
    { id: 2, name: "Maria Rodriguez", icon: <FacebookIcon /> },
    {
        id: 3, name: "Maria Rodriguez", icon: (
            <div className="flex items-center gap-1">
                <MessengerIcon />
                <FacebookIcon />
            </div>
        )
    },
];

const DATE_OPTIONS = [
    "Last 7 days", "Last 28 days", "Last 90 days", "This Week",
    "This Month", "This Year", "Last Week", "Last Month", "Custom Range"
];

export default function AnalyticsHeader({ activeTab, setActiveTab }: Props) {
    const tabs: Tab[] = ["Account", "Posts", "Reels", "Story"];

    // States
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
    const [selectedDate, setSelectedDate] = useState("Last 7 days");

    const accountRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);

    // Close on outside click for both dropdowns
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (accountRef.current && !accountRef.current.contains(e.target as Node)) setIsAccountOpen(false);
            if (dateRef.current && !dateRef.current.contains(e.target as Node)) setIsDateOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="bg-white rounded-xl font-manrope">

            {/* ── Top Row ── */}
            <div className="flex items-center justify-between px-6 pt-5 pb-5 flex-wrap gap-3">
                <h2 className="text-[15px] font-bold text-[#29343D] font-manrope">
                    Analytics
                </h2>

                <div className="flex items-center gap-3">

                    {/* 1. Account Selector Dropdown */}
                    <div className="relative" ref={accountRef}>
                        <button
                            onClick={() => { setIsAccountOpen(!isAccountOpen); setIsDateOpen(false); }}
                            className="flex items-center gap-2 px-3 py-[7px] rounded-lg border border-[#E0E6EB] hover:border-[#635BFF]/40 transition-colors cursor-pointer"
                        >
                            {selectedAccount.icon}
                            <span className="text-[13px] font-medium text-[#29343D] font-manrope">
                                {selectedAccount.name}
                            </span>
                            <ChevronDown size={14} className={`text-[#29343D] transition-transform ${isAccountOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isAccountOpen && (
                            <div className="absolute left-0 mt-1 min-w-full w-max bg-white border border-[#E0E6EB] rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                                {ACCOUNTS.map((acc) => (
                                    <button
                                        key={acc.id}
                                        onClick={() => { setSelectedAccount(acc); setIsAccountOpen(false); }}
                                        className="w-full flex items-center gap-2 px-4 py-2.5 text-[13px] font-manrope text-[#29343D] hover:bg-[#F3F3FF] transition-colors text-left"
                                    >
                                        {acc.icon}
                                        {acc.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 2. Date Range Selector Dropdown */}
                    <div className="relative" ref={dateRef}>
                        <button
                            onClick={() => { setIsDateOpen(!isDateOpen); setIsAccountOpen(false); }}
                            className="flex items-center gap-2 px-3 py-[7px] rounded-lg border border-[#E0E6EB] hover:border-[#635BFF]/40 transition-colors cursor-pointer"
                        >
                            <span className="text-[13px] font-medium text-[#29343D] font-manrope">
                                {selectedDate}
                            </span>
                            <ChevronDown size={14} className={`text-[#29343D] transition-transform ${isDateOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isDateOpen && (
                            <div className="absolute right-0 mt-1 w-[160px] bg-white border border-[#E0E6EB] rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                                {DATE_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => { setSelectedDate(opt); setIsDateOpen(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-[13px] font-manrope transition-colors
                                            ${selectedDate === opt ? "bg-[#F3F3FF] text-[#635BFF] font-semibold" : "text-[#526B7A] hover:bg-[#F8FAFC]"}
                                        `}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* ── Tabs (Same as original) ── */}
            <div className="relative px-6 pb-4">
                <div className="flex items-center border-b border-[#E0E6EB] w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-4 py-3 text-[14px] font-manrope transition-colors whitespace-nowrap cursor-pointer w-[165px] text-center
                                ${activeTab === tab ? "text-[#635BFF] font-semibold" : "text-[#29343D] font-medium hover:text-[#635BFF]/70"}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}