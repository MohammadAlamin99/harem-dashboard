import { Eye, RefreshCw } from "lucide-react";

export default function CommonHeadSalonOwner() {
  return (
    <div>
      <div className="mb-8 h-[54px] px-4 flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:py-3 max-[600px]:h-full items-center font-manrope text-left text-sm md:text-[16px] font-bold text-gray-900 rounded-xl bg-[#FFFFFF] justify-between">
        <h1 className="h-[54px] px-4 flex items-center font-manrope text-left text-sm md:text-[16px] font-bold text-gray-900 rounded-xl bg-[#FFFFFF]">
          Dashboard
        </h1>
        <div className="flex items-center gap-6 max-[600px]:gap-5 flex-wrap">
          <button className="font-manrope text-sm font-medium text-[#0A2540] flex items-center gap-2.5 bg-[#EFF4FA] rounded-[8px] px-4 py-2.5 cursor-pointer">
            <RefreshCw color="#0A2540" width={16} height={16} />
            Refresh Data
          </button>
          <button className="font-manrope text-sm font-medium text-white flex items-center gap-2.5 bg-[#635BFF] rounded-[8px] px-4 py-2.5 cursor-pointer">
            <Eye color="#fff" width={16} height={16} />
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
}
