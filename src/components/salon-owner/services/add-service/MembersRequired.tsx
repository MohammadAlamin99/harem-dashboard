"use client"

import Image from "next/image"
import { useState } from "react"
import { Pencil } from "lucide-react"

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
    const [selectedMembers, setSelectedMembers] = useState<number[]>([])
    const [allSelected, setAllSelected] = useState(true)

    const toggleMember = (id: number) => {
        setSelectedMembers((prev) =>
            prev.includes(id)
                ? prev.filter((m) => m !== id)
                : [...prev, id]
        )
    }

    const toggleAll = () => {
        if (allSelected) {
            setSelectedMembers([])
        } else {
            setSelectedMembers(membersData.map((m) => m.id))
        }
        setAllSelected(!allSelected)
    }

    return (
        <div className="font-manrope bg-white p-6 rounded-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base md:text-[22px] font-semibold text-[#29343D]">
                    Members Required
                </h2>

                <label className="flex items-center gap-2 text-sm text-[#29343D]">
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        className="accent-[#635BFF]"
                    />
                    All Members
                </label>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {membersData.map((member) => {
                    const isSelected =
                        allSelected || selectedMembers.includes(member.id)

                    return (
                        <div
                            key={member.id}
                            className="flex items-center justify-between p-6 rounded-lg bg-[#F6F7F9]"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleMember(member.id)}
                                    className="accent-[#635BFF]"
                                />

                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />

                                <span className="text-sm font-medium text-[#29343D]">
                                    {member.name}
                                </span>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <div className="text-sm text-[#29343D]">-</div>
                                    <div className="text-xs text-[#98A4AE]">
                                        Duration
                                    </div>
                                </div>

                                <button className="p-2 rounded-md hover:bg-[#F1F2FE]">
                                    <Pencil size={16} className="text-[#635BFF]" />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}