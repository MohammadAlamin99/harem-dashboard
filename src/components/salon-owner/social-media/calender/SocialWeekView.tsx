
import { Plus } from "lucide-react";
import FBIcon from "./FBIcon";
import InstagramIcon from "./InstagramIcon";

interface SocialWeekViewProps {
    currentDate: Date;
}

export default function SocialWeekView({ currentDate }: SocialWeekViewProps) {
    const hours: number[] = Array.from({ length: 24 }, (_, i) => i);

    const days: Date[] = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentDate);
        const diff = date.getDate() - date.getDay() + i;
        return new Date(date.setDate(diff));
    });

    const formatDay = (date: Date): string => {
        const dayNumber = date.getDate().toString().padStart(2, "0");
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return `${dayNumber} ${dayName}`;
    };

    return (
        <div className="mx-4 md:mx-[30px] border border-[#E0E6EB] rounded-xl bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <div className="min-w-[800px] md:min-w-full">

                    {/* HEADER ROW */}
                    <div className="flex border-b border-[#E0E6EB]">
                        <div className="w-20 md:w-24 bg-[#F3F3FF] border-r border-[#E0E6EB]" />
                        {/* Day Headers */}
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className="flex-1 py-3 bg-[#F3F3FF] border-r border-[#E0E6EB] last:border-r-0 text-center"
                            >
                                <span className="text-[12px] font-semibold text-[#1F2937]">
                                    {formatDay(day)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* GRID ROWS */}
                    {hours.map((hour) => (
                        <div key={hour} className="flex min-h-[100px] border-b border-[#E0E6EB] last:border-b-0">
                            {/* LEFT TIME COLUMN */}
                            <div className="w-20 md:w-24 bg-[#F3F3FF] border-r border-[#E0E6EB] flex items-start justify-center pt-4">
                                <span className="text-[10px] md:text-[11px] font-bold text-[#98A4AE] uppercase tracking-tighter">
                                    {hour === 0 ? "12:00 AM" : hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`}
                                </span>
                            </div>

                            {/* DAY COLUMNS CONTENT */}
                            {days.map((_, dayIndex) => {
                                const hasPost = hour === 0 && dayIndex === 1;

                                return (
                                    <div
                                        key={dayIndex}
                                        className="group flex-1 relative border-r border-[#E0E6EB] last:border-r-0 flex items-center px-1 md:px-2"
                                    >
                                        {hasPost ? (
                                            <div className="w-full py-2 bg-[#DDDBFF] border-l-4 border-[#635BFF] rounded-r-md flex items-center justify-between px-2">
                                                <div className="flex items-center gap-1 md:gap-2 overflow-hidden">
                                                    <span className="text-[11px] font-medium text-[#635BFF] truncate">
                                                        12:30 - P...
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <InstagramIcon />
                                                        <FBIcon />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                                <button className="w-full h-9 border border-[#635BFF] rounded-lg flex items-center justify-center hover:bg-[#F3F3FF] transition-colors cursor-pointer bg-white shadow-sm">
                                                    <Plus size={18} className="text-[#635BFF]" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}