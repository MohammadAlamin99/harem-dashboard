
import { Plus } from "lucide-react";
import FBIcon from "./FBIcon";
import InstagramIcon from "./InstagramIcon";

interface SocialDayviewProps {
    currentDate: Date;
}

export default function SocialDayview({ currentDate }: SocialDayviewProps) {
    const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
    console.log(currentDate)

    return (
        <div className="border border-[#E0E6EB] rounded-xl mx-4 md:mx-[30px] bg-white overflow-hidden">
            <div className="overflow-x-auto">
                <div className="min-w-[600px] md:min-w-full">
                    {hours.map((hour: number) => {
                        const hasPost: boolean = hour === 0;

                        return (
                            <div
                                key={hour}
                                className="group flex min-h-[100px] border-b border-[#E0E6EB] last:border-b-0 relative"
                            >
                                <div className="w-24 bg-[#F3F3FF] border-r border-[#E0E6EB] flex items-start justify-center pt-4">
                                    <span className="text-[11px] font-bold text-[#98A4AE] uppercase tracking-tighter">
                                        {hour === 0 ? "12:00 AM" : hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`}
                                    </span>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 relative bg-white min-w-0 flex items-center px-4">
                                    {hasPost ? (
                                        /* THE POST */
                                        <div className="w-full h-11 bg-[#DDDBFF] border-l-4 border-[#635BFF] rounded-r-md flex items-center justify-between px-3">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <span className="text-md font-medium text-[#635BFF] truncate">
                                                    Post Title - 12:30 AM
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <InstagramIcon />
                                                    <FBIcon />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* HOVER BUTTON */
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4">
                                            <button className="w-full h-9 border border-[#635BFF] rounded-lg flex items-center justify-center hover:bg-[#F3F3FF] transition-colors cursor-pointer bg-white shadow-sm">
                                                <Plus size={18} className="text-[#635BFF]" />
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
    );
}