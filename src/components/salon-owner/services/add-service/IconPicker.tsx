"use client"

import Image from "next/image"
import { useState } from "react"

const icons = [
    { src: "icon.svg", width: 48, height: 48 },
    { src: "icon2.svg", width: 24, height: 46 },
    { src: "icon3.svg", width: 46, height: 46 },
    { src: "icon4.svg", width: 42, height: 48 },
    { src: "icon5.svg", width: 42, height: 48 },
    { src: "icon6.svg", width: 48, height: 36 },
    { src: "icon7.svg", width: 48, height: 43 },
    { src: "icon8.svg", width: 24, height: 47 },
    { src: "icon9.svg", width: 41, height: 48 },
    { src: "icon10.svg", width: 48, height: 48 },
    { src: "icon11.svg", width: 47, height: 41 },
    { src: "icon12.svg", width: 51, height: 47 },
    { src: "icon13.svg", width: 44, height: 48 },
    { src: "icon14.svg", width: 48, height: 48 },
    { src: "icon15.svg", width: 48, height: 47 },
    { src: "icon17.svg", width: 48, height: 48 },
]

export default function IconPicker() {
    const [selected, setSelected] = useState<string | null>(null)

    return (
        <div className="font-manrope bg-white p-6 rounded-xl border border-[#E0E6EB]">

            {/* Title */}
            <h2 className="text-base md:text-[22px] font-semibold text-[#29343D] mb-4">
                Icon
            </h2>

            {/* Grid */}
            <div className="flex flex-wrap gap-4">
                {icons.map((icon, index) => {
                    const isActive = selected === icon.src

                    return (
                        <button
                            key={index}
                            onClick={() => setSelected(icon.src)}
                            className={`w-20 h-20 flex items-center justify-center border transition-all bg-[#F1F2FE] rounded-xl
                ${isActive
                                    ? "bg-[#F1F2FE] border-[#635BFF]"
                                    : "bg-[#F6F7FB] border-transparent hover:bg-[#EEF0FF]"
                                }`}
                        >
                            <Image
                                src={`/images/iconpicker/${icon.src}`}
                                alt="icon"
                                width={icon.width}
                                height={icon.height}
                                className="object-contain"
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}