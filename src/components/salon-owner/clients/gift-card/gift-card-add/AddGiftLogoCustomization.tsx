"use client";

import { useState } from "react";
import { Ban } from "lucide-react";
import Image from "next/image";
import ColorPalateIcon from "./ColorPalateIcon";

type LogoOption = "none" | "main" | "alternative" | "minimal";

const logoOptions: { id: LogoOption; label: string }[] = [
    { id: "none", label: "No Logo" },
    { id: "main", label: "Main Logo" },
    { id: "alternative", label: "Alternative Logo" },
    { id: "minimal", label: "Minimal Logo" },
];

function LogoPreview({ id }: { id: LogoOption }) {
    if (id === "none") {
        return (
            <div className="flex items-center justify-center w-full">
                <Ban size={26} color="#635BFF" strokeWidth={2} />
            </div>
        );
    }

    if (id === "main") {
        // full logo: icon + text, colored purple
        return (
            <div className="flex items-center justify-center w-full">
                <div className="relative w-[140px] h-[36px]">
                    <Image
                        src="/images/logo.png"
                        alt="Main Logo"
                        fill
                        className="object-contain"
                        style={{ filter: "invert(36%) sepia(98%) saturate(800%) hue-rotate(220deg) brightness(95%)" }}
                    />
                </div>
            </div>
        );
    }

    if (id === "alternative") {
        // full logo: dark/black version
        return (
            <div className="flex items-center justify-center w-full">
                <div className="relative w-[140px] h-[36px]">
                    <Image
                        src="/images/logo.png"
                        alt="Alternative Logo"
                        fill
                        className="object-contain"
                        style={{ filter: "brightness(0)" }}
                    />
                </div>
            </div>
        );
    }

    // minimal — icon mark only (crop left portion visually via overflow)
    return (
        <div className="flex items-center justify-center w-full">
            <div className="relative w-[36px] h-[36px] overflow-hidden">
                <Image
                    src="/images/logo.png"
                    alt="Minimal Logo"
                    width={120}
                    height={36}
                    className="object-cover object-left h-full w-auto max-w-none"
                    style={{ filter: "invert(36%) sepia(98%) saturate(800%) hue-rotate(220deg) brightness(95%)" }}
                />
            </div>
        </div>
    );
}

export default function AddGiftLogoCustomization() {
    const [selectedLogo, setSelectedLogo] = useState<LogoOption>("main");

    return (
        <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope">

            {/* Section title */}
            <h2 className="text-[#29343D] font-semibold text-[18px] font-manrope mb-5">
                Logo and Branding
            </h2>

            {/* Choose Logo label */}
            <p className="text-[#29343D] text-[14px] font-semibold font-manrope mb-4">
                Choose Logo
            </p>

            {/* Logo option cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mb-7">
                {logoOptions.map((opt) => (
                    <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedLogo(opt.id)}
                        className={`flex flex-col items-center justify-center rounded-xl px-6 py-8 cursor-pointer transition-all
              ${selectedLogo === opt.id
                                ? "bg-[#F6F7F9] ring-2 ring-[#635BFF] ring-offset-0"
                                : "bg-[#F6F7F9] hover:ring-2 hover:ring-[#635BFF]/30"
                            }`}
                    >
                        <LogoPreview id={opt.id} />
                        <span className="text-[#29343D] text-[14px] font-semibold font-manrope mt-3">
                            {opt.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Template Colors row */}
            <div className="flex items-center justify-between pt-5">
                <p className="text-[#29343D] text-[14px] font-semibold font-manrope">
                    Template Colors
                </p>
                <button
                    className="flex items-center gap-2 bg-[#DDDBFF] text-[#635BFF] font-manrope text-[14px] font-medium
            px-4 py-2.5 rounded-lg cursor-pointer hover:bg-[#635BFF] hover:text-white transition-colors"
                >
                    <ColorPalateIcon />
                    Customize Logo
                </button>
            </div>
        </div>
    );
}