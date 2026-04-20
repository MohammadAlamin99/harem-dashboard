import { Plus, Instagram, Facebook } from "lucide-react";

export default function SocialDayview({ currentDate }: { currentDate: Date }) {
    console.log(currentDate)
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="w-full">
            {hours.map((hour) => (
                <div key={hour} className="group flex min-h-[100px] border-b border-[#E0E6EB] last:border-b-0">
                    {/* Time Column */}
                    <div className="w-24 bg-[#FAFBFC] border-r border-[#E0E6EB] flex items-start justify-center pt-4">
                        <span className="text-[11px] font-bold text-[#98A4AE] uppercase tracking-tighter">
                            {hour === 0 ? "12:00 AM" : hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`}
                        </span>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-3 relative bg-white">
                        {/* Example Post (Logic can be replaced with your allAppointments filter) */}
                        {hour === 0 && (
                            <div className="w-full h-9 bg-[#F0EEFF] border-l-4 border-[#635BFF] rounded-r-md flex items-center justify-between px-3 mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] font-bold text-[#635BFF]">
                                        Post Title - 12:30 AM
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Instagram size={13} className="text-[#635BFF]" />
                                        <Facebook size={13} className="text-[#635BFF]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hover Dash Button */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-full h-9 border-2 border-dashed border-[#635BFF]/20 rounded-lg flex items-center justify-center hover:bg-[#F0EEFF]/50 transition-colors cursor-pointer">
                                <Plus size={18} className="text-[#635BFF]" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}