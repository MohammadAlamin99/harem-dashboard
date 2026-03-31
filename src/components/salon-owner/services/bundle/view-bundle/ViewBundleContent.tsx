import PageHeader from "@/components/salon-owner/common-component/PageHeader";
import ServiceDetailCard from "../../view-service/Servicedetailcard";
import { useRouter } from "next/navigation";
import { Home, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ViewBundleContent() {
    const router = useRouter()
    return (
        <>
            <PageHeader title="View Bundle"
                onBack={() => router.back()}
                breadcrumb={[{ label: "Services", active: true }]}
                HomeIcon={<Home size={18} />}
            />

            <div className='mt-6'>
                <ServiceDetailCard
                    name="Bundle 2"
                    category="Category 1"
                    addToOnlineBookings={true}
                    defaultDuration="15 min"
                    postBreakMin="15 min"
                    priceType="Fixed"
                    price="€ 270"
                    vat="€ 70"
                    description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    onBookingToggle={(val) => console.log(val)}
                />
            </div>

            <div className='mt-6'>
                <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope mt-[30px]">
                    <h2 className="text-[#29343D] text-[18px] font-bold mb-7">Services</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-7 mt-7">
                        <div className="flex items-center gap-6 p-4 rounded-[12px] bg-[#F6F7F9]">
                            <div className="flex-1 min-w-0">
                                <p className="text-[16px] font-semibold text-[#29343D]">Hair Color</p>
                                <p className="text-[14px] text-[#98A4AE]">15 min</p>
                            </div>
                            <span className="text-[24px] font-bold text-[#29343D]">€ 170</span>
                            <button className="cursor-pointer">
                                <Trash2 size={24} color="#FF6692" />
                            </button>
                        </div>
                        <div className="flex items-center gap-6 p-4 rounded-[12px] bg-[#F6F7F9]">
                            <div className="flex-1 min-w-0">
                                <p className="text-[16px] font-semibold text-[#29343D]">Hair Color</p>
                                <p className="text-[14px] text-[#98A4AE]">15 min</p>
                            </div>
                            <span className="text-[24px] font-bold text-[#29343D]">€ 170</span>
                            <button className="cursor-pointer">
                                <Trash2 size={24} color="#FF6692" />
                            </button>
                        </div>
                        <div className="flex items-center gap-6 p-4 rounded-[12px] bg-[#F6F7F9]">
                            <div className="flex-1 min-w-0">
                                <p className="text-[16px] font-semibold text-[#29343D]">Hair Color</p>
                                <p className="text-[14px] text-[#98A4AE]">15 min</p>
                            </div>
                            <span className="text-[24px] font-bold text-[#29343D]">€ 170</span>
                            <button className="cursor-pointer">
                                <Trash2 size={24} color="#FF6692" />
                            </button>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 bg-[#DDDBFF] hover:bg-[#ccc9ff] text-[#6366F1] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer mt-[30px]">
                        <Plus size={15} strokeWidth={2.5} />
                        Add Service
                    </button>
                </div>

                {/*  Members Required  */}
                <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope mt-[30px]">
                    <h2 className="text-[#29343D] text-[18px] font-bold mb-7">Members Required</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
                        <div className="flex items-center gap-3 p-4 rounded-[12px] bg-[#F6F7F9]">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F3F4F6]">
                                <Image src="/images/avator.png" alt="name" width={48} height={48} className="w-full h-full object-cover" />
                            </div>
                            <span className="flex-1 text-[16px] font-semibold text-[#29343D] truncate">name</span>
                            <button className="p-1.5 rounded-lg cursor-pointer">
                                <Trash2 size={24} color="#FF6692" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-[12px] bg-[#F6F7F9]">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F3F4F6]">
                                <Image src="/images/avator.png" alt="name" width={48} height={48} className="w-full h-full object-cover" />
                            </div>
                            <span className="flex-1 text-[16px] font-semibold text-[#29343D] truncate">name</span>
                            <button className="p-1.5 rounded-lg cursor-pointer">
                                <Trash2 size={24} color="#FF6692" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-[12px] bg-[#F6F7F9]">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F3F4F6]">
                                <Image src="/images/avator.png" alt="name" width={48} height={48} className="w-full h-full object-cover" />
                            </div>
                            <span className="flex-1 text-[16px] font-semibold text-[#29343D] truncate">name</span>
                            <button className="p-1.5 rounded-lg cursor-pointer">
                                <Trash2 size={24} color="#FF6692" />
                            </button>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-[#DDDBFF] hover:bg-[#ccc9ff] text-[#6366F1] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer">
                        <Plus size={15} strokeWidth={2.5} />
                        Add Members
                    </button>
                </div>
            </div>
        </>
    )
}
