"use client"

import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"

type Member = {
    id: number
    name: string
    image: string
    duration?: string
}

const membersData: Member[] = [
    {
        id: 1,
        name: "Maria Rodriguez",
        image: "/images/avator.png",
    },
    {
        id: 2,
        name: "Maria Rodriguez",
        image: "/images/avator.png",
    },
    {
        id: 3,
        name: "Maria Rodriguez",
        image: "/images/avator.png",
    },
    {
        id: 4,
        name: "Maria Rodriguez",
        image: "/images/avator.png",
    },
]

export default function MembersRequired() {

    return (
        <div className="font-manrope bg-white p-6 rounded-xl border border-[#E0E6EB]">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-[#29343D]">
                    Members Required
                </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {membersData.map((member) => {

                    return (
                        <div
                            key={member.id}
                            className="flex items-center justify-between p-6 rounded-lg bg-[#F6F7F9] flex-wrap"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-3">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={48}
                                    height={48}
                                    className="rounded-xl object-cover"
                                />

                                <span className="text-sm font-medium text-[#29343D]">
                                    {member.name}
                                </span>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-4">
                                <div className="text-right flex flex-col justify-center items-center">
                                    <div className="text-[24px] leading-[120%] text-[#29343D]">-</div>
                                    <div className="text-xs text-[#526B7A]">
                                        Duration
                                    </div>
                                </div>

                                <button className="cursor-pointer">
                                    <Pencil size={24} className="text-[#635BFF]" />
                                </button>
                                <button className="cursor-pointer">
                                    <Trash2 size={24} color="#FF6692" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}