"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const serviceOptions = ["All Services", "Haircut", "Coloring", "Massage", "Facial"];
export default function GiftCardDetailsForm() {
    const [form, setForm] = useState({
        salonName: "",
        website: "",
        address: "",
        dateOfIssue: "",
        dateOfExpiration: "",
        usageLimit: "",
        eligibleServices: "",
        receiverName: "",
        gifterName: "",
        personalMessage: "",
    });
    const [showServicesDrop, setShowServicesDrop] = useState(false);

    const set = (key: string, val: string) =>
        setForm((p) => ({ ...p, [key]: val }));

    const inputCls =
        "w-full px-4 py-3 border border-[#E5E7EB] rounded-[4px] font-manrope text-[14px] text-[#29343D] placeholder:text-[#29343D] outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10 transition bg-white";

    const labelCls = "block text-[14px] font-manrope font-semibold text-[#29343D] mb-2";

    return (
        <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope">
            <h2 className="text-[#29343D] font-semibold text-[18px] font-manrope mb-7">
                Gift Card Details
            </h2>

            <div className="space-y-5">

                {/* Salon Name + Website */}
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>
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
                        <label className={labelCls}>
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
                    <label className={labelCls}>
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
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>
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
                        <label className={labelCls}>
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
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>
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
                        <label className={labelCls}>
                            Eligible Services <span className="text-[#29343D]">*</span>
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowServicesDrop((p) => !p)}
                                className="w-full flex items-center justify-between px-4 py-3 border border-[#E5E7EB] rounded-lg bg-white font-manrope text-[14px] outline-none focus:border-[#635BFF] transition cursor-pointer"
                            >
                                <span className={form.eligibleServices ? "text-[#29343D]" : "text-[#C5CDD3]"}>
                                    {form.eligibleServices || "All Services"}
                                </span>
                                <ChevronDown
                                    size={16}
                                    color="#9CA3AF"
                                    className={`transition-transform duration-200 ${showServicesDrop ? "rotate-180" : ""}`}
                                />
                            </button>
                            {showServicesDrop && (
                                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-30 overflow-hidden">
                                    {serviceOptions.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => { set("eligibleServices", s); setShowServicesDrop(false); }}
                                            className={`w-full text-left px-4 py-2.5 font-manrope text-[14px] hover:bg-[#F4F6FA] transition cursor-pointer
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
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className={labelCls}>
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
                        <label className={labelCls}>
                            Gifter Name{" "}
                            <span className="text-[#9CA3AF] font-normal">(optional)</span>
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
                    <label className={labelCls}>
                        Personal Message{" "}
                        <span className="text-[#9CA3AF] font-normal">(Optional)</span>
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
    );
}