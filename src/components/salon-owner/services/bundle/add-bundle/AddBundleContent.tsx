import PageHeader from "@/components/salon-owner/common-component/PageHeader";
import { ChevronDown, Home, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import BundleForm from "./BundleForm";
import { useState } from "react";

export default function AddBundleContent() {
    const router = useRouter();
    const [scheduleType, setScheduleType] = useState("Booked in sequence")
    const SCHEDULE_TYPES = [
        "Booked in sequence",
        "Booked in parallel",
        "Flexible",
    ]
    return (
        <div>
            <PageHeader title="Add Bundle"
                onBack={() => router.back()}
                breadcrumb={[{ label: "Services", active: true }]}
                HomeIcon={<Home size={18} />}
            />
            <BundleForm />

            {/* services */}
            <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope mt-[30px]">

                <h2 className="text-[#29343D] text-base font-bold mb-5">Services</h2>

                {/* Schedule Type */}
                <div className="flex flex-col gap-2 mb-6 w-[50%]">
                    <label className="text-[14px] font-semibold text-[#29343D]">
                        Schedule Type *
                    </label>
                    <div className="relative">
                        <select
                            value={scheduleType}
                            onChange={(e) => {
                                setScheduleType(e.target.value)
                            }}
                            className="appearance-none w-full border border-[#E2E8F0] rounded-[4px] px-4 py-3.5 pr-10 text-[14px] text-[#98A4AE] cursor-pointer hover:border-[#6366F1] focus:border-[#6366F1] transition-colors bg-white focus:outline-none"
                        >
                            {SCHEDULE_TYPES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="text-[#98A4AE] absolute top-1/2 right-3" />
                    </div>
                </div>

                {/* Add Service Button */}
                <button
                    className="flex items-center gap-2 bg-[#DDDBFF] hover:bg-[#ccc9ff] text-[#6366F1] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer"
                >
                    <Plus size={15} strokeWidth={2.5} />
                    Add Service
                </button>

            </div>


            {/* member required */}
            <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope mt-[30px]">

                <h2 className="text-[#29343D] text-base font-bold mb-5">Members Required</h2>

                {/* Add Service Button */}
                <button
                    className="flex items-center gap-2 bg-[#DDDBFF] hover:bg-[#ccc9ff] text-[#6366F1] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer"
                >
                    <Plus size={15} strokeWidth={2.5} />
                    Add Members
                </button>

            </div>

            <button className="font-manrope bg-[#6366F1] hover:bg-[#5254c7] text-white text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer ml-auto block mt-6 mb-6">Save</button>
        </div>
    )
}
