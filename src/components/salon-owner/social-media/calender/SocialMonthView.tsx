import React from "react";
import { Plus } from "lucide-react";
import FBIcon from "./FBIcon";
import InstagramIcon from "./InstagramIcon";

interface SocialMonthViewProps {
    currentDate: Date;
}

export default function SocialMonthView({ currentDate }: SocialMonthViewProps) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
        day: prevMonthLastDay - firstDayOfMonth + i + 1,
        currentMonth: false,
    }));

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        currentMonth: true,
    }));

    const totalCells = 42;
    const nextMonthDaysCount = totalCells - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => ({
        day: i + 1,
        currentMonth: false,
    }));

    const allCalendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    return (
        <div className="mx-4 md:mx-[30px] border border-[#E0E6EB] rounded-xl bg-white overflow-hidden">
            <div className="overflow-x-auto">
                {/* 2. Min-width ensures 7 columns don't squash on mobile */}
                <div className="min-w-[800px] md:min-w-full">
                    {/* HEADER: Day Names */}
                    <div className="grid grid-cols-7 border-b border-[#E0E6EB] bg-[#F9FAFB]">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="py-3 text-center border-r border-[#E0E6EB] last:border-r-0">
                                <span className="text-[12px] font-medium text-[#6B7280]">{day}</span>
                            </div>
                        ))}
                    </div>

                    {/* CALENDAR GRID */}
                    <div className="grid grid-cols-7">
                        {allCalendarDays.map((dateObj, index) => {
                            const isPostDay = dateObj.day === 27 && dateObj.currentMonth;
                            const isSelectedDay = dateObj.day === 22 && dateObj.currentMonth;

                            return (
                                <div
                                    key={index}
                                    className={`group min-h-[120px] md:min-h-[140px] border-r border-b border-[#E0E6EB] 
                                        ${(index + 1) % 7 === 0 ? "border-r-0" : ""} 
                                        ${index >= 35 ? "border-b-0" : ""} 
                                        ${isSelectedDay ? "bg-[#EFF4FB]" : "bg-white"} 
                                        relative p-2 flex flex-col`}
                                >
                                    {/* Day Number */}
                                    <div className="text-right mb-1">
                                        <span className={`text-[12px] font-medium ${dateObj.currentMonth ? "text-[#9CA3AF]" : "text-[#D1D5DB]"}`}>
                                            {dateObj.day}
                                        </span>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 flex items-center justify-center relative">
                                        {isPostDay ? (
                                            <div className="w-full py-1.5 bg-[#DDDBFF] border-l-4 border-[#635BFF] rounded-r-md flex items-center justify-between px-2 z-10">
                                                <div className="flex items-center gap-1 overflow-hidden">
                                                    <span className="text-[10px] md:text-[11px] font-medium text-[#635BFF] truncate">
                                                        12:30 - Pos...
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <InstagramIcon />
                                                        <FBIcon />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                                <button className="w-full h-8 border border-[#635BFF] rounded-lg flex items-center justify-center hover:bg-[#F3F3FF] transition-colors cursor-pointer bg-white shadow-sm">
                                                    <Plus size={16} className="text-[#635BFF]" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}