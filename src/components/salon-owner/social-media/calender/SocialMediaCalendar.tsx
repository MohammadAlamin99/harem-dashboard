"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialDayview from "./SocialDayview";
import TeamDropdown from "../../appointment/calander-view/TeamDropdown";

type Period = "Month" | "Week" | "Day";


// Static team members
const teamMembers = [
    { id: "1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
    { id: "2", name: "Maria Rodriguez", avatar: "/images/avator.png" },
    { id: "3", name: "Maria Rodriguez", avatar: "/images/avator.png" },
    { id: "4", name: "Maria Rodriguez", avatar: "/images/avator.png" },
    { id: "5", name: "Maria Rodriguez", avatar: "/images/avator.png" },
    { id: "6", name: "Maria Rodriguez", avatar: "/images/avator.png" },
];

function getWeekStart(d: Date) {
    const s = new Date(d);
    s.setDate(s.getDate() - s.getDay());
    return s;
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export default function SocialMediaCalendar() {
    const [period, setPeriod] = useState<Period>("Day");
    const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2));
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
        teamMembers.map((m) => m.id),
    );

    const isMonthOrWeek = period === "Month" || period === "Week";

    const navigate = (dir: -1 | 1) => {
        const d = new Date(currentDate);
        if (period === "Day") d.setDate(d.getDate() + dir);
        else if (period === "Week") d.setDate(d.getDate() + 7 * dir);
        else d.setMonth(d.getMonth() + dir);
        setCurrentDate(d);
    };

    const dateLabel = () => {
        if (period === "Day") {
            return currentDate
                .toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "2-digit",
                })
                .replace(",", "");
        }
        if (period === "Week") {
            const ws = getWeekStart(currentDate);
            const we = new Date(ws);
            we.setDate(we.getDate() + 6);
            return `${ws.toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
            })} – ${we.toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
            })}`;
        }
        return MONTH_NAMES[currentDate.getMonth()];
    };

    const handlePeriodChange = (p: Period) => {
        setPeriod(p);
        if (p === "Month") setCurrentDate(new Date(2025, 9, 1));
        else if (p === "Week") setCurrentDate(new Date(2025, 8, 1));
        else setCurrentDate(new Date(2025, 8, 2));
    };

    return (
        <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden font-manrope mt-7">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-[30px]">
                {/* Left: team filter */}
                <TeamDropdown
                    selectedIds={selectedMemberIds}
                    onChange={setSelectedMemberIds}
                    singleSelect={isMonthOrWeek}
                    teamMembers={teamMembers}
                />

                {/* Center: date nav */}
                <div className="flex items-center border border-[#E8EEFF] rounded-[8px] overflow-hidden">
                    <button
                        className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft size={18} className="text-[#635BFF]" />
                    </button>
                    <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap">
                        {dateLabel()}
                    </span>
                    <button
                        className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                        onClick={() => navigate(1)}
                    >
                        <ChevronRight size={18} className="text-[#635BFF]" />
                    </button>
                </div>

                {/* Right: period switcher + settings */}
                <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden bg-[#F7F9FC]">
                        {(["Month", "Week", "Day"] as const).map((p, i) => (
                            <button
                                key={p}
                                onClick={() => handlePeriodChange(p)}
                                className={`relative px-6 py-[10px] text-[16px] font-manrope font-medium transition-all cursor-pointer
                  ${period === p
                                        ? "bg-[#DDDBFF] text-[#0A2540]"
                                        : "text-[#526B7A] bg-[white] hover:text-[#29343D]"
                                    }
                  ${i !== 2 ? "border-r border-[#E0E6EB]" : ""}
                `}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Calendar grid */}
            {period === "Day" && (
                <SocialDayview
                    currentDate={currentDate}
                />
            )}

            {period === "Week" && (
                <></>
            )}

            {period === "Month" && (
                <></>
            )}
        </div>
    );
}