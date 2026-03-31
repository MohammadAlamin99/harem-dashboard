"use client"

import PageHeader from "@/components/salon-owner/common-component/PageHeader"
import { ChevronDown, Home, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import BundleForm from "./BundleForm"
import { useState } from "react"
import Image from "next/image"
import ServicesModal from "./ServicesModal"
import MembersModal from "./MembersModal"
interface Service { id: number; name: string; duration: string; price: string }
interface Member { id: number; name: string; phone: string; avatar: string }

const ALL_SERVICES: Service[] = [
    { id: 1, name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: 2, name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: 3, name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: 4, name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: 5, name: "Hair Color", duration: "15 min", price: "€ 170" },
    { id: 6, name: "Hair Color", duration: "15 min", price: "€ 170" },
]

const ALL_MEMBERS: Member[] = [
    { id: 1, name: "Maria Fernandez", phone: "+39 345 678 9123", avatar: "/images/avator.png" },
    { id: 2, name: "Virgie Sutton", phone: "+39 345 678 9123", avatar: "/images/avator.png" },
    { id: 3, name: "Lois Gregory", phone: "+39 345 678 9123", avatar: "/images/avator.png" },
    { id: 4, name: "Maria Fernandez", phone: "+39 345 678 9123", avatar: "/images/avator.png" },
    { id: 5, name: "Virgie Sutton", phone: "+39 345 678 9123", avatar: "/images/avator.png" },
    { id: 6, name: "Lois Gregory", phone: "+39 345 678 9123", avatar: "/images/avator.png" },
]

const SCHEDULE_TYPES = ["Booked in sequence", "Booked in parallel"]

export default function AddBundleContent() {
    const router = useRouter()
    const [scheduleType, setScheduleType] = useState("Booked in sequence")
    const [showServiceModal, setShowServiceModal] = useState(false)
    const [showMemberModal, setShowMemberModal] = useState(false)
    const [selectedServices, setSelectedServices] = useState<Service[]>([])
    const [selectedMembers, setSelectedMembers] = useState<Member[]>([])

    return (
        <div>
            <PageHeader title="Add Bundle" onBack={() => router.back()} breadcrumb={[{ label: "Services", active: true }]} HomeIcon={<Home size={18} />} />

            <BundleForm />

            {/*  Services  */}
            <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope mt-[30px]">
                <h2 className="text-[#29343D] text-[18px] font-bold mb-7">Services</h2>
                <div className="relative al-select">
                    <select
                        value={scheduleType}
                        onChange={(e) => setScheduleType(e.target.value)}
                        className="appearance-none w-full h-10 border border-[#E2E8F0] rounded-[4px] px-4 pr-10 text-[14px] text-[#98A4AE] cursor-pointer hover:border-[#6366F1] focus:border-[#6366F1] transition-colors bg-white focus:outline-none"
                    >
                        {SCHEDULE_TYPES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <ChevronDown
                        size={16}
                        className="text-[#98A4AE] absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none"
                    />
                </div>
                {selectedServices.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-7 mt-7">
                        {selectedServices.map((s) => (
                            <div key={s.id} className="flex items-center gap-6 p-4 rounded-[12px] bg-[#F6F7F9]">
                                <div className="flex-1 min-w-0">
                                    <p className="text-[16px] font-semibold text-[#29343D]">{s.name}</p>
                                    <p className="text-[14px] text-[#98A4AE]">{s.duration}</p>
                                </div>
                                <span className="text-[24px] font-bold text-[#29343D]">{s.price}</span>
                                <button onClick={() => setSelectedServices((prev) => prev.filter((x) => x.id !== s.id))} className="cursor-pointer">
                                    <Trash2 size={24} color="#FF6692" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button onClick={() => setShowServiceModal(true)} className="flex items-center gap-2 bg-[#DDDBFF] hover:bg-[#ccc9ff] text-[#6366F1] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer mt-[30px]">
                    <Plus size={15} strokeWidth={2.5} />
                    Add Service
                </button>
            </div>

            {/*  Members Required  */}
            <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope mt-[30px]">
                <h2 className="text-[#29343D] text-[18px] font-bold mb-7">Members Required</h2>

                {selectedMembers.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
                        {selectedMembers.map((m) => (
                            <div key={m.id} className="flex items-center gap-3 p-4 rounded-[12px] bg-[#F6F7F9]">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F3F4F6]">
                                    <Image src={m.avatar} alt={m.name} width={48} height={48} className="w-full h-full object-cover" />
                                </div>
                                <span className="flex-1 text-[16px] font-semibold text-[#29343D] truncate">{m.name}</span>
                                <button onClick={() => setSelectedMembers((prev) => prev.filter((x) => x.id !== m.id))} className="p-1.5 rounded-lg cursor-pointer">
                                    <Trash2 size={24} color="#FF6692" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button onClick={() => setShowMemberModal(true)} className="flex items-center gap-2 bg-[#DDDBFF] hover:bg-[#ccc9ff] text-[#6366F1] text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer">
                    <Plus size={15} strokeWidth={2.5} />
                    Add Members
                </button>
            </div>

            <button className="font-manrope bg-[#6366F1] hover:bg-[#5254c7] text-white text-[14px] font-semibold px-4 py-2.5 rounded-[8px] transition-colors cursor-pointer ml-auto block mt-6 mb-6">Save</button>

            {/* Modals  */}
            {showServiceModal && (
                <ServicesModal
                    initial={selectedServices}
                    onClose={() => setShowServiceModal(false)}
                    onSave={(services) => { setSelectedServices(services); setShowServiceModal(false) }}
                    ALL_SERVICES={ALL_SERVICES}
                />
            )}
            {showMemberModal && (
                <MembersModal
                    initial={selectedMembers}
                    onClose={() => setShowMemberModal(false)}
                    onSave={(members) => { setSelectedMembers(members); setShowMemberModal(false) }}
                    ALL_MEMBERS={ALL_MEMBERS}
                />
            )}
        </div>
    )
}