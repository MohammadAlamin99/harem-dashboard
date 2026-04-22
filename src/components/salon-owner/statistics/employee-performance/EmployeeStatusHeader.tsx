"use client";
import { ChevronDown, Download, Users } from "lucide-react";

const EmployeeStatusHeader = () => {
    return (
        <div className="w-full bg-white px-6 py-4 rounded-[16px] flex flex-col sm:flex-row items-center justify-between font-manrope gap-4">

            {/* Left Side: Title */}
            <h3 className="text-[16px] font-bold text-[#29343D]">
                Employee Status
            </h3>

            {/* Right Side: Filters and Export */}
            <div className="flex items-center gap-4">

                {/* All Team Dropdown */}
                <button className="flex items-center gap-3 bg-white border border-[#EFF4FA] px-4 py-2.5 rounded-[16px] hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-[#F0EEFF] rounded-[8px] flex items-center justify-center">
                        <Users size={16} className="text-[#635BFF]" />
                    </div>
                    <span className="text-[14px] font-bold text-[#29343D]">All Team</span>
                    <ChevronDown size={18} className="text-[#29343D] ml-1" />
                </button>

                {/* Export Statistics Button */}
                <button className="flex items-center gap-3 bg-[#E0DBFF] bg-opacity-70 px-4 py-[15px] rounded-[16px] hover:bg-opacity-90 transition-colors">
                    <Download size={18} className="text-[#635BFF]" />
                    <span className="text-[14px] font-bold text-[#635BFF]">Export Statistics</span>
                    <ChevronDown size={18} className="text-[#635BFF] ml-1" />
                </button>

            </div>
        </div>
    );
};

export default EmployeeStatusHeader;