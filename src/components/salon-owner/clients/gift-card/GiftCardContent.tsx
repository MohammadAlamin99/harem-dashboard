"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import PageHeader from "../../common-component/PageHeader";
import DropIcon from "../view-details/notes/DropIcon";
import IDashboard from "@/app/account-protal/svg/IDashboard";
import Link from "next/link";
const templates = [
    {
        id: 1,
        name: "Template Name",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "/images/gift01.png",
    },
    {
        id: 2,
        name: "Template Name",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        image: "/images/gift02.png",
    },
];

const currencies = ["€", "$", "£", "₺"];

export default function GiftCardContent() {
    const [quantity, setQuantity] = useState<string>("1");
    const [amount, setAmount] = useState<string>("");
    const [hideAmount, setHideAmount] = useState<boolean>(false);
    const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
    const [currency, setCurrency] = useState<string>("€");
    const [showCurrencyDrop, setShowCurrencyDrop] = useState<boolean>(false);
    const [customFile, setCustomFile] = useState<File | null>(null);

    return (
        <div className="min-h-screen bg-[#F4F6FA] font-manrope">

            {/* ── Top Bar ── */}
            <PageHeader
                title="Add Gift Card"
                onBack={() => window.history.back()}
                HomeIcon={<IDashboard color="#98A4AE" size="15" />}
                breadcrumb={[
                    {
                        label: "Clients",
                        active: true,
                    },
                ]}
            />

            {/* ── Main Card ── */}
            <div className="bg-white rounded-xl shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)] p-5 md:p-8 mt-[20px] md:mt-[30px]">

                {/* Section title */}
                <h2 className="text-[#29343D] font-semibold font-manrope text-[18px] mb-[30px]">
                    Basic Details
                </h2>

                {/* Row: quantity + amount + hide toggle */}
                <div className="flex flex-col md:flex-row md:items-end gap-7 mb-8">

                    {/* Quantity */}
                    <div className="flex-1 max-w-[360px]">
                        <label className="block text-[14px] font-semibold font-manrope text-[#29343D] mb-2">
                            How many gift cards do you want to create?{" "}
                            <span className="text-[#29343D]">*</span>
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded font-manrope text-[15px] text-[#29343D]
                outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition"
                        />
                    </div>

                    {/* Amount + Currency + Hide toggle */}
                    <div className="flex items-end gap-4 flex-1">
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <label className="block text-[14px] font-semibold font-manrope text-[#29343D] mb-2">
                                    Ammount <span className="text-[#29343D]">*</span>
                                </label>
                                {/* Hide amount toggle */}
                                <div className="flex items-center gap-2 pb-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setHideAmount((p) => !p)}
                                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 cursor-pointer
                  ${hideAmount ? "bg-[#635BFF]" : "bg-[#E5E7EB]"}`}
                                    >
                                        <span
                                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
                    ${hideAmount ? "translate-x-5" : "translate-x-0"}`}
                                        />
                                    </button>
                                    <span className="text-[13px] font-manrope text-[#29343D] whitespace-nowrap">
                                        Hide ammount
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter ammount"
                                    className="flex-1 px-4 py-2.5 border border-[#E5E7EB] font-manrope text-[15px]
                    text-[#29343D] placeholder:text-[#29343D] outline-none
                    focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transitionn rounded-sm"
                                />
                                {/* Currency dropdown */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrencyDrop((p) => !p)}
                                        className="flex items-center gap-1 px-3 py-2.5 border border-[#E5E7EB] rounded-sm bg-white
                      text-[#29343D] font-manrope text-[14px] cursor-pointer hover:border-[#635BFF] transition min-w-[60px]"
                                    >
                                        {currency}
                                        <ChevronDown size={14} color="#9CA3AF" />
                                    </button>
                                    {showCurrencyDrop && (
                                        <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-30 min-w-[70px] overflow-hidden">
                                            {currencies.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    onClick={() => { setCurrency(c); setShowCurrencyDrop(false); }}
                                                    className={`w-full text-left px-4 py-2 font-manrope text-[14px] hover:bg-[#F4F6FA] transition cursor-pointer
                            ${currency === c ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Select Template label */}
                <h3 className="text-[#29343D] font-semibold font-manrope text-[15px] mb-4">
                    Select Template
                </h3>

                {/* Template grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Template cards */}
                    {templates.map((tpl) => (
                        <button
                            key={tpl.id}
                            type="button"
                            onClick={() => setSelectedTemplate(tpl.id)}
                            className={`text-left rounded-xl border md:p-6 p-3 transition-all cursor-pointer shadow-[0_2px_4px_-1px_rgba(175,182,201,0.2)]
                ${selectedTemplate === tpl.id
                                    ? "border-[#635BFF]"
                                    : "border-[#E0E6EB] hover:border-[#635BFF]/40"
                                }`}
                        >
                            <div className="w-full h-[190px] rounded-lg overflow-hidden mb-3">
                                <Image
                                    src={tpl.image}
                                    alt={tpl.name}
                                    width={400}
                                    height={190}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-[#29343D] font-semibold font-manrope text-[14px] mb-1">
                                {tpl.name}
                            </p>
                            <p className="text-[#9CA3AF] font-manrope text-[12px] leading-relaxed">
                                {tpl.description}
                            </p>
                        </button>
                    ))}

                    {/* Upload Custom Gift Card */}
                    <label
                        className={`justify-center rounded-xl border md:p-6 p-3 cursor-pointer transition-all min-h-[240px]
              ${selectedTemplate === 0
                                ? "border-[#635BFF] bg-[#F8F8FF]"
                                : "border-[#E0E6EB] hover:border-[#635BFF]/40 hover:bg-[#F8F8FF]"
                            }`}
                        onClick={() => setSelectedTemplate(0)}
                    >
                        <div className="border border-dashed border-[#635BFF] p-7 h-full rounded-xl flex flex-col items-center justify-center">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    setCustomFile(e.target.files?.[0] ?? null);
                                    setSelectedTemplate(0);
                                }}
                            />

                            {customFile ? (
                                <div className="w-full h-[160px] rounded-lg overflow-hidden mb-3">
                                    <Image
                                        src={URL.createObjectURL(customFile)}
                                        alt="Custom"
                                        className="w-full h-full object-cover"
                                        width={315}
                                        height={188}
                                    />
                                </div>
                            ) : (
                                <div className="w-[64px] h-[64px] rounded-2xl bg-[#F1F2FE] flex items-center justify-center mb-3">
                                    <DropIcon />
                                </div>
                            )}

                            <span className="text-[#635BFF] font-manrope text-[14px] font-semibold text-center">
                                {customFile ? customFile.name : "Upload Custom Gift Card"}
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* ── Next button ── */}
            <div className="flex justify-end mt-6">
                <Link href={"/salon-owner/clients/gift-card/add"}>
                    <button
                        className="bg-[#635BFF] text-white font-manrope text-[15px] font-medium
            px-4 py-2.5 rounded-xl cursor-pointer
            hover:opacity-90 active:scale-[0.97] transition-all
            shadow-[0_8px_24px_-6px_rgba(99,91,255,0.45)]"
                    >
                        Next
                    </button>
                </Link>
            </div>
        </div>
    );
}