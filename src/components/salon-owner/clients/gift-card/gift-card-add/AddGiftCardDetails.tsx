"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const serviceOptions = ["All Services", "Haircut", "Coloring", "Massage", "Facial"];

export default function AddGiftCardDetails() {
    const [form, setForm] = useState({
        salonName: "",
        website: "",
        address: "",
        dateOfIssue: "",
        dateOfExpiration: "",
        usageLimit: "",
        eligibleServices: "All Services",
        receiverName: "",
        gifterName: "",
        personalMessage: "",
    });
    const [showServicesDrop, setShowServicesDrop] = useState(false);

    const set = (key: string, val: string) =>
        setForm((p) => ({ ...p, [key]: val }));

    const inputCls =
        "w-full px-3 py-2.5 border border-[#E5E7EB] rounded font-manrope text-[13px] text-[#29343D] placeholder:text-[#C5CDD3] outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition";

    return (
        <div className="min-h-screen bg-[#F4F6FA] font-manrope p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5">

                {/* ── LEFT: Form ── */}
                <div className="bg-white rounded-2xl border border-[#E0E6EB] p-7">
                    <h2 className="text-[#29343D] font-semibold text-[18px] font-manrope mb-6">
                        Gift Card Details
                    </h2>

                    <div className="space-y-4">

                        {/* Salon Name + Website */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Salon Name <span className="text-[#29343D]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter salon name"
                                    value={form.salonName}
                                    onChange={(e) => set("salonName", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Website <span className="text-[#29343D]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter website"
                                    value={form.website}
                                    onChange={(e) => set("website", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                Address <span className="text-[#29343D]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address"
                                value={form.address}
                                onChange={(e) => set("address", e.target.value)}
                                className={inputCls}
                            />
                        </div>

                        {/* Date of Issue + Date of Expiration */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Date of Issue <span className="text-[#29343D]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter date"
                                    value={form.dateOfIssue}
                                    onChange={(e) => set("dateOfIssue", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Date of Expiration <span className="text-[#29343D]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter date"
                                    value={form.dateOfExpiration}
                                    onChange={(e) => set("dateOfExpiration", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Usage Limit + Eligible Services */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Usage Limit <span className="text-[#29343D]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter limit"
                                    value={form.usageLimit}
                                    onChange={(e) => set("usageLimit", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Eligible Services <span className="text-[#29343D]">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowServicesDrop((p) => !p)}
                                        className="w-full flex items-center justify-between px-3 py-2.5 border border-[#E5E7EB] rounded font-manrope text-[13px] text-[#C5CDD3] bg-white outline-none focus:border-[#635BFF] transition cursor-pointer"
                                    >
                                        <span className={form.eligibleServices !== "All Services" ? "text-[#29343D]" : ""}>
                                            {form.eligibleServices}
                                        </span>
                                        <ChevronDown size={15} color="#9CA3AF" className={`transition-transform ${showServicesDrop ? "rotate-180" : ""}`} />
                                    </button>
                                    {showServicesDrop && (
                                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-30 overflow-hidden">
                                            {serviceOptions.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => { set("eligibleServices", s); setShowServicesDrop(false); }}
                                                    className={`w-full text-left px-4 py-2.5 font-manrope text-[13px] hover:bg-[#F4F6FA] transition cursor-pointer
                            ${form.eligibleServices === s ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Receiver Name + Gifter Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Receiver Name <span className="text-[#29343D]">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter receiver name"
                                    value={form.receiverName}
                                    onChange={(e) => set("receiverName", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                    Gifter Name <span className="text-[#9CA3AF]">(optional)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter gifter name"
                                    value={form.gifterName}
                                    onChange={(e) => set("gifterName", e.target.value)}
                                    className={inputCls}
                                />
                            </div>
                        </div>

                        {/* Personal Message */}
                        <div>
                            <label className="block text-[13px] font-manrope text-[#29343D] mb-1.5">
                                Personal Message <span className="text-[#9CA3AF]">(Optional)</span>
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Enter a description"
                                value={form.personalMessage}
                                onChange={(e) => set("personalMessage", e.target.value)}
                                className={`${inputCls} resize-y`}
                            />
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Live Preview ── */}
                <div className="bg-white rounded-2xl border border-[#E0E6EB] p-7 w-full lg:w-[300px]">
                    <h2 className="text-[#29343D] font-semibold text-[18px] font-manrope mb-5">
                        Live Preview
                    </h2>

                    <div className="flex flex-col gap-4">
                        {/* Front card */}
                        <div className="rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src="/images/giftcard01.png"
                                alt="Gift Card Front"
                                width={280}
                                height={160}
                                className="w-full object-cover"
                            />
                        </div>

                        {/* Back card — live data overlay */}
                        <div className="relative rounded-2xl overflow-hidden shadow-sm bg-[#635BFF] min-h-[160px] p-5">
                            {/* background gift image faint */}
                            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30">
                                <Image
                                    src="/images/giftcard01.png"
                                    alt=""
                                    fill
                                    className="object-cover object-right"
                                />
                            </div>

                            <div className="relative z-10">
                                <p className="text-white/70 text-[10px] font-manrope mb-0.5">From</p>
                                <p className="text-white font-semibold font-manrope text-[15px] mb-3">
                                    {form.gifterName || "Gifter Name"}
                                </p>
                                <p className="text-white/70 text-[10px] font-manrope mb-0.5">To</p>
                                <p className="text-white font-semibold font-manrope text-[15px] mb-4">
                                    {form.receiverName || "Receiver Name"}
                                </p>
                                <p className="text-white/60 text-[9px] font-manrope leading-relaxed line-clamp-3">
                                    {form.personalMessage ||
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save button */}
            <div className="flex justify-end mt-5">
                <button
                    className="bg-[#635BFF] text-white font-manrope text-[14px] font-medium
            px-8 py-3 rounded-xl cursor-pointer
            hover:opacity-90 active:scale-[0.97] transition-all
            shadow-[0_8px_24px_-6px_rgba(99,91,255,0.45)]"
                >
                    Save
                </button>
            </div>
        </div>
    );
}